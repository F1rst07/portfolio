import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  Upload, 
  Image as ImageIcon, 
  School, 
  GraduationCap, 
  Sliders, 
  FileText, 
  ExternalLink,
  HelpCircle,
  MoveRight,
  CheckCircle2
} from 'lucide-react';
import { PortfolioData, Project, HeroConfig, CategoryConfig } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { formatImageUrl } from '../utils/imageHelper';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (updatedData: PortfolioData, silent?: boolean) => void;
  onResetToDefault: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onResetToDefault
}) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'categories' | 'highschool' | 'university'>('university');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const prevIsOpenRef = useRef(false);

  // Sync state ONLY when modal opens (transition from closed to open)
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      setFormData(JSON.parse(JSON.stringify(data)));
      const firstUni = data.projects.find(p => p.category === 'university');
      const firstHS = data.projects.find(p => p.category === 'highschool');
      if (firstUni) {
        setSelectedProjectId(firstUni.id);
        setActiveTab('university');
      } else if (firstHS) {
        setSelectedProjectId(firstHS.id);
        setActiveTab('highschool');
      }
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, data]);

  if (!isOpen) return null;

  // Helper to commit state both locally and to parent (instant auto-save)
  const commitUpdate = (newFormData: PortfolioData) => {
    setFormData(newFormData);
    onSave(newFormData, true);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  // Handlers for Hero configuration
  const handleHeroChange = (field: keyof HeroConfig, value: string) => {
    const updated: PortfolioData = {
      ...formData,
      hero: {
        ...formData.hero,
        [field]: value
      }
    };
    commitUpdate(updated);
  };

  // Handlers for Category configuration
  const handleCategoryChange = (field: keyof CategoryConfig, value: string) => {
    const updated: PortfolioData = {
      ...formData,
      categories: {
        ...formData.categories,
        [field]: value
      }
    };
    commitUpdate(updated);
  };

  // Filter projects by active tab category
  const hsProjects = formData.projects.filter(p => p.category === 'highschool');
  const uniProjects = formData.projects.filter(p => p.category === 'university');

  const currentCategoryProjects = activeTab === 'highschool' ? hsProjects : uniProjects;
  // Ensure activeProject strictly belongs to currentCategoryProjects to prevent cross-category stale display
  const activeProject = currentCategoryProjects.find(p => p.id === selectedProjectId) || currentCategoryProjects[0] || null;

  // Project CRUD
  const handleAddProject = (category: 'highschool' | 'university') => {
    const newId = `${category}-${Date.now()}`;
    const newProject: Project = {
      id: newId,
      title: category === 'highschool' ? 'ผลงานใหม่ (ระดับมัธยม)' : 'ผลงานใหม่ (ระดับมหาวิทยาลัย)',
      shortDescription: 'คำอธิบายสั้นๆ เกี่ยวกับผลงานนี้ สรุปจุดเด่นและสิ่งที่ทำ',
      fullDescription: 'รายละเอียดเนื้อหาของผลงาน วัตถุประสงค์ และผลลัพธ์ที่ได้จากการลงมือทำ...',
      category: category,
      year: category === 'highschool' ? '2567 (มัธยมศึกษาปีที่ 5)' : '2567 (ชั้นปีที่ 2)',
      projectType: 'Educational Technology',
      myRole: 'ผู้ออกแบบและพัฒนา',
      tools: ['Canva', 'Google Sites'],
      learned: 'ได้ฝึกทักษะการออกแบบสื่อและการคิดเชิงตรรกะ',
      skills: ['Instructional Design', 'Creative Thinking'],
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop',
      projectUrl: '',
      buttonText: 'เปิดผลงาน'
    };

    const updated: PortfolioData = {
      ...formData,
      projects: [newProject, ...formData.projects]
    };
    commitUpdate(updated);
    setSelectedProjectId(newId);
  };

  const handleDuplicateProject = (projectId: string) => {
    const target = formData.projects.find(p => p.id === projectId);
    if (!target) return;

    const duplicated: Project = {
      ...JSON.parse(JSON.stringify(target)),
      id: `${target.category}-${Date.now()}`,
      title: `${target.title} (สำเนา)`
    };

    const targetIdx = formData.projects.findIndex(p => p.id === projectId);
    const newProjects = [...formData.projects];
    newProjects.splice(targetIdx + 1, 0, duplicated);

    const updated: PortfolioData = { ...formData, projects: newProjects };
    commitUpdate(updated);
    setSelectedProjectId(duplicated.id);
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = formData.projects.filter(p => p.id !== projectId);
    const updated: PortfolioData = { ...formData, projects: updatedProjects };
    commitUpdate(updated);
    
    const remaining = updatedProjects.filter(p => 
      activeTab === 'highschool' ? p.category === 'highschool' : p.category === 'university'
    );
    setSelectedProjectId(remaining.length > 0 ? remaining[0].id : null);
  };

  const handleProjectFieldChange = (projectId: string, field: keyof Project, value: any) => {
    const updatedProjects = formData.projects.map(p => {
      if (p.id === projectId) {
        return { ...p, [field]: value };
      }
      return p;
    });
    const updated: PortfolioData = { ...formData, projects: updatedProjects };
    commitUpdate(updated);
  };

  const handleProjectFieldsChange = (projectId: string, fields: Partial<Project>) => {
    const updatedProjects = formData.projects.map(p => {
      if (p.id === projectId) {
        return { ...p, ...fields };
      }
      return p;
    });
    const updated: PortfolioData = { ...formData, projects: updatedProjects };
    commitUpdate(updated);
  };

  // Move project up or down within category
  const handleMoveProject = (projectId: string, direction: 'up' | 'down') => {
    const category = activeTab === 'highschool' ? 'highschool' : 'university';
    const catList = formData.projects.filter(p => p.category === category);
    const indexInCat = catList.findIndex(p => p.id === projectId);

    if (direction === 'up' && indexInCat > 0) {
      const prevProj = catList[indexInCat - 1];
      const fullList = [...formData.projects];
      const i1 = fullList.findIndex(p => p.id === projectId);
      const i2 = fullList.findIndex(p => p.id === prevProj.id);
      [fullList[i1], fullList[i2]] = [fullList[i2], fullList[i1]];
      const updated: PortfolioData = { ...formData, projects: fullList };
      commitUpdate(updated);
    } else if (direction === 'down' && indexInCat < catList.length - 1) {
      const nextProj = catList[indexInCat + 1];
      const fullList = [...formData.projects];
      const i1 = fullList.findIndex(p => p.id === projectId);
      const i2 = fullList.findIndex(p => p.id === nextProj.id);
      [fullList[i1], fullList[i2]] = [fullList[i2], fullList[i1]];
      const updated: PortfolioData = { ...formData, projects: fullList };
      commitUpdate(updated);
    }
  };

  // Switch project category
  const handleSwitchCategory = (projectId: string, targetCat: 'highschool' | 'university') => {
    const updatedProjects = formData.projects.map(p => {
      if (p.id === projectId) {
        return { ...p, category: targetCat };
      }
      return p;
    });
    const updated: PortfolioData = { ...formData, projects: updatedProjects };
    commitUpdate(updated);
    setActiveTab(targetCat);
  };

  // Image Upload handler with compression
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Auto compress image so it easily fits in localStorage
      const compressedBase64 = await compressImageFile(file, 1200, 1200, 0.82);
      if (projectId) {
        handleProjectFieldChange(projectId, 'imageUrl', compressedBase64);
      } else {
        handleHeroChange('heroImageUrl', compressedBase64);
      }
    } catch (err) {
      console.error('Error compressing image', err);
      // Fallback to normal FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (projectId) {
          handleProjectFieldChange(projectId, 'imageUrl', base64String);
        } else {
          handleHeroChange('heroImageUrl', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData, false);
    onClose();
  };

  return (
    <div 
      id="modal-edit-content-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-purple-100 flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Modal Top Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-b border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-800">
                  แก้ไขข้อมูลเว็บไซต์ (Edit Content)
                </h2>
                {isSavedRecently && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700 animate-fade-in">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>บันทึกแล้ว</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                ปรับแต่งข้อความ หมวดหมู่ และผลงานต่างๆ ระบบบันทึกอัตโนมัติแบบเรียลไทม์
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-xl transition-colors cursor-pointer"
            aria-label="ปิดหน้าต่างแก้ไข"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 pt-3 pb-2 border-b border-[#EBE3F7] bg-white overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-[#EFE7FD] text-[#4E2982] border border-[#DBC9F7] shadow-2xs'
                : 'text-slate-600 hover:text-[#4E2982] hover:bg-[#F8F4FD]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#7A4AC2]" />
            <span>1. ข้อมูลหน้าหลัก (Hero)</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-[#EFE7FD] text-[#4E2982] border border-[#DBC9F7] shadow-2xs'
                : 'text-slate-600 hover:text-[#4E2982] hover:bg-[#F8F4FD]'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#7A4AC2]" />
            <span>2. ตั้งค่าหมวดหมู่ (Categories)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('highschool');
              if (hsProjects.length > 0) setSelectedProjectId(hsProjects[0].id);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'highschool'
                ? 'bg-[#FDE7F2] text-[#862557] border border-[#F8C1D9] shadow-2xs'
                : 'text-slate-600 hover:text-[#862557] hover:bg-[#FDF2F7]'
            }`}
          >
            <School className="w-4 h-4 text-[#A83870]" />
            <span>3. ผลงานมัธยมปลาย ({hsProjects.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('university');
              if (uniProjects.length > 0) setSelectedProjectId(uniProjects[0].id);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'university'
                ? 'bg-[#EAF1FE] text-[#1E4B85] border border-[#CBDFFD] shadow-2xs'
                : 'text-slate-600 hover:text-[#1E4B85] hover:bg-[#F3F7FE]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#2E60A3]" />
            <span>4. ผลงานมหาวิทยาลัย ({uniProjects.length})</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          
          {/* TAB 1: HERO & GENERAL INFO */}
          {activeTab === 'hero' && (
            <div className="max-w-3xl mx-auto space-y-5 bg-white p-5 sm:p-7 rounded-2xl border border-purple-100 shadow-xs">
              <div className="pb-3 border-b border-purple-100">
                <h3 className="font-bold text-slate-800 text-base">ปรับแต่งข้อความส่วน Hero Banner</h3>
                <p className="text-xs text-slate-500">ข้อมูลส่วนหัวเว็บไซต์และข้อมูลเจ้าของพอร์ตโฟลิโอ</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">หัวข้อหลักภาษาอังกฤษ (Main Heading)</label>
                  <input
                    type="text"
                    value={formData.hero.mainHeading}
                    onChange={(e) => handleHeroChange('mainHeading', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-300 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">หัวข้อภาษาไทย (Thai Subheading)</label>
                  <input
                    type="text"
                    value={formData.hero.thaiSubheading}
                    onChange={(e) => handleHeroChange('thaiSubheading', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ข้อความแนะนำตัว / คำอธิบาย (Intro Description)</label>
                <textarea
                  rows={3}
                  value={formData.hero.description}
                  onChange={(e) => handleHeroChange('description', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 focus:border-purple-300 text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อภาษาอังกฤษ (Owner Name)</label>
                  <input
                    type="text"
                    value={formData.hero.ownerName}
                    onChange={(e) => handleHeroChange('ownerName', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อภาษาไทย</label>
                  <input
                    type="text"
                    value={formData.hero.ownerThaiName}
                    onChange={(e) => handleHeroChange('ownerThaiName', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อเล่น (Nickname)</label>
                  <input
                    type="text"
                    value={formData.hero.ownerNickname}
                    onChange={(e) => handleHeroChange('ownerNickname', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">สาขาวิชา / ทักษะความเชี่ยวชาญ (Major / Field of Study)</label>
                <input
                  type="text"
                  value={formData.hero.ownerMajor}
                  onChange={(e) => handleHeroChange('ownerMajor', e.target.value)}
                  placeholder="เช่น Computer Education (เทคโนโลยีการศึกษา/คอมพิวเตอร์ศึกษา)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-purple-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ข้อความปุ่มเลื่อนดูผลงาน (Primary Button)</label>
                  <input
                    type="text"
                    value={formData.hero.primaryButtonText}
                    onChange={(e) => handleHeroChange('primaryButtonText', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ข้อความป้าย Badge บนสุด</label>
                  <input
                    type="text"
                    value={formData.hero.badgeText}
                    onChange={(e) => handleHeroChange('badgeText', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CATEGORY SETTINGS */}
          {activeTab === 'categories' && (
            <div className="max-w-3xl mx-auto space-y-5 bg-white p-5 sm:p-7 rounded-2xl border border-purple-100 shadow-xs">
              <div className="pb-3 border-b border-purple-100">
                <h3 className="font-bold text-slate-800 text-base">ตั้งค่าชื่อหมวดหมู่ผลงาน (Category Settings)</h3>
                <p className="text-xs text-slate-500">ปรับแต่งชื่อและป้ายกำกับของแต่ละหมวดหมู่ตามต้องการ</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-4">
                <h4 className="font-semibold text-purple-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-purple-600" />
                  <span>ปุ่มผลงานทั้งหมด (All Projects Button)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ข้อความปุ่มภาษาไทย</label>
                    <input
                      type="text"
                      value={formData.categories.allLabel}
                      onChange={(e) => handleCategoryChange('allLabel', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ข้อความภาษาอังกฤษ</label>
                    <input
                      type="text"
                      value={formData.categories.allLabelEn}
                      onChange={(e) => handleCategoryChange('allLabelEn', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-4">
                <h4 className="font-semibold text-pink-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <School className="w-4 h-4 text-pink-600" />
                  <span>หมวดหมู่ 1: ช่วงมัธยมศึกษาตอนปลาย (High School)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อหมวดหมู่ภาษาไทย</label>
                    <input
                      type="text"
                      value={formData.categories.highSchoolName}
                      onChange={(e) => handleCategoryChange('highSchoolName', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อภาษาอังกฤษ (English Label)</label>
                    <input
                      type="text"
                      value={formData.categories.highSchoolEn}
                      onChange={(e) => handleCategoryChange('highSchoolEn', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                <h4 className="font-semibold text-indigo-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>หมวดหมู่ 2: ช่วงระดับมหาวิทยาลัย (University)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อหมวดหมู่ภาษาไทย</label>
                    <input
                      type="text"
                      value={formData.categories.universityName}
                      onChange={(e) => handleCategoryChange('universityName', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อภาษาอังกฤษ (English Label)</label>
                    <input
                      type="text"
                      value={formData.categories.universityEn}
                      onChange={(e) => handleCategoryChange('universityEn', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3 & 4: PROJECT MANAGEMENT (High School or University) */}
          {(activeTab === 'highschool' || activeTab === 'university') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Projects List & Reorder Controls */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    รายการผลงาน ({currentCategoryProjects.length})
                  </span>
                  <button
                    onClick={() => handleAddProject(activeTab)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 shadow-2xs active:scale-97 cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เพิ่มผลงาน</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {currentCategoryProjects.length === 0 ? (
                    <div className="p-6 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400 text-xs">
                      ยังไม่มีผลงานในหมวดหมู่นี้ คลิก "เพิ่มผลงาน" เพื่อสร้างรายการแรก
                    </div>
                  ) : (
                    currentCategoryProjects.map((p, idx) => {
                      const isSelected = p.id === (activeProject ? activeProject.id : null);
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedProjectId(p.id)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-purple-50/90 border-purple-300 shadow-2xs'
                              : 'bg-white border-slate-200/80 hover:border-purple-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden flex-1">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <img
                                src={formatImageUrl(p.imageUrl)}
                                alt={p.title}
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%23EEE"/></svg>'; }}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                                {p.title || 'Untitled Project'}
                              </p>
                              <span className="text-[10px] text-slate-500 truncate block mt-0.5">
                                {p.year || '-'} • {p.projectType || 'General'}
                              </span>
                            </div>
                          </div>

                          {/* Reorder and Delete Buttons */}
                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleMoveProject(p.id, 'up')}
                              disabled={idx === 0}
                              className="p-1 rounded-lg text-slate-400 hover:text-purple-700 hover:bg-purple-100 disabled:opacity-20 cursor-pointer"
                              title="เลื่อนขึ้น"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoveProject(p.id, 'down')}
                              disabled={idx === currentCategoryProjects.length - 1}
                              className="p-1 rounded-lg text-slate-400 hover:text-purple-700 hover:bg-purple-100 disabled:opacity-20 cursor-pointer"
                              title="เลื่อนลง"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                              title="ลบผลงานนี้"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Selected Project Edit Form */}
              <div className="lg:col-span-8">
                {activeProject ? (
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-purple-100 shadow-xs space-y-4">
                    
                    {/* Project Top Actions: Switch Category, Duplicate, Delete */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-purple-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-900">แก้ไขข้อมูลผลงาน</span>
                        {/* Switch Category Button */}
                        <button
                          onClick={() => handleSwitchCategory(
                            activeProject.id, 
                            activeProject.category === 'highschool' ? 'university' : 'highschool'
                          )}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200 cursor-pointer"
                          title="ย้ายไปยังอีกหมวดหมู่"
                        >
                          <MoveRight className="w-3 h-3" />
                          <span>ย้ายไปหมวด {activeProject.category === 'highschool' ? 'มหาวิทยาลัย' : 'มัธยมปลาย'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDuplicateProject(activeProject.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 cursor-pointer"
                          title="คัดลอกสร้างสำเนา"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>คัดลอก</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProject(activeProject.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                          title="ลบผลงานนี้"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>ลบผลงาน</span>
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">ชื่อผลงาน (Project Title)</label>
                        <input
                          type="text"
                          value={activeProject.title}
                          onChange={(e) => handleProjectFieldChange(activeProject.id, 'title', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">ปี / ภาคการศึกษา (Year)</label>
                        <input
                          type="text"
                          value={activeProject.year}
                          onChange={(e) => handleProjectFieldChange(activeProject.id, 'year', e.target.value)}
                          placeholder="เช่น 2567 หรือ ม.6"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ประเภทผลงาน (Project Type Tag)</label>
                      <input
                        type="text"
                        value={activeProject.projectType}
                        onChange={(e) => handleProjectFieldChange(activeProject.id, 'projectType', e.target.value)}
                        placeholder="เช่น Website, AI, 3D Design, Computer Education"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">คำอธิบายผลงาน (Project Description)</label>
                      <textarea
                        rows={3}
                        value={activeProject.shortDescription}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleProjectFieldsChange(activeProject.id, {
                            shortDescription: val,
                            fullDescription: val
                          });
                        }}
                        placeholder="สรุปเนื้อหา จุดเด่น และรายละเอียดของผลงานนี้..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                      />
                    </div>

                    {/* Role & What Learned */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">บทบาทหน้าที่ (My Role)</label>
                        <input
                          type="text"
                          value={activeProject.myRole || ''}
                          onChange={(e) => handleProjectFieldChange(activeProject.id, 'myRole', e.target.value)}
                          placeholder="เช่น ผู้ออกแบบระบบและพัฒนา, หัวหน้าทีม..."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">สิ่งที่ได้เรียนรู้และพัฒนา (What I Learned)</label>
                        <input
                          type="text"
                          value={activeProject.learned || ''}
                          onChange={(e) => handleProjectFieldChange(activeProject.id, 'learned', e.target.value)}
                          placeholder="เช่น ได้พัฒนาทักษะการคิดเชิงคำนวณและการเขียนโปรแกรม..."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Image Upload & URL */}
                    <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-purple-900">รูปภาพหน้าปกผลงาน (Project Cover Image)</label>
                        <span className="text-[11px] font-medium text-purple-600 bg-purple-100/80 px-2 py-0.5 rounded-md">
                          รองรับลิงก์ Google Drive
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        {/* Image Preview */}
                        <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-purple-200 shadow-2xs">
                          <img
                            src={formatImageUrl(activeProject.imageUrl)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="64"><rect width="96" height="64" fill="%23EEE"/></svg>'; }}
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Direct File Upload & URL Input */}
                        <div className="flex-1 w-full space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-purple-700 text-xs font-semibold hover:bg-purple-50 cursor-pointer shadow-2xs transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>อัปโหลดรูปภาพจากเครื่อง</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageFileUpload(e, activeProject.id)}
                              />
                            </label>

                            {activeProject.imageUrl && (
                              <button
                                onClick={() => handleProjectFieldChange(activeProject.id, 'imageUrl', '')}
                                className="text-xs text-rose-500 hover:text-rose-700 underline cursor-pointer"
                              >
                                ลบรูปภาพ
                              </button>
                            )}
                          </div>

                          <input
                            type="text"
                            value={activeProject.imageUrl}
                            onChange={(e) => handleProjectFieldChange(activeProject.id, 'imageUrl', e.target.value)}
                            placeholder="หรือวางลิงก์รูปภาพ (เช่น https://drive.google.com/file/d/... หรือ URL ทั่วไป)..."
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-purple-400"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        💡 <strong>วิธีใช้รูปจาก Google Drive :</strong> อัปโหลดภาพลง Google Drive &rarr; ตั้งค่าแชร์เป็น <em>"ทุกคนที่มีลิงก์ (Anyone with the link)"</em> &rarr; คัดลอกลิงก์มาวางในช่องนี้ได้เลย ระบบจะแปลงภาพแสดงผลอัตโนมัติ
                      </p>
                    </div>

                    {/* Tools and Skills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">เครื่องมือที่ใช้ (คั่นด้วยเครื่องหมายจุลภาค ,)</label>
                        <input
                          type="text"
                          value={activeProject.tools.join(', ')}
                          onChange={(e) => handleProjectFieldChange(
                            activeProject.id, 
                            'tools', 
                            e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          )}
                          placeholder="เช่น Canva, React, Tinkercad"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">ทักษะที่เกี่ยวข้อง (คั่นด้วยเครื่องหมายจุลภาค ,)</label>
                        <input
                          type="text"
                          value={activeProject.skills.join(', ')}
                          onChange={(e) => handleProjectFieldChange(
                            activeProject.id, 
                            'skills', 
                            e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          )}
                          placeholder="เช่น Web Design, STEM, Presentation"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* External URL & Button text */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-purple-100">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">ลิงก์เปิดผลงานภายนอก (Project URL - ถ้ามี)</label>
                        <input
                          type="text"
                          value={activeProject.projectUrl || ''}
                          onChange={(e) => handleProjectFieldChange(activeProject.id, 'projectUrl', e.target.value)}
                          placeholder="เช่น https://sites.google.com หรือ https://github.com..."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">ข้อความบนปุ่มลิงก์</label>
                        <input
                          type="text"
                          value={activeProject.buttonText || 'เปิดผลงาน'}
                          onChange={(e) => handleProjectFieldChange(activeProject.id, 'buttonText', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="h-full min-h-[300px] flex items-center justify-center p-8 bg-white rounded-2xl border border-dashed border-slate-300 text-center">
                    <p className="text-sm text-slate-500">เลือกผลงานจากรายการทางซ้ายมือ หรือคลิก "เพิ่มผลงาน"</p>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-4 bg-white border-t border-purple-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const jsonStr = JSON.stringify(formData, null, 2);
                navigator.clipboard.writeText(jsonStr);
                alert("คัดลอกข้อมูล JSON เรียบร้อยแล้ว! ✨\n\nคุณสามารถวาง (Paste) ส่งให้ AI ในช่องแชท เพื่อให้ AI บันทึกผลงานจริงลงในโค้ดหลักได้ถาวรทันที (เพื่อให้แสดงใน Google Sites ตลอดไป)");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
              title="คัดลอกข้อมูลทั้งหมดเพื่อส่งให้ AI บันทึกลงโค้ดถาวรสำหรับ Google Sites"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>คัดลอก JSON ส่งให้ AI</span>
            </button>

            <button
              onClick={() => {
                onResetToDefault();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>คืนค่าเริ่มต้น (Reset)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#6D204A] bg-[#FDE5F0] hover:bg-[#FCD3E5] border border-[#F6BCD6] shadow-2xs active:scale-98 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#8F2B64]" />
              <span>บันทึกการเปลี่ยนแปลง</span>
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
