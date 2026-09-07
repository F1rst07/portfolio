import { PortfolioData } from '../types';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  hero: {
    badgeText: "PORTFOLIO • PROJECTS",
    mainHeading: "My Projects",
    thaiSubheading: "ผลงานและประสบการณ์ของฉัน",
    description: "พื้นที่รวบรวมผลงานที่เกิดจากการเรียนรู้ การลงมือทำ และการพัฒนาทักษะของผม ทั้งในช่วงมัธยมศึกษาตอนปลายและระดับมหาวิทยาลัย",
    ownerName: "Phiraphat Khodsawat",
    ownerThaiName: "พีรพัฒน์ คชสวัสดิ์",
    ownerNickname: "First",
    ownerMajor: "Computer Education (คอมพิวเตอร์ศึกษา)",
    primaryButtonText: "ดูผลงานของฉัน",
    secondaryButtonText: "แก้ไขข้อมูล",
    heroImageUrl: ""
  },
  about: {
    greeting: "สวัสดีครับ ผมชื่อ",
    fullName: "พีรพัฒน์ คชสวัสดิ์",
    nickname: "เฟิร์ส",
    studentYear: "ชั้นปีที่ 2",
    major: "วิชาเอกคอมพิวเตอร์การศึกษา สาขาวิชาเทคโนโลยีการศึกษา",
    faculty: "คณะครุศาสตร์",
    university: "จุฬาลงกรณ์มหาวิทยาลัย",
    bio: "ผมสนใจด้านคอมพิวเตอร์ เทคโนโลยี และการออกแบบสื่อเพื่อการเรียนรู้ รวมถึงชอบเรียนรู้และทดลองใช้เทคโนโลยีใหม่ๆ เพื่อนำมาพัฒนาผลงานของตนเองครับ",
    interests: [
      "Educational Technology • เทคโนโลยีการศึกษา",
      "Web & Mobile App Development • พัฒนาเว็บและแอปพลิเคชัน",
      "Computational Thinking • แนวคิดเชิงคำนวณ",
      "Interactive & Game Learning • สื่อการเรียนรู้เชิงปฏิสัมพันธ์",
      "UI/UX for Learning Media • ออกแบบสื่อการเรียนรู้",
      "AI & AR Innovation • นวัตกรรม AI และ AR"
    ]
  },
  contact: {
    email: "6842414727@student.chula.ac.th",
    facebookName: "Phiraphat Khodsawat",
    facebookUrl: "https://www.facebook.com/Phiraphat.5811/",
    instagramName: "fxr.stz",
    instagramUrl: "https://www.instagram.com/fxr.stz/",
    note: "หากต้องการสอบถามข้อมูลหรือแลกเปลี่ยนความคิดเห็นเกี่ยวกับผลงาน สามารถติดต่อฉันได้ผ่านช่องทางต่อไปนี้"
  },
  categories: {
    allLabel: "ทั้งหมด",
    allLabelEn: "All Projects",
    highSchoolName: "ช่วงมัธยมศึกษาตอนปลาย",
    highSchoolEn: "High School Projects",
    universityName: "ช่วงระดับมหาวิทยาลัย",
    universityEn: "University Projects"
  },
  projects: [
    {
      id: "uni-1",
      title: "KiD-TECT แอปพลิเคชันเกมการเรียนรู้เพื่อส่งเสริมแนวคิดเชิงคำนวณผ่านเรื่องพลังงานทดแทนในประเทศไทย",
      shortDescription: "แอปพลิเคชันเกมการเรียนรู้สำหรับผู้เรียนระดับประถมศึกษาตอนปลายถึงมัธยมศึกษาตอนต้น ออกแบบเพื่อส่งเสริมแนวคิดเชิงคำนวณและสร้างความตระหนักเรื่องพลังงานทดแทน ผ่านแผนที่การเรียนรู้ 4 ภูมิภาคของประเทศไทย โดยประยุกต์ใช้เทคโนโลยี AR การตรวจจับท่าทางมือ ผู้ช่วยสอน “บุญรอด AI” และระบบ KiD-TECT Insight Dashboard สำหรับติดตามพัฒนาการของผู้เรียนรายบุคคล",
      fullDescription: "แอปพลิเคชันเกมการเรียนรู้สำหรับผู้เรียนระดับประถมศึกษาตอนปลายถึงมัธยมศึกษาตอนต้น ออกแบบเพื่อส่งเสริมแนวคิดเชิงคำนวณและสร้างความตระหนักเรื่องพลังงานทดแทน ผ่านแผนที่การเรียนรู้ 4 ภูมิภาคของประเทศไทย โดยประยุกต์ใช้เทคโนโลยี AR การตรวจจับท่าทางมือ ผู้ช่วยสอน “บุญรอด AI” และระบบ KiD-TECT Insight Dashboard สำหรับติดตามพัฒนาการของผู้เรียนรายบุคคล",
      category: "university",
      year: "2569 (ชั้นปีที่ 2)",
      projectType: "Educational Technology (เทคโนโลยีการศึกษา)",
      myRole: "ผู้ออกแบบแนวคิดการเรียนรู้ พัฒนาแอปพลิเคชันด้วย Flutter บูรณาการ AR, Hand Detection และระบบ Google Gemini AI",
      tools: [
        "Flutter",
        "Dart",
        "Firebase",
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Google Gemini API",
        "Augmented Reality (AR)",
        "Hand Detection",
        "Vercel",
        "GitHub"
      ],
      learned: "การบูรณาการเทคโนโลยี AR และ AI เข้ากับการออกแบบสื่อการเรียนรู้เชิงปฏิสัมพันธ์ รวมถึงการวิเคราะห์พัฒนาการผู้เรียนผ่านแดชบอร์ด",
      skills: [
        "การพัฒนาแอปพลิเคชันมือถือ",
        "การพัฒนาเว็บแอปพลิเคชัน",
        "การออกแบบเกมเพื่อการเรียนรู้",
        "การออกแบบ UI/UX",
        "การประยุกต์ใช้ปัญญาประดิษฐ์",
        "การพัฒนาเทคโนโลยี AR",
        "การจัดการฐานข้อมูล",
        "การวิเคราะห์ข้อมูลการเรียนรู้",
        "การคิดเชิงคำนวณ",
        "การทำงานเป็นทีม"
      ],
      imageUrl: "https://drive.google.com/file/d/1RG5i6Pn4LcftjG4LZnDTOZ1xUhd7zLBi/view?usp=sharing",
      projectUrl: "https://drive.google.com/file/d/1efnDKq1L7CAF8zHfy9_fAp_C_2P328PT/view?usp=sharing",
      buttonText: "เปิดผลงาน"
    },
    {
      id: "hs-2",
      title: "ถังคัดแยกขยะอัจฉริยะพลังงานแสงอาทิตย์ผ่านระบบโมดูลกล้อง Huskylens",
      shortDescription: "ถังคัดแยกขยะอัจฉริยะพลังงานแสงอาทิตย์ผ่านระบบโมดูลกล้อง Huskylens ใช้ฟังก์ชัน Object Classification ของโมดูลกล้อง Huskylens ให้จำแนก คัดแยกประเภทขยะอัตโนมัติ โดยไม่ต้องคำนึงคิดแยกประเภทขยะด้วยตนเอง จำแนกขยะได้ 4 ประเภท คือ กระดาษ ขวดพลาสติก ขวดแก้ว และกระป๋องโลหะ",
      fullDescription: "ถังคัดแยกขยะอัจฉริยะพลังงานแสงอาทิตย์ผ่านระบบโมดูลกล้อง Huskylens ใช้ฟังก์ชัน Object Classification ของโมดูลกล้อง Huskylens ให้จำแนก คัดแยกประเภทขยะอัตโนมัติ โดยไม่ต้องคำนึงคิดแยกประเภทขยะด้วยตนเอง จำแนกขยะได้ 4 ประเภท คือ กระดาษ ขวดพลาสติก ขวดแก้ว และกระป๋องโลหะ",
      category: "highschool",
      year: "2567 (มัธยมศึกษาปีที่ 6)",
      projectType: "Energy & Environmental Innovation (นวัตกรรมพลังงานและสิ่งแวดล้อม)",
      myRole: "ผู้พัฒนาและประกอบระบบฮาร์ดแวร์ เทรนโมเดลกล้อง AI HuskyLens และเขียนโปรแกรมควบคุม",
      tools: [
        "Arduino IDE"
      ],
      learned: "ได้พัฒนาทักษะ Object Classification ด้วยกล้อง AI, ระบบพลังงานแสงอาทิตย์ และการออกแบบกลไกคัดแยกขยะอัตโนมัติ",
      skills: [
        "การเขียนโปรแกรม",
        "วิทยาการหุ่นยนต์",
        "ปัญญาประดิษฐ์",
        "การจำแนกวัตถุด้วยกล้อง HuskyLens",
        "ระบบควบคุมอัตโนมัติ",
        "เทคโนโลยีพลังงานแสงอาทิตย์",
        "การแก้ปัญหาเชิงวิศวกรรม"
      ],
      imageUrl: "https://drive.google.com/file/d/1PzaYsdb3BMnhaQTdg7axP8VqDKzukgJP/view?usp=sharing",
      projectUrl: "https://drive.google.com/file/d/1jPv5q3fjb0sRO3gUUCoIEcLPYF6cz1uZ/view?usp=sharing",
      buttonText: "เปิดผลงาน"
    },
    {
      id: "hs-3",
      title: "แขนเทียมหยิบจับอัจฉริยะสำหรับผู้พิการ",
      shortDescription: "แขนเทียมหยิบจับอัจฉริยะสำหรับผู้พิการ ใช้ระบบเซนเซอร์ตรวจจับกล้ามเนื้อตรวจจับคลื่นไฟฟ้าของกล้ามเนื้อ (EMG) เมื่อไม่มีการเกร็งกล้ามเนื้อ แขนเทียมหยิบจับอัจฉริยะจะไม่มีการทำงาน ถ้าต้องการให้แขนเทียมหยิบจับอัจฉริยะหยิบจับสิ่งของ เราต้องเกร็งกล้ามเนื้อ 1 ครั้ง และเมื่อต้องการให้แขนเทียมหยิบจับอัจฉริยะ ปล่อยสิ่งของ ให้เราเกร็งกล้ามเนื้อซ้ำอีก 1 ครั้ง",
      fullDescription: "แขนเทียมหยิบจับอัจฉริยะสำหรับผู้พิการ ใช้ระบบเซนเซอร์ตรวจจับกล้ามเนื้อตรวจจับคลื่นไฟฟ้าของกล้ามเนื้อ (EMG) เมื่อไม่มีการเกร็งกล้ามเนื้อ แขนเทียมหยิบจับอัจฉริยะจะไม่มีการทำงาน ถ้าต้องการให้แขนเทียมหยิบจับอัจฉริยะหยิบจับสิ่งของ เราต้องเกร็งกล้ามเนื้อ 1 ครั้ง และเมื่อต้องการให้แขนเทียมหยิบจับอัจฉริยะ ปล่อยสิ่งของ ให้เราเกร็งกล้ามเนื้อซ้ำอีก 1 ครั้ง",
      category: "highschool",
      year: "2566 (มัธยมศึกษาปีที่ 5)",
      projectType: "Assistive Technology (เทคโนโลยีสิ่งอำนวยความสะดวกสำหรับผู้พิการ)",
      myRole: "ผู้ออกแบบกลไกแขนเทียม ต่อวงจรเซนเซอร์ EMG และเขียนโค้ดสั่งการมอเตอร์",
      tools: [
        "Arduino IDE"
      ],
      learned: "เข้าใจพื้นฐานการตรวจวัดสัญญาณคลื่นไฟฟ้ากล้ามเนื้อ (EMG), การควบคุมเซอร์โวมอเตอร์ และการออกแบบกายอุปกรณ์ช่วยเหลือผู้พิการ",
      skills: [
        "การเขียนโปรแกรม",
        "ปัญญาประดิษฐ์",
        "เซนเซอร์ตรวจจับสัญญาณกล้ามเนื้อ (EMG)",
        "ระบบควบคุมอัตโนมัติ",
        "การออกแบบอุปกรณ์ช่วยเหลือผู้พิการ",
        "การแก้ปัญหาเชิงวิศวกรรม"
      ],
      imageUrl: "https://drive.google.com/file/d/1xYfHpsGxO9BaMw1_vKPKzYEg_SzEq9Xr/view?usp=sharing",
      projectUrl: "https://drive.google.com/file/d/1Oqw6awgKxtOnJIqBqaleCht5ate9dr-l/view?usp=sharing",
      buttonText: "เปิดผลงาน"
    },
    {
      id: "hs-1",
      title: "หุ่นยนต์พ่นปุ๋ยอัจฉริยะควบคุมผ่านระบบโมดูลกล้อง Huskylens",
      shortDescription: "หุ่นยนต์พ่นปุ๋ยอัจฉริยะควบคุมผ่านระบบโมดูลกล้อง Huskylens มี 2 ระบบ ในการทำงาน คือ ระบบที่ 1 สามารถควบคุม การเคลื่อนที่ของหุ่นยนต์ การเปิด-ปิดพ่นปุ๋ยระยะไกลได้ โดยการสั่งการผ่าน GH:bit Controller และระบบที่ 2 หุ่นยนต์สามารถเคลื่อนที่ และพ่นปุ๋ยอัตโนมัติผ่านระบบการจดจำแท็กคิวอาร์โค้ดของโมดูลกล้อง Huskylens",
      fullDescription: "หุ่นยนต์พ่นปุ๋ยอัจฉริยะควบคุมผ่านระบบโมดูลกล้อง Huskylens มี 2 ระบบ ในการทำงาน คือ ระบบที่ 1 สามารถควบคุม การเคลื่อนที่ของหุ่นยนต์ การเปิด-ปิดพ่นปุ๋ยระยะไกลได้ โดยการสั่งการผ่าน GH:bit Controller และระบบที่ 2 หุ่นยนต์สามารถเคลื่อนที่ และพ่นปุ๋ยอัตโนมัติผ่านระบบการจดจำแท็กคิวอาร์โค้ดของโมดูลกล้อง Huskylens",
      category: "highschool",
      year: "2565 (มัธยมศึกษาปีที่ 4)",
      projectType: "Agricultural Innovation (นวัตกรรมเพื่อการเกษตร)",
      myRole: "ผู้ออกแบบระบบควบคุม หุ่นยนต์ และโปรแกรม micro:bit",
      tools: [
        "makecode (micro:bit)"
      ],
      learned: "ได้ฝึกทักษะการทำงานเป็นทีม, การเขียนโปรแกรมควบคุมหุ่นยนต์ และการประยุกต์ใช้โมดูลกล้อง AI สำหรับการเกษตร",
      skills: [
        "Robotics",
        "Micro:bit Programming",
        "HuskyLens AI",
        "Agricultural Tech"
      ],
      imageUrl: "https://drive.google.com/file/d/1SoYwU2INDMaxAkA3UQluMaFF_TI5vclq/view?usp=sharing",
      projectUrl: "https://drive.google.com/file/d/1KL6-2FtT_fH4lwOR8H-fc0W8XRSJu0Ay/view?usp=drive_link",
      buttonText: "เปิดผลงาน"
    }
  ]
};

