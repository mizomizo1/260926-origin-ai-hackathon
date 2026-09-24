import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyCoreTrialInsights, companyMissions, companyStudents } from '../../data/mock'

interface Props { navigate: (s: Screen) => void }

function BarChart({ data }: { data: { label: string; value: number; color?: string }[] }) {
  const max = Math.max(...data.map(item => item.value))
  return (
    <div className="flex h-32 items-end gap-3">
      {data.map(item => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
          <span className="text-xs font-bold text-gray-500">{item.value}</span>
          <div className="w-full rounded-t-xl" style={{ height: `${(item.value / max) * 88}px`, background: item.color ?? '#6C5CE7' }} />
          <span className="text-center text-[11px] font-bold leading-tight text-gray-400">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function MissionAnalytics({ navigate }: Props) {
  const mission = companyMissions[0]
  const highFitStudents = companyStudents.filter(student => student.interestLevel === '高')
  const funnel = [
    { label: '閲覧', value: 312, color: '#C4B5FD' },
    { label: '開始', value: mission.participants, color: '#A29BFE' },
    { label: '完了', value: Math.round(mission.participants * mission.completionRate / 100), color: '#6C5CE7' },
    { label: '興味あり', value: Math.round(mission.participants * mission.interestRate / 100), color: '#4C1D95' },
  ]

  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="missionAnalytics" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <button onClick={() => navigate('missionList')} className="mb-5 text-sm font-bold text-gray-400 hover:text-gray-600">← Mission一覧</button>

        <section className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#6C5CE7]">Mission分析</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">{mission.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">{mission.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {mission.tags.map(tag => <span key={tag} className="rounded-full bg-[#EEF0FF] px-2.5 py-1 text-xs font-bold text-[#6C5CE7]">{tag}</span>)}
          </div>
        </section>

        <section className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[
            { label: '閲覧数', value: 312, note: '学生側カード表示', color: '#6C5CE7', bg: '#EEF0FF' },
            { label: '開始率', value: '39.7%', note: `${mission.participants}名が開始`, color: '#00B894', bg: '#E8FBF5' },
            { label: '完了率', value: `${mission.completionRate}%`, note: '最後まで提出', color: '#F59E0B', bg: '#FEF3C7' },
            { label: '興味あり', value: `${mission.interestRate}%`, note: '企業接点候補', color: '#EC4899', bg: '#FDF2F8' },
          ].map(item => (
            <div key={item.label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{item.label}</p>
              <p className="mt-1 text-xs text-gray-400">{item.note}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">ファネル</h2>
            <div className="mt-6"><BarChart data={funnel} /></div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">価値観分布</h2>
            <div className="mt-5 space-y-3">
              {[
                { label: '人・雰囲気', pct: 78 },
                { label: '成長', pct: 65 },
                { label: 'やりがい', pct: 58 },
                { label: '働きやすさ', pct: 42 },
              ].map(item => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-bold text-gray-700">{item.label}</span>
                    <span className="font-mono font-bold text-[#6C5CE7]">{item.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#EEF0FF]">
                    <div className="h-full rounded-full bg-[#6C5CE7]" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-[#EC4899]">High Fit Students</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">このMissionと相性が高い学生</h2>
              </div>
              <button onClick={() => navigate('studentList')} className="text-xs font-bold text-[#6C5CE7]">学生一覧</button>
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
              {highFitStudents.slice(0, 4).map(student => (
                <button key={student.id} onClick={() => navigate('studentDetail', { studentId: student.id })} className="rounded-2xl bg-[#F7F8FB] p-4 text-left hover:bg-[#EEF0FF]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C5CE7] text-sm font-bold text-white">{student.name[0]}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900">{student.name}</p>
                      <p className="truncate text-xs text-gray-500">{student.fitTags.join('・')}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
            <p className="text-xs font-bold text-[#F59E0B]">基礎Trialとの接続</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">自社Mission前に見ておきたい基礎Trial</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
              {companyCoreTrialInsights.map(trial => (
                <div key={trial.id} className="rounded-2xl bg-[#F7F8FB] p-4">
                  <p className="text-sm font-bold text-gray-900">{trial.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">{trial.note}</p>
                  <p className="mt-3 text-xs font-bold text-[#F59E0B]">候補接点 {trial.scoutFit}人</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
