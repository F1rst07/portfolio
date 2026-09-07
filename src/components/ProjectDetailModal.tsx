import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Calendar, 
  UserCheck, 
  Wrench, 
  Lightbulb, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  School, 
  GraduationCap, 
  Tag 
} from 'lucide-react';
import { Project, CategoryConfig } from '../types';
import { formatImageUrl, getGoogleDriveFallbackUrl } from '../utils/imageHelper';

interface ProjectDetailModalProps {
  project: Project | null;
  categories: CategoryConfig;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  categories,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false
}) => {
  // Lock body scroll when modal is open and handle ESC / Arrow keys
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!project) return null;

  const isHighSchool = project.category === 'highschool';
  const categoryLabel = isHighSchool
    ? (categories.highSchoolName || 'ช่วงมัธยมศึกษาตอนปลาย')
    : (categories.universityName || 'ช่วงระดับมหาวิทยาลัย');

  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="${isHighSchool ? '%23FFE8F2' : '%23EEE9FF'}"/><circle cx="400" cy="220" r="80" fill="${isHighSchool ? '%23F472B6' : '%23A78BFA'}" opacity="0.3"/><text x="50%" y="360" font-family="sans-serif" font-size="24" font-weight="bold" fill="%236B7280" text-anchor="middle">Project Showcase</text></svg>`;

  const primaryUrl = formatImageUrl(project.imageUrl);
  const driveFallbackUrl = getGoogleDriveFallbackUrl(project.imageUrl);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (driveFallbackUrl && target.src !== driveFallbackUrl) {
      target.src = driveFallbackUrl;
    } else {
      target.src = fallbackSvg;
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="modal-project-detail-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl sm:rounded-[32px] shadow-xl border border-[#EBE3F7] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Navigation & Close */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-[#EBE3F7] z-10 sticky top-0">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isHighSchool
                  ? 'bg-[#FDE7F2] text-[#862557] border border-[#F8C1D9]'
                  : 'bg-[#EAF1FE] text-[#1E4B85] border border-[#CBDFFD]'
              }`}>
                {isHighSchool ? <School className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                <span>{categoryLabel}</span>
              </span>

              {project.year && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F7F4FD] text-[#552E8C] border border-[#E8DEF8]">
                  <Calendar className="w-3 h-3 text-[#7E4BC4]" />
                  <span>{project.year}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {/* Prev / Next controls */}
              {onPrev && (
                <button
                  id="btn-prev-project"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className="p-1.5 rounded-xl text-slate-500 hover:text-[#552E8C] hover:bg-[#F3ECFD] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="ผลงานก่อนหน้า (ลูกศรซ้าย)"
                  aria-label="ผลงานก่อนหน้า"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {onNext && (
                <button
                  id="btn-next-project"
                  onClick={onNext}
                  disabled={!hasNext}
                  className="p-1.5 rounded-xl text-slate-500 hover:text-[#552E8C] hover:bg-[#F3ECFD] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="ผลงานถัดไป (ลูกศรขวา)"
                  aria-label="ผลงานถัดไป"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Close Button */}
              <button
                id="btn-close-project-detail"
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
                title="ปิดหน้าต่าง (ESC)"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
            
            {/* Full-size cover image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-50 border border-[#EBE3F7] shadow-inner">
              <img
                src={primaryUrl || fallbackSvg}
                alt={project.title}
                onError={handleImageError}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Project Header */}
            <div>
              {project.projectType && (
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold text-[#502882] bg-[#F5ECFD] border border-[#E4D5F8] mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#7E4BC4]" />
                  <span>{project.projectType}</span>
                </div>
              )}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#281842] leading-snug">
                {project.title}
              </h2>
            </div>

            {/* Full Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F3FE] border border-[#E8DEF8]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#522986] mb-2">
                รายละเอียดผลงาน
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {project.fullDescription || project.shortDescription}
              </p>
            </div>

            {/* Role & What Learned Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* My Role */}
              {project.myRole && (
                <div className="p-4 rounded-2xl bg-[#FDF2F7] border border-[#F9D0E3] flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A2459] mb-2">
                    <UserCheck className="w-4 h-4 text-[#A83870]" />
                    <span>บทบาทหน้าที่ของฉัน</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.myRole}
                  </p>
                </div>
              )}

              {/* What I Learned */}
              {project.learned && (
                <div className="p-4 rounded-2xl bg-[#F0F6FE] border border-[#D3E3FC] flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B467E] mb-2">
                    <Lightbulb className="w-4 h-4 text-[#2E60A3]" />
                    <span>สิ่งที่ได้เรียนรู้และพัฒนา</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {project.learned}
                  </p>
                </div>
              )}

            </div>

            {/* Tools Used */}
            {project.tools && project.tools.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
                  <Wrench className="w-3.5 h-3.5 text-[#7E4BC4]" />
                  <span>เครื่องมือและเทคโนโลยีที่ใช้</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-[#F4ECFD] text-[#4E2882] text-xs sm:text-sm font-semibold border border-[#E0D3F8] shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Acquired */}
            {project.skills && project.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ทักษะที่เกี่ยวข้อง</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-medium border border-emerald-200"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-5 py-4 bg-[#FBF9FE] border-t border-[#EBE3F7] flex items-center justify-between gap-3">
            <button
              id="btn-modal-close-bottom"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>

            {project.projectUrl ? (
              <a
                id="btn-modal-open-project-url"
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#6D204A] bg-[#FDE5F0] hover:bg-[#FCD3E5] border border-[#F6BCD6] shadow-2xs active:scale-98 transition-all"
              >
                <span>{project.buttonText || 'เปิดดูผลงานฉบับเต็ม'}</span>
                <ExternalLink className="w-4 h-4 text-[#8F2B64]" />
              </a>
            ) : null}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
