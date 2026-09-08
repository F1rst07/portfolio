import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  PortfolioData 
} from '../types';
import { formatImageUrl, getGoogleDriveFallbackUrl } from '../utils/imageHelper';
import { 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Palette, 
  Award, 
  CheckCircle2,
  FolderGit2,
  BookOpen,
  Send,
  School,
  Terminal,
  Laptop,
  Gamepad2,
  Bot
} from 'lucide-react';

interface HomePageProps {
  data: PortfolioData;
  onNavigateToProjects: (category?: 'all' | 'highschool' | 'university') => void;
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  onScrollToContact?: () => void;
}

const FOCUS_AREA_METAS = [
  {
    icon: BookOpen,
    fallbackEn: "Educational Technology",
    fallbackTh: "เทคโนโลยีและนวัตกรรมการศึกษา",
    gradient: "from-[#F5F0FF] via-[#FAF5FE] to-[#FDF4FB]",
    iconBg: "bg-[#EDE9FE] text-[#7C3AED] border-[#DDD6FE]",
    border: "border-[#E8DCF9]"
  },
  {
    icon: Code2,
    fallbackEn: "Web & Mobile Apps",
    fallbackTh: "พัฒนาเว็บและโมบายแอปพลิเคชัน",
    gradient: "from-[#F0F7FF] via-[#F6F9FF] to-[#FAF5FE]",
    iconBg: "bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]",
    border: "border-[#D8E6FA]"
  },
  {
    icon: Cpu,
    fallbackEn: "Computational Thinking",
    fallbackTh: "แนวคิดเชิงคำนวณและการแก้ปัญหา",
    gradient: "from-[#FAF5FE] via-[#F7F2FE] to-[#F3EEFE]",
    iconBg: "bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]",
    border: "border-[#E4D4F8]"
  },
  {
    icon: Gamepad2,
    fallbackEn: "Interactive & Game Learning",
    fallbackTh: "การเรียนรู้ผ่านเกมเชิงปฏิสัมพันธ์",
    gradient: "from-[#FDF2F8] via-[#FDF5F9] to-[#FAF5FE]",
    iconBg: "bg-[#FCE7F3] text-[#DB2777] border-[#FBCFE8]",
    border: "border-[#F7D8EA]"
  },
  {
    icon: Palette,
    fallbackEn: "UI/UX for Learning Media",
    fallbackTh: "ออกแบบสื่อและประสบการณ์ผู้ใช้",
    gradient: "from-[#FFF7ED] via-[#FEF9F3] to-[#FAF5FE]",
    iconBg: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
    border: "border-[#F6E3BA]"
  },
  {
    icon: Bot,
    fallbackEn: "AI & AR Innovation",
    fallbackTh: "ปัญญาประดิษฐ์และเทคโนโลยี AR",
    gradient: "from-[#EEF2FF] via-[#F5F6FF] to-[#FAF5FE]",
    iconBg: "bg-[#E0E7FF] text-[#4F46E5] border-[#C7D2FE]",
    border: "border-[#D9E1FD]"
  }
];

const parseInterest = (raw: string, index: number) => {
  let en = '';
  let th = '';

  if (raw.includes('•')) {
    const parts = raw.split('•');
    en = parts[0]?.trim() || '';
    th = parts[1]?.trim() || '';
  } else if (raw.includes('(')) {
    const match = raw.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      en = match[1]?.trim() || '';
      th = match[2]?.trim() || '';
    } else {
      en = raw.trim();
    }
  } else {
    en = raw.trim();
  }

  // Normalization เพื่อให้แสดงผลสมดุล สวยงาม และไม่ถูกตัดตัวอักษร (Developm..) ในทุกขนาดหน้าจอ
  const lowerEn = en.toLowerCase();
  if (lowerEn.includes('web') && lowerEn.includes('mobile')) {
    en = 'Web & Mobile Apps';
    if (!th) th = 'พัฒนาเว็บและแอปพลิเคชัน';
  } else if (lowerEn.includes('ui/ux')) {
    en = 'UI/UX Learning Media';
    if (!th) th = 'ออกแบบสื่อและประสบการณ์ผู้ใช้';
  } else if (lowerEn.includes('interactive') || lowerEn.includes('game')) {
    en = 'Interactive & Games';
    if (!th) th = 'สื่อการเรียนรู้เชิงปฏิสัมพันธ์';
  } else if (lowerEn.includes('artificial') || lowerEn.includes('ai')) {
    en = 'AI & AR Innovation';
    if (!th) th = 'ปัญญาประดิษฐ์และเทคโนโลยี AR';
  } else if (lowerEn.includes('computational')) {
    en = 'Computational Thinking';
    if (!th) th = 'แนวคิดเชิงคำนวณและการแก้ปัญหา';
  } else if (lowerEn.includes('educational')) {
    en = 'Educational Technology';
    if (!th) th = 'เทคโนโลยีและนวัตกรรมการศึกษา';
  }

  const meta = FOCUS_AREA_METAS[index % FOCUS_AREA_METAS.length];
  return {
    icon: meta.icon,
    en: en || meta.fallbackEn,
    th: th || meta.fallbackTh,
    gradient: meta.gradient,
    iconBg: meta.iconBg,
    border: meta.border
  };
};

const getExactInterest = (raw: string) => {
  if (raw.includes('•')) {
    const parts = raw.split('•');
    return {
      en: parts[0]?.trim() || '',
      th: parts[1]?.trim() || ''
    };
  }
  return { en: raw.trim(), th: '' };
};

