import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Project,
  PortfolioData 
} from './types';
import { 
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
} from './data/defaultData';
import { TopActionBar } from './components/TopActionBar';
import { HomePage } from './components/HomePage';
import { HeroSection } from './components/HeroSection';
import { CategoryFilter } from './components/CategoryFilter';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailModal } from './components/ProjectDetailModal';
const EditModal = lazy(() => import('./components/EditModal').then(m => ({ default: m.EditModal })));
const GoogleSitesEmbedModal = lazy(() => import('./components/GoogleSitesEmbedModal').then(m => ({ default: m.GoogleSitesEmbedModal })));
const ResetConfirmModal = lazy(() => import('./components/ResetConfirmModal').then(m => ({ default: m.ResetConfirmModal })));
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { Sparkles, FolderSearch, ArrowUp } from 'lucide-react';
import { filterAndRankProjects } from './utils/searchHelper';
import { AnimatedBackgroundClouds } from './components/AnimatedBackgroundClouds';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => loadPortfolioData());
  const [activeTab, setActiveTab] = useState<'home' | 'projects'>('home');
  const [activeCategory, setActiveCategory] = useState<'all' | 'highschool' | 'university'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pendingScrollToContact, setPendingScrollToContact] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Optional owner secret shortcut (Ctrl + Shift + E or Cmd + Shift + E) to open edit modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsEditModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      text,
      type
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSaveData = (updatedData: PortfolioData, silent = false) => {
    setData(updatedData);
    savePortfolioData(updatedData);
    if (!silent) {
      showToast('บันทึกข้อมูลเรียบร้อยแล้ว!', 'success');
    }
  };

  const handleResetData = () => {
    const res = resetPortfolioData();
    setData(res);
    showToast('คืนค่าข้อมูลเริ่มต้นเรียบร้อยแล้ว', 'info');
  };

  // Track scroll position inside container for scroll-to-top button
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered Projects Computation
  const hsCount = useMemo(() => data.projects.filter(p => p.category === 'highschool').length, [data.projects]);
  const uniCount = useMemo(() => data.projects.filter(p => p.category === 'university').length, [data.projects]);
  const totalCount = data.projects.length;

  const filteredProjects = useMemo(() => {
    const categoryProjects = activeCategory === 'all'
      ? data.projects
      : data.projects.filter(p => p.category === activeCategory);

    if (!searchQuery.trim()) {
      return categoryProjects;
    }

    return filterAndRankProjects(categoryProjects, searchQuery);
  }, [data.projects, activeCategory, searchQuery]);

  const selectedProjectIndex = useMemo(() => {
    if (!selectedProject) return -1;
    return filteredProjects.findIndex((p) => p.id === selectedProject.id);
  }, [selectedProject, filteredProjects]);

  const handlePrevProject = () => {
    if (selectedProjectIndex > 0) {
      setSelectedProject(filteredProjects[selectedProjectIndex - 1]);
    }
  };

  const handleNextProject = () => {
    if (selectedProjectIndex >= 0 && selectedProjectIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[selectedProjectIndex + 1]);
    }
  };

  // ล็อก window / document ไม่ให้เลื่อนเด็ดขาด (ป้องกัน Topbar หลุดตำแหน่งหรือขยับใน Google Sites iframe)
  useEffect(() => {
    const lockWindowScroll = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('scroll', lockWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', lockWindowScroll);
  }, []);

  // ฟังก์ชันเลื่อนจอไปยัง Element ภายใน main-scroll-container โดยตรง
  // ไม่ใช้ el.scrollIntoView เพื่อป้องกันไม่ให้ window/iframe เลื่อน จน Topbar หลุดตำแหน่งหรือขยับ
  const scrollToElementInContainer = (elementId: string, align: 'start' | 'center' = 'start', offset: number = 24) => {
    const container = scrollContainerRef.current;
    const target = document.getElementById(elementId);
    if (!container || !target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    let targetTop = container.scrollTop + (targetRect.top - containerRect.top) - offset;
    if (align === 'center') {
      targetTop = container.scrollTop + (targetRect.top - containerRect.top) - (container.clientHeight / 2) + (targetRect.height / 2);
    }

    container.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });
  };

  const scrollToProjects = () => {
    scrollToElementInContainer('projects-gallery-section', 'start', 20);
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToProjects = (category: 'all' | 'highschool' | 'university' = 'all') => {
    setActiveCategory(category);
    setActiveTab('projects');
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    if (activeTab !== 'home') {
      setPendingScrollToContact(true);
      setActiveTab('home');
    } else {
      scrollToElementInContainer('contact-section', 'start', 20);
    }
  };

  // เลื่อนจอลงไปที่ส่วนติดต่อฉันอัตโนมัติอย่างแม่นยำแม้สลับมาจากหน้าผลงาน
  useEffect(() => {
    if (activeTab === 'home' && pendingScrollToContact) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const el = document.getElementById('contact-section');
        if (el) {
          clearInterval(interval);
          setPendingScrollToContact(false);
          setTimeout(() => {
            scrollToElementInContainer('contact-section', 'start', 20);
          }, 80);
        } else if (attempts > 30) {
          clearInterval(interval);
          setPendingScrollToContact(false);
        }
      }, 40);

      return () => clearInterval(interval);
    }
  }, [activeTab, pendingScrollToContact]);

  return (
    <div className="h-screen flex flex-col pastel-bg-canvas text-slate-800 selection:bg-[#EBE0FC] selection:text-[#3B1968] overflow-hidden relative">
      {/* Dreamy Animated Floating Background Clouds & Subtle Twinkles */}
      <AnimatedBackgroundClouds />

      {/* Top Navigation Bar - อยู่บนสุดเต็มแถบ แถบสไลด์จะเริ่มที่ขอบล่างของ Topbar เท่านั้น */}
      <TopActionBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setPendingScrollToContact(false);
          setActiveTab(tab);
          scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        totalProjectsCount={totalCount}
        onScrollToContact={handleScrollToContact}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        projects={data.projects}
        onSelectProject={(project) => {
          setActiveCategory(project.category);
          setActiveTab('projects');
          setSelectedProject(project);
          setTimeout(() => {
            const el = document.getElementById(`project-${project.id}`);
            if (el) {
              scrollToElementInContainer(`project-${project.id}`, 'center');
            } else {
              scrollToProjects();
            }
          }, 150);
        }}
        onSearchSubmit={() => {
          setActiveTab('projects');
          setTimeout(() => {
            scrollToProjects();
          }, 100);
        }}
      />

      {/* Main Scrollable Content Container - ทุกข้อมูลและตัวหนังสืออยู่เลเยอร์ z-10 เหนือก้อนเมฆพื้นหลัง */}
      <div 
        ref={scrollContainerRef}
        id="main-scroll-container"
        className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative z-10"
      >

      {/* Main Content Area with View Transition */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            /* VIEW 1: HOME PAGE (หน้าหลักที่ออกแบบใหม่จาก Google Sites) */
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <HomePage
                data={data}
                onNavigateToProjects={handleNavigateToProjects}
                onShowToast={showToast}
                onScrollToContact={handleScrollToContact}
              />
            </motion.div>
          ) : (
            /* VIEW 2: PROJECTS GALLERY PAGE (หน้าแสดงผลงาน & รายละเอียด) */
            <motion.div
              key="projects-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full space-y-7 sm:space-y-9 pb-1"
            >
              {/* Hero Section of Projects */}
              <HeroSection
                hero={data.hero}
                totalProjects={totalCount}
                hsCount={hsCount}
                uniCount={uniCount}
                onScrollToProjects={scrollToProjects}
              />

              {/* Projects Gallery Section */}
              <section 
                id="projects-gallery-section" 
                aria-label="Project Gallery"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 sm:mb-5">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#5A2F91] text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#A83870]" />
                      <span>ผลงานที่คัดสรร • Selected Works</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#26153F] tracking-tight">
                      แกลเลอรีผลงาน (Project Showcase)
                    </h2>
                  </div>
                </div>

                {/* Category Filter & Search Bar */}
                <CategoryFilter
                  categories={data.categories}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  totalCount={totalCount}
                  hsCount={hsCount}
                  uniCount={uniCount}
                />

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                  >
                    <AnimatePresence>
                      {filteredProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          categories={data.categories}
                          onOpenDetail={(p) => setSelectedProject(p)}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  /* Empty State */
                  <div className="p-10 text-center bg-white/85 rounded-3xl border border-[#E8DEF8] shadow-2xs max-w-lg mx-auto my-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#F3ECFD] text-[#6E3EA8] flex items-center justify-center mx-auto mb-3 border border-[#E0D3F8]">
                      <FolderSearch className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">
                      ไม่พบผลงานที่ตรงกับการค้นหา
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-4">
                      ลองปรับเปลี่ยนคำค้นหา หรือคลิกดูผลงานในหมวดหมู่อื่นๆ
                    </p>
                    {searchQuery && (
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => setSearchQuery('')}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-[#4E2B82] bg-[#F5ECFD] hover:bg-[#ECE0FC] border border-[#DDD0F6] cursor-pointer transition-colors shadow-2xs"
                        >
                          ล้างคำค้นหา
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer hero={data.hero} />
      </div>

      {/* Modals & Dialogs */}
      <ProjectDetailModal
        project={selectedProject}
        categories={data.categories}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        hasPrev={selectedProjectIndex > 0}
        hasNext={selectedProjectIndex >= 0 && selectedProjectIndex < filteredProjects.length - 1}
      />

      <Suspense fallback={null}>
        {isEditModalOpen && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            data={data}
            onSave={handleSaveData}
            onResetToDefault={handleResetData}
          />
        )}

        {isEmbedModalOpen && (
          <GoogleSitesEmbedModal
            isOpen={isEmbedModalOpen}
            onClose={() => setIsEmbedModalOpen(false)}
            onShowToast={showToast}
          />
        )}

        {isResetConfirmOpen && (
          <ResetConfirmModal
            isOpen={isResetConfirmOpen}
            onClose={() => setIsResetConfirmOpen(false)}
            onConfirm={handleResetData}
          />
        )}
      </Suspense>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/95 hover:bg-white text-[#502882] shadow-md border border-[#DDD0F6] backdrop-blur-md transition-all active:scale-98 cursor-pointer"
          title="เลื่อนขึ้นด้านบนสุด"
          aria-label="เลื่อนขึ้นด้านบน"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

    </div>
  );
}
