import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyMissions, companyScoutPipeline, companyStudents } from '../../data/mock'

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
        <section className="mb-6 border-b border-gray-200 pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#6C5CE7]">企業ホーム</p>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">株式会社Lumoの採用Trial</h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">公開中のMissionと、学生の反応をひとつの流れで確認できます。</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate('companyProfile')} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:border-[#6C5CE7] hover:text-[#6C5CE7]">
                企業情報
              </button>
              <button onClick={() => navigate('missionList')} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:border-[#6C5CE7] hover:text-[#6C5CE7]">
                Missionを見る
              </button>
              <button onClick={() => navigate('studentList')} className="rounded-xl bg-[#17152B] px-4 py-3 text-sm font-bold text-white hover:bg-[#24213A]">
                候補学生を見る
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-gray-200 py-4 xl:grid-cols-4">
          {[
            { label: '公開中Mission', value: published.length, note: `${companyMissions.length}件を管理`, color: '#6C5CE7' },
            { label: '体験した学生', value: totalParticipants, note: '自社Mission累計', color: '#00B894' },
            { label: 'スカウト候補', value: scoutCandidates.length, note: '高相性の学生', color: '#EC4899' },
          ].map(item => (
            <div key={item.label} className="flex items-baseline justify-between gap-3">
              <div>
                <p className="text-2xl font-bold leading-none" style={{ color: item.color }}>{item.value}</p>
                <p className="mt-2 text-xs font-bold text-gray-900">{item.label}</p>
              </div>
              <span className="text-right text-[11px] font-bold text-gray-400">{item.note}</span>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold text-[#6C5CE7]">Mission Health</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">公開中の自社Mission</h2>
            </div>
            <button onClick={() => navigate('missionList')} className="text-xs font-bold text-[#6C5CE7]">すべて管理</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
              {published.map(mission => (
                <button key={mission.id} onClick={() => navigate('missionAnalytics')} className="group relative w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-gray-400">
                  <div className="h-1" style={{ backgroundColor: mission.id === 'mis_001' ? '#6C5CE7' : '#00B894' }} />
                  <div className="p-5">
                    <div className="mb-6 flex items-start justify-between gap-3">
                      <span className="chip bg-gray-100 text-gray-600">{mission.category}</span>
                      <span className="text-xl text-gray-300 transition-colors group-hover:text-gray-700">↗</span>
                    </div>
                    <h3 className="min-h-[44px] text-base font-bold leading-snug text-gray-900">{mission.title}</h3>
                    <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-relaxed text-gray-500">{mission.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {mission.tags.slice(0, 3).map(tag => <span key={tag} className="chip bg-gray-100 text-gray-500">{tag}</span>)}
                    </div>
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-900">完了率 {mission.completionRate}%</span>
                        <span className="text-gray-400">興味あり {mission.interestRate}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full" style={{ width: `${mission.completionRate}%`, backgroundColor: mission.id === 'mis_001' ? '#6C5CE7' : '#00B894' }} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                      <span>{mission.participants}名が体験</span>
                      <span>{mission.updatedAt}</span>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-[#EC4899]">Scout Queue</p>
                <h2 className="mt-1 text-lg font-bold text-gray-900">次に見る学生</h2>
              </div>
              <button onClick={() => navigate('studentList')} className="text-xs font-bold text-[#6C5CE7]">学生一覧</button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {topStudents.map(student => (
                <button key={student.id} onClick={() => navigate('studentDetail', { studentId: student.id })} className="min-w-[154px] flex-1 rounded-xl border border-gray-100 p-3 text-left hover:border-[#EC4899]/50">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#17152B] text-xs font-bold text-white">{student.name[0]}</span>
                    <span className="text-sm font-bold text-[#EC4899]">{student.satisfaction}</span>
                  </div>
                  <p className="mt-3 truncate text-sm font-bold text-gray-900">{student.name}</p>
                  <p className="mt-1 truncate text-[11px] text-gray-500">{student.schoolYear} · {student.fitTags[0]}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-[#6C5CE7]">学生分析</p>
                <h2 className="mt-1 text-lg font-bold text-gray-900">反応している学生</h2>
              </div>
              <button onClick={() => navigate('companyScouts')} className="text-xs font-bold text-[#6C5CE7]">スカウト管理</button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {companyScoutPipeline.map(item => (
                <button key={item.id} onClick={() => navigate('studentDetail', { studentId: item.studentId })} className="min-w-[180px] flex-1 rounded-xl border border-gray-100 p-3 text-left hover:border-[#6C5CE7]/40">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-bold text-gray-900">{item.studentName}</p>
                    <span className="shrink-0 text-[10px] font-bold text-[#6C5CE7]">{item.status}</span>
                  </div>
                  <p className="mt-2 line-clamp-1 text-xs leading-relaxed text-gray-600">{item.fitReason}</p>
                  <p className="mt-2 truncate text-[11px] text-gray-400">{item.viewed.join(' · ')}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
