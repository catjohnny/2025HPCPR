
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  TrendingUp, 
  Users, 
  Settings, 
  ShieldAlert, 
  Stethoscope, 
  History, 
  Video, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Info
} from 'lucide-react';
import { NavItem } from './types';

// --- Sub-components ---

const SectionHeader: React.FC<{ title: string; subtitle?: string; icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
        {icon}
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
    {subtitle && <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{subtitle}</p>}
  </div>
);

const Card: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode; color?: string }> = ({ title, children, icon, color = "blue" }) => {
  const colorMap: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50/50",
    red: "border-red-200 bg-red-50/50",
    green: "border-green-200 bg-green-50/50",
    purple: "border-purple-200 bg-purple-50/50",
    amber: "border-amber-200 bg-amber-50/50",
  };
  
  return (
    <div className={`p-6 rounded-2xl border-2 shadow-sm transition-all hover:shadow-md ${colorMap[color]}`}>
      <div className="flex items-start gap-4 mb-4">
        {icon && <div className="mt-1">{icon}</div>}
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-700 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{ year: string; title: string; description: React.ReactNode; status?: string }> = ({ year, title, description, status }) => (
  <div className="relative pl-8 pb-10 border-l-2 border-blue-200 last:border-0 last:pb-0">
    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
    <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
      <span className="text-sm font-black text-blue-600 uppercase tracking-widest">{year}</span>
      <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      {status && <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-md font-bold">{status}</span>}
    </div>
    <div className="text-gray-600 leading-relaxed">{description}</div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems: NavItem[] = [
    { id: 'background', label: '曼谷 EMS 現況' },
    { id: 'evolution', label: '發展歷程' },
    { id: 'hp-cpr', label: 'HP-CPR 策略' },
    { id: 'cqi', label: '品質管理' },
    { id: 'collaboration', label: '志願者合作' },
    { id: 'ventilation', label: '高品質通氣' },
    { id: 'aha2025', label: '2025 AHA 指南' },
    { id: 'qa', label: 'QA 與 實務' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(item.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
              <Heart className="w-8 h-8 text-red-600 animate-pulse" />
              <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">HP-CPR Global</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeSection === item.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Nav Toggle */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden pt-16">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left px-4 py-4 text-lg font-bold text-gray-800 border-b border-gray-100"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-700 bg-blue-100 rounded-full uppercase">
              Clinical Quality Improvement
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              泰國曼谷 <span className="text-gradient">高效能 CPR (HP-CPR)</span><br />
              實施策略與品質改善全錄
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed mb-10">
              探討資源受限環境下的 EMS 轉型：從 0% 存活率到高品質復甦與 2025 AHA 指南實務應用。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => scrollTo('background')} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-200">
                深入技術內容
              </button>
              <button onClick={() => scrollTo('aha2025')} className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all">
                2025 AHA 指南更新
              </button>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
             <div className="p-6 glass rounded-2xl text-center border-b-4 border-blue-500">
                <div className="text-3xl font-black text-blue-600 mb-1">0% → 7.69%</div>
                <div className="text-sm font-medium text-gray-500">存活率提升 (COVID期後)</div>
             </div>
             <div className="p-6 glass rounded-2xl text-center border-b-4 border-red-500">
                <div className="text-3xl font-black text-red-600 mb-1">90%+</div>
                <div className="text-sm font-medium text-gray-500">CCF (胸外按壓分數)</div>
             </div>
             <div className="p-6 glass rounded-2xl text-center border-b-4 border-green-500">
                <div className="text-3xl font-black text-green-600 mb-1">Weekly</div>
                <div className="text-sm font-medium text-gray-500">CQI 案例回顧</div>
             </div>
             <div className="p-6 glass rounded-2xl text-center border-b-4 border-amber-500">
                <div className="text-3xl font-black text-amber-600 mb-1">Iron 3</div>
                <div className="text-sm font-medium text-gray-500">SOP / Training / Measure</div>
             </div>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section id="background" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="曼谷的 EMS 系統環境" 
            subtitle="曼谷的緊急醫療服務系統極其複雜，是泰國最難挑戰的緊急醫療網絡。" 
            icon={<Activity className="w-8 h-8" />} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card title="兩層級結構 (Two-Tier System)" icon={<Users className="w-6 h-6 text-blue-600" />}>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></div>
                  <div>
                    <strong className="text-blue-700">ALS (高級救護)：</strong>
                    <p className="text-sm">由醫院基礎 (Hospital-based) 運作，如 137 年歷史的公立 <strong>Siriraj 醫院</strong>。</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></div>
                  <div>
                    <strong className="text-blue-700">BLS (基本救護)：</strong>
                    <p className="text-sm">絕大多數由<strong>「義消基金會」</strong>運作 (Volunteer-based)。人員僅具 EMT-1 資格，部分甚至為無執照私人車輛。</p>
                  </div>
                </li>
              </ul>
            </Card>
            
            <Card title="面臨的三大核心挑戰" color="red" icon={<ShieldAlert className="w-6 h-6 text-red-600" />}>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></div>
                  <p className="text-sm"><strong>交通與資源：</strong>救護車常受困於塞車，且 ALS 數量遠遠不足。</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></div>
                  <p className="text-sm"><strong>地盤性組織：</strong>志願者組織龐大且具有類似「黑手黨」的地盤觀念，過去衝突不斷且訓練匱乏。</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></div>
                  <p className="text-sm"><strong>後進者壓力：</strong>Siriraj 醫院雖古老，但在 EMS 領域卻是 2018 年才成立的新進團隊。</p>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Evolution Timeline Section */}
      <section id="evolution" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="發展歷程與關鍵轉折" 
            subtitle="從數據發現問題，到疫情衝擊下的科技導入，最終實現品質飛躍。" 
            icon={<History className="w-8 h-8" />} 
          />
          
          <div className="max-w-4xl mx-auto space-y-2">
            <TimelineItem 
              year="2018 - 2019" 
              title="初期數據探索 (Data Driven)" 
              description={
                <div>
                  加入泛亞太復甦預後研究 (PAROS)，發現<strong>旁觀者 CPR 比例僅約 20%</strong>，整體存活率極低。嘗試建立摩哆車計程車社區反應系統，但因疫情爆發而中斷。
                </div>
              }
            />
            <TimelineItem 
              year="2020 - 2022" 
              title="COVID-19 黑暗期與轉機" 
              status="存活率 0%"
              description={
                <div>
                  防疫規範限制了急救動作（全套 PPE、距離、減少通氣），OHCA 存活率降至零。
                  <p className="mt-2 text-blue-700 font-bold">【化危機為契機】：引進視訊喉鏡、AutoPulse 機械式 CPR 與遠距醫療系統，奠定技術基礎。</p>
                </div>
              }
            />
            <TimelineItem 
              year="2023 - 至今" 
              title="後疫情 HP-CPR 全面實施" 
              description={
                <div>
                  全面執行高效能 CPR 協議 (HP-CPR)，並結合嚴格的 CQI 品質改善計畫。目前<strong>存活率提升至 7.69%</strong>，並達成穩定的高品質壓胸數據。
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* HP-CPR Strategy Section */}
      <section id="hp-cpr" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="高效能 CPR (HP-CPR) 實施策略" 
            subtitle="技術細節決定成敗，Siriraj 醫院的高標準操作規範。" 
            icon={<Settings className="w-8 h-8" />} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-blue-600 text-white rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">核心編制 (Crew)</h3>
              <p className="mb-6 opacity-90 text-lg">人力充足是高品質 CPR 的關鍵基礎。</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">5人</div>
                  <span className="font-medium">每次出勤標準配置</span>
                </div>
                <ul className="text-sm space-y-2 list-disc list-inside opacity-90">
                  <li>2名 護理師 / 救護員</li>
                  <li>2名 EMT</li>
                  <li>1名 救護車司機</li>
                </ul>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card title="Hover Hand (懸停手勢)" icon={<Zap className="w-6 h-6 text-amber-500" />} color="amber">
                  <p>在換手按壓時，接手者的手必須<strong>預先懸停在病患胸口正上方</strong>，在指揮口令下達瞬間接替，最小化按壓中斷時間。</p>
                </Card>
                <Card title="預先充電 (Pre-charge)" icon={<Zap className="w-6 h-6 text-amber-500" />} color="amber">
                  <p>週期剩餘 <strong>20 秒</strong>時大聲倒數，剩 <strong>10 秒</strong>時開始為電擊器充電。充電同時進行脈搏檢查，目標將中斷壓縮至極短秒數。</p>
                </Card>
              </div>
              <Card title="機械式 CPR 的必要性 (Mechanical CPR)" icon={<Settings className="w-6 h-6 text-gray-600" />}>
                <p>曼谷交通塞車極為嚴重，病患從建築物搬運到救護車的距離往往長達數百公尺。<strong>規定在上車前必須完成 AutoPulse 的安裝</strong>，確保搬運與運送過程中高品質按壓不間斷。</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CQI Section */}
      <section id="cqi" className="py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl font-black mb-4">品質管理與數據驅動 (CQI)</h2>
              <p className="text-blue-200 text-lg">「可測量，才能改善。」—— 透過影像與數據消除主觀偏誤。</p>
            </div>
            <div className="flex items-center gap-4 bg-blue-800 p-4 rounded-2xl border border-blue-700">
              <Video className="w-10 h-10 text-red-400" />
              <div>
                <div className="text-xs font-bold text-blue-300 uppercase tracking-widest">核心技術</div>
                <div className="text-lg font-bold">Body-worn Camera (密錄器)</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">影像紀錄排除視覺落差</h4>
                  <p className="text-blue-100/80 leading-relaxed">
                    救護員通常自覺「按壓得很好」，但影像回放往往顯示換手遲疑、中斷過久或姿勢偏移。將 Body Cam 影像與 <strong>ZOLL X Series 的 Code Review</strong> 生理數據結合。
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">每週案例回顧 (Weekly Review)</h4>
                  <p className="text-blue-100/80 leading-relaxed">
                    每週針對 8-10 個 OHCA 案例進行 1-2 小時的詳細檢討。重點監控 <strong>CCF (胸外按壓分數)</strong>，目前平均穩定維持在 90% 以上。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-sm">
              <h4 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                正向回饋機制
              </h4>
              <p className="mb-6 text-blue-100">為了維持長期動力，團隊設立了創新的激勵措施：</p>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span><strong>每月最佳員工獎：</strong>依據 CPR 品質客觀評分選出。</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span><strong>實質獎金：</strong>給予表現優異的救護人員現金獎勵。</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  <span><strong>社群榮譽：</strong>在官方社群分享表揚，提升團隊榮譽感與專業形象。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaboration" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="擴大影響力：與志願者組織的合作" 
            subtitle="將競爭轉為共生，打造一體化的院前急救網絡。" 
            icon={<Users className="w-8 h-8" />} 
          />
          
          <div className="p-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-3xl">
            <div className="bg-white p-8 md:p-12 rounded-[22px] grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-2xl font-bold mb-6 text-gray-900">資源交換策略</h4>
                <p className="text-gray-600 mb-8 text-lg">Dr. Satha 改變對抗姿態，以「設備換訓練」進行整合：</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="p-3 bg-red-100 text-red-600 rounded-full font-black">AED</div>
                    <p className="text-sm font-bold uppercase tracking-tight">醫院提供 AED 給志願者組織車輛</p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full font-black">EDU</div>
                    <p className="text-sm font-bold uppercase tracking-tight">志願者必須接受醫院的 HP-CPR 訓練</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-2xl font-bold mb-6 text-gray-900">現場分工模組</h4>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-8">
                    <div className="relative pl-12">
                      <div className="absolute left-0 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <h5 className="font-bold text-gray-800">BLS 先抵達</h5>
                      <p className="text-sm text-gray-500">利用機車或據點優勢，先行實施高品質 CPR 並貼上 AED。</p>
                    </div>
                    <div className="relative pl-12">
                      <div className="absolute left-0 top-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <h5 className="font-bold text-gray-800">ALS 團隊接手</h5>
                      <p className="text-sm text-gray-500">同套標準，無縫接手進階急救，避免搶病人與溝通斷層。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventilation Section */}
      <section id="ventilation" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="高品質通氣 (HP-Ventilation)" 
            subtitle="CPR 不只是救心，更要救腦。被忽略的通氣品質是存活關鍵。" 
            icon={<Stethoscope className="w-8 h-8" />} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-red-600">致命錯誤：過度通氣 (Hyperventilation)</h4>
              <p className="text-gray-700 leading-relaxed">
                在緊急現場，救護人員常因腎上腺素與緊張，導致壓甦醒球頻率過快或潮氣量過大。
              </p>
              <div className="p-6 bg-red-50 rounded-2xl border-l-4 border-red-500">
                <h5 className="font-bold mb-4 text-red-700 uppercase tracking-widest">病理連鎖反應</h5>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">↑</span> 
                    <span>胸內壓上升 (Intrathoracic Pressure)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">↓</span> 
                    <span>回心血流減少 (Venous Return)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500 font-bold">↓</span> 
                    <span>心輸出量與腦灌流下降</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  高品質通氣標準 (AHA 2025 趨勢)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl text-center">
                    <div className="text-xs font-bold text-blue-600 uppercase mb-1">給氣頻率</div>
                    <div className="text-2xl font-black">10 次 / 分</div>
                    <div className="text-xs text-gray-500">每 6 秒一次</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl text-center">
                    <div className="text-xs font-bold text-blue-600 uppercase mb-1">潮氣量</div>
                    <div className="text-2xl font-black">350-400 cc</div>
                    <div className="text-xs text-gray-500">約 5-7 cc/kg</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Card title="雙人操作技術" icon={<Users className="w-5 h-5 text-blue-600" />}>
                  一人雙手固定面罩 (E-C 手法)，另一人擠壓球體，確保不漏氣。
                </Card>
                <Card title="視覺即時回饋" icon={<Activity className="w-5 h-5 text-blue-600" />}>
                  人為主觀計數極不準確，應使用具備視覺回饋或 EtCO2 監控的設備。
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AHA 2025 Section */}
      <section id="aha2025" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="2025 AHA Guidelines 更新重點" 
            subtitle="指引結構擴展、復甦倫理更新與七大核心實務技術變革。" 
            icon={<ShieldAlert className="w-8 h-8" />} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-gray-900 text-white rounded-2xl">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  指引結構變革
                </h4>
                <div className="space-y-4 text-sm opacity-90">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>章節數</span>
                    <span className="font-bold">7 → 12 章</span>
                  </div>
                  <p>成人與小兒 BLS/ALS 正式拆分。新增「復甦後照護」與「倫理」獨立章節。</p>
                  <p className="p-3 bg-white/10 rounded-lg text-blue-300">證據等級 Level C 仍佔多數，提醒急救醫學仍需持續更新研究。</p>
                </div>
              </div>
              
              <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl">
                <h4 className="font-bold text-lg mb-4">倫理 (Ethics) 更新</h4>
                <ul className="text-sm space-y-3 text-gray-600">
                  <li className="flex gap-2">
                     <span className="text-blue-500">●</span> 強調「決策共享 (Shared Decision Making)」
                  </li>
                  <li className="flex gap-2">
                     <span className="text-blue-500">●</span> 現場放棄急救 (TOR) 規範化
                  </li>
                  <li className="flex gap-2">
                     <span className="text-blue-500">●</span> 家屬在旁觀看急救 (FPDR) 的正面意義
                  </li>
                </ul>
              </div>
            </div>

            {/* Main updates */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="異物梗塞 (FBOA)" color="amber" icon={<Zap className="w-5 h-5" />}>
                <p className="text-sm">簡化年齡層差異。成人/小兒：5次背部拍擊 + 5次哈姆立克。嬰兒：5次拍擊 + 5次<strong>胸部衝擊 (Chest Thrusts)</strong>。特殊者(孕/肥)改用胸部衝擊。</p>
              </Card>
              <Card title="生存之鏈整合" color="blue" icon={<Activity className="w-5 h-5" />}>
                <p className="text-sm">整合院內/外、成人/小兒流程。手機取代電話圖示，並新增第六環「康復 (Recovery)」。</p>
              </Card>
              <Card title="呼吸道與插管" color="purple" icon={<Stethoscope className="w-5 h-5" />}>
                <p className="text-sm">插管成功率低者優先使用 <strong>SGA (聲門上呼吸道)</strong>。核心原則：不要因建立呼吸道而中斷按壓分数 (CCF)。</p>
              </Card>
              <Card title="二氧化碳監測" color="green" icon={<Settings className="w-5 h-5" />}>
                <p className="text-sm">強烈建議 (Class 1) 全場景使用波形二氧化碳監測。若 20 分鐘 EtCO2 &lt; 10mmHg 作為 TOR 參考標。 </p>
              </Card>
              <Card title="去顫與貼片" color="red" icon={<Zap className="w-5 h-5" />}>
                <p className="text-sm">優先使用 <strong>前後貼 (Anterior-Posterior)</strong>。能量建議：成人直接使用機器最大量，小兒 2-4 J/kg。考慮頑固 VF 雙重序列去顫。</p>
              </Card>
              <Card title="給藥途徑 (IV vs IO)" color="blue" icon={<ShieldAlert className="w-5 h-5" />}>
                <p className="text-sm">成人優先建立 <strong>IV (靜脈)</strong>，因動力學較佳。IV 失敗再改 IO。小兒/新生兒 IV 與 IO 同等建議。早給 Epinephrine。</p>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100">
             <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
               <TrendingUp className="w-6 h-6 text-blue-600" />
               復甦後照護 (Post-Cardiac Arrest Care) 觀念翻轉
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                   <h5 className="font-bold text-blue-700 mb-2 underline">溫度管理 (TTM)</h5>
                   <p className="text-sm">重點在「預防發燒」，而非深層低溫。目標維持 &lt; 37.7°C 至少 72 小時。到院前不需要灌冰水。</p>
                </div>
                <div>
                   <h5 className="font-bold text-blue-700 mb-2 underline">氧合目標</h5>
                   <p className="text-sm">避免過度給氧。SpO2 目標 92-98%。</p>
                </div>
                <div>
                   <h5 className="font-bold text-blue-700 mb-2 underline">血壓與腦灌流</h5>
                   <p className="text-sm">移除 SBP 指標，改以 <strong>MAP (平均動脈壓) &gt; 65 mmHg</strong> 為主，甚至 &gt; 80 以利腦灌流。</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* QA Section */}
      <section id="qa" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="問答與實務應用：推動品管之誘因" 
            subtitle="如何在繁重勤務下讓基層人員願意投入品質管理？" 
            icon={<HelpCircle className="w-8 h-8 text-white" />} 
          />

          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl space-y-10">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center font-black">Q</div>
              <div className="space-y-4">
                <p className="text-xl font-bold italic">「台灣消防人員勤務繁忙，除救護還要救災及民力服務。在人員分身乏術下，如何讓他們看見品管的效益並激勵投入？」</p>
              </div>
            </div>

            <div className="flex gap-6 border-t border-white/10 pt-10">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black">A</div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h5 className="text-blue-400 font-bold uppercase tracking-widest text-sm">策略 1: 結合核心使命</h5>
                    <p className="text-blue-100/80">品管、教育、研究三者應結合。透過數據證實品管是成為頂尖醫療/急救訓練中心的必要條件，從而爭取院方行政與財務支持。</p>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-blue-400 font-bold uppercase tracking-widest text-sm">策略 2: 創造與轉化價值</h5>
                    <p className="text-blue-100/80">將品管工作與組織願景掛鉤（如提升專業地位、學術成就、人員安全性）。讓數據不只是數據，而是向上爭取經費的籌碼。</p>
                  </div>
                </div>
                <div className="p-6 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-xl">
                  <h6 className="font-bold mb-2">Key Takeaway</h6>
                  <p className="text-sm italic">「做品管不只是為了病人，更是為了累積數據，提供後進更好的教育素材。品管即是教育與研究的基石。」</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-600" />
                <span className="text-lg font-black tracking-tighter uppercase">HP-CPR Global Resource</span>
             </div>
             <p className="text-sm text-gray-500">
               © 2024 基於 Dr. Satha 演講內容整理。 成功三角：SOP, Training, Measurement.
             </p>
             <div className="flex gap-4">
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <ChevronDown className="w-5 h-5 transform rotate-180" />
                </button>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
