import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'zh-TW' | 'zh-CN' | 'en'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

// 语言映射对象
type LanguageTexts = {
  name: string;
  pageTitle: string;
  downloadPDF: string;
  alternativeDownload: string;
  languageToggle: string;
  professionalSummary: string;
  technicalSkills: string;
  coreSkills: string;
  stylingSkills: string;
  performanceSkills: string;
  visualizationSkills: string;
  remoteSkills: string;
  collaborationSkills: string;
  troubleshootingSkills: string;
  workExperience: string;
  frontendEngineer: string;
  company1: string;
  company2: string;
  company3: string;
  projectExperience: string;
  educationBackground: string;
  bachelor: string;
  university: string;
  graduated: string;
  softSkills: string;
  uiUx: string;
  teamCollaboration: string;
  codeQuality: string;
  remoteWork: string;
  salaryExpectations: string;
  remoteWorkOption: string;
  projectCooperation: string;
  fullTime: string;
  thanksMessage: string;
  professionalSummaryText: string;
  coreSkillsText: string;
  stylingSkillsText: string;
  performanceSkillsText: string;
  visualizationSkillsText: string;
  remoteSkillsText: string;
  collaborationSkillsText: string;
  troubleshootingSkillsText: string;
  uiUxDescription: string;
  teamCollaborationDescription: string;
  codeQualityDescription: string;
  remoteWorkDescription: string;
  salaryRemoteWorkDescription: string;
  salaryProjectCooperationDescription: string;
  salaryFullTimeDescription: string;
  tencentProjectTech: string;
  tencentProjectLink: string;
  // 工作经历详情
  experience1Period: string;
  experience2Period: string;
  experience3Period: string;
  // 项目名称
  project1: string;
  project2: string;
  project3: string;
  project4: string;
  // 项目详情
  project1Description: string;
  project2Description: string;
  project3Description: string;
  project4Description: string;
  project3Link: string;
  project3Code: string;
  project4Link: string;
  project4Code: string;
  // 项目要点
  project1Point1: string;
  project1Point2: string;
  project1Point3: string;
  project2Point1: string;
  project2Point2: string;
  project3Point1: string;
  project3Point2: string;
  project4Point1: string;
  project4Point2: string;
  // 工作职责
  experience1Duty1: string;
  experience1Duty2: string;
  experience1Duty3: string;
  experience2Duty1: string;
  experience2Duty2: string;
  experience3Duty1: string;
  experience3Duty2: string;
}

