import { Project } from '../types';

/**
 * คำนวณคะแนนความตรงกัน (Relevance Score) ระหว่างผลงานกับคำค้นหา
 * - ให้คะแนนสูงสุดกับคำค้นหาที่ตรงกับชื่อผลงาน (Title) โดยเฉพาะขึ้นต้นด้วยคำนั้น
 * - ให้คะแนนคำอธิบายย่อและละเอียด (Short/Full Description), เครื่องมือ (Tools), ประเภทผลงาน (ProjectType)
 * - ป้องกันการจับคู่คำค้นหาลอยๆ ที่แฝงอยู่ในทักษะทั่วไป (Skills) โดยต้องตรงตัวหรือขึ้นต้น เพื่อความแม่นยำสูง
 */
export function calculateProjectRelevance(project: Project, rawQuery: string): number {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return 1;

  const tokens = query.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 1;

  const title = (project.title || '').toLowerCase();
  const shortDesc = (project.shortDescription || '').toLowerCase();
  const fullDesc = (project.fullDescription || '').toLowerCase();
  const projectType = (project.projectType || '').toLowerCase();
  const year = (project.year || '').toLowerCase();
  const tools = (project.tools || []).map(t => t.toLowerCase());
  const skills = (project.skills || []).map(s => s.toLowerCase());

  let totalScore = 0;
  let allTokensMatched = true;

  // 1. ตรวจสอบวลีเต็มกับชื่อเรื่อง (Title Matches - ความสำคัญสูงสุด)
  if (title.startsWith(query)) {
    totalScore += 350;
  } else if (title.includes(query)) {
    totalScore += 180;
  }

  // 2. ตรวจสอบคำอธิบาย (Descriptions)
  if (shortDesc.includes(query)) {
    totalScore += 70;
  }
  if (fullDesc.includes(query)) {
    totalScore += 35;
  }

  // 3. ประเภทผลงาน (Project Type)
  if (projectType.includes(query)) {
    totalScore += 60;
  }

  // 4. เครื่องมือและเทคโนโลยี (Tools / Tech Stack)
  if (tools.some(t => t === query || t.startsWith(query))) {
    totalScore += 90;
  } else if (tools.some(t => t.includes(query))) {
    totalScore += 45;
  }

  // 5. ปีและหมวดหมู่ (Year & Category)
  if (year.includes(query)) {
    totalScore += 40;
  }
  if (project.category === 'university' && 'มหาวิทยาลัย university ป.ตรี ugrd'.includes(query)) {
    totalScore += 50;
  } else if (project.category === 'highschool' && 'มัธยมปลาย มัธยม highschool high school'.includes(query)) {
    totalScore += 50;
  }

  // 6. ทักษะเด่น (Skills) - ต้องตรงตัวหรือขึ้นต้นด้วยคำค้นหาเท่านั้น
  // เพื่อป้องกันกรณีเช่น "หุ่นยน" ไปติดในทักษะ "วิทยาการหุ่นยนต์" ของผลงานที่ไม่ใช่หุ่นยนต์
  for (const s of skills) {
    if (s === query || s.startsWith(query)) {
      totalScore += 35;
    }
  }

  // 7. การค้นหาหลายคำ (Multi-token match)
  if (tokens.length > 1) {
    for (const token of tokens) {
      let tokenScore = 0;
      if (title.includes(token)) tokenScore += 60;
      if (shortDesc.includes(token)) tokenScore += 25;
      if (projectType.includes(token)) tokenScore += 20;
      if (tools.some(t => t.includes(token))) tokenScore += 25;
      if (skills.some(s => s === token || s.startsWith(token))) tokenScore += 15;

      if (tokenScore === 0) {
        allTokensMatched = false;
      } else {
        totalScore += tokenScore;
      }
    }

    if (allTokensMatched) {
      totalScore += 120;
    }
  }

  return totalScore;
}

/**
 * ค้นหาและเรียงลำดับผลงานตามคะแนนความแม่นยำ (Relevance Ranking)
 */
export function filterAndRankProjects(projects: Project[], query: string): Project[] {
  const q = query.trim();
  if (!q) return projects;

  const scored = projects
    .map(p => ({
      project: p,
      score: calculateProjectRelevance(p, q)
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(item => item.project);
}
