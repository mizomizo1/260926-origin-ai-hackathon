import { Screen } from '../App'

interface Props { current: string; navigate: (s: Screen) => void }

const items = [
  {
    icon: '📊',
    label: 'ホーム',
    screen: 'companyDashboard' as Screen,
    matches: ['companyDashboard'],
    hint: '全体状況',
  },
  {
    icon: '📋',
    label: 'Mission',
    screen: 'missionList' as Screen,
    matches: ['missionList', 'createMission', 'missionAnalytics'],
    hint: '作成・分析',
  },
  {
    icon: '👥',
    label: '学生',
    screen: 'studentList' as Screen,
    matches: ['studentList', 'studentDetail'],
    hint: '候補分析',
  },
  {
    icon: '💌',
    label: 'スカウト',
    screen: 'companyScouts' as Screen,
    matches: ['companyScouts'],
    hint: '接点管理',
  },
]

export default function CompanySidebar({ current, navigate }: Props) {
  return (
    <div className="company-sidebar flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[#6C5CE7] flex items-center justify-center text-sm font-bold text-white">CC</div>
        <div>
          <p className="text-white text-sm font-bold leading-tight">Career Compass Trial</p>
          <p className="text-white/50 text-xs">企業ダッシュボード</p>
        </div>
      </div>

      {/* Company */}
      <div className="flex items-center gap-2 px-2 mb-6 pb-6 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">✨</div>
        <div>
          <p className="text-white text-xs font-semibold">株式会社Lumo</p>
          <p className="text-white/40 text-xs">消費財 · 東京</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {items.map(({ icon, label, screen, matches, hint }) => (
          <button key={label} onClick={() => navigate(screen)}
            className={`company-sidebar-item ${matches.includes(current) ? 'active' : ''}`}>
            <span className="text-lg">{icon}</span>
            <span className="min-w-0">
              <span className="block leading-tight">{label}</span>
              <span className={`block text-[10px] leading-tight ${matches.includes(current) ? 'text-[#17152B]/45' : 'text-white/35'}`}>{hint}</span>
            </span>
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
