import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyScoutPipeline, companyStudents } from '../../data/mock'

interface Props { navigate: (s: Screen, p?: { studentId?: string }) => void }

const statusClass: Record<string, string> = {
  送信済み: 'bg-[#EEF0FF] text-[#6C5CE7]',
  下書き: 'bg-[#FEF3C7] text-[#D97706]',
  候補: 'bg-gray-100 text-gray-500',
}

export default function ScoutManagement({ navigate }: Props) {
  const candidates = companyStudents.filter(student => student.status === 'スカウト候補')

  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="companyScouts" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <section className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#EC4899]">スカウト管理</p>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">学生への接点を管理</h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">Trialの提出内容、価値観サマリ、基礎Trialのシグナルをもとにスカウト候補を確認します。</p>
            </div>
            <button className="rounded-xl bg-[#17152B] px-5 py-3 text-sm font-bold text-white hover:bg-[#24213A]">
              スカウト作成
            </button>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-3 gap-4">
          {[
            { label: '候補', value: companyScoutPipeline.filter(item => item.status === '候補').length },
            { label: '下書き', value: companyScoutPipeline.filter(item => item.status === '下書き').length },
            { label: '送信済み', value: companyScoutPipeline.filter(item => item.status === '送信済み').length },
          ].map(item => (
            <div key={item.label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="mt-1 text-sm font-bold text-gray-500">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-[#EC4899]">Pipeline</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">スカウト状況</h2>
              </div>
              <span className="text-xs font-bold text-gray-400">学生側のスカウト画面に連動</span>
            </div>
            <div className="space-y-3">
              {companyScoutPipeline.map(item => (
                <button key={item.id} onClick={() => navigate('studentDetail', { studentId: item.studentId })}
                  className="w-full rounded-2xl border border-gray-100 p-4 text-left transition-colors hover:border-[#EC4899]/30 hover:bg-[#FDF2F8]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900">{item.studentName}</p>
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${statusClass[item.status] ?? statusClass.候補}`}>{item.status}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-500">{item.role}</p>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-700">{item.fitReason}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.viewed.map(view => <span key={view} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500">{view}</span>)}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">{item.lastAction}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold text-[#6C5CE7]">Next Candidates</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">次に見る候補</h2>
            <div className="mt-5 space-y-3">
              {candidates.map(student => (
                <button key={student.id} onClick={() => navigate('studentDetail', { studentId: student.id })}
                  className="w-full rounded-2xl bg-[#F7F8FB] p-4 text-left hover:bg-[#EEF0FF]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C5CE7] text-sm font-bold text-white">{student.name[0]}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-gray-900">{student.name}</p>
                      <p className="truncate text-xs text-gray-500">{student.fitTags.join('・')}</p>
                    </div>
                    <span className="text-xs font-bold text-[#6C5CE7]">分析</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}