const COMPETENCY_METAS = [
  {
    // 01: Educational Technology • เทคโนโลยีการศึกษา
    icon: BookOpen,
    desc: "การศึกษาและประยุกต์ใช้นวัตกรรมเทคโนโลยีเพื่อการศึกษา จากวิชาเอกคอมพิวเตอร์การศึกษา คณะครุศาสตร์ จุฬาฯ มุ่งเน้นการสร้างสรรค์สื่อดิจิทัลและระบบติดตามพัฒนาการผู้เรียน",
    toolsAndSkills: ["เทคโนโลยีการศึกษา", "การออกแบบสื่อเพื่อการเรียนรู้", "การวิเคราะห์ข้อมูลการเรียนรู้"],
    relatedProject: "KiD-TECT",
    categoryTarget: "university" as const,
    colorTheme: {
      cardBg: "from-[#FAF6FE] via-white to-white",
      border: "border-[#E1D4F8] hover:border-[#C4A9EE]",
      iconBg: "bg-[#F3ECFD] text-[#6D28D9] border-[#DDD6FE]",
      titleColor: "text-[#2B1B47]",
      tagBg: "bg-[#F3ECFD] text-[#6D28D9] border-[#E5D8FC]"
    }
  },
  {
    // 02: Web & Mobile App Development • พัฒนาเว็บและแอปพลิเคชัน
    icon: Code2,
    desc: "พัฒนาแอปพลิเคชันมือถือข้ามแพลตฟอร์มด้วย Flutter & Dart และพัฒนาเว็บแอปพลิเคชันด้วย Next.js, React, TypeScript และ Tailwind CSS สำหรับใช้งานจริงในระบบ",
    toolsAndSkills: ["Flutter", "Dart", "Next.js", "React", "TypeScript", "Tailwind CSS"],
    relatedProject: "KiD-TECT",
    categoryTarget: "university" as const,
    colorTheme: {
      cardBg: "from-[#F0F7FE] via-white to-white",
      border: "border-[#BFDBFE] hover:border-[#60A5FA]",
      iconBg: "bg-[#EAF1FE] text-[#1D4ED8] border-[#BED8FC]",
      titleColor: "text-[#1E3A8A]",
      tagBg: "bg-[#EAF1FE] text-[#1D4ED8] border-[#BED8FC]"
    }
  },
  {
    // 03: Computational Thinking • แนวคิดเชิงคำนวณ
    icon: Bot,
    desc: "บูรณาการทักษะการคิดเชิงคำนวณ (Computational Thinking) และการแก้ปัญหา สู่กิจกรรมและแอปพลิเคชันเกมการเรียนรู้เรื่องพลังงานทดแทนในประเทศไทย",
    toolsAndSkills: ["การคิดเชิงคำนวณ", "การแก้ปัญหา", "เกมเพื่อการเรียนรู้"],
    relatedProject: "KiD-TECT",
    categoryTarget: "university" as const,
    colorTheme: {
      cardBg: "from-[#FFF2F8] via-white to-white",
      border: "border-[#FBCFE8] hover:border-[#F472B6]",
      iconBg: "bg-[#FDE7F2] text-[#BE185D] border-[#F8BCD5]",
      titleColor: "text-[#831843]",
      tagBg: "bg-[#FDE7F2] text-[#BE185D] border-[#F8BCD5]"
    }
  },
  {
    // 04: Interactive & Game Learning • สื่อการเรียนรู้เชิงปฏิสัมพันธ์
    icon: Gamepad2,
    desc: "สร้างสรรค์สื่อและเกมการเรียนรู้เชิงปฏิสัมพันธ์ที่ให้ผู้เรียนมีส่วนร่วม โดยประยุกต์ใช้เทคโนโลยีการตรวจจับท่าทางมือ (Hand Detection) และเควสต์การเรียนรู้",
    toolsAndSkills: ["การออกแบบเกมเพื่อการเรียนรู้", "Hand Detection", "สื่อปฏิสัมพันธ์"],
    relatedProject: "KiD-TECT",
    categoryTarget: "university" as const,
    colorTheme: {
      cardBg: "from-[#F0FDF8] via-white to-white",
      border: "border-[#A7F3D0] hover:border-[#34D399]",
      iconBg: "bg-[#E6F8F0] text-[#047857] border-[#A7F3D0]",
      titleColor: "text-[#064E3B]",
      tagBg: "bg-[#E6F8F0] text-[#047857] border-[#A7F3D0]"
    }
  },
  {
    // 05: UI/UX for Learning Media • ออกแบบสื่อการเรียนรู้
    icon: Palette,
    desc: "ออกแบบส่วนต่อประสาน (UI) และประสบการณ์ผู้ใช้ (UX) ของสื่อและแอปพลิเคชันเพื่อการเรียนรู้ ให้เข้าใจง่าย สบายตา เป็นมิตร และเหมาะสมกับกลุ่มผู้เรียน",
    toolsAndSkills: ["การออกแบบ UI/UX", "การออกแบบสื่อการเรียนรู้", "ส่วนต่อประสานผู้ใช้"],
    relatedProject: "KiD-TECT",
    categoryTarget: "university" as const,
    colorTheme: {
      cardBg: "from-[#FFF7ED] via-white to-white",
      border: "border-[#FED7AA] hover:border-[#FB923C]",
      iconBg: "bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA]",
      titleColor: "text-[#7C2D12]",
      tagBg: "bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA]"
    }
  },
  {
    // 06: AI & AR Innovation • นวัตกรรม AI และ AR
    icon: Cpu,
    desc: "ประยุกต์ใช้โมเดลปัญญาประดิษฐ์ Google Gemini API, เทคโนโลยี Augmented Reality (AR), โมดูลกล้อง AI HuskyLens, เซนเซอร์กล้ามเนื้อ EMG และบอร์ดไมโครคอนโทรลเลอร์",
    toolsAndSkills: ["Google Gemini API", "Augmented Reality (AR)", "HuskyLens AI", "เซนเซอร์ EMG", "Arduino IDE"],
    relatedProject: "KiD-TECT & นวัตกรรมมัธยมปลาย",
    categoryTarget: "all" as const,
    colorTheme: {
      cardBg: "from-[#F5F3FF] via-white to-white",
      border: "border-[#DDD6FE] hover:border-[#A78BFA]",
      iconBg: "bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]",
      titleColor: "text-[#3B0764]",
      tagBg: "bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]"
    }
  }
];