export const languageMap: Record<Language, LanguageTexts> = {
  'zh-TW': {
    name: '王宇皎',
    pageTitle: '前端開發工程師',
    downloadPDF: '打印/下載PDF',
    alternativeDownload: '備選方式',
    languageToggle: '切換到簡體',
    professionalSummary: '專業簡介',
    technicalSkills: '技術棧',
    coreSkills: '核心技能：',
    stylingSkills: '樣式與交互：',
    performanceSkills: '性能與工程化：',
    visualizationSkills: '可視化與工具：',
    remoteSkills: '遠端協作能力：',
    collaborationSkills: '跨團隊協作：',
    troubleshootingSkills: '問題排查：',
    workExperience: '工作經歷',
    frontendEngineer: '前端開發工程師',
    company1: '廣東江夏生態建設有限公司',
    company2: '上海屹通信息科技發展有限公司',
    company3: '華付信息',
    projectExperience: '專案經驗',
    educationBackground: '教育背景',
    bachelor: '網路工程 - 全日制本科',
    university: '江西工程學院',
    graduated: '2018年畢業',
    softSkills: '軟技能與專業素養',
    uiUx: 'UI/UX 追求',
    teamCollaboration: '團隊協作',
    codeQuality: '程式碼品質',
    remoteWork: '遠端協作',
    salaryExpectations: '薪資期望',
    remoteWorkOption: '遠端工作',
    projectCooperation: '專案合作',
    fullTime: '全職崗位',
    thanksMessage: '感謝您花時間審閱我的簡歷，期待與您進一步交流',
    experience1Period: '2025.03 - 2025.05',
    experience2Period: '2022.04 - 2025.01',
    experience3Period: '2018.03 - 2022.02',
    // 项目名称
    project1: '東莞農商數位銀行',
    project2: '騰訊設計雲 Codesign',
    project3: 'portfolio-vue3-vite - 前端作品集',
    project4: 'SaladGo - React 移動端電商',
    // 项目详情
    project1Description: '為銀行業務員提供高效的業務辦理通道，支援信用卡、數位卡、個人資訊維護、借記卡、綜合簽約等多業務模組。',
    project2Description: '類藍湖的設計協作平台，支援跨部門協作與權限控管。',
    project3Description: '個人前端作品集專案，展示多個前端技術案例和互動效果。',
    project4Description: '移動端電商應用，實現完整的購物流程和使用者互動體驗。',
    project3Link: '線上展示: https://portfolio-vue3-vite-git-master-oopeachboys-projects.vercel.app/',
    project3Code: '程式碼: https://github.com/ooBean/portfolio-vue3-vite',
    project4Link: '線上展示: https://salad-copsj7hmj-oopeachboys-projects.vercel.app/',
    project4Code: '程式碼: https://github.com/ooBean/salad-app',
    // 项目要点
    project1Point1: '元件庫設計提升開發效率',
    project1Point2: '基於角色的權限體系，多端適配實現程式碼複用',
    project1Point3: '效能優化提升30%業務效率',
    project2Point1: '參與前端模組開發與互動優化，改善設計協作體驗',
    project2Point2: '實現多角色權限控制與設計稿註解功能，提升跨部門溝通效率',
    project3Point1: '現代前端技術棧，GPU加速動畫，3D互動卡片',
    project3Point2: '完整國際化、響應式設計',
    project4Point1: '現代化技術棧，響應式設計',
    project4Point2: 'Redux狀態管理，流暢動畫效果，完整電商流程',
    // 工作职责
    experience1Duty1: '維護並疊代小象城泊小程式與後台系統，負責關鍵功能交付，上線穩定率 >95%；實施程式碼分割與懶加載使首屏加載提升約30%。',
    experience1Duty2: '優化系統性能，通過引入Web Workers處理複雜計算，減少主線程阻塞，提升用戶體驗。',
    experience1Duty3: '與後端團隊緊密合作，設計並實現 RESTful API 接口，有效提升前後端數據交互的穩定性與高效性，成功減少有效提升資料傳輸穩定性與速度（約 25–30%）。',
    experience2Duty1: '參與多個核心模組的功能開發與交付，透過相容性修復與元件庫規範化，使相關 bug 減少約 40%，開發效率提升約 25%。',
    experience2Duty2: '設計並實現可重用的UI組件庫，提高團隊開發效率，減少重複代碼約30%。',
    experience3Duty1: '負責企業級後台管理平台與權限系統的核心功能開發，透過前端模組化與代碼規範，減少重複開發約 20%，提升系統可維護性與交付穩定性。',
    experience3Duty2: '參與前端開發流程與代碼規範的優化，協助提升團隊協作效率與代碼一致性。',
    professionalSummaryText: '資深前端工程師，具備 5 年企業級 JavaScript 及 Vue 2/3 專案經驗，熟悉 TypeScript（1–2 年），擁有 React 個人專案實踐經歷。專精於效能優化、元件化開發及多端適配（Web／行動端／小程式），能獨立推進複雜功能開發，並於遠端協作環境中高效溝通與準時交付。',
    coreSkillsText: 'JavaScript（5 年經驗）、TypeScript（1–2 年）、Vue 2/3（專家級）、React（個人專案實踐 1–2 年）、Vite',
    stylingSkillsText: 'CSS3、LESS／SCSS、響應式設計、可訪問性、主題定制',
    performanceSkillsText: '程式碼分割、懶加載、元件庫建設、多端適配、熟悉基於 Git 的 CI/CD 流程，能利用 Vercel 等平台實現前端專案的自動化構建與持續部署 (Continuous Deployment)。',
    visualizationSkillsText: 'Echarts、Element-UI、GitHub Copilot',
    remoteSkillsText: '熟悉 Git 協作流程，能夠高效完成跨時區遠端前端開發任務',
    collaborationSkillsText: '具備較強跨團隊協作能力，能夠推動前端規範與元件化建設',
    troubleshootingSkillsText: '熟悉生產環境排查與效能優化，能快速定位和解決問題',
    uiUxDescription: '注重使用者體驗與介面細節，追求高效、直觀的互動設計。',
    teamCollaborationDescription: '熟悉 Git Flow，遵循團隊規範，樂於分享，高效協作。',
    codeQualityDescription: '遵循 Airbnb 風格指南，注重程式碼可讀性與可維護性。',
    remoteWorkDescription: '熟悉遠端協作流程與工具，擅長非同步溝通與自我管理。',
    salaryRemoteWorkDescription: '可接受全球範圍內的遠端工作機會。',
    salaryProjectCooperationDescription: '短期或長期的專案合作模式均可探討。',
    salaryFullTimeDescription: '期望一份能穩定貢獻價值的全職工作。',
    tencentProjectTech: 'Vue 2 + Element-UI + Webpack',
    tencentProjectLink: '線上展示: https://codesign.qq.com/sites/design'
  },
  'zh-CN': {
    name: '王宇皎',
    pageTitle: '前端开发工程师',
    downloadPDF: '打印/下载PDF',
    alternativeDownload: '备选方式',
    languageToggle: '切换到英文',
    professionalSummary: '专业简介',
    technicalSkills: '技术栈',
    coreSkills: '核心技能：',
    stylingSkills: '样式与交互：',
    performanceSkills: '性能与工程化：',
    visualizationSkills: '可视化与工具：',
    remoteSkills: '远程协作能力：',
    collaborationSkills: '跨团队协作：',
    troubleshootingSkills: '问题排查：',
    workExperience: '工作经历',
    frontendEngineer: '前端开发工程师',
    company1: '广东江夏生态建设有限公司',
    company2: '上海屹通信息科技发展有限公司',
    company3: '华付信息',
    projectExperience: '项目经验',
    educationBackground: '教育背景',
    bachelor: '网络工程 - 全日制本科',
    university: '江西工程学院',
    graduated: '2018年毕业',
    softSkills: '软技能与专业素养',
    uiUx: 'UI/UX 追求',
    teamCollaboration: '团队协作',
    codeQuality: '代码品质',
    remoteWork: '远程协作',
    salaryExpectations: '薪资期望',
    remoteWorkOption: '远程工作',
    projectCooperation: '项目合作',
    fullTime: '全职岗位',
    thanksMessage: '感谢您花时间审阅我的简历，期待与您进一步交流',
    experience1Period: '2025.03 - 2025.05',
    experience2Period: '2022.04 - 2025.01',
    experience3Period: '2018.03 - 2022.02',
    // 项目名称
    project1: '东莞农商数字银行',
    project2: '腾讯设计云 Codesign',
    project3: 'portfolio-vue3-vite - 前端作品集',
    project4: 'SaladGo - React 移动端电商',
    // 项目详情
    project1Description: '为银行业务员提供高效的业务办理通道，支持信用卡、数字卡、个人信息维护、借记卡、综合签约等多业务模块。',
    project2Description: '类蓝湖的设计协作平台，支持跨部门协作与权限管控。',
    project3Description: '个人前端作品集项目，展示多个前端技术案例和交互效果。',
    project4Description: '移动端电商应用，实现完整的购物流程和用户交互体验。',
    project3Link: '线上展示: https://portfolio-vue3-vite-git-master-oopeachboys-projects.vercel.app/',
    project3Code: '代码: https://github.com/ooBean/portfolio-vue3-vite',
    project4Link: '线上展示: https://salad-copsj7hmj-oopeachboys-projects.vercel.app/',
    project4Code: '代码: https://github.com/ooBean/salad-app',
    // 项目要点
    project1Point1: '组件库设计提升开发效率',
    project1Point2: '基于角色的权限体系，多端适配实现代码复用',
    project1Point3: '性能优化提升30%业务效率',
    project2Point1: '参与前端模块开发与交互优化，改善设计协作体验',
    project2Point2: '实现多角色权限控制与设计稿注解功能，提升跨部门沟通效率',
    project3Point1: '现代前端技术栈，GPU加速动画，3D交互卡片',
    project3Point2: '完整国际化、响应式设计',
    project4Point1: '现代化技术栈，响应式设计',
    project4Point2: 'Redux状态管理，流畅动画效果，完整电商流程',
    // 工作职责
    experience1Duty1: '维护并迭代小象城泊小程序与后台系统，负责关键功能交付，上线稳定率 >95%；实施代码分割与懒加载使首屏加载提升约30%。',
    experience1Duty2: '优化系统性能，通过引入Web Workers处理复杂计算，减少主线程阻塞，提升用户体验。',
    experience1Duty3: '与后端团队紧密合作，设计并实现 RESTful API 接口，有效提升前后端数据交互的稳定性与高效性，成功减少系统错误率 25% 或加快数据传递速度 30%。',
    experience2Duty1: '参与多个核心模块的功能开发与交付，通过兼容性修复与组件库规范化，使相关 bug 减少约 40%，开发效率提升约 25%。',
    experience2Duty2: '设计并实现可重用的UI组件库，提高团队开发效率，减少重复代码约30%。',
    experience3Duty1: '负责企业级后台管理平台与权限系统的核心功能开发，通过前端模块化与代码规范，减少重复开发约 20%，提升系统可维护性与交付稳定性。',
    experience3Duty2: '参与前端开发流程与代码规范的优化，协助提升团队协作效率与代码一致性。',
    professionalSummaryText: '资深前端工程师，具备 5 年企业级 JavaScript 及 Vue 2/3 项目经验，熟悉 TypeScript（1–2 年），拥有 React 个人项目实践经历。专精于性能优化、组件化开发及多端适配（Web／移动端／小程序），能独立推进复杂功能开发，并于远程协作环境中高效沟通与准时交付。',
    coreSkillsText: 'JavaScript（5 年经验）、TypeScript（1–2 年）、Vue 2/3（专家级）、React（个人项目实践 1–2 年）、Vite',
    stylingSkillsText: 'CSS3、LESS／SCSS、响应式设计、可访问性、主题定制',
    performanceSkillsText: '代码分割、懒加载、组件库建设、多端适配、熟悉基于 Git 的 CI/CD 流程，能利用 Vercel 等平台实现前端项目的自动化构建与持续部署 (Continuous Deployment)。',
    visualizationSkillsText: 'Echarts、Element-UI、GitHub Copilot',
    remoteSkillsText: '熟悉 Git 协作流程，能够高效完成跨时区远程前端开发任务',
    collaborationSkillsText: '具备较强跨团队协作能力，能够推动前端规范与组件化建设',
    troubleshootingSkillsText: '熟悉生产环境排查与性能优化，能快速定位和解决问题',
    uiUxDescription: '注重用户体验与界面细节，追求高效、直观的交互设计。',
    teamCollaborationDescription: '熟悉 Git Flow，遵循团队规范，乐于分享，高效协作。',
    codeQualityDescription: '遵循 Airbnb 风格指南，注重代码可读性与可维护性。',
    remoteWorkDescription: '熟悉远程协作流程与工具，擅长异步沟通与自我管理。',
    salaryRemoteWorkDescription: '可接受全球范围内的远程工作机会。',
    salaryProjectCooperationDescription: '短期或长期的项目合作模式均可探讨。',
    salaryFullTimeDescription: '期望一份能稳定贡献价值的全职工作。',
    tencentProjectTech: 'Vue 2 + Element-UI + Webpack',
    tencentProjectLink: '线上展示: https://codesign.qq.com/sites/design'
  },
  'en': {
    name: 'Bean',
    pageTitle: 'Frontend Developer',
    downloadPDF: 'Print/Download PDF',
    alternativeDownload: 'Alternative Method',
    languageToggle: 'Switch to Traditional Chinese',
    professionalSummary: 'Professional Summary',
    technicalSkills: 'Technical Skills',
    coreSkills: 'Core Skills:',
    stylingSkills: 'Styling & Interaction:',
    performanceSkills: 'Performance & Engineering:',
    visualizationSkills: 'Visualization & Tools:',
    remoteSkills: 'Remote Collaboration:',
    collaborationSkills: 'Cross-team Collaboration:',
    troubleshootingSkills: 'Troubleshooting:',
    workExperience: 'Work Experience',
    frontendEngineer: 'Frontend Developer',
    company1: 'Guangdong Jiangxia Ecological Construction Co., Ltd.',
    company2: 'Shanghai Yitong Information Technology Development Co., Ltd.',
    company3: 'Huafu Information',
    projectExperience: 'Project Experience',
    educationBackground: 'Education Background',
    bachelor: 'Network Engineering - Full-time Bachelor',
    university: 'Jiangxi University of Engineering',
    graduated: 'Graduated in 2018',
    softSkills: 'Soft Skills & Professionalism',
    uiUx: 'UI/UX Pursuit',
    teamCollaboration: 'Team Collaboration',
    codeQuality: 'Code Quality',
    remoteWork: 'Remote Collaboration',
    salaryExpectations: 'Salary Expectations',
    remoteWorkOption: 'Remote Work',
    projectCooperation: 'Project Cooperation',
    fullTime: 'Full-time Position',
    thanksMessage: 'Thank you for taking the time to review my resume. I look forward to further communication with you.',
    experience1Period: '2025.03 - 2025.05',
    experience2Period: '2022.04 - 2025.01',
    experience3Period: '2018.03 - 2022.02',
    // 项目名称
    project1: 'Dongguan Rural Commercial Digital Bank',
    project2: 'Tencent Design Cloud Codesign',
    project3: 'portfolio-vue3-vite - Frontend Portfolio',
    project4: 'SaladGo - React Mobile E-commerce',
    // 项目详情
    project1Description: 'Built an efficient business processing channel for bank clerks.',
    project2Description: 'A design collaboration platform supporting cross-department work.',
    project3Description: 'Personal portfolio showcasing tech cases and interactive effects.',
    project4Description: 'Mobile e-commerce app with a full shopping process.',
    project3Link: 'Demo: https://portfolio-vue3-vite-git-master-oopeachboys-projects.vercel.app/',
    project3Code: 'Code: https://github.com/ooBean/portfolio-vue3-vite',
    project4Link: 'Demo: https://salad-copsj7hmj-oopeachboys-projects.vercel.app/',
    project4Code: 'Code: https://github.com/ooBean/salad-app',
    // 项目要点
    project1Point1: 'Component library improved dev efficiency.',
    project1Point2: 'Role-based permissions with multi-platform support.',
    project1Point3: 'Performance optimization boosted efficiency by 30%.',
    project2Point1: 'Developed frontend modules & optimized interactions.',
    project2Point2: 'Implemented multi-role permissions & annotations.',
    project3Point1: 'Modern stack with GPU-accelerated animations.',
    project3Point2: 'Full i18n and responsive design.',
    project4Point1: 'Modern stack with responsive design.',
    project4Point2: 'Redux state management & smooth animations.',
    // 工作职责
    experience1Duty1: 'Maintained and iterated a parking mini-program, achieving >95% stability. Improved first-screen load time by 30% with code splitting and lazy loading.',
    experience1Duty2: 'Optimized performance with Web Workers for complex calculations, reducing main thread blocking.',
    experience1Duty3: 'Collaborated with backend to design RESTful APIs, improving data stability and reducing system errors by 25%.',
    experience2Duty1: 'Participated in core module development, reducing bugs by 40% and improving efficiency by 25% through standardization.',
    experience2Duty2: 'Helped optimize frontend development processes and code standards to improve team collaboration.',
    experience3Duty1: 'Responsible for the core functional development of enterprise-level backend management platforms and permission systems, reducing redundant development by approx. 20% and improving system maintainability and delivery stability through frontend modularization and code standards.',
    experience3Duty2: 'Participated in optimizing the frontend development process and code specifications, helping to improve team collaboration efficiency and code consistency.',
    professionalSummaryText: 'Senior frontend engineer with 5 years of JS/Vue experience, proficient in TypeScript and React. Specialized in performance optimization, component development, and multi-platform adaptation. Experienced in remote collaboration and independent feature development.',
    coreSkillsText: 'JS (5 yrs), TS (1-2 yrs), Vue 2/3 (expert), React (practice 1-2 yrs), Vite',
    stylingSkillsText: 'CSS3, LESS/SCSS, Responsive Design, Accessibility, Theming',
    performanceSkillsText: 'Code splitting, lazy loading, component libs, multi-platform adaptation, CI/CD with Vercel (Git-based automated builds & Continuous Deployment).',
    visualizationSkillsText: 'Echarts, Element-UI, GitHub Copilot',
    remoteSkillsText: 'Git workflows, efficient cross-timezone remote development.',
    collaborationSkillsText: 'Strong cross-team collaboration, driving frontend standards.',
    troubleshootingSkillsText: 'Production troubleshooting and performance optimization.',
    uiUxDescription: 'Focus on intuitive and user-friendly UI/UX.',
    teamCollaborationDescription: 'Skilled in Git Flow and team collaboration.',
    codeQualityDescription: 'Clean, readable code (Airbnb style).',
    remoteWorkDescription: 'Familiar with remote collaboration tools and workflows, skilled in asynchronous communication and self-management.',
    salaryRemoteWorkDescription: 'Open to remote work.',
    salaryProjectCooperationDescription: 'Open to project-based work.',
    salaryFullTimeDescription: 'Seeking a full-time position.',
    tencentProjectTech: 'Vue 2 + Element-UI + Webpack',
    tencentProjectLink: 'Online Demo: https://codesign.qq.com/sites/design'
  }
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'zh-TW', // 默认繁体中文
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => {
        const current = get().language
        const nextLanguage: Record<Language, Language> = {
          'zh-TW': 'zh-CN',
          'zh-CN': 'en',
          'en': 'zh-TW'
        }
        set({ language: nextLanguage[current] })
      }
    }),
    {
      name: 'language-storage'
    }
  )
)