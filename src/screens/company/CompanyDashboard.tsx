import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyCoreTrialInsights, companyMissions, companyScoutPipeline, companyStudents } from '../../data/mock'

interface Props { navigate: (s: Screen) => void }

export default function CompanyDashboard({ navigate }: Props) {
  const published = companyMissions.filter(mission => mission.status === '公開中')
  const totalParticipants = companyMissions.reduce((sum, mission) => sum + mission.participants, 0)
  const scoutCandidates = companyStudents.filter(student => student.status === 'スカウト候補')
  const topStudents = [...companyStudents].sort((a, b) => b.satisfaction - a.satisfaction).slice(0, 4)

  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="companyDashboard" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <section className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#6C5CE7]">企業ホーム</p>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">株式会社Lumoの採用Trial</h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">自社Mission、基礎Trialの反応、学生の価値観・提出記録を見ながら候補者を見つけます。</p>
            </div>
            <button onClick={() => navigate('createMission')} className="rounded-xl bg-[#17152B] px-5 py-3 text-sm font-bold text-white hover:bg-[#24213A]">
              Mission作成
            </button>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[
            { label: '公開中Mission', value: published.length, note: `${companyMissions.length}件を管理`, color: '#6C5CE7', bg: '#EEF0FF' },
            { label: '体験した学生', value: totalParticipants, note: '自社Mission累計', color: '#00B894', bg: '#E8FBF5' },
            { label: 'スカウト候補', value: scoutCandidates.length, note: '高相性の学生', color: '#EC4899', bg: '#FDF2F8' },
            { label: '基礎Trial接点', value: companyCoreTrialInsights.reduce((sum, trial) => sum + trial.scoutFit, 0), note: '自社候補に近い反応', color: '#F59E0B', bg: '#FEF3C7' },
          ].map(item => (
            <div key={item.label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold" style={{ background: item.bg, color: item.color }}>{item.value}</span>
                <span className="text-[11px] font-bold text-gray-400">{item.note}</span>
              </div>
              <p className="text-sm font-bold text-gray-900">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="overflow-hidden rounded-3xl bg-[#17152B] p-7 text-white shadow-sm">
            <p className="text-xs font-bold text-[#A29BFE]">Mission Health</p>
            <h2 className="mt-2 text-2xl font-bold">公開中の自社Missionを管理</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
              {published.map(mission => (
                <button key={mission.id} onClick={() => navigate('missionAnalytics')} className="rounded-2xl bg-white/10 p-4 text-left transition-colors hover:bg-white/15">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white/75">{mission.category}</span>
                    <span className="text-xs font-bold text-[#A29BFE]">{mission.completionRate}%</span>
                  </div>
                  <p className="min-h-[40px] text-sm font-bold leading-snug">{mission.title}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/50">{mission.summary}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/45">
                    <span>{mission.participants}名</span>
                    <span>興味あり {mission.interestRate}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold text-[#6C5CE7]">基礎Trialから見る候補</p>
            <h2 className="mt-2 text-xl font-bold text-gray-900">自社Mission前のシグナル</h2>
            <div className="mt-5 space-y-3">
              {companyCoreTrialInsights.map(trial => (
                <div key={trial.id} className="rounded-2xl bg-[#F7F8FB] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{trial.title}</p>
                      <p className="mt-1 text-xs text-gray-500">{trial.note}</p>
                    </div>
                    <span className="rounded-full bg-[#EEF0FF] px-2.5 py-1 text-xs font-bold text-[#6C5CE7]">{trial.scoutFit}人</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {trial.strongSignals.map(signal => <span key={signal} className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-gray-500">{signal}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-[#EC4899]">Scout Queue</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">次に見る学生</h2>
              </div>
              <button onClick={() => navigate('studentList')} className="text-xs font-bold text-[#6C5CE7]">学生一覧</button>
            </div>
            <div className="space-y-3">
              {topStudents.map(student => (
                <button key={student.id} onClick={() => navigate('studentDetail', { studentId: student.id })} className="w-full rounded-2xl bg-[#F7F8FB] p-4 text-left hover:bg-[#EEF0FF]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C5CE7] text-sm font-bold text-white">{student.name[0]}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-gray-900">{student.name}</p>
                      <p className="truncate text-xs text-gray-500">{student.schoolYear} · {student.fitTags.join('・')}</p>
                    </div>
                    <span className="text-sm font-bold text-[#6C5CE7]">{student.satisfaction}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-[#6C5CE7]">学生分析</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">反応している学生の傾向</h2>
              </div>
              <button onClick={() => navigate('companyScouts')} className="text-xs font-bold text-[#6C5CE7]">スカウト管理</button>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {companyScoutPipeline.map(item => (
                <button key={item.id} onClick={() => navigate('studentDetail', { studentId: item.studentId })} className="rounded-2xl border border-gray-100 p-4 text-left hover:border-[#6C5CE7]/40">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900">{item.studentName}</p>
                    <span className="rounded-full bg-[#EEF0FF] px-2 py-0.5 text-[11px] font-bold text-[#6C5CE7]">{item.status}</span>
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-600">{item.fitReason}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.viewed.map(view => <span key={view} className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">{view}</span>)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
