import React, { useState, useEffect } from 'react';
import { 
  Heart, Activity, TrendingUp, Users, Settings, ShieldAlert, 
  Stethoscope, History, Video, Zap, CheckCircle2, HelpCircle,
  Menu, X, ChevronDown, Info, BookOpen, AlertTriangle, 
  Layers, Thermometer, Brain, Microscope, Landmark, Award
} from 'lucide-react';

// --- UI Components ---

const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "blue" }) => (
  <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
    color === "red" ? "bg-red-50 text-red-700 border-red-100" : 
    color === "green" ? "bg-green-50 text-green-700 border-green-100" :
    "bg-blue-50 text-blue-700 border-blue-100"
  }`}>
    {children}
  </span>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string; icon: React.ReactNode; id?: string }> = ({ title, subtitle, icon, id }) => (
  <div id={id} className="mb-16 scroll-mt-24">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg">
        {icon}
      </div>
      <h2 className="text-3xl md:text-4xl font-black text-slate-900">{title}</h2>
    </div>
    {subtitle && <p className="text-xl text-slate-600 leading-relaxed max-w-4xl border-l-4 border-blue-200 pl-6">{subtitle}</p>}
  </div>
);

const DetailCard: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode; footer?: string; highlight?: boolean }> = ({ title, children, icon, footer, highlight }) => (
  <div className={`group p-8 rounded-3xl border transition-all duration-300 ${highlight ? 'bg-white shadow-xl border-blue-100 ring-1 ring-blue-50' : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:shadow-lg'}`}>
    <div className="flex items-center gap-3 mb-6">
      {icon && <div className="p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">{icon}</div>}
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed space-y-4 text-base">
      {children}
    </div>
    {footer && <div className="mt-6 pt-4 border-t border-slate-100 text-sm font-bold text-blue-600">{footer}</div>}
  </div>
);

