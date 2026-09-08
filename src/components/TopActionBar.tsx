import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  FolderGit2, 
  Send, 
  Menu, 
  X, 
  Search, 
  ArrowRight, 
  GraduationCap, 
  School,
  CornerDownLeft
} from 'lucide-react';
import { Project } from '../types';
import { filterAndRankProjects } from '../utils/searchHelper';

interface TopActionBarProps {
  activeTab: 'home' | 'projects';
  onTabChange: (tab: 'home' | 'projects') => void;
  totalProjectsCount: number;
  onScrollToContact: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  onSearchSubmit?: () => void;
}

export const TopActionBar: React.FC<TopActionBarProps> = ({
  activeTab,
  onTabChange,
  totalProjectsCount,
  onScrollToContact,
  searchQuery,
  onSearchChange,
  projects = [],
  onSelectProject,
  onSearchSubmit,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ตรวจจับระบบปฏิบัติการของผู้ใช้ (Mac หรือ Windows/Linux)
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  // Global Shortcut (⌘K หรือ Ctrl+K) เพื่อโฟกัสช่องค้นหาได้ทันที
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsDropdownOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // คลิกข้างนอกเพื่อปิด Search Popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // กรองและเรียงลำดับผลการค้นหาแบบ Instant Live Search ตามความตรงกัน
  const matchingProjects = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];
    return filterAndRankProjects(projects, q);
  }, [searchQuery, projects]);

  const handleTabClick = (tab: 'home' | 'projects') => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    onScrollToContact();
    setMobileMenuOpen(false);
  };

  const handleProjectSelect = (project: Project) => {
    setIsDropdownOpen(false);
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      onTabChange('projects');
    }
  };

  const handleSubmit = () => {
    setIsDropdownOpen(false);
    if (onSearchSubmit) {
      onSearchSubmit();
    } else {
      onTabChange('projects');
    }
  };

  return (
    <header className="shrink-0 sticky top-0 z-40 w-full bg-gradient-to-r from-[#F0EBFC]/90 via-[#FDF0F7]/92 to-[#EAF3FE]/90 backdrop-blur-2xl border-b border-[#DFCFF7]/80 shadow-[0_4px_24px_-4px_rgba(180,140,230,0.15)] transition-all">
      {/* Animated Dynamic RGB Light Stream Bar with Ambient Glow Effect (ไฟ RGB วิ่งขยับ) */}
      <div className="relative w-full h-[3px] overflow-visible">
        <div className="absolute inset-0 h-full w-full rgb-glow-bar" />
        <div className="relative w-full h-full rgb-light-bar" />
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-10 py-2.5 sm:py-3 flex items-center justify-between gap-3 md:gap-4">
        
        {/* Left: Brand / Avatar Logo with Flowing RGB Ring */}
        <button
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden flex-shrink-0"
          aria-label="ไปยังหน้าหลัก"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl p-[2.5px] rgb-avatar-ring shadow-xs group-hover:shadow-[0_2px_14px_rgba(192,132,252,0.45)] group-hover:scale-105 transition-all flex items-center justify-center flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo Phiraphat"
              className="w-full h-full object-cover rounded-[13px] bg-white"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black bg-gradient-to-r from-[#2B1B47] via-[#5B21B6] to-[#C026D3] bg-clip-text text-transparent tracking-tight group-hover:opacity-90 transition-opacity leading-tight">
              Portfolio
            </span>
            <span className="text-xs text-[#684C8A] font-medium leading-tight">
              Mr.Phiraphat Khodsawat
            </span>
          </div>
        </button>

        {/* Right: The 3 features arranged EXACTLY as in user's image: [Search] [Nav Capsule] [Contact] */}
        <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 flex-shrink-0">
          
          {/* 1. Real Functional Search Bar Component (Desktop & Tablet) */}
          <div className="relative hidden md:block" ref={searchContainerRef}>
            <div 
              className={`group/search relative flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-full backdrop-blur-xl border transition-all duration-300 w-56 sm:w-64 lg:w-72 xl:w-80 ${
                isSearchFocused || isDropdownOpen
                  ? 'bg-white border-[#8F3CDA] ring-4 ring-[#8F3CDA]/20 shadow-[0_4px_22px_-4px_rgba(143,60,218,0.25)]'
                  : 'bg-white/95 border-[#D8C0F7] hover:border-[#9333EA] hover:bg-white hover:shadow-[0_2px_14px_-2px_rgba(147,51,234,0.14)] shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
              }`}
            >
              <Search className={`w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0 transition-all duration-200 ${
                isSearchFocused || searchQuery 
                  ? 'text-[#7C3AED] scale-105' 
                  : 'text-[#966EB8] group-hover/search:text-[#7C3AED]'
              }`} />
              
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => {
                  setIsSearchFocused(true);
                  setIsDropdownOpen(true);
                }}
                onBlur={() => {
                  setIsSearchFocused(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  } else if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                    searchInputRef.current?.blur();
                  }
                }}
                placeholder="ค้นหาผลงาน, นวัตกรรม, สื่อการสอน, ทักษะ.."
                className="w-full bg-transparent border-none outline-none text-xs sm:text-[13px] font-medium text-[#2B1B47] placeholder:text-slate-400/90 placeholder:font-normal"
                aria-label="ค้นหาผลงาน"
              />

              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    onSearchChange('');
                    searchInputRef.current?.focus();
                  }}
                  className="w-4.5 h-4.5 rounded-full bg-slate-100 hover:bg-[#F3ECFD] text-slate-500 hover:text-[#602C97] flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ml-0.5"
                  title="ล้างคำค้นหา"
                >
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <kbd 
                  onClick={() => {
                    searchInputRef.current?.focus();
                    setIsDropdownOpen(true);
                  }}
                  className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10.5px] font-mono font-semibold text-[#652E9B] bg-[#F6EFFE] hover:border-[#C09CF5] rounded-md border border-[#D9C4F7] shadow-[0_1px_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] select-none flex-shrink-0 transition-colors cursor-pointer ml-0.5"
                  title={`กด ${isMac ? '⌘K' : 'Ctrl+K'} เพื่อค้นหา`}
                >
                  {isMac ? '⌘K' : 'Ctrl K'}
                </kbd>
              )}
            </div>

            {/* Instant Live Search Results Popover Dropdown (Opens leftwards to avoid covering Nav) */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 top-full mt-2.5 w-[92vw] sm:w-[480px] lg:w-[540px] max-w-[560px] rounded-2xl bg-white border border-[#E3D4F7] shadow-[0_20px_50px_-10px_rgba(79,40,130,0.2),0_0_0_1px_rgba(227,212,247,0.7)] p-2.5 z-50 overflow-hidden"
                >
                  {searchQuery.trim().length === 0 ? (
                    // Suggested searches when input is empty but opened
                    <div className="p-2.5">
                      <div className="flex items-center justify-between text-xs font-bold mb-3 px-1">
                        <span className="flex items-center gap-1.5 text-[#3B1169]">
                          <span className="text-sm">✨</span>
                          <span>คำค้นหาแนะนำ</span>
                        </span>
                        <span className="text-[11px] text-[#6B4699] font-medium">คลิกเพื่อค้นหาทันที</span>
                      </div>
                      
                      {/* Formatted 4-column balanced grid with high-contrast, ultra-readable typography */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-1">
                        {[
                          { label: 'สื่อการศึกษา', badge: 'EdTech & Game', query: 'การเรียนรู้' },
                          { label: 'ปัญญาประดิษฐ์', badge: 'AI & Vision', query: 'AI' },
                          { label: 'หุ่นยนต์ & IoT', badge: 'Robotics', query: 'หุ่นยนต์' },
                          { label: 'เทคโนโลยีผู้พิการ', badge: 'Assistive Tech', query: 'ผู้พิการ' },
                          { label: 'แอปพลิเคชัน', badge: 'Flutter & Web', query: 'แอปพลิเคชัน' },
                          { label: 'นวัตกรรมสิ่งแวดล้อม', badge: 'Green Tech', query: 'สิ่งแวดล้อม' },
                          { label: 'ระดับมหาวิทยาลัย', badge: 'University', query: 'มหาวิทยาลัย' },
                          { label: 'ระดับมัธยมปลาย', badge: 'High School', query: 'มัธยมปลาย' }
                        ].map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => {
                              onSearchChange(item.query);
                              searchInputRef.current?.focus();
                            }}
                            className="p-3 rounded-xl text-left bg-gradient-to-br from-[#FAF6FE] via-[#FFF8FC] to-[#F3F8FE] hover:from-[#F3EAFF] hover:via-[#FCE7F3] hover:to-[#E5F0FE] border border-[#DEC8F8] hover:border-[#9333EA] shadow-2xs hover:shadow-[0_4px_14px_-2px_rgba(147,51,234,0.18)] hover:-translate-y-0.5 active:scale-98 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                          >
                            <span className="text-[13px] font-extrabold text-[#2A0845] group-hover:text-[#652E9B] transition-colors leading-tight">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-[#55278D] group-hover:text-[#3B1169] font-semibold mt-1.5 leading-tight transition-colors">
                              {item.badge}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Live filtered search results
                    <>
                      <div className="flex items-center justify-between px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-slate-100 mb-1">
                        <span>ผลการค้นหา ({matchingProjects.length})</span>
                        <span>คลิกเพื่อดูรายละเอียด</span>
                      </div>

                      {matchingProjects.length > 0 ? (
                        <div className="max-h-[320px] overflow-y-auto space-y-1 p-1">
                          {matchingProjects.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleProjectSelect(p)}
                              className="w-full text-left p-2.5 rounded-xl hover:bg-[#FAF6FE] border border-transparent hover:border-[#DFCFF7] transition-all flex items-center justify-between gap-3 group cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                                  <img 
                                    src={p.imageUrl} 
                                    alt={p.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#652E9B] truncate transition-colors">
                                    {p.title}
                                  </p>
                                  <p className="text-[11px] text-slate-500 truncate">
                                    {p.shortDescription}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                  p.category === 'university'
                                    ? 'bg-[#EAF1FE] text-[#1B4B85] border-[#BED8FC]'
                                    : 'bg-[#FDE7F2] text-[#862557] border-[#F8BCD5]'
                                }`}>
                                  {p.category === 'university' ? 'มหาวิทยาลัย' : 'มัธยมปลาย'}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#652E9B] group-hover:translate-x-0.5 transition-all" />
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="py-7 px-4 text-center">
                          <Search className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
                          <p className="text-xs font-bold text-slate-700">ไม่พบผลงานที่ตรงกับ "{searchQuery}"</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">ลองค้นหาด้วยคำสำคัญอื่น เช่น สื่อการสอน, Flutter, Arduino, วิจัย, IoT</p>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. Desktop & Tablet Navigation Segmented Control in Pastel Capsule */}
          <nav 
            role="tablist"
            aria-label="เมนูหลัก"
            className="hidden md:flex items-center p-1 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#DCC5F8] shadow-[0_2px_12px_-2px_rgba(147,51,234,0.12)] gap-1 flex-shrink-0"
          >
            {/* แท็บหน้าหลัก */}
            <button
              role="tab"
              aria-selected={activeTab === 'home'}
              onClick={() => handleTabClick('home')}
              className={`relative px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer z-10 ${
                activeTab === 'home'
                  ? 'text-[#4A187A] font-bold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40 font-medium'
              }`}
            >
              {activeTab === 'home' && (
                <motion.div
                  layoutId="active-nav-card"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-[#FAF6FE] to-white border border-[#D8BEF8] shadow-[0_2px_8px_-1px_rgba(127,63,168,0.14),0_1px_3px_rgba(0,0,0,0.04)] -z-10"
                  transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                />
              )}
              <Home className={`w-4 h-4 transition-colors ${activeTab === 'home' ? 'text-[#652E9B]' : 'text-slate-400'}`} />
              <span>หน้าหลัก</span>
              {activeTab === 'home' && (
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F472B6]" />
              )}
            </button>

            {/* แท็บผลงาน */}
            <button
              role="tab"
              aria-selected={activeTab === 'projects'}
              onClick={() => handleTabClick('projects')}
              className={`relative px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer z-10 ${
                activeTab === 'projects'
                  ? 'text-[#4A187A] font-bold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40 font-medium'
              }`}
            >
              {activeTab === 'projects' && (
                <motion.div
                  layoutId="active-nav-card"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-[#FAF6FE] to-white border border-[#D8BEF8] shadow-[0_2px_8px_-1px_rgba(127,63,168,0.14),0_1px_3px_rgba(0,0,0,0.04)] -z-10"
                  transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                />
              )}
              <FolderGit2 className={`w-4 h-4 transition-colors ${activeTab === 'projects' ? 'text-[#652E9B]' : 'text-slate-400'}`} />
              <span>ผลงาน</span>
              {activeTab === 'projects' && (
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F472B6]" />
              )}
              <span className={`ml-0.5 px-2 py-0.5 rounded-md text-[11px] font-semibold font-mono tracking-tight transition-colors ${
                activeTab === 'projects' 
                  ? 'bg-gradient-to-r from-[#F4EDFD] to-[#FDF0F7] text-[#55278D] border border-[#DFC7F8]' 
                  : 'bg-slate-100 text-slate-500 border border-slate-200/60'
              }`}>
                {totalProjectsCount}
              </span>
            </button>
          </nav>

          {/* Contact Button (Desktop & Tablet) - วางเคียงข้างแท็บนำทางในโซน Action ชัดเจน */}
          <div className="hidden sm:flex items-center flex-shrink-0">
            <button
              onClick={handleContactClick}
              className="relative overflow-hidden inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-2 rounded-full text-xs sm:text-sm font-bold text-white rgb-button-flow border border-white/35 hover:scale-[1.03] active:scale-95 cursor-pointer group flex-shrink-0 shadow-xs"
            >
              {/* Subtle Glossy Glass Reflection Highlight */}
              <div className="absolute top-0 inset-x-0 h-[45%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-full" />
              
              <Send className="w-3.5 h-3.5 text-white/95 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 relative z-10" />
              <span className="relative z-10 tracking-tight">ติดต่อฉัน</span>
            </button>
          </div>

          {/* Mobile Hamburger Icon Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-2xl bg-white/90 border border-[#DFCFF7] text-[#48207E] shadow-2xs hover:bg-white active:scale-95 transition-all cursor-pointer focus:outline-hidden"
              aria-label={mobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#48207E]" />
              ) : (
                <Menu className="w-5 h-5 text-[#48207E]" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-[#E6D9F7]/70 bg-white/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2.5 shadow-xl"
          >
            {/* Mobile Functional Search Input */}
            <div className="relative mb-2">
              <Search className="w-4 h-4 text-[#7E4BC4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                    setMobileMenuOpen(false);
                  }
                }}
                placeholder="ค้นหาผลงาน, นวัตกรรม, สื่อการสอน, ทักษะ..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white/95 border border-[#E0D2F8] text-xs font-medium text-[#2B1B47] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#773CA8]/25 focus:border-[#773CA8] shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="w-5 h-5 rounded-full bg-slate-100 hover:bg-[#F3ECFD] text-slate-500 hover:text-[#602C97] absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* แท็บหน้าหลัก */}
            <button
              onClick={() => handleTabClick('home')}
              className={`w-full px-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
                  : 'text-slate-600 hover:bg-[#FAF6FE] hover:text-[#48207E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${activeTab === 'home' ? 'bg-[#F4ECFD] text-[#652E9B]' : 'bg-slate-100 text-slate-500'}`}>
                  <Home className="w-4 h-4" />
                </div>
                <span>หน้าหลัก</span>
              </div>
              {activeTab === 'home' && (
                <span className="w-2 h-2 rounded-full bg-[#652E9B]" />
              )}
            </button>

            {/* แท็บผลงาน */}
            <button
              onClick={() => handleTabClick('projects')}
              className={`w-full px-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-white text-slate-900 border border-slate-200 shadow-xs'
                  : 'text-slate-600 hover:bg-[#FAF6FE] hover:text-[#48207E]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${activeTab === 'projects' ? 'bg-[#F4ECFD] text-[#652E9B]' : 'bg-slate-100 text-slate-500'}`}>
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <span>ผลงาน</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold font-mono ${
                activeTab === 'projects' ? 'bg-[#F4ECFD] text-[#55278D] border border-[#E3D2F7]' : 'bg-slate-100 text-slate-600 border border-slate-200/60'
              }`}>
                {totalProjectsCount} ผลงาน
              </span>
            </button>

            {/* ปุ่มติดต่อฉัน ในเมนูมือถือ - มีไฟ RGB Flow วิ่งขยับเนียนสมูทระดับพรีเมียม */}
            <div className="pt-2">
              <button
                onClick={handleContactClick}
                className="relative overflow-hidden w-full py-3 px-4 rounded-2xl text-sm font-bold text-white rgb-button-flow border border-white/35 flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                {/* Subtle Glossy Glass Reflection Highlight */}
                <div className="absolute top-0 inset-x-0 h-[45%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-2xl" />

                <Send className="w-4 h-4 text-white relative z-10" />
                <span className="relative z-10">ช่องทางการติดต่อ</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};