const TrackImagePreview: React.FC<{
  imageUrl?: string;
  fallbackLocalUrl: string;
  alt: string;
  badgeTitle?: string;
  theme: 'uni' | 'hs';
  onClick: () => void;
  slideIndex?: number;
  totalSlides?: number;
  isAutoPlaying?: boolean;
}> = ({ imageUrl, fallbackLocalUrl, alt, badgeTitle, theme, onClick, slideIndex, totalSlides, isAutoPlaying }) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() => formatImageUrl(imageUrl) || fallbackLocalUrl);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(formatImageUrl(imageUrl) || fallbackLocalUrl);
    setTriedFallback(false);
  }, [imageUrl, fallbackLocalUrl]);

  const isUni = theme === 'uni';
  const driveFallback = getGoogleDriveFallbackUrl(imageUrl);

  const handleError = () => {
    if (!triedFallback && driveFallback && currentSrc !== driveFallback) {
      setTriedFallback(true);
      setCurrentSrc(driveFallback);
    } else {
      setCurrentSrc(fallbackLocalUrl);
    }
  };

  const rawTitle = (badgeTitle || alt || '').replace(/คำนวณ\s+ผ่าน/g, 'คำนวณผ่าน');
  const cleanTitle = rawTitle.replace(/^[⭐\s]+/, '');

  return (
    <div 
      onClick={onClick}
      className={`relative rounded-2xl sm:rounded-[22px] overflow-hidden aspect-[16/9] w-full border ${
        isUni 
          ? 'border-[#BFDBFE] hover:border-[#60A5FA] shadow-[0_4px_20px_-4px_rgba(59,130,246,0.12)]' 
          : 'border-[#FBCFE8] hover:border-[#F472B6] shadow-[0_4px_20px_-4px_rgba(236,72,153,0.12)]'
      } bg-slate-950 mb-5 group/img cursor-pointer transition-all duration-300 hover:shadow-lg`}
      title="คลิกเพื่อดูรายละเอียดผลงานในหน้านี้"
    >
      <img 
        key={currentSrc}
        src={currentSrc} 
        alt={alt}
        onError={handleError}
        className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-all duration-700 ease-out animate-fade-in-slide"
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {/* Cinematic subtle dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent pointer-events-none" />
      
      {/* Bottom Frosted Glass Overlay with Title & Action */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1 pr-2">
          {/* Subtle slide indicator dashes when multiple slides */}
          {totalSlides && totalSlides > 1 && (
            <div className="flex items-center gap-1.5 mb-1.5">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    (slideIndex ? slideIndex - 1 : 0) === idx
                      ? 'w-4.5 bg-pink-400 shadow-xs'
                      : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
          <div className="font-bold text-xs sm:text-[13px] leading-snug drop-shadow-md text-white line-clamp-1">
            {cleanTitle}
          </div>
        </div>

        <span className={`shrink-0 text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all shadow-xs flex items-center gap-1.5 backdrop-blur-md cursor-pointer ${
          isUni 
            ? 'bg-white/95 text-[#1B4B85] hover:bg-white border border-white/70 group-hover/img:scale-103' 
            : 'bg-white/95 text-[#862557] hover:bg-white border border-white/70 group-hover/img:scale-103'
        }`}>
          <span>ดูผลงาน</span>
          <ArrowRight className="w-3 h-3 group-hover/img:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({
  data,
  onNavigateToProjects,
  onShowToast,
  onScrollToContact,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeHsProjectIndex, setActiveHsProjectIndex] = useState(0);
  const [isHsPaused, setIsHsPaused] = useState(false);

  const hsProjects = data.projects.filter(p => p.category === 'highschool');
  const uniProjects = data.projects.filter(p => p.category === 'university');
  const currentHsProject = hsProjects[activeHsProjectIndex] || hsProjects[0];

  // Auto-slide every 1.5 seconds ("เลื่อนอัตโนมัติ ทุก 1.5 วิ")
  useEffect(() => {
    if (hsProjects.length <= 1 || isHsPaused) return;

    const interval = setInterval(() => {
      setActiveHsProjectIndex((prev) => (prev + 1) % hsProjects.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [hsProjects.length, isHsPaused]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(data.contact.email);
    setCopiedEmail(true);
    onShowToast('คัดลอกอีเมลเรียบร้อยแล้ว!', 'success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToContact = () => {
    if (onScrollToContact) {
      onScrollToContact();
      return;
    }
    const container = document.getElementById('main-scroll-container');
    const el = document.getElementById('contact-section');
    if (container && el) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      container.scrollTo({
        top: Math.max(0, container.scrollTop + (elRect.top - containerRect.top) - 20),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full space-y-7 sm:space-y-9 pb-1">
      
      {/* 1. HERO & ABOUT ME SECTION (โทนพาสเทลสดใส ชัดเจน สีเข้มสวยกำลังดี) */}
      <section className="relative pt-2 sm:pt-4 overflow-hidden">
        {/* Ambient soft blurs - ระดับความฟุ้งสดใสพอดี */}
        <div className="absolute top-0 -left-16 w-72 h-72 bg-[#E1EEFE]/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-8 -right-16 w-80 h-80 bg-[#F5E6FC]/50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-[#FFEAF3]/45 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* pastel-header-cloud ที่มีสีพาสเทลชัดเจนสดใส */}
          <div className="pastel-header-cloud border border-[#D8C7F5] rounded-3xl sm:rounded-[36px] p-4 sm:p-7 md:p-9 lg:p-11 shadow-sm relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center relative z-10">
              
              {/* Left Column: Information & Bio (7 Cols) */}
              <motion.div 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="lg:col-span-7 flex flex-col items-start text-left"
              >
                {/* Soft Badge ชัดเจน */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D8C7F5] text-[#4F2B82] text-xs sm:text-sm font-bold shadow-2xs mb-3.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9B3EA8]" />
                  <span>เกี่ยวกับฉัน • ABOUT ME</span>
                </div>

                {/* Greeting & Name Heading - สีคมชัด โดดเด่น ไม่จางซีด */}
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[#502882] mb-1 flex items-center gap-1.5">
                  <span>{data.about.greeting}</span>
                </p>
                
                <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] xl:text-5xl font-black text-[#2B1B47] leading-tight mb-3 flex flex-wrap items-baseline gap-y-1">
                  <span className="inline-flex items-baseline gap-x-2.5 sm:gap-x-3.5">
                    {data.about.fullName.split(' ').filter(Boolean).map((part, idx) => (
                      <span key={idx}>{part}</span>
                    ))}
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#55337E] ml-2 sm:ml-3">
                    ({data.about.nickname})
                  </span>
                  <span className="inline-block ml-1.5 sm:ml-2 text-xl sm:text-2xl md:text-3xl">👋</span>
                </h1>

                {/* Academic Credentials Grid - ครบถ้วนทุกสังกัด Responsive */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4">
                  {/* มหาวิทยาลัย */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#EAF1FE] text-[#1B4B85] border border-[#BED8FC] shadow-2xs">
                    <School className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{data.about.university || "จุฬาลงกรณ์มหาวิทยาลัย"}</span>
                  </span>

                  {/* คณะ */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#FDE7F2] text-[#862557] border border-[#F8BCD5] shadow-2xs">
                    <GraduationCap className="w-3.5 h-3.5 text-[#A83870]" />
                    <span>{data.about.faculty || "คณะครุศาสตร์"}</span>
                  </span>

                  {/* สาขาวิชา / เอก */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#F3ECFD] text-[#4E2982] border border-[#DBC9F7] shadow-2xs">
                    <Laptop className="w-3.5 h-3.5 text-[#7E4BC4]" />
                    <span>{data.about.major}</span>
                  </span>

                  {/* ชั้นปี */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-white/95 text-[#4A187A] border border-[#DFC7F8] shadow-2xs">
                    <Terminal className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>{data.about.studentYear}</span>
                  </span>
                </div>

                {/* Bio & Focus Areas Hub Card - คมชัด อ่านง่าย มีมิติและลูกเล่นครบครัน */}
                <div className="w-full bg-white/95 backdrop-blur-md border border-[#DFCFF7] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 mb-5 shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* คำแนะนำตัว */}
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal mb-3.5">
                    {data.about.bio}
                  </p>

                  {/* จุดเน้นความสนใจ (Core Focus Areas) - ดีไซน์การ์ดกริด 2 คอลัมน์ สมดุล สวยงาม ไม่ถูกตัดข้อความ */}
                  <div className="pt-3 border-t border-[#EDE6FA]">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] font-bold text-[#55278D] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#9333EA]" />
                        <span>จุดเน้นความสนใจ (Core Focus Areas)</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3E8FE] text-[#7C3AED] font-semibold border border-[#E4D0F8]">
                        {data.about.interests.length} ทักษะเด่น
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {data.about.interests.map((rawInterest, idx) => {
                        const item = parseInterest(rawInterest, idx);
                        const IconComponent = item.icon;
                        return (
                          <div 
                            key={idx}
                            className={`group relative flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r ${item.gradient} hover:from-white hover:to-[#FAF5FE] border ${item.border} hover:border-[#BA8CF2] transition-all duration-200 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 cursor-default`}
                          >
                            <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border ${item.iconBg} shadow-2xs group-hover:scale-105 transition-transform`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] sm:text-xs font-bold text-[#2A0845] group-hover:text-[#6D28D9] transition-colors leading-snug line-clamp-1">
                                {item.en}
                              </div>
                              <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium line-clamp-1 mt-0.5 leading-tight">
                                {item.th}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Project Summary bar - Fully Responsive */}
                  <div className="mt-3.5 pt-3 border-t border-[#EDE6FA] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                    <button
                      type="button"
                      onClick={() => onNavigateToProjects('all')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl bg-gradient-to-r from-[#FAF5FE] to-[#FDF0F7] hover:from-[#F3E8FE] hover:to-[#FCE5F3] text-[#4E2982] border border-[#E2D4F7] hover:border-[#BA8CF2] transition-all text-[11px] font-bold cursor-pointer group active:scale-98 shadow-2xs hover:shadow-xs"
                      title="คลิกเพื่อดูผลงานทั้งหมด"
                    >
                      <FolderGit2 className="w-3.5 h-3.5 text-[#7C3AED] group-hover:scale-110 transition-transform" />
                      <span>จำนวนผลงาน ({data.projects.length})</span>
                    </button>

                    <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 text-[11px] text-slate-500 font-medium w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => onNavigateToProjects('highschool')}
                        className="flex-1 sm:flex-initial px-2.5 py-1.5 sm:py-1 rounded-xl bg-[#EAF1FE] hover:bg-[#DDEAFC] text-[#1B4B85] font-semibold border border-[#BED8FC] hover:border-[#93C5FD] transition-all cursor-pointer active:scale-95 text-center"
                        title="คลิกเพื่อดูผลงานช่วงมัธยมศึกษาตอนปลาย"
                      >
                        มัธยมปลาย ({hsProjects.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateToProjects('university')}
                        className="flex-1 sm:flex-initial px-2.5 py-1.5 sm:py-1 rounded-xl bg-[#FDE7F2] hover:bg-[#FCD5E8] text-[#862557] font-semibold border border-[#F8BCD5] hover:border-[#F472B6] transition-all cursor-pointer active:scale-95 text-center"
                        title="คลิกเพื่อดูผลงานช่วงระดับมหาวิทยาลัย"
                      >
                        มหาวิทยาลัย ({uniProjects.length})
                      </button>
                    </div>
                  </div>

                </div>

                {/* Action Buttons - สีเข้มสดใส คมชัด Responsive */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  {/* ปุ่มชมพูพาสเทลคมชัด */}
                  <button
                    onClick={() => onNavigateToProjects('all')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-2xl font-bold text-[#721C4A] bg-[#FDE2F0] hover:bg-[#FCD3E6] border border-[#F6B0D0] shadow-xs active:scale-98 transition-all cursor-pointer text-xs sm:text-sm group"
                  >
                    <FolderGit2 className="w-4 h-4 text-[#8C235E]" />
                    <span>สำรวจผลงานทั้งหมด ({data.projects.length})</span>
                    <ArrowRight className="w-4 h-4 text-[#8C235E] group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* ปุ่มสีขาวกรอบม่วงพาสเทล */}
                  <button
                    onClick={scrollToContact}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-bold text-[#4B237D] bg-white hover:bg-[#FAF6FE] border border-[#D9C7F5] shadow-2xs active:scale-98 transition-all cursor-pointer text-xs sm:text-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-[#7A4AC2]" />
                    <span>ช่องทางการติดต่อ</span>
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Decorative Profile Showcase Hub (5 Cols) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="lg:col-span-5 flex justify-center w-full relative"
              >
                <div className="relative w-full max-w-[380px] sm:max-w-[430px] lg:max-w-[460px] mx-auto">

                  {/* Floating Badge 1 (Top-Right): Chulalongkorn University */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden sm:flex absolute -top-3 sm:-top-3.5 -right-1 sm:-right-3 z-20 items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#BED8FC] shadow-sm text-xs font-bold text-[#1B4B85]"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#2E60A3]" />
                    <span>Chulalongkorn University</span>
                  </motion.div>

                  {/* Floating Badge 2 (Bottom-Left): Project Count */}
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="hidden sm:flex absolute -bottom-3 sm:-bottom-3.5 -left-1 sm:-left-3 z-20 items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#F8BCD5] shadow-sm text-xs font-bold text-[#862557]"
                  >
                    <FolderGit2 className="w-3.5 h-3.5 text-[#A83870]" />
                    <span>{data.projects.length} Featured Projects</span>
                  </motion.div>

                  {/* Main Card Container */}
                  <div className="w-full bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#DFCFF7] shadow-[0_12px_36px_-6px_rgba(147,51,234,0.14)] relative z-10 group hover:shadow-[0_16px_44px_-4px_rgba(147,51,234,0.20)] transition-all duration-300">
                    
                    {/* Card Header with cute mockup dots & Real Academic Tag in English */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#EDE6FA] mb-3 sm:mb-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#F472B6]"></div>
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#C084FC]"></div>
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#38BDF8]"></div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[#F5EEFD] to-[#FDEEF6] text-[11px] sm:text-xs font-bold text-[#4E2982] border border-[#DFC7F8] shadow-2xs">
                        <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#7E4BC4]" />
                        <span>Computer Education • EDU</span>
                      </div>
                    </div>

                    {/* GIF Showcase Graphic */}
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square w-full shadow-inner border border-[#E0D3F7] bg-gradient-to-br from-[#FAF5FE] to-[#FCEEF6]">
                      <img 
                        src="/images/hero-showcase.gif?v=20260907_2031" 
                        alt="Portfolio Showcase" 
                        className="w-full h-full object-cover rounded-xl sm:rounded-2xl group-hover:scale-[1.015] transition-transform duration-500"
                      />
                    </div>

                    {/* Bottom Profile Summary - Authentic Information in English */}
                    <div className="mt-3 sm:mt-3.5 pt-3 border-t border-[#EDE6FA] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-col min-w-0 pr-1.5">
                        <span className="font-extrabold text-[#2A0845] text-xs sm:text-sm leading-snug truncate">
                          {data.hero.ownerName || "Phiraphat Khodsawat"} ({data.hero.ownerNickname || "First"})
                        </span>
                        <span className="text-[#652E9B] text-[11px] font-semibold mt-0.5 leading-tight truncate">
                          • Year 2 Undergraduate
                        </span>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        <span>Ready for Innovation</span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>


      {/* 2. FEATURED TRACKS / WORK CATEGORIES ("ผลงานของฉัน") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D8C7F5] text-[#4F2B82] text-xs font-bold shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#9B3EA8]" />
            <span>เส้นทางผลงาน • Portfolios & Tracks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B1B47] tracking-tight">
            ผลงานของฉัน (My Works)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            แบ่งตามช่วงประสบการณ์การเรียนรู้ การลงมือสร้างสรรค์นวัตกรรม และการพัฒนาทักษะจริง
          </p>
        </div>

        {/* 2 Big Interactive Pathway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Track 1: ช่วงระดับมหาวิทยาลัย (University Level) -> ฟ้าพาสเทลสดใส */}
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            className="group relative rounded-3xl sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#F2F8FE] via-white to-white border border-[#BED8FC] hover:border-[#60A5FA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Accent Gradient Bar (ฟ้า) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#93C5FD]" />
            
            <div className="p-6 sm:p-8 flex-grow flex flex-col">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EAF1FE] text-[#1B4B85] border border-[#BFDBFE] shadow-2xs">
                  <GraduationCap className="w-3.5 h-3.5 text-[#2E60A3]" />
                  <span>University Level • อุดมศึกษา</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#1B4B85] border border-[#BFDBFE] shadow-2xs">
                  {uniProjects.length} ผลงาน
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#1E293B] group-hover:text-[#1B4B85] transition-colors mb-2 tracking-tight">
                {data.categories.universityName}
              </h3>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 min-h-[44px]">
                ผลงานการพัฒนานวัตกรรมการเรียนรู้และเทคโนโลยีการศึกษาขั้นสูง ผสานการพัฒนาแอปพลิเคชันมือถือ, AR (Augmented Reality), ระบบปัญญาประดิษฐ์ (AI) และ Dashboard วิเคราะห์การเรียนรู้
              </p>

              {/* Real Project Preview Image Showcase */}
              <TrackImagePreview
                imageUrl={uniProjects[0]?.imageUrl}
                fallbackLocalUrl="/images/kid-tect.jpg"
                alt={uniProjects[0]?.title || "KiD-TECT แอปพลิเคชันเกมการเรียนรู้เพื่อส่งเสริมแนวคิดเชิงคำนวณผ่านเรื่องพลังงานทดแทนในประเทศไทย"}
                badgeTitle={uniProjects[0]?.title || "KiD-TECT แอปพลิเคชันเกมการเรียนรู้เพื่อส่งเสริมแนวคิดเชิงคำนวณผ่านเรื่องพลังงานทดแทนในประเทศไทย"}
                theme="uni"
                onClick={() => onNavigateToProjects('university')}
              />

              {/* Highlight Features - สไตล์การ์ดคลีน เรียบหรู 4 รายการ */}
              <div className="space-y-2 mb-5 flex-grow">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#F0F6FE] border border-slate-100/90 hover:border-[#BFDBFE] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#EAF1FE] text-[#2E60A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong className="text-slate-900 font-semibold">KiD-TECT :</strong> แอปพลิเคชันเกมการเรียนรู้เพื่อส่งเสริมแนวคิดเชิงคำนวณผ่านเรื่องพลังงานทดแทนในประเทศไทย
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#F0F6FE] border border-slate-100/90 hover:border-[#BFDBFE] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#EAF1FE] text-[#2E60A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong className="text-slate-900 font-semibold">เทคโนโลยี AR & Hand Detection :</strong> สื่อการเรียนรู้เสมือนจริงตรวจจับท่าทางมือ เพื่อการมีปฏิสัมพันธ์ที่สมจริง
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#F0F6FE] border border-slate-100/90 hover:border-[#BFDBFE] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#EAF1FE] text-[#2E60A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong className="text-slate-900 font-semibold">ผู้ช่วยสอน “บุญรอด AI” :</strong> บูรณาการ Google Gemini API คอยให้คำแนะนำและการเรียนรู้เฉพาะบุคคล
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#F0F6FE] border border-slate-100/90 hover:border-[#BFDBFE] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#EAF1FE] text-[#2E60A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong className="text-slate-900 font-semibold">KiD-TECT Insight Dashboard :</strong> ระบบวิเคราะห์และติดตามพัฒนาการของผู้เรียนรายบุคคล
                  </span>
                </div>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {(uniProjects[0]?.tools && uniProjects[0].tools.length > 0 
                  ? uniProjects[0].tools 
                  : ["Flutter", "Dart", "Firebase", "Next.js", "React", "TypeScript", "Tailwind CSS", "Gemini API", "AR", "Hand Detection", "Vercel", "GitHub"]
                ).map((tool, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white text-[#1B4B85] border border-[#BFDBFE] hover:bg-[#EAF1FE] hover:border-[#96C0FB] transition-colors shadow-2xs">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="p-6 pt-0 sm:p-8 sm:pt-0">
              <button
                onClick={() => onNavigateToProjects('university')}
                className="w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold text-[#184478] bg-gradient-to-r from-[#E3EFFE] via-[#EAF2FE] to-[#DCECFD] hover:from-[#D5E5FD] hover:to-[#D2E7FD] border border-[#B7D6FC] shadow-xs hover:shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <GraduationCap className="w-4 h-4 text-[#2E60A3]" />
                <span>ดูผลงานระดับมหาวิทยาลัย</span>
                <ArrowRight className="w-4 h-4 text-[#2E60A3] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Track 2: ช่วงมัธยมศึกษาตอนปลาย (High School Level) -> ชมพูพาสเทลสดใส */}
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            className="group relative rounded-3xl sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#FFF5F9] via-white to-white border border-[#F8BCD5] hover:border-[#F472B6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Accent Gradient Bar (ชมพู) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#DB2777] via-[#F472B6] to-[#FBCFE8]" />
            
            <div className="p-6 sm:p-8 flex-grow flex flex-col">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FDE7F2] text-[#862557] border border-[#FBCFE8] shadow-2xs">
                  <School className="w-3.5 h-3.5 text-[#A83870]" />
                  <span>High School Level • มัธยมศึกษา</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#862557] border border-[#FBCFE8] shadow-2xs">
                  {hsProjects.length} ผลงาน
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#1E293B] group-hover:text-[#862557] transition-colors mb-2 tracking-tight">
                {data.categories.highSchoolName}
              </h3>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 min-h-[44px]">
                ผลงานสิ่งประดิษฐ์ โครงงานนวัตกรรม และวิทยาการหุ่นยนต์ (Robotics/IoT) การบูรณาการเซนเซอร์อัจฉริยะ, โมดูลกล้อง AI HuskyLens, พลังงานแสงอาทิตย์ และเทคโนโลยีสิ่งอำนวยความสะดวก
              </p>

              {/* Real Project Preview Image Showcase with 1.5s Auto-Slide */}
              <div 
                onMouseEnter={() => setIsHsPaused(true)}
                onMouseLeave={() => setIsHsPaused(false)}
              >
                <TrackImagePreview
                  imageUrl={currentHsProject?.imageUrl || hsProjects[0]?.imageUrl}
                  fallbackLocalUrl="/images/smart-trash-sipsc.jpg"
                  alt={currentHsProject?.title || "High School Innovation"}
                  badgeTitle={currentHsProject?.title || "นวัตกรรมสิ่งประดิษฐ์"}
                  theme="hs"
                  slideIndex={activeHsProjectIndex + 1}
                  totalSlides={hsProjects.length}
                  isAutoPlaying={!isHsPaused}
                  onClick={() => onNavigateToProjects('highschool')}
                />
              </div>

              {/* Highlight Features - การ์ดสไตล์เรียบหรู คลีน มีระดับ ครบ 4 รายการสมดุล */}
              <div className="space-y-2 mb-5 flex-grow">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#FFF2F7] border border-slate-100/90 hover:border-[#FBCFE8] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#FDE7F2] text-[#A83870] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong className="text-slate-900 font-semibold">ถังคัดแยกขยะอัจฉริยะพลังงานแสงอาทิตย์ :</strong> จำแนกขยะ 4 ประเภทอัตโนมัติด้วย AI Object Classification ผ่านกล้อง HuskyLens
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#FFF2F7] border border-slate-100/90 hover:border-[#FBCFE8] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#FDE7F2] text-[#A83870] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong className="text-slate-900 font-semibold">แขนเทียมหยิบจับอัจฉริยะสำหรับผู้พิการ :</strong> เซนเซอร์ตรวจจับคลื่นไฟฟ้ากล้ามเนื้อ (EMG) ควบคุมกลไกการหยิบ-ปล่อย
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#FFF2F7] border border-slate-100/90 hover:border-[#FBCFE8] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#FDE7F2] text-[#A83870] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong className="text-slate-900 font-semibold">หุ่นยนต์พ่นปุ๋ยอัจฉริยะ :</strong> สั่งการไร้สาย GH:bit Controller และเคลื่อนที่พ่นปุ๋ยอัตโนมัติตามแท็ก QR Code
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/70 hover:bg-[#FFF2F7] border border-slate-100/90 hover:border-[#FBCFE8] transition-all">
                  <div className="w-5 h-5 rounded-full bg-[#FDE7F2] text-[#A83870] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong className="text-slate-900 font-semibold">รางวัลระดับนานาชาติ :</strong> ได้รับรางวัลจากการแข่งขัน SIPSC 2024 และสร้างต้นแบบใช้งานได้จริง
                  </span>
                </div>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {[
                  "Arduino IDE",
                  "HuskyLens AI",
                  "EMG Sensor",
                  "Solar Energy",
                  "Micro:bit",
                  "Object Classification",
                  "Robotics",
                  "Assistive Tech"
                ].map((tool, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white text-[#862557] border border-[#FBCFE8] hover:bg-[#FDE7F2] hover:border-[#F495BE] transition-colors shadow-2xs">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="p-6 pt-0 sm:p-8 sm:pt-0">
              <button
                onClick={() => onNavigateToProjects('highschool')}
                className="w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold text-[#721C4A] bg-gradient-to-r from-[#FDE2F0] via-[#FDF0F7] to-[#FCE6F3] hover:from-[#FCD3E6] hover:to-[#FBDCEE] border border-[#F6B0D0] shadow-xs hover:shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <School className="w-4 h-4 text-[#8C235E]" />
                <span>ดูผลงานช่วงมัธยมปลาย</span>
                <ArrowRight className="w-4 h-4 text-[#8C235E] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>


      {/* 3. CORE COMPETENCIES & PASSION PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pastel-header-cloud border border-[#D8C7F5] rounded-3xl sm:rounded-[36px] p-5 sm:p-7 lg:p-9 shadow-sm relative overflow-hidden">
          {/* Header area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-[#E8DCF9]/70">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D8C7F5] text-[#4F2B82] text-xs font-bold shadow-2xs mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#9B3EA8]" />
                <span>Core Competencies • ความเชี่ยวชาญ & ความสนใจ</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B1B47] tracking-tight">
                การผสานเทคโนโลยีสู่การเรียนรู้แห่งอนาคต
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                การบูรณาการเทคโนโลยีคอมพิวเตอร์ นวัตกรรมดิจิทัล และการออกแบบการเรียนรู้ เพื่อสร้างสรรค์สื่อและระบบที่ตอบโจทย์ผู้เรียนยุคใหม่
              </p>
            </div>
            
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D8C7F5] text-[#5B2586] text-xs font-bold shadow-2xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7E4BC4]" />
                <span>6 มิติความเชี่ยวชาญ</span>
              </span>
            </div>
          </div>

          {/* 6 Competencies Grid mapped from data.about.interests */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {data.about.interests.map((rawInterest, idx) => {
              const exact = getExactInterest(rawInterest);
              const meta = COMPETENCY_METAS[idx % COMPETENCY_METAS.length];
              const IconComp = meta.icon;

              return (
                <div 
                  key={idx}
                  className={`group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${meta.colorTheme.cardBg} border ${meta.colorTheme.border} shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    {/* Top row: Icon & Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${meta.colorTheme.iconBg} border flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black tracking-wider px-2.5 py-1 rounded-full bg-white/80 border border-slate-200/80 text-slate-500 font-mono shadow-2xs">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Titles directly from data */}
                    <div className="mb-2.5">
                      <h4 className={`text-base sm:text-lg font-black ${meta.colorTheme.titleColor} tracking-tight leading-snug`}>
                        {exact.en}
                      </h4>
                      {exact.th && (
                        <p className="text-xs font-semibold text-slate-700 mt-0.5">
                          {exact.th}
                        </p>
                      )}
                    </div>

                    {/* Factual Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal mb-3.5">
                      {meta.desc}
                    </p>

                    {/* Project Source Reference Badge */}
                    <div 
                      onClick={() => onNavigateToProjects(meta.categoryTarget)}
                      className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white border border-slate-200/80 text-[11px] text-slate-600 cursor-pointer transition-all hover:border-purple-300 shadow-2xs group/ref"
                      title="คลิกเพื่อเปิดดูผลงานที่เกี่ยวข้อง"
                    >
                      <FolderGit2 className="w-3.5 h-3.5 text-purple-600 shrink-0 group-hover/ref:scale-110 transition-transform" />
                      <span className="text-slate-500 font-medium">
                        ผลงานจริง : <span className="font-bold text-slate-800 group-hover/ref:text-purple-700 transition-colors">{meta.relatedProject}</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover/ref:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Real Tools & Skills Tags from Project Data */}
                  <div className="pt-3 border-t border-slate-200/50 flex flex-wrap gap-1.5 mt-auto">
                    {meta.toolsAndSkills.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`text-[10.5px] sm:text-[11px] font-medium px-2.5 py-1 rounded-full ${meta.colorTheme.tagBg} border shadow-2xs transition-colors`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 4. CONTACT SECTION ("ช่องทางการติดต่อ") */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="pastel-header-cloud border border-[#D8C7F5] rounded-3xl sm:rounded-[36px] p-5 sm:p-7 lg:p-9 shadow-sm relative overflow-hidden">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-7 pb-4 border-b border-[#E8DCF9]/70">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#D8C7F5] text-[#4F2B82] text-xs font-bold shadow-2xs mb-3">
                <Mail className="w-3.5 h-3.5 text-[#9B3EA8]" />
                <span>Get in Touch • ติดต่อสอบถาม</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B1B47] tracking-tight">
                ช่องทางการติดต่อ
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                หากต้องการติดต่อเพื่อพูดคุย แลกเปลี่ยนความรู้ เสนอโปรเจกต์ความร่วมมือ หรือสอบถามข้อมูลเพิ่มเติม สามารถติดต่อได้ตามช่องทางด้านล่างนี้
              </p>
            </div>

            {/* Active Status Badge */}
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#D8C7F5] text-[#5B2586] text-xs font-bold shadow-2xs flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>พร้อมติดต่อ & แลกเปลี่ยนความรู้</span>
              </span>
            </div>
          </div>

          {/* 3 Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            {/* Card 1: Email */}
            <div className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FAF5FE] via-white to-[#F8F2FD] border border-[#E2D4F8] hover:border-[#C09CF5] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6D28D9] via-[#8B5CF6] to-[#C026D3] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-[#F3ECFD] text-[#6D28D9] border border-[#E5D8FC]">
                    อีเมลมหาวิทยาลัย
                  </span>
                </div>

                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </h4>
                <p className="text-sm sm:text-base font-black text-[#2B1B47] break-all select-all font-mono tracking-tight leading-snug">
                  {data.contact.email}
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  สำหรับการติดต่องาน การศึกษา ข้อเสนอความร่วมมือ และการเรียนรู้
                </p>
              </div>

              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-200/60">
                <a
                  href={`mailto:${data.contact.email}`}
                  className="flex-1 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#EDE9FE] to-[#F3E8FF] hover:from-[#E4D4F8] hover:to-[#EADCFB] text-[#5B21B6] border border-[#DDD6FE] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-98 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ส่งอีเมล</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF6FE] border border-[#DDD6FE] text-slate-600 hover:text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-98 cursor-pointer"
                  title="คัดลอกอีเมล"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600 text-[11px]">คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600 text-[11px]">คัดลอก</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Card 2: Facebook */}
            <a
              href={data.contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#F0F6FE] via-white to-[#F2F7FE] border border-[#BED8FC] hover:border-[#60A5FA] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-[#EAF1FE] text-[#1D4ED8] border border-[#BED8FC]">
                    Social Profile
                  </span>
                </div>

                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Facebook Profile
                </h4>
                <p className="text-base sm:text-lg font-black text-[#1E3A8A] group-hover:text-[#1D4ED8] transition-colors tracking-tight leading-snug">
                  {data.contact.facebookName}
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  ทักข้อความ สนทนา หรือติดตามข่าวสารผลงานและนวัตกรรม
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#EAF1FE] to-[#F0F6FE] group-hover:from-[#DBEAFE] group-hover:to-[#EBF3FE] text-[#1D4ED8] border border-[#BED8FC] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs">
                  <span>เปิดโปรไฟล์ Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1D4ED8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>

            {/* Card 3: Instagram */}
            <a
              href={data.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FFF2F8] via-white to-[#FFF4F9] border border-[#FBCFE8] hover:border-[#F472B6] shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-[#FDE7F2] text-[#BE185D] border border-[#F8BCD5]">
                    Lifestyle & Photos
                  </span>
                </div>

                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Instagram
                </h4>
                <p className="text-base sm:text-lg font-black text-[#831843] group-hover:text-[#BE185D] transition-colors tracking-tight leading-snug">
                  @{data.contact.instagramName}
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  ภาพกิจกรรม ไลฟ์สไตล์ และเบื้องหลังผลงานและการเรียน
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60">
                <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FDE7F2] to-[#FFF0F7] group-hover:from-[#FBCFE8] group-hover:to-[#FDE7F2] text-[#BE185D] border border-[#F8BCD5] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs">
                  <span>เปิด Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#BE185D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>

          </div>

        </div>
      </section>

    </div>
  );
};
