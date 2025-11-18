import { Mail, Phone, Github, Briefcase, Award, GraduationCap, Folder, Target, Download } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLanguageStore, languageMap, Language } from "./store/languageStore";

export default function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { language, toggleLanguage } = useLanguageStore();
  const t = languageMap[language as Language];

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      // 创建一个临时样式来覆盖 oklch 颜色
      const style = document.createElement('style');
      style.id = 'pdf-temp-style';
      style.textContent = `
        .temp-pdf-capture * {
          color: rgb(51, 65, 85) !important;
        }
        .temp-pdf-capture .text-slate-900 { color: rgb(15, 23, 42) !important; }
        .temp-pdf-capture .text-slate-800 { color: rgb(30, 41, 59) !important; }
        .temp-pdf-capture .text-slate-700 { color: rgb(51, 65, 85) !important; }
        .temp-pdf-capture .text-slate-600 { color: rgb(71, 85, 105) !important; }
        .temp-pdf-capture .text-slate-500 { color: rgb(100, 116, 139) !important; }
        .temp-pdf-capture .text-slate-400 { color: rgb(148, 163, 184) !important; }
        .temp-pdf-capture .bg-slate-700 { background-color: rgb(51, 65, 85) !important; }
        .temp-pdf-capture .bg-slate-800 { background-color: rgb(30, 41, 59) !important; }
        .temp-pdf-capture .bg-white { background-color: rgb(255, 255, 255) !important; }
        .temp-pdf-capture .bg-gray-50 { background-color: rgb(249, 250, 251) !important; }
        .temp-pdf-capture .border-slate-200 { border-color: rgb(226, 232, 240) !important; }
        .temp-pdf-capture .border-slate-300 { border-color: rgb(203, 213, 225) !important; }
        .temp-pdf-capture .bg-slate-300 { background-color: rgb(203, 213, 225) !important; }
      `;
      document.head.appendChild(style);

      // 添加临时类
      resumeRef.current.classList.add('temp-pdf-capture');

      const pages = resumeRef.current.querySelectorAll('.page');
      const pdf = new jsPDF('p', 'mm', 'a4');

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        // 使用html2canvas将页面转换为canvas
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          onclone: (clonedDoc) => {
            // 在克隆的文档中也应用样式
            const clonedStyle = clonedDoc.createElement('style');
            clonedStyle.textContent = style.textContent;
            clonedDoc.head.appendChild(clonedStyle);
          }
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4宽度（mm）
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      pdf.save('王宇皎-前端開發工程師.pdf');

      // 清理临时样式和类
      resumeRef.current.classList.remove('temp-pdf-capture');
      document.getElementById('pdf-temp-style')?.remove();
    } catch (error) {
      console.error('PDF生成失败:', error);
      alert('PDF生成失败，请尝试使用浏览器打印功能（Ctrl+P）');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* 下载按钮 */}
      <div className="fixed top-4 right-4 z-50 no-print flex flex-col gap-2">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
          style={{ backgroundColor: 'rgb(30, 41, 59)', color: 'white' }}
        >
          <Download className="w-4 h-4" />
          <span>{t.downloadPDF}</span>
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-500 transition-colors text-sm"
          style={{ backgroundColor: 'rgb(75, 85, 99)', color: 'white' }}
        >
          <Download className="w-3 h-3" />
          <span>{t.alternativeDownload}</span>
        </button>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition-colors text-sm"
          style={{ backgroundColor: 'rgb(37, 99, 235)', color: 'white' }}
        >
          <span>{t.languageToggle}</span>
        </button>
      </div>

      <div ref={resumeRef}>
        <div className="resume-frame p-6 flex flex-col items-center gap-5">
          {/* Page 1 */}
          <div className="page w-[210mm] h-[297mm] mx-auto bg-white relative overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Header Section */}
              <div className="px-12 py-8 border-b border-slate-200">
                <h1 className="text-4xl mb-2 text-slate-900">{t.name}</h1>
                <p className="text-xl text-slate-600 mb-2">{t.pageTitle}</p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span>1774233612@qq.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span>w1879790 (微信)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-500" />
                    <span>github.com/ooBean</span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 px-12 py-8 pb-16">
                {/* Professional Summary */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-5 h-5 text-slate-700" />
                    <h2 className="text-lg text-slate-800 uppercase tracking-wide">{t.professionalSummary}</h2>
                    <div className="flex-1 h-px bg-slate-300"></div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.professionalSummaryText}
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-slate-700" />
                    <h2 className="text-lg text-slate-800 uppercase tracking-wide">{t.technicalSkills}</h2>
                    <div className="flex-1 h-px bg-slate-300"></div>
                  </div>
                  {/* Increase vertical spacing so the block breathes more */}
                  <div className="grid grid-cols-1 gap-y-2 text-sm leading-relaxed">
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{t.coreSkills}</span>
                      {t.coreSkillsText}
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{t.stylingSkills}</span>
                      {t.stylingSkillsText}
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{t.performanceSkills}</span>
                      {t.performanceSkillsText}
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{t.visualizationSkills}</span>
                      {t.visualizationSkillsText}
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{t.remoteSkills}</span>
                      {t.remoteSkillsText}
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{t.collaborationSkills}</span>
                      {t.collaborationSkillsText}
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{t.troubleshootingSkills}</span>
                      {t.troubleshootingSkillsText}
                    </div>
                  </div>
                </div>

                {/* Work Experience */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-5 h-5 text-slate-700" />
                    <h2 className="text-lg text-slate-800 uppercase tracking-wide">{t.workExperience}</h2>
                    <div className="flex-1 h-px bg-slate-300"></div>
                  </div>

                  <div className="space-y-5">
                    {/* 經歷 1 */}
                    <div className="relative pl-6 border-l-2 border-slate-300">
                      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="text-slate-800">{t.frontendEngineer}</div>
                          <div className="text-xs text-slate-500">{t.company1}</div>
                        </div>
                        <div className="text-xs text-slate-500 whitespace-nowrap ml-4">{t.experience1Period}</div>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mt-2">
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.experience1Duty1}</span></li>
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.experience1Duty2}</span></li>
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.experience1Duty3}</span></li>
                      </ul>
                    </div>

                    {/* 經歷 2 */}
                    <div className="relative pl-6 border-l-2 border-slate-300">
                      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="text-slate-800">{t.frontendEngineer}</div>
                          <div className="text-xs text-slate-500">{t.company2}</div>
                        </div>
                        <div className="text-xs text-slate-500 whitespace-nowrap ml-4">{t.experience2Period}</div>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mt-2">
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.experience2Duty1}</span></li>
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.experience2Duty2}</span></li>
                      </ul>
                    </div>

                    {/* 經歷 3 */}
                    <div className="relative pl-6 border-l-2 border-slate-300">
                      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="text-slate-800">{t.frontendEngineer}</div>
                          <div className="text-xs text-slate-500">{t.company3}</div>
                        </div>
                        <div className="text-xs text-slate-500 whitespace-nowrap ml-4">{t.experience3Period}</div>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mt-2">
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.experience3Duty1}</span></li>
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.experience3Duty2}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer restored on page 1 */}
              <div className="mt-auto pt-4 border-t border-slate-200" style={{ paddingBottom: '16px' }}>
                <p className="text-xs text-slate-400 text-center">
                  {t.thanksMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 */}
        <div className="page w-[210mm] h-[297mm] mx-auto bg-white relative overflow-hidden page-break">
          <div className="h-full flex flex-col px-12 py-8">
            {/* Projects Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Folder className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg text-slate-800 uppercase tracking-wide">{t.projectExperience}</h2>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              <div className="space-y-4">
                {/* Project 1 */}
                <div className="relative pl-6 border-l-2 border-slate-300">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                  <div className="mb-1">
                    <div className="text-slate-800">{t.project1}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Vue3 + Pinia + Vite + uni-app</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {t.project1Description}
                  </p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project1Point1}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project1Point2}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project1Point3}</span></li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="relative pl-6 border-l-2 border-slate-300">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                  <div className="mb-1">
                    <div className="text-slate-800">{t.project2}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{t.tencentProjectTech}</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {t.project2Description}
                  </p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project2Point1}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project2Point2}</span></li>
                  </ul>
                  <p className="text-xs text-slate-500 mb-1.5">{t.tencentProjectLink}</p>
                </div>

                {/* Project 3 */}
                <div className="relative pl-6 border-l-2 border-slate-300">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                  <div className="mb-1">
                    <div className="text-slate-800">{t.project3}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Vue 3 + TypeScript + Vite + Pinia</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {t.project3Description}
                  </p>
                  <p className="text-xs text-slate-500 mb-1.5">{t.project3Link}</p>
                  <p className="text-xs text-slate-500 mb-1.5">{t.project3Code}</p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project3Point1}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project3Point2}</span></li>
                  </ul>
                </div>

                {/* Project 4 */}
                <div className="relative pl-6 border-l-2 border-slate-300">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                  <div className="mb-1">
                    <div className="text-slate-800">{t.project4}</div>
                    <div className="text-xs text-slate-500 mt-0.5">React + TypeScript + Redux Toolkit + Framer Motion</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {t.project4Description}
                  </p>
                  <p className="text-xs text-slate-500 mb-1.5">{t.project4Link}</p>
                  <p className="text-xs text-slate-500 mb-1.5">{t.project4Code}</p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project4Point1}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{t.project4Point2}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg text-slate-800 uppercase tracking-wide">{t.educationBackground}</h2>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>
              <div className="relative pl-6 border-l-2 border-slate-300">
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-slate-800">{t.bachelor}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{t.university}</div>
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap ml-4">{t.graduated}</div>
                </div>
              </div>
            </div>

            {/* Soft Skills */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg text-slate-800 uppercase tracking-wide">{t.softSkills}</h2>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div>
                  <div className="text-slate-700 mb-1">{t.uiUx}</div>
                  <div className="text-xs text-slate-600">{t.uiUxDescription}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{t.teamCollaboration}</div>
                  <div className="text-xs text-slate-600">{t.teamCollaborationDescription}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{t.codeQuality}</div>
                  <div className="text-xs text-slate-600">{t.codeQualityDescription}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{t.remoteWork}</div>
                  <div className="text-xs text-slate-600">{t.remoteWorkDescription}</div>
                </div>
              </div>
            </div>

            {/* Salary Expectations */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg text-slate-800 uppercase tracking-wide">{t.salaryExpectations}</h2>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>
              <div className="grid grid-cols-3 gap-x-8 text-sm">
                <div>
                  <div className="text-slate-700 mb-1">{t.remoteWorkOption}</div>
                  <div className="text-xs text-slate-600">{t.salaryRemoteWorkDescription}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{t.projectCooperation}</div>
                  <div className="text-xs text-slate-600">{t.salaryProjectCooperationDescription}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{t.fullTime}</div>
                  <div className="text-xs text-slate-600">{t.salaryFullTimeDescription}</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-400 text-center">
                {t.thanksMessage}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .page {
            margin: 0;
            box-shadow: none;
          }
          .page-break {
            page-break-before: always;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }

        @media screen {
          .page {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}