// --- Content Sections ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'intro', label: '背景概論', icon: <Landmark className="w-4 h-4" /> },
    { id: 'physiology', label: 'HP-CPR 生理學', icon: <Microscope className="w-4 h-4" /> },
    { id: 'pit-crew', label: '團隊分工(Pit Crew)', icon: <Users className="w-4 h-4" /> },
    { id: 'cqi-deep', label: 'CQI 深度實務', icon: <Video className="w-4 h-4" /> },
    { id: 'ventilation-tech', label: '通氣技術詳解', icon: <Activity className="w-4 h-4" /> },
    { id: 'aha2025-core', label: '2025 AHA 更新', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'pals-neonatal', label: '小兒與新生兒', icon: <Heart className="w-4 h-4" /> },
    { id: 'post-arrest', label: '復甦後照護', icon: <Brain className="w-4 h-4" /> },
    { id: 'ethics-tor', label: '倫理與終止', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'future', label: '未來趨勢', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-2 shadow-sm' : 'bg-transparent py-4'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-red-600 p-1.5 rounded-lg shadow-lg shadow-red-200">
              <Heart className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">HP-CPR <span className="text-red-600">Pro</span></span>
          </div>
          
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center gap-2">
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          <button className="xl:hidden p-3 rounded-2xl bg-slate-100 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="w-full text-left p-5 text-xl font-black text-slate-800 border-b border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">{item.icon}</div>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative pt-44 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent_70%)]"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Badge color="red">Comprehensive Medical Guide 2025</Badge>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-10 leading-[1.1] tracking-tight">
            曼谷 HP-CPR 實戰策略 <br />
            <span className="text-blue-400">& 2025 AHA 指南</span> 全書
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            從 0% 存活率到高品質復甦的技術轉型路徑。探討高效能 CPR 生理機制、團隊動力學、品質改善 (CQI) 與 2025 年最新國際指南變革。
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => scrollTo('physiology')} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all hover:-translate-y-1">
              進入深度學術內容
            </button>
            <button onClick={() => scrollTo('aha2025-core')} className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
              2025 AHA 更新速覽
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        
        {/* 1. Background Intro */}
        <section id="intro" className="section-padding">
          <SectionHeader 
            title="一、曼谷 EMS 體系：資源受限下的急救奇蹟" 
            subtitle="曼谷作為亞洲最具挑戰性的都市環境之一，其急救系統的成功並非偶然，而是基於高度標準化與社區合作。" 
            icon={<Landmark className="w-8 h-8" />} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailCard title="二元化架構 (Two-Tier Architecture)" icon={<Layers className="w-6 h-6 text-blue-600" />}>
              <p>曼谷體系由 **ALS (高級救護)** 與 **BLS (基本救護)** 共同支撐。Siriraj 醫院作為 ALS 龍頭，不僅提供醫療，更承擔了訓練志願者組織的重任。</p>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li>ALS：醫院主導，負責氣道管理與藥物治療。</li>
                <li>BLS：由「基金會」組成的義工群，具備極強的反應速度與地盤優勢。</li>
              </ul>
            </DetailCard>
            <DetailCard title="核心轉型點 (The Turning Point)" icon={<TrendingUp className="w-6 h-6 text-green-600" />}>
              <p>2018 年 Siriraj 加入 PAROS 研究，數據顯示初期存活率極低。Dr. Satha 的策略是將「競爭對手」轉為「合作夥伴」，以設備共享換取訓練品質。</p>
            </DetailCard>
          </div>
        </section>

        {/* 2. Physiology of HP-CPR */}
        <section id="physiology" className="section-padding bg-white rounded-[40px] shadow-sm px-12">
          <SectionHeader 
            title="二、HP-CPR 生理機制：為什麼品質高於一切" 
            subtitle="CPR 的目的不僅是恢復循環，更是維持大腦的最低限度灌流。" 
            icon={<Microscope className="w-8 h-8" />} 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-2xl font-black text-slate-800">1. 胸外按壓的生理效果</h3>
              <p className="text-slate-600 text-lg">按壓時，胸腔內壓升高，直接壓縮心臟並推動血液。但在按壓**釋放 (Recoil)** 時，胸腔內產生負壓，血液才得以回流心臟。**如果釋放不完全，回流就會中斷，導致接下來的按壓完全無效。**</p>
              
              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-4 uppercase tracking-widest">CPP (冠狀動脈灌流壓) 臨界點</h4>
                <p className="text-slate-700">研究證實，當按壓中斷超過 10 秒，CPP 會歸零。重新開始按壓後，需要連續按壓 **15-20 次**才能恢復到原本的灌流壓。這就是為什麼「中斷」是致命的。</p>
              </div>
            </div>
            <div className="space-y-6">
              <DetailCard title="HP-CPR 三大指標" icon={<Award className="w-6 h-6 text-amber-500" />} highlight>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">深度</span>
                    <span className="text-blue-600 font-black">5-6 cm</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">速率</span>
                    <span className="text-blue-600 font-black">100-120 次/分</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold">CCF</span>
                    <span className="text-blue-600 font-black">&gt; 80-90%</span>
                  </div>
                </div>
              </DetailCard>
            </div>
          </div>
        </section>

        {/* 3. Pit Crew Team Dynamics */}
        <section id="pit-crew" className="section-padding">
          <SectionHeader 
            title="三、團隊分工 (Pit Crew)：場景控制與模組化" 
            subtitle="如同 F1 賽車維修站，每位成員在抵達現場的 30 秒內必須定位完成。" 
            icon={<Users className="w-8 h-8" />} 
          />
          <div className="bg-slate-900 rounded-[48px] p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold mb-8 text-blue-400">成員職責 (5-Person Model)</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-lg">按壓者 (Compressor)</h4>
                      <p className="text-slate-400 text-sm">位於病人右側，專注於高品質按壓，每 2 分鐘換手。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-lg">氣道者 (Airway)</h4>
                      <p className="text-slate-400 text-sm">位於頭側，負責 BVM/SGA/ETI 與 EtCO2 監控。</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-lg">指揮與去顫 (Monitor/AED)</h4>
                      <p className="text-slate-400 text-sm">位於左側，操作生理監視器，倒數充電時間。</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-400" />
                  高效能戰術細節
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                    <div>
                      <p className="font-bold">Hover Hand (預備接手)</p>
                      <p className="text-sm text-slate-400">接手者手部懸停於 10 公分處，倒數 3-2-1 瞬間無縫切換。</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                    <div>
                      <p className="font-bold">Pre-Charging (預先充電)</p>
                      <p className="text-sm text-slate-400">在 1 分 50 秒時開始充電，確保在檢查脈搏的當下即可電擊。</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CQI Detailed Practice */}
        <section id="cqi-deep" className="section-padding">
          <SectionHeader 
            title="四、CQI 深度實務：密錄器與數據回放" 
            subtitle="沒有數據的品質改善只是傳說。" 
            icon={<Video className="w-8 h-8" />} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-slate-600 text-lg">曼谷 Siriraj 醫院要求所有醫護人員配戴 **Body-Worn Camera**。這不僅是法律保障，更是教育工具。透過將影像與生理數據（如胸部阻抗、EtCO2）同步對比，人員能清晰發現自己不自覺的「疲勞期」。</p>
              {/* Fix: Changed undefined 'Card' component to 'DetailCard' */}
              <DetailCard title="數據指標看板">
                <ul className="space-y-4">
                  <li className="flex justify-between border-b pb-2"><span>平均 CCF</span> <span className="text-blue-600 font-bold">92%</span></li>
                  <li className="flex justify-between border-b pb-2"><span>換手停頓平均</span> <span className="text-blue-600 font-bold">2.8 秒</span></li>
                  <li className="flex justify-between border-b pb-2"><span>ROSC 後入住 ICU 率</span> <span className="text-blue-600 font-bold">提升 15%</span></li>
                </ul>
              </DetailCard>
            </div>
            <DetailCard title="獎勵與文化" icon={<Award className="w-6 h-6 text-red-600" />}>
              <p>為了避免「檢討文化」造成人員壓力，Siriraj 設立了：</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>**金手獎 (Golden Hand Award)**：頒發給達成 CCF &gt; 95% 的團隊。</li>
                <li>**無責回顧制度**：檢討的是系統流程，而非個人錯誤。</li>
                <li>**學術分享**：讓優秀案例成為國際研討會的教材，增加榮譽感。</li>
              </ol>
            </DetailCard>
          </div>
        </section>

        {/* 5. AHA 2025 Core Updates (Deep) */}
        <section id="aha2025-core" className="section-padding bg-slate-50 rounded-[40px] px-12">
          <SectionHeader 
            title="五、2025 AHA Guidelines 全解讀" 
            subtitle="每五年一次的科學基石更新。2025 年強調「數位急救」與「全生命週期復甦」。" 
            icon={<ShieldAlert className="w-8 h-8" />} 
          />
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DetailCard title="波形 EtCO2 (Class 1)" icon={<Activity className="w-5 h-5" />}>
                  <p className="text-sm">不再只是「選配」。2025 指南強烈建議所有 ALS 與後送過程必須使用波形二氧化碳監測，作為判斷 ROSC 與插管正確性的金標準。</p>
                </DetailCard>
                <DetailCard title="IV 優先於 IO (成人)" icon={<Stethoscope className="w-5 h-5" />}>
                  <p className="text-sm">最新證據顯示，成人 OHCA 使用靜脈注射 (IV) 的預後優於骨內針 (IO)。但在小兒領域，兩者仍維持同級建議。</p>
                </DetailCard>
                <DetailCard title="雙重序列去顫 (DSD)" icon={<Zap className="w-5 h-5" />}>
                  <p className="text-sm">針對頑固性心室顫動 (Refractory VF)，可考慮使用兩台去顫器進行向量變更或序列放電，但需由受訓團隊執行。</p>
                </DetailCard>
                <DetailCard title="康復第六環 (Recovery)" icon={<History className="w-5 h-5" />}>
                  <p className="text-sm">生存之鏈正式固定第六環。強調出院後的認知評估、心理支持與長期的功能重建。</p>
                </DetailCard>
              </div>
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">FBOA 梗塞更新</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-red-200 uppercase text-xs mb-2 tracking-widest">成人與兒童</h4>
                    <p className="text-sm">5 次背部拍擊 + 5 次哈姆立克法 (腹部衝擊)。</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-200 uppercase text-xs mb-2 tracking-widest">嬰兒 (&lt; 1歲)</h4>
                    <p className="text-sm">5 次背部拍擊 + 5 次 **胸部衝擊** (Chest Thrusts)。嚴禁使用腹部衝擊以免傷及內臟。</p>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-xs italic text-red-100 font-medium">※ 失去意識後應立即啟動 CPR 流程，不檢查脈搏直接按壓。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PALS & Neonatal (Expanded) */}
        <section id="pals-neonatal" className="section-padding">
          <SectionHeader 
            title="六、小兒與新生兒復甦：精準與細膩" 
            subtitle="兒童不是成人的縮小版。2025 AHA 對小兒 BLS 與 ALS 進行了專章拆分。" 
            icon={<Heart className="w-8 h-8" />} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-pink-50 border border-pink-100 rounded-3xl">
              <h4 className="text-xl font-bold text-pink-700 mb-4">按壓深度準則</h4>
              <p className="text-slate-600 mb-6">必須達到胸腔厚度的 **1/3 (約 4-5 公分)**。不足的深度是小兒復甦失敗的主因。</p>
              <div className="text-xs font-bold text-pink-600">
                比例：雙人 15:2 / 單人 30:2
              </div>
            </div>
            <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl">
              <h4 className="text-xl font-bold text-blue-700 mb-4">新生兒 T-Piece 使用</h4>
              <p className="text-slate-600 mb-6">2025 指南優先建議在產房使用 T-Piece 復甦器提供 PEEP，取代傳統甦醒球 (Ambu Bag)。</p>
              <div className="text-xs font-bold text-blue-600">
                通氣頻率：40-60 次/分
              </div>
            </div>
            <div className="p-8 bg-slate-900 text-white rounded-3xl">
              <h4 className="text-xl font-bold text-blue-400 mb-4">藥物劑量速查</h4>
              <ul className="text-sm space-y-3 opacity-90">
                <li>**Epi**：0.01 mg/kg (1:10000)</li>
                <li>**Amiodarone**：5 mg/kg</li>
                <li>**能量**：首擊 2J/kg → 續擊 4J/kg → 最高 10J/kg</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Post-Arrest & Recovery */}
        <section id="post-arrest" className="section-padding bg-blue-950 text-white rounded-[40px] px-12">
          <SectionHeader 
            title="七、復甦後照護 (PCAC)：腦保護戰場" 
            subtitle="恢復心跳只是勝利的一半，防止腦缺血再灌流損傷是下半場核心。" 
            icon={<Brain className="w-8 h-8" />} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="p-4 bg-white/10 rounded-2xl h-fit"><Thermometer className="text-orange-400" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-3 underline decoration-orange-400 underline-offset-8">目標體溫管理 (TTM)</h4>
                  <p className="text-slate-300">不再盲目追求「低溫」，而是「控溫」。核心目標是 **防止發燒 (> 37.7°C)** 至少持續 72 小時。對於意識不清的患者，控溫於 32-36°C 仍是可選方案。</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-white/10 rounded-2xl h-fit"><Activity className="text-green-400" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-3 underline decoration-green-400 underline-offset-8">血壓管理變革</h4>
                  <p className="text-slate-300">捨棄 SBP 90 的舊思維。2025 指南建議 **MAP (平均動脈壓) > 65 mmHg** 作為最低標準。為優化腦灌流，許多中心現在設定 MAP 為 80-100 mmHg。</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
               <h4 className="text-xl font-bold mb-6">神經學預後評估 (Neurological Prognostication)</h4>
               <p className="text-slate-400 mb-6 italic">「不應過早宣告死亡。」</p>
               <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 至少需觀察 72 小時 (恢復常溫後)。</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> 結合瞳孔反應、SSEP、NSE 標記物與影像。</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> EEG 監測以排除隱蔽性癲癇 (Non-convulsive Status)。</li>
               </ul>
            </div>
          </div>
        </section>

        {/* 8. Ethics & TOR */}
        <section id="ethics-tor" className="section-padding">
          <SectionHeader 
            title="八、急救倫理與終止規則 (TOR)" 
            subtitle="什麼時候該放手？這是一個關於尊嚴、數據與人性的抉擇。" 
            icon={<BookOpen className="w-8 h-8" />} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fix: Removed unsupported 'color' prop from 'DetailCard' */}
            <DetailCard title="BLS TOR 規則">
              <p>如果滿足以下三點，院外可考慮終止急救：</p>
              <ul className="list-decimal list-inside space-y-2 text-sm mt-4">
                <li>沒有旁觀者目擊 (Unwitnessed)。</li>
                <li>救護人員抵達前未施予電擊。</li>
                <li>救護人員施予三次 CPR 後未曾恢復自發循環。</li>
              </ul>
            </DetailCard>
            <DetailCard title="決策共享 (Shared Decision Making)">
               <p>2025 指南強調家屬參與度。**FPDR (家屬在場復甦)** 被證實能減少家屬的病理性哀慟，並讓他們確信團隊已盡全力。醫護人員應接受溝通訓練而非將家屬驅離。</p>
            </DetailCard>
          </div>
        </section>

        {/* 9. Future Trends */}
        <section id="future" className="section-padding bg-white rounded-[40px] px-12 text-center mb-24">
          <SectionHeader 
            title="九、未來趨勢：AI 與 數位雙生" 
            icon={<TrendingUp className="w-8 h-8" />} 
            id="future-header"
          />
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-black text-blue-600 mb-2">Tele-EMS</div>
              <p className="text-slate-500 text-sm">醫師透過視訊眼鏡即時遙控現場插管與決策。</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-blue-600 mb-2">Drones</div>
              <p className="text-slate-500 text-sm">無人機提前投遞 AED，克服曼谷塞車障礙。</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-black text-blue-600 mb-2">AI-CPR</div>
              <p className="text-slate-500 text-sm">智慧背心即時偵測血液動力學，自動調整按壓參數。</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-2 mb-8 text-white">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-black tracking-tighter uppercase">HP-CPR GLOBAL RESOURCE</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              本網頁資訊整合自 Dr. Satha 教授之「曼谷 HP-CPR 成功路徑」講座內容，並結合 2025 年國際最新 AHA 復甦指南。旨在提供華語急救人員最全面、深度的學術資源。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h5 className="text-white font-bold mb-6">快速連結</h5>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => scrollTo('physiology')} className="hover:text-white">生理學基礎</button></li>
                <li><button onClick={() => scrollTo('aha2025-core')} className="hover:text-white">2025 AHA 更新</button></li>
                <li><button onClick={() => scrollTo('cqi-deep')} className="hover:text-white">品質改善案例</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6">相關聲明</h5>
              <p className="text-xs leading-relaxed">本網頁內容僅供學術交流使用，臨床實務請務必參考當地醫療法規與所屬機關 SOP。未經許可請勿轉載。</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2025 HP-CPR Resource Center. Powered by Senior Frontend Engineer Implementation.</p>
          <div className="flex gap-6">
            <Info className="w-4 h-4 cursor-help" />
            <ShieldAlert className="w-4 h-4 cursor-help" />
          </div>
        </div>
      </footer>
    </div>
  );
}
