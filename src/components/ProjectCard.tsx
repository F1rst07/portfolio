import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Calendar, Tag, School, GraduationCap, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Project, CategoryConfig } from '../types';
import { formatImageUrl, getGoogleDriveFallbackUrl } from '../utils/imageHelper';

interface ProjectCardProps {
  project: Project;
  categories: CategoryConfig;
  onOpenDetail?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  categories,
  onOpenDetail
}) => {
  const [imgError, setImgError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  const isHighSchool = project.category === 'highschool';
  const categoryLabel = isHighSchool
    ? (categories.highSchoolName || 'ช่วงมัธยมศึกษาตอนปลาย')
    : (categories.universityName || 'ช่วงระดับมหาวิทยาลัย');

  // Fallback visual illustration if image is broken or empty
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="${isHighSchool ? '%23FFE8F2' : '%23EEE9FF'}"/><circle cx="300" cy="180" r="60" fill="${isHighSchool ? '%23F472B6' : '%23A78BFA'}" opacity="0.4"/><text x="50%" y="280" font-family="sans-serif" font-size="20" font-weight="bold" fill="%236B7280" text-anchor="middle">Project Showcase</text></svg>`;

  const primaryUrl = formatImageUrl(project.imageUrl);
  const driveFallbackUrl = getGoogleDriveFallbackUrl(project.imageUrl);

  const handleImageError = () => {
    if (!triedFallback && driveFallbackUrl && primaryUrl !== driveFallbackUrl) {
      setTriedFallback(true);
    } else {
      setImgError(true);
    }
  };

  const currentImageSrc = imgError 
    ? fallbackSvg 
    : triedFallback && driveFallbackUrl 
      ? driveFallbackUrl 
      : primaryUrl || fallbackSvg;

  return (
    <motion.div
      id={`project-${project.id}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28 }}
      className={`group relative bg-white/95 rounded-3xl border transition-all duration-300 flex flex-col h-full overflow-hidden shadow-2xs hover:shadow-[0_16px_36px_-6px_rgba(147,51,234,0.16)] hover:-translate-y-1.5 ${
        isHighSchool 
          ? 'border-[#F8BCD5]/80 hover:border-[#F472B6]' 
          : 'border-[#BED8FC]/80 hover:border-[#60A5FA]'
      }`}
    >
      {/* Top Accent Gradient Bar */}
      <div className={`h-1.5 w-full ${
        isHighSchool
          ? 'bg-gradient-to-r from-[#DB2777] via-[#F472B6] to-[#FBCFE8]'
          : 'bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-[#93C5FD]'
      }`} />

      {/* Top Cover Image Area */}
      <div 
        onClick={() => onOpenDetail && onOpenDetail(project)}
        className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#FAF5FE] to-[#F3F8FE] cursor-pointer"
      >
        <img
          src={currentImageSrc}
          alt={project.title}
          onError={handleImageError}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Soft subtle gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-center pb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#4F2B82] shadow-sm">
            <Eye className="w-3.5 h-3.5 text-[#9333EA]" />
            <span>คลิกเพื่อดูรายละเอียด</span>
          </span>
        </div>

        {/* Top Badges: Category & Year */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
          {/* Category Badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-2xs ${
            isHighSchool
              ? 'bg-[#FDE7F2]/95 text-[#862557] border border-[#F8BCD5]'
              : 'bg-[#EAF1FE]/95 text-[#1E4B85] border border-[#BED8FC]'
          }`}>
            {isHighSchool ? <School className="w-3.5 h-3.5 text-[#A83870]" /> : <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />}
            <span>{categoryLabel}</span>
          </span>

          {/* Chronological Year Badge */}
          {project.year && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-700 backdrop-blur-md border border-[#E0D3F8] shadow-2xs">
              <Calendar className="w-3 h-3 text-[#7E4BC4]" />
              <span>{project.year}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Project Type Tag */}
          {project.projectType && (
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border shadow-2xs ${
                isHighSchool
                  ? 'bg-[#FDF0F6] text-[#862557] border-[#F8BCD5]'
                  : 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BED8FC]'
              }`}>
                <Tag className="w-3 h-3" />
                <span>{project.projectType}</span>
              </span>
            </div>
          )}

          {/* Project Title */}
          <h3 
            onClick={() => onOpenDetail && onOpenDetail(project)}
            className="text-sm sm:text-base font-extrabold text-[#24133F] group-hover:text-[#652E9B] transition-colors line-clamp-2 mb-2 leading-snug cursor-pointer"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {project.shortDescription || project.fullDescription}
          </p>

          {/* Tools Used Chips */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tools.slice(0, 4).map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#FAF7FD] text-[#55278D] text-[11px] font-semibold border border-[#E8DEF8]"
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 4 && (
                <span className="px-1.5 py-0.5 rounded-md bg-[#F3ECFD] text-[#55278D] text-[11px] font-bold border border-[#DFC7F8]">
                  +{project.tools.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-3 border-t border-[#EDE4FA] flex items-center gap-2 mt-auto">
          {/* Button 1: View Details Modal */}
          {onOpenDetail && (
            <button
              type="button"
              onClick={() => onOpenDetail(project)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-[#4E2982] bg-[#F5ECFD] hover:bg-[#EBDCFB] border border-[#DFC7F8] active:scale-98 transition-all cursor-pointer shadow-2xs"
            >
              <span>ดูรายละเอียด</span>
              <Eye className="w-3.5 h-3.5 text-[#7E4BC4]" />
            </button>
          )}

          {/* Button 2: Direct Project / Google Drive Link */}
          {project.projectUrl ? (
            <a
              id={`btn-open-project-${project.id}`}
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold text-white shadow-2xs active:scale-98 transition-all cursor-pointer ${
                onOpenDetail ? 'flex-1' : 'w-full'
              } ${
                isHighSchool
                  ? 'bg-gradient-to-r from-[#DB2777] to-[#F472B6] hover:from-[#BE185D] hover:to-[#DB2777] border border-[#F472B6]'
                  : 'bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#1D4ED8] border border-[#3B82F6]'
              }`}
              title="เปิดดูผลงานฉบับเต็มในแท็บใหม่"
            >
              <span>{project.buttonText || 'เปิดผลงาน'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};