export const LOCAL_STORAGE_KEY = 'phiraphat_portfolio_data_v16';
export const EDIT_MODE_KEY = 'phiraphat_portfolio_edit_mode';

export function loadPortfolioData(): PortfolioData {
  try {
    // Purge legacy cache keys to prevent stale data
    for (let i = 1; i <= 15; i++) {
      try {
        localStorage.removeItem(`phiraphat_portfolio_data_v${i}`);
      } catch {
        // ignore
      }
    }

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate basic structure
      if (parsed && parsed.hero && parsed.categories && Array.isArray(parsed.projects)) {
        const sanitizedProjects = (parsed.projects.length > 0 ? parsed.projects : DEFAULT_PORTFOLIO_DATA.projects).map((p: any) => {
          let updatedYear = p.year;
          if (p.id === 'uni-1') updatedYear = '2569 (ชั้นปีที่ 2)';
          if (p.id === 'hs-2') updatedYear = '2567 (มัธยมศึกษาปีที่ 6)';
          if (p.id === 'hs-3') updatedYear = '2566 (มัธยมศึกษาปีที่ 5)';
          if (p.id === 'hs-1') updatedYear = '2565 (มัธยมศึกษาปีที่ 4)';

          return {
            ...p,
            year: updatedYear,
            title: typeof p.title === 'string' ? p.title.replace(/คำนวณ\s+ผ่าน/g, 'คำนวณผ่าน') : p.title,
            shortDescription: typeof p.shortDescription === 'string' ? p.shortDescription.replace(/คำนวณ\s+ผ่าน/g, 'คำนวณผ่าน') : p.shortDescription,
            fullDescription: typeof p.fullDescription === 'string' ? p.fullDescription.replace(/คำนวณ\s+ผ่าน/g, 'คำนวณผ่าน') : p.fullDescription,
          };
        });

        return {
          ...DEFAULT_PORTFOLIO_DATA,
          ...parsed,
          hero: { ...DEFAULT_PORTFOLIO_DATA.hero, ...(parsed.hero || {}) },
          about: { ...DEFAULT_PORTFOLIO_DATA.about, ...(parsed.about || {}) },
          contact: { ...DEFAULT_PORTFOLIO_DATA.contact, ...(parsed.contact || {}) },
          categories: { ...DEFAULT_PORTFOLIO_DATA.categories, ...(parsed.categories || {}) },
          projects: sanitizedProjects
        };
      }
    }
  } catch (err) {
    console.error("Error loading portfolio data from localStorage", err);
  }
  return DEFAULT_PORTFOLIO_DATA;
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving portfolio data to localStorage", err);
  }
}

export function resetPortfolioData(): PortfolioData {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error("Error resetting portfolio data", err);
  }
  return DEFAULT_PORTFOLIO_DATA;
}

export function loadEditMode(): boolean {
  try {
    const saved = localStorage.getItem(EDIT_MODE_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
  } catch (err) {
    console.error("Error loading edit mode preference", err);
  }
  // Default is false (view only mode - hidden edit buttons as requested)
  return false;
}

export function saveEditMode(enabled: boolean): void {
  try {
    localStorage.setItem(EDIT_MODE_KEY, String(enabled));
  } catch (err) {
    console.error("Error saving edit mode preference", err);
  }
}
