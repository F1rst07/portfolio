import React from 'react';
import { motion } from 'motion/react';
import { Search, X, School, GraduationCap, LayoutGrid } from 'lucide-react';
import { CategoryConfig } from '../types';

interface CategoryFilterProps {
  categories: CategoryConfig;
  activeCategory: 'all' | 'highschool' | 'university';
  onSelectCategory: (cat: 'all' | 'highschool' | 'university') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  hsCount: number;
  uniCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  hsCount,
  uniCount
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 mb-5 sm:mb-6">
      
      {/* Category Pills Tabs (Pastel Segmented Control with spring animation) */}
      <div 
        role="tablist"
        aria-label="หมวดหมู่ผลงาน"
        className="flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-xl rounded-2xl border border-[#DECFF7] shadow-[0_2px_12px_-2px_rgba(147,51,234,0.08)] overflow-x-auto no-scrollbar"
      >
        {/* All Projects Tab */}
        <button
          role="tab"
          id="tab-category-all"
          aria-selected={activeCategory === 'all'}
          onClick={() => onSelectCategory('all')}
          className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer z-10 ${
            activeCategory === 'all'
              ? 'text-[#4A187A]'
              : 'text-slate-500 hover:text-[#4A187A] hover:bg-white/40'
          }`}
        >
          {activeCategory === 'all' && (
            <motion.div
              layoutId="active-category-pill"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-[#FAF6FE] to-white border border-[#D8BEF8] shadow-[0_2px_8px_-1px_rgba(127,63,168,0.16),0_1px_3px_rgba(0,0,0,0.04)] -z-10"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <LayoutGrid className={`w-4 h-4 transition-colors ${activeCategory === 'all' ? 'text-[#7E4BC4]' : 'text-slate-400'}`} />
          <span>{categories.allLabel || 'ทั้งหมด'}</span>
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold font-mono transition-colors ${
            activeCategory === 'all' 
              ? 'bg-[#F3E8FE] text-[#652E9B] border border-[#E3D0F8]' 
              : 'bg-slate-100 text-slate-500 border border-slate-200/70'
          }`}>
            {totalCount}
          </span>
        </button>

        {/* University Tab */}
        <button
          role="tab"
          id="tab-category-university"
          aria-selected={activeCategory === 'university'}
          onClick={() => onSelectCategory('university')}
          className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer z-10 ${
            activeCategory === 'university'
              ? 'text-[#184478]'
              : 'text-slate-500 hover:text-[#184478] hover:bg-white/40'
          }`}
        >
          {activeCategory === 'university' && (
            <motion.div
              layoutId="active-category-pill"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-[#F0F6FE] to-white border border-[#BED8FC] shadow-[0_2px_8px_-1px_rgba(37,99,235,0.16),0_1px_3px_rgba(0,0,0,0.04)] -z-10"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <GraduationCap className={`w-4 h-4 transition-colors ${activeCategory === 'university' ? 'text-[#2563EB]' : 'text-slate-400'}`} />
          <div className="flex flex-col items-start leading-none text-left">
            <span>{categories.universityName || 'ช่วงระดับมหาวิทยาลัย'}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold font-mono transition-colors ${
            activeCategory === 'university' 
              ? 'bg-[#E1EEFE] text-[#1B4B85] border border-[#BED8FC]' 
              : 'bg-slate-100 text-slate-500 border border-slate-200/70'
          }`}>
            {uniCount}
          </span>
        </button>

        {/* High School Tab */}
        <button
          role="tab"
          id="tab-category-highschool"
          aria-selected={activeCategory === 'highschool'}
          onClick={() => onSelectCategory('highschool')}
          className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer z-10 ${
            activeCategory === 'highschool'
              ? 'text-[#831843]'
              : 'text-slate-500 hover:text-[#831843] hover:bg-white/40'
          }`}
        >
          {activeCategory === 'highschool' && (
            <motion.div
              layoutId="active-category-pill"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-[#FFF0F7] to-white border border-[#F8BCD5] shadow-[0_2px_8px_-1px_rgba(219,39,119,0.16),0_1px_3px_rgba(0,0,0,0.04)] -z-10"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          <School className={`w-4 h-4 transition-colors ${activeCategory === 'highschool' ? 'text-[#DB2777]' : 'text-slate-400'}`} />
          <div className="flex flex-col items-start leading-none text-left">
            <span>{categories.highSchoolName || 'ช่วงมัธยมศึกษาตอนปลาย'}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold font-mono transition-colors ${
            activeCategory === 'highschool' 
              ? 'bg-[#FDE7F2] text-[#862557] border border-[#F8BCD5]' 
              : 'bg-slate-100 text-slate-500 border border-slate-200/70'
          }`}>
            {hsCount}
          </span>
        </button>

      </div>

      {/* Search Input Bar (Filter by query inside gallery) */}
      <div className="relative w-full md:w-72 lg:w-80">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4 text-[#8B5CF6]" />
        </div>
        <input
          id="input-search-projects"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ค้นหาชื่อผลงาน, เครื่องมือ, ทักษะ..."
          className="w-full pl-10 pr-9 py-2.5 bg-white/95 rounded-2xl border border-[#DFCFF7] focus:outline-none focus:ring-2 focus:ring-[#8F3CDA]/25 focus:border-[#8F3CDA] text-xs sm:text-sm text-[#2B1B47] placeholder:text-slate-400 shadow-2xs transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="w-5 h-5 rounded-full bg-slate-100 hover:bg-[#F3ECFD] text-slate-500 hover:text-[#602C97] absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="ล้างคำค้นหา"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

    </div>
  );
};
