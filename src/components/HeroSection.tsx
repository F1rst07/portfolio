import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Laptop, Award, Terminal, School, GraduationCap, CheckCircle2, Mail, Code2, BookOpen } from 'lucide-react';
import { HeroConfig } from '../types';

interface HeroSectionProps {
  hero: HeroConfig;
  totalProjects: number;
  hsCount: number;
  uniCount: number;
  onScrollToProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hero,
  totalProjects,
  hsCount,
  uniCount,
  onScrollToProjects
}) => {
  return (
    <section 
      id="hero-section"
      aria-label="Hero Introduction"
      className="relative pt-2 sm:pt-4 overflow-hidden"
    >
      {/* Decorative ambient background soft blurs */}
      <div className="absolute top-0 -left-16 w-72 h-72 bg-[#E1EEFE]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-8 -right-16 w-80 h-80 bg-[#F5E6FC]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-[#FFEAF3]/45 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="pastel-header-cloud border border-[#D8C7F5] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center relative z-10">
            
            {/* Left Column: Information & Actions (7 Cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Soft Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D8C7F5] text-[#4F2B82] text-xs sm:text-sm font-bold shadow-2xs mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#9B3EA8]" />
                <span>{hero.badgeText || "PORTFOLIO • PROJECTS"}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#2B1B47] leading-[1.2] mb-2.5 sm:mb-3">
                {hero.mainHeading || "My Projects & Innovations"}
              </h1>

              {/* Thai Subheading */}
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#55337E] mb-3.5 sm:mb-4">
                {hero.thaiSubheading || "ผลงานและประสบการณ์การสร้างสรรค์นวัตกรรม"}
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm sm:leading-relaxed mb-6 max-w-2xl">
                {hero.description || "พื้นที่รวบรวมผลงานนวัตกรรม การพัฒนาสื่อการเรียนรู้เชิงปฏิสัมพันธ์ (EdTech), วิทยาการหุ่นยนต์ (Robotics/IoT) และการพัฒนาเว็บแอปพลิเคชัน จากประสบการณ์จริงทั้งในระดับมัธยมศึกษาและระดับมหาวิทยาลัย"}
              </p>

              {/* Academic Credentials & Profile Card */}
              <div className="w-full bg-white/95 backdrop-blur-md border border-[#DFCFF7] rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-6 sm:mb-7 shadow-2xs">
                
                {/* Row 1: Academic Affiliations */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-3.5 border-b border-[#EDE6FA]/80 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#EAF1FE] text-[#1B4B85] border border-[#BED8FC] shadow-2xs">
                    <School className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>จุฬาลงกรณ์มหาวิทยาลัย</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FDE7F2] text-[#862557] border border-[#F8BCD5] shadow-2xs">
                    <GraduationCap className="w-3.5 h-3.5 text-[#A83870]" />
                    <span>คณะครุศาสตร์</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F3ECFD] text-[#4E2982] border border-[#DBC9F7] shadow-2xs">
                    <Laptop className="w-3.5 h-3.5 text-[#7E4BC4]" />
                    <span>วิชาเอกคอมพิวเตอร์การศึกษา (ชั้นปีที่ 2)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] shadow-2xs">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>สาขาวิชาเทคโนโลยีการศึกษา</span>
                  </span>
                </div>

                {/* Row 2: Identity, Student Email & Specialty Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-3.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-800 border border-[#DFCFF7] shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-[#3B1963]">{hero.ownerName || "Phiraphat Khodsawat"}</span>
                    <span className="text-slate-500">({hero.ownerNickname || "First"})</span>
                  </span>

                  <a 
                    href="mailto:6842414727@student.chula.ac.th"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#FAF6FE] text-[#55278D] hover:bg-[#F3EAFD] border border-[#E4D0F8] hover:border-[#BA8CF2] transition-colors shadow-2xs group"
                    title="ส่งอีเมลติดต่อ"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#7C3AED] group-hover:scale-110 transition-transform" />
                    <span>6842414727@student.chula.ac.th</span>
                  </a>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#FFF1F2] to-[#FFF7ED] text-[#9F1239] border border-[#FECDD3] shadow-2xs">
                    <Code2 className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>EdTech & Innovation Developer</span>
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  id="btn-hero-scroll-projects"
                  onClick={onScrollToProjects}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white rgb-button-flow border border-white/35 shadow-sm active:scale-98 transition-all cursor-pointer text-xs sm:text-sm group"
                >
                  <span>สำรวจผลงานทั้งหมด ({totalProjects} ชิ้นงาน)</span>
                  <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Right Column: Decorative Showcase Panel (5 Cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <div className="relative w-full max-w-[440px] sm:max-w-[470px]">
                
                {/* Main Visual Display Card */}
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#DFCFF7] shadow-[0_8px_30px_-6px_rgba(147,51,234,0.12)] relative z-10">
                  
                  {/* Card Header with mockup dots & Tag */}
                  <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-[#EDE6FA] mb-4 sm:mb-5">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#F472B6]"></div>
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#C084FC]"></div>
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#38BDF8]"></div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[#F5EEFD] to-[#FDEEF6] text-[11px] sm:text-xs font-bold text-[#4E2982] border border-[#DFC7F8] shadow-2xs">
                      <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#7E4BC4]" />
                      <span>Computer Education • EDU</span>
                    </div>
                  </div>

                  {/* Feature Highlights Graphic Center */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-[#FAF5FE] via-[#FFF8FC] to-[#F2F7FE] p-5 sm:p-6 flex flex-col items-center justify-center text-center overflow-hidden mb-4 sm:mb-5 border border-[#E4D5F8]">
                    
                    {/* Floating icon */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-2xs flex items-center justify-center mb-3 border border-[#DFCFF7] text-[#7E4BC4]">
                      <Laptop className="w-6 h-6 sm:w-7 sm:h-7 text-[#7E4BC4]" />
                    </div>

                    <h3 className="font-extrabold text-[#2B1B47] text-base sm:text-lg mb-1.5">
                      EdTech & Digital Innovation Showcase
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 max-w-xs sm:max-w-sm leading-relaxed">
                      เทคโนโลยีการศึกษา • วิทยาการหุ่นยนต์ & IoT • สื่อการเรียนรู้ AR/AI
                    </p>

                    {/* Authentic Tech Skills Chips */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                      <span className="px-3 py-1 sm:py-1.5 rounded-xl bg-white/95 text-[#4E2982] text-xs font-bold border border-[#DBC9F7] shadow-2xs">
                        ⚡ Flutter & AR
                      </span>
                      <span className="px-3 py-1 sm:py-1.5 rounded-xl bg-white/95 text-[#862557] text-xs font-bold border border-[#F8BCD5] shadow-2xs">
                        🤖 AI HuskyLens
                      </span>
                      <span className="px-3 py-1 sm:py-1.5 rounded-xl bg-white/95 text-[#1B4B85] text-xs font-bold border border-[#BED8FC] shadow-2xs">
                        🧠 Gemini AI
                      </span>
                      <span className="px-3 py-1 sm:py-1.5 rounded-xl bg-white/95 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs">
                        🦾 EMG Sensor
                      </span>
                    </div>
                  </div>

                  {/* Stats Counter Bar (3 Columns) */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
                    <div className="py-3 sm:py-3.5 px-2 rounded-2xl bg-gradient-to-br from-[#F6F1FE] to-[#FAF6FE] border border-[#E0D3F8] shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-[#4E2982]">{totalProjects}</div>
                      <div className="text-[11px] sm:text-xs text-[#55337E] font-semibold mt-0.5">ผลงานทั้งหมด</div>
                    </div>
                    <div className="py-3 sm:py-3.5 px-2 rounded-2xl bg-gradient-to-br from-[#F0F6FE] to-[#EAF1FE] border border-[#BED8FC] shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-[#1B4B85]">{uniCount}</div>
                      <div className="text-[11px] sm:text-xs text-[#1B4B85] font-semibold mt-0.5">มหาวิทยาลัย</div>
                    </div>
                    <div className="py-3 sm:py-3.5 px-2 rounded-2xl bg-gradient-to-br from-[#FDF0F6] to-[#FDE7F2] border border-[#F8BCD5] shadow-2xs">
                      <div className="text-lg sm:text-xl font-black text-[#862557]">{hsCount}</div>
                      <div className="text-[11px] sm:text-xs text-[#862557] font-semibold mt-0.5">มัธยมปลาย</div>
                    </div>
                  </div>

                </div>

                {/* Floating Decorative Badges */}
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  className="flex absolute -top-3.5 sm:-top-4 -right-1 sm:-right-3 z-20 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#BED8FC] shadow-sm text-xs font-bold text-[#1B4B85]"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#2E60A3]" />
                  <span>Chulalongkorn University</span>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="flex absolute -bottom-3 sm:-bottom-3.5 -left-1 sm:-left-3 z-20 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#F8BCD5] shadow-sm text-xs font-bold text-[#862557]"
                >
                  <Award className="w-3.5 h-3.5 text-[#A83870]" />
                  <span>EdTech & Innovation</span>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
