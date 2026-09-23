import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'

interface Props { navigate: (s: Screen) => void }

function BarChart({ data }: { data: { label: string; value: number; color?: string }[] }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="flex items-end gap-3 h-28">
      {data.map(({ label, value, color }) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs font-mono text-gray-500">{value}</span>
          <div className="w-full rounded-t-lg transition-all duration-700"
            style={{ height: `${(value / max) * 80}px`, background: color ?? '#6C5CE7' }} />
          <span className="text-xs text-gray-500 text-center leading-tight">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function MissionAnalytics({ navigate }: Props) {
  const funnel = [
    { label: '閲覧', value: 312, color: '#C4B5FD' },
    { label: '開始', value: 124, color: '#A29BFE' },
    { label: '完了', value: 97, color: '#6C5CE7' },
    { label: '興味あり', value: 26, color: '#4C1D95' },
  ]

  const yearDist = [
    { label: '大学1年', value: 12, color: '#EEF0FF' },
    { label: '大学2年', value: 28, color: '#C4B5FD' },
    { label: '大学3年', value: 45, color: '#6C5CE7' },
    { label: '大学4年', value: 19, color: '#4C1D95' },
  ].map(d => ({ ...d }))

  const valueDist = [
    { label: '人・雰囲気', pct: 78 },
    { label: '成長', pct: 65 },
    { label: 'やりがい', pct: 58 },
    { label: '働きやすさ', pct: 42 },
    { label: 'お金・安定', pct: 31 },
    { label: '自由度', pct: 24 },
  ]

  return (
    <div className="flex min-h-screen">
      <CompanySidebar current="missionAnalytics" navigate={navigate} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <button onClick={() => navigate('missionList')} className="text-gray-400 text-sm">← Mission一覧</button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Mission分析</h1>
          <p className="text-sm text-gray-500 mt-0.5">新商品のSNS企画を考える</p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: '閲覧数', value: 312, icon: '👁️' },
            { label: '開始率', value: '39.7%', icon: '▶️' },
            { label: '完了率', value: '78.2%', icon: '✅' },
            { label: '平均満足度', value: '4.3 ⭐', icon: '😄' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="kpi-card">
              <p className="text-2xl mb-1">{icon}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">ファネル</h2>
            <BarChart data={funnel} />
          </div>

          {/* Year distribution */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">学年別参加</h2>
            <BarChart data={yearDist} />
          </div>

          {/* Value distribution */}
          <div className="bg-white rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-base font-bold text-gray-900 mb-4">参加学生の価値観分布</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {valueDist.map(({ label, pct }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">{label}</span>
                    <span className="font-mono font-bold text-[#6C5CE7]">{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#6C5CE7' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly trend */}
          <div className="bg-white rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-base font-bold text-gray-900 mb-4">月別参加推移</h2>
            <BarChart data={[
              { label: '1月', value: 18, color: '#C4B5FD' },
              { label: '2月', value: 24, color: '#C4B5FD' },
              { label: '3月', value: 35, color: '#A29BFE' },
              { label: '4月', value: 47, color: '#6C5CE7' },
            ]} />
          </div>
        </div>
      </main>
    </div>
  )
}
