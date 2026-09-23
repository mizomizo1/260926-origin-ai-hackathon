import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyStudents, companyMissions, companyScoutPipeline } from '../../data/mock'

interface Props { navigate: (s: Screen) => void }

const kpis = [
  { label: '公開中Mission', value: 2, delta: '+1', color: '#6C5CE7', bg: '#EEF0FF', icon: '📋' },
  { label: '試行数（今月）', value: 124, delta: '+18%', color: '#00B894', bg: '#E8FBF5', icon: '▶️' },
  { label: '完了数', value: 97, delta: '+12%', color: '#F59E0B', bg: '#FEF3C7', icon: '✅' },
  { label: '興味あり数', value: 26, delta: '+5', color: '#EC4899', bg: '#FDF2F8', icon: '❤️' },
  { label: 'スカウト候補', value: 8, delta: '+2', color: '#3B82F6', bg: '#EFF6FF', icon: '⭐' },
]

export default function CompanyDashboard({ navigate }: Props) {
  return (
    <div className="flex min-h-screen">
      <CompanySidebar current="companyDashboard" navigate={navigate} />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm text-gray-500">2025年4月14日 月曜日</p>
            <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          </div>
          <button onClick={() => navigate('createMission')}
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: '#6C5CE7' }}>
            + Mission作成
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {kpis.map(({ label, value, delta, color, bg, icon }) => (
            <div key={label} className="kpi-card">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: bg }}>
                  {icon}
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: bg, color }}>
                  {delta}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular missions */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-gray-900">人気Mission</h2>
              <button onClick={() => navigate('missionList')} className="text-xs text-[#6C5CE7]">全て見る</button>
            </div>
            <div className="space-y-3">
              {companyMissions.filter(m => m.status === '公開中').map(m => (
                <div key={m.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{m.title}</p>
                    <p className="text-xs text-gray-500">{m.participants}名参加</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{m.completionRate}%</p>
                    <p className="text-xs text-gray-400">完了率</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent students */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-gray-900">最近の学生</h2>
              <button onClick={() => navigate('studentList')} className="text-xs text-[#6C5CE7]">全て見る</button>
            </div>
            <div className="space-y-3">
              {companyStudents.slice(0, 3).map(s => (
                <button key={s.id} onClick={() => navigate('studentDetail', { studentId: s.id })}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#EEF0FF] transition-colors text-left">
                  <div className="w-9 h-9 rounded-full bg-[#6C5CE7] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {s.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.schoolYear} · {s.missionCompleted}Mission完了</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full flex-shrink-0"
                    style={s.interestLevel === '高'
                      ? { background: '#EEF0FF', color: '#6C5CE7' }
                      : s.interestLevel === '中'
                        ? { background: '#FEF3C7', color: '#D97706' }
                        : { background: '#F3F4F6', color: '#9CA3AF' }
                    }>
                    {s.interestLevel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scout queue */}
          <div className="bg-white rounded-2xl p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-gray-900">スカウト状況</h2>
              <button onClick={() => navigate('companyScouts')} className="text-xs text-[#6C5CE7]">管理する</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {companyScoutPipeline.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate('studentDetail', { studentId: item.studentId })}
                  className="text-left bg-gray-50 rounded-xl p-4 hover:bg-[#EEF0FF] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-gray-900">{item.studentName}</p>
                    <span className="text-[11px] text-gray-500">{item.status}</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.fitReason}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quick analytics */}
          <div className="bg-white rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-base font-bold text-gray-900 mb-4">価値観別の反応 (今月)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: '人・雰囲気重視', count: 38, pct: 78 },
                { label: '成長重視', count: 29, pct: 65 },
                { label: 'やりがい重視', count: 24, pct: 58 },
                { label: '働きやすさ重視', count: 18, pct: 42 },
                { label: 'お金・安定重視', count: 12, pct: 31 },
                { label: '自由度重視', count: 9, pct: 24 },
              ].map(({ label, count, pct }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-600 mb-2">{label}</p>
                  <div className="h-1.5 bg-gray-200 rounded-full mb-1">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#6C5CE7' }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{count}人</span>
                    <span className="font-mono text-gray-700">{pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
