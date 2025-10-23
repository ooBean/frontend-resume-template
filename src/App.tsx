import { Mail, Phone, Github, Briefcase, Award, GraduationCap, Folder, Target, Download } from "lucide-react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isSimplified, setIsSimplified] = useState(false); // 添加状态管理，false表示繁体，true表示简体

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
          <span>打印/下载PDF</span>
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-500 transition-colors text-sm"
          style={{ backgroundColor: 'rgb(75, 85, 99)', color: 'white' }}
        >
          <Download className="w-3 h-3" />
          <span>备选方式</span>
        </button>
        <button
          onClick={() => setIsSimplified(!isSimplified)}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition-colors text-sm"
          style={{ backgroundColor: 'rgb(37, 99, 235)', color: 'white' }}
        >
          <span>{isSimplified ? '切换到繁体' : '切换到简体'}</span>
        </button>
      </div>

      <div ref={resumeRef}>
        <div className="resume-frame p-6 flex flex-col items-center gap-5">
          {/* Page 1 */}
          <div className="page w-[210mm] h-[297mm] mx-auto bg-white relative overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Header Section */}
              <div className="px-12 py-8 border-b border-slate-200">
                <h1 className="text-4xl mb-2 text-slate-900">王宇皎</h1>
                <p className="text-xl text-slate-600 mb-2">{isSimplified ? '前端开发工程师' : '前端開發工程師'}</p>

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
                    <h2 className="text-lg text-slate-800 uppercase tracking-wide">{isSimplified ? '专业简介' : '專業簡介'}</h2>
                    <div className="flex-1 h-px bg-slate-300"></div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {isSimplified ?
                      '资深前端工程师，具备 5 年企业级 JavaScript 及 Vue 2/3 项目经验，熟悉 TypeScript（1–2 年），拥有 React 个人项目实践经历。专精于性能优化、组件化开发及多端适配（Web／移动端／小程序），能独立推进复杂功能开发，并于远程协作环境中高效沟通与准时交付。' :
                      '資深前端工程師，具備 5 年企業級 JavaScript 及 Vue 2/3 專案經驗，熟悉 TypeScript（1–2 年），擁有 React 個人專案實踐經歷。專精於效能優化、元件化開發及多端適配（Web／行動端／小程式），能獨立推進複雜功能開發，並於遠端協作環境中高效溝通與準時交付。'
                    }
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-slate-700" />
                    <h2 className="text-lg text-slate-800 uppercase tracking-wide">{isSimplified ? '技术栈' : '技術棧'}</h2>
                    <div className="flex-1 h-px bg-slate-300"></div>
                  </div>
                  {/* Increase vertical spacing so the block breathes more */}
                  <div className="grid grid-cols-1 gap-y-2 text-sm leading-relaxed">
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{isSimplified ? '核心技能：' : '核心技能：'}</span>
                      {isSimplified ?
                        'JavaScript（5 年经验）、TypeScript（1–2 年）、Vue 2/3（专家级）、React（个人项目实践 1–2 年）、Vite' :
                        'JavaScript（5 年經驗）、TypeScript（1–2 年）、Vue 2/3（專家級）、React（個人專案實踐 1–2 年）、Vite'
                      }
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{isSimplified ? '样式与交互：' : '樣式與交互：'}</span>
                      {isSimplified ?
                        'CSS3、LESS／SCSS、响应式设计、可访问性、主题定制' :
                        'CSS3、LESS／SCSS、響應式設計、可訪問性、主題定制'
                      }
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{isSimplified ? '性能与工程化：' : '性能與工程化：'}</span>
                      {isSimplified ?
                        '代码分割、懒加载、组件库建设、移动端/PC端/小程序多端适配、熟悉 Vercel 自動化部署流程，能將 Git 與持續整合結合以提升上線效率。' :
                        '程式碼分割、懶加載、元件庫建設、移動端/PC端/小程式多端適配、熟悉 Vercel 自動化部署流程，能將 Git 與持續整合結合以提升上線效率。'
                      }
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{isSimplified ? '可视化与工具：' : '可視化與工具：'}</span>
                      {isSimplified ?
                        'Echarts、Element-UI、GitHub Copilot' :
                        'Echarts、Element-UI、GitHub Copilot'
                      }
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{isSimplified ? '远程协作能力：' : '遠端協作能力：'}</span>
                      {isSimplified ?
                        '熟悉 Git 协作流程，能够高效完成跨时区远程前端开发任务' :
                        '熟悉 Git 協作流程，能夠高效完成跨時區遠端前端開發任務'
                      }
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{isSimplified ? '跨团队协作：' : '跨團隊協作：'}</span>
                      {isSimplified ?
                        '具备较强跨团队协作能力，能够推动前端规范与组件化建设' :
                        '具備較強跨團隊協作能力，能夠推動前端規範與元件化建設'
                      }
                    </div>
                    <div className="py-1">
                      <span className="text-slate-700 font-medium">{isSimplified ? '问题排查：' : '問題排查：'}</span>
                      {isSimplified ?
                        '熟悉生产环境排查与性能优化，能快速定位和解决问题' :
                        '熟悉生產環境排查與效能優化，能快速定位和解決問題'
                      }
                    </div>
                  </div>
                </div>

                {/* Work Experience */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-5 h-5 text-slate-700" />
                    <h2 className="text-lg text-slate-800 uppercase tracking-wide">{isSimplified ? '工作经历' : '工作經歷'}</h2>
                    <div className="flex-1 h-px bg-slate-300"></div>
                  </div>

                  <div className="space-y-5">
                    {/* 經歷 1 */}
                    <div className="relative pl-6 border-l-2 border-slate-300">
                      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="text-slate-800">{isSimplified ? '前端开发工程师' : '前端開發工程師'}</div>
                          <div className="text-xs text-slate-500">{isSimplified ? '广东江夏生态建设有限公司' : '廣東江夏生態建設有限公司'}</div>
                        </div>
                        <div className="text-xs text-slate-500 whitespace-nowrap ml-4">2025.03 - 2025.05</div>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mt-2">
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '维护并迭代小象城泊小程序与后台系统，负责关键功能交付，上线稳定率 >95%；实施代码分割与懒加载使首屏加载提升约30%。' : '維護並疊代小象城泊小程式與後台系統，負責關鍵功能交付，上線穩定率 >95%；實施程式碼分割與懶加載使首屏加載提升約30%。'}</span></li>
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '优化系统性能，通过引入Web Workers处理复杂计算，减少主线程阻塞，提升用户体验。' : '優化系統性能，通過引入Web Workers處理複雜計算，減少主線程阻塞，提升用戶體驗。'}</span></li>
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '与后端与后端团队紧密合作，设计并实现 RESTful API 接口，有效提升前后端数据交互的稳定性与高效性，成功减少系统错误率 25% 或加快数据传递速度 30%。' : '與後端團隊緊密合作，設計並實現 RESTful API 接口，有效提升前後端數據交互的穩定性與高效性，成功減少有效提升資料傳輸穩定性與速度（約 25–30%）。'}</span></li>
                      </ul>
                    </div>

                    {/* 經歷 2 */}
                    <div className="relative pl-6 border-l-2 border-slate-300">
                      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="text-slate-800">{isSimplified ? '前端开发工程师' : '前端開發工程師'}</div>
                          <div className="text-xs text-slate-500">{isSimplified ? '上海屹通信息科技发展有限公司' : '上海屹通信息科技發展有限公司'}</div>
                        </div>
                        <div className="text-xs text-slate-500 whitespace-nowrap ml-4">2022.04 - 2025.01</div>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mt-2">
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '参与多个核心模块的功能开发与交付，通过兼容性修复与组件库规范化，使相关 bug 减少约 40%，开发效率提升约 25%。' : '參與多個核心模組的功能開發與交付，透過相容性修復與元件庫規範化，使相關 bug 減少約 40%，開發效率提升約 25%。'}</span></li>
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '设计并实现可重用的UI组件库，提高团队开发效率，减少重复代码约30%。' : '設計並實現可重用的UI組件庫，提高團隊開發效率，減少重複代碼約30%。'}</span></li>
                      </ul>
                    </div>

                    {/* 經歷 3 */}
                    <div className="relative pl-6 border-l-2 border-slate-300">
                      <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="text-slate-800">{isSimplified ? '前端开发工程师' : '前端開發工程師'}</div>
                          <div className="text-xs text-slate-500">{isSimplified ? '华付信息' : '華付信息'}</div>
                        </div>
                        <div className="text-xs text-slate-500 whitespace-nowrap ml-4">2018.03 - 2022.02</div>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1 mt-2">
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '负责企业级后台管理平台与权限系统的核心功能开发，通过前端模块化与代码规范，减少重复开发约 20%，提升系统可维护性与交付稳定性。' : '負責企業級後台管理平台與權限系統的核心功能開發，透過前端模組化與代碼規範，減少重複開發約 20%，提升系統可維護性與交付穩定性。'}</span></li>
                        <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '参与前端开发流程与代码规范的优化，协助提升团队协作效率与代码一致性。' : '參與前端開發流程與代碼規範的優化，協助提升團隊協作效率與代碼一致性。'}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer restored on page 1 */}
              <div className="mt-auto pt-4 border-t border-slate-200" style={{ paddingBottom: '16px' }}>
                <p className="text-xs text-slate-400 text-center">
                  {isSimplified ? '感谢您花时间审阅我的简历，期待与您进一步交流' : '感謝您花時間審閱我的簡歷，期待與您進一步交流'}
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
                <h2 className="text-lg text-slate-800 uppercase tracking-wide">{isSimplified ? '项目经验' : '專案經驗'}</h2>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              <div className="space-y-4">
                {/* Project 1 */}
                <div className="relative pl-6 border-l-2 border-slate-300">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                  <div className="mb-1">
                    <div className="text-slate-800">{isSimplified ? '东莞农商数字银行' : '東莞農商數位銀行'}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Vue3 + Pinia + Vite + uni-app</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {isSimplified ?
                      '为银行业务员提供高效的业务办理通道，支持信用卡、数字卡、个人信息维护、借记卡、综合签约等多业务模块。' :
                      '為銀行業務員提供高效的業務辦理通道，支援信用卡、數位卡、個人資訊維護、借記卡、綜合簽約等多業務模組。'
                    }
                  </p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '组件库设计提升开发效率' : '元件庫設計提升開發效率'}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '基于角色的权限体系，多端适配实现代码复用' : '基於角色的權限體系，多端適配實現程式碼複用'}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '性能优化提升30%业务效率' : '效能優化提升30%業務效率'}</span></li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="relative pl-6 border-l-2 border-slate-300">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                  <div className="mb-1">
                    <div className="text-slate-800">{isSimplified ? '腾讯设计云 Codesign' : '騰訊設計雲 Codesign'}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{isSimplified ? 'Vue 2、Vuex、Nuxt、Echarts' : 'Vue 2、Vuex、Nuxt、Echarts'}</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {isSimplified ?
                      '類藍湖的設計協作平台，支援跨部門協作與權限控管。' :
                      '類藍湖的設計協作平台，支援跨部門協作與權限控管。'
                    }
                  </p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '參與前端模組開發與互動優化，改善設計協作體驗' : '參與前端模組開發與互動優化，改善設計協作體驗'}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '實現多角色權限控制與設計稿註解功能，提升跨部門溝通效率' : '實現多角色權限控制與設計稿註解功能，提升跨部門溝通效率'}</span></li>
                  </ul>
                  <p className="text-xs text-slate-500 mb-1.5">{isSimplified ? '🔗 线上展示：https://codesign.qq.com/' : '🔗 線上展示：https://codesign.qq.com/'}</p>
                </div>

                {/* Project 3 */}
                <div className="relative pl-6 border-l-2 border-slate-300">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                  <div className="mb-1">
                    <div className="text-slate-800">portfolio-vue3-vite - {isSimplified ? '前端作品集' : '前端作品集'}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Vue 3 + TypeScript + Vite + Pinia</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {isSimplified ?
                      '个人前端作品集项目，展示多个前端技术案例和交互效果。' :
                      '個人前端作品集專案，展示多個前端技術案例和互動效果。'
                    }
                  </p>
                  <p className="text-xs text-slate-500 mb-1.5">{isSimplified ? '线上展示: http://bean.binballs.top/' : '線上展示: http://bean.binballs.top/'}</p>
                  <p className="text-xs text-slate-500 mb-1.5">{isSimplified ? '代码: https://github.com/ooBean/portfolio-vue3-vite' : '程式碼: https://github.com/ooBean/portfolio-vue3-vite'}</p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '现代前端技术栈，GPU加速动画，3D交互卡片' : '現代前端技術棧，GPU加速動畫，3D互動卡片'}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '完整国际化、响应式设计' : '完整國際化、響應式設計'}</span></li>
                  </ul>
                </div>

                {/* Project 4 */}
                <div className="relative pl-6 border-l-2 border-slate-300">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                  <div className="mb-1">
                    <div className="text-slate-800">SaladGo - React {isSimplified ? '移动端电商' : '移動端電商'}</div>
                    <div className="text-xs text-slate-500 mt-0.5">React + TypeScript + Redux Toolkit + Framer Motion</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1.5">
                    {isSimplified ?
                      '移动端电商应用，实现完整的购物流程和用户交互体验。' :
                      '移動端電商應用，實現完整的購物流程和使用者互動體驗。'
                    }
                  </p>
                  <p className="text-xs text-slate-500 mb-1.5">{isSimplified ? '线上展示: http://bean.binballs.top/salad-app/' : '線上展示: http://bean.binballs.top/salad-app/'}</p>
                  <p className="text-xs text-slate-500 mb-1.5">{isSimplified ? '代码: https://github.com/ooBean/salad-app' : '程式碼: https://github.com/ooBean/salad-app'}</p>
                  <ul className="text-xs text-slate-600 space-y-0.5">
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? '现代化技术栈，响应式设计' : '現代化技術棧，響應式設計'}</span></li>
                    <li className="flex gap-2"><span className="text-slate-400">•</span><span>{isSimplified ? 'Redux状态管理，流畅动画效果，完整电商流程' : 'Redux狀態管理，流暢動畫效果，完整電商流程'}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg text-slate-800 uppercase tracking-wide">{isSimplified ? '教育背景' : '教育背景'}</h2>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>
              <div className="relative pl-6 border-l-2 border-slate-300">
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-white"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-slate-800">{isSimplified ? '网络工程 - 全日制本科' : '網路工程 - 全日制本科'}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{isSimplified ? '江西工程学院' : '江西工程學院'}</div>
                  </div>
                  <div className="text-xs text-slate-500 whitespace-nowrap ml-4">{isSimplified ? '2018年毕业' : '2018年畢業'}</div>
                </div>
              </div>
            </div>

            {/* Soft Skills */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg text-slate-800 uppercase tracking-wide">{isSimplified ? '软技能与专业素养' : '軟技能與專業素養'}</h2>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div>
                  <div className="text-slate-700 mb-1">{isSimplified ? 'UI/UX 追求' : 'UI/UX 追求'}</div>
                  <div className="text-xs text-slate-600">{isSimplified ? '对UI细节、可访问性和性能调优有敏锐感知' : '對UI細節、可訪問性和效能調優有敏銳感知'}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{isSimplified ? '团队协作' : '團隊協作'}</div>
                  <div className="text-xs text-slate-600">{isSimplified ? '与设计和后端团队沟通顺畅，协作高效' : '與設計和後端團隊溝通順暢，協作高效'}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{isSimplified ? '代码品质' : '程式碼品質'}</div>
                  <div className="text-xs text-slate-600">{isSimplified ? '热爱整洁代码，注重组件复用性' : '熱愛整潔程式碼，注重元件複用性'}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{isSimplified ? '远程协作' : '遠端協作'}</div>
                  <div className="text-xs text-slate-600">{isSimplified ? '有海外/跨时区远程协作经验，熟悉 GitHub PR 流程、异步沟通与日常远程协作工具（Slack/Teams, Jira）' : '有海外/跨時區遠端協作經驗，熟悉 GitHub PR 流程、非同步溝通與日常遠端協作工具（Slack/Teams, Jira）'}</div>
                </div>
              </div>
            </div>

            {/* Salary Expectations */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg text-slate-800 uppercase tracking-wide">{isSimplified ? '薪资期望' : '薪資期望'}</h2>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>
              <div className="grid grid-cols-3 gap-x-8 text-sm">
                <div>
                  <div className="text-slate-700 mb-1">{isSimplified ? '远程工作' : '遠端工作'}</div>
                  <div className="text-xs text-slate-600">{isSimplified ? '接受市场水平薪资，可面议' : '接受市場水平薪資，可面議'}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{isSimplified ? '项目合作' : '專案合作'}</div>
                  <div className="text-xs text-slate-600">{isSimplified ? '按项目计费，可提供详细报价' : '按專案計費，可提供詳細報價'}</div>
                </div>
                <div>
                  <div className="text-slate-700 mb-1">{isSimplified ? '全职岗位' : '全職崗位'}</div>
                  <div className="text-xs text-slate-600">{isSimplified ? '可协商' : '可協商'}</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-400 text-center">
                {isSimplified ? '感谢您花时间审阅我的简历，期待与您进一步交流' : '感謝您花時間審閱我的簡歷，期待與您進一步交流'}
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
