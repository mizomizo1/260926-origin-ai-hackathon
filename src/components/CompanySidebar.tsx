import { Screen } from '../App'

interface Props { current: string; navigate: (s: Screen) => void }

const items = [
  { icon: '📊', label: 'ダッシュボード', screen: 'companyDashboard' as Screen },
  { icon: '📋', label: 'Mission一覧', screen: 'missionList' as Screen },
  { icon: '✏️', label: 'Mission作成', screen: 'createMission' as Screen },
  { icon: '📈', label: '分析', screen: 'missionAnalytics' as Screen },
  { icon: '👥', label: '学生一覧', screen: 'studentList' as Screen },
  { icon: '💌', label: 'スカウト', screen: 'companyScouts' as Screen },
]

export default function CompanySidebar({ current, navigate }: Props) {
  return (
    <div className="company-sidebar flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#6C5CE7] flex items-center justify-center text-lg">🧭</div>
        <div>
          <p className="text-white text-sm font-bold leading-tight">Career Compass</p>
          <p className="text-white/50 text-xs">企業ダッシュボード</p>
        </div>
      </div>

      {/* Company */}
      <div className="flex items-center gap-2 px-2 mb-6 pb-6 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-[#6C5CE7] flex items-center justify-center text-sm">✨</div>
        <div>
          <p className="text-white text-xs font-semibold">株式会社Lumo</p>
          <p className="text-white/40 text-xs">消費財 · 東京</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {items.map(({ icon, label, screen }) => (
          <button key={label} onClick={() => navigate(screen)}
            className={`company-sidebar-item ${current === screen ? 'active' : ''}`}>
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="space-y-1 border-t border-white/10 pt-4">
        <button className="company-sidebar-item">
          <span className="text-lg">⚙️</span>
          <span>設定</span>
        </button>
        <button onClick={() => navigate('splash')} className="company-sidebar-item">
          <span className="text-lg">🚪</span>
          <span>ログアウト</span>
        </button>
      </div>
    </div>
  )
}
