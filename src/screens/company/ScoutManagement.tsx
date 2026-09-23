import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyScoutPipeline, companyStudents } from '../../data/mock'

interface Props { navigate: (s: Screen, p?: { studentId?: string }) => void }

const statusStyle: Record<string, { bg: string; color: string }> = {
  送信済み: { bg: '#EEF0FF', color: '#6C5CE7' },
  下書き: { bg: '#FEF3C7', color: '#D97706' },
  候補: { bg: '#F3F4F6', color: '#6B7280' },
}

export default function ScoutManagement({ navigate }: Props) {
  const candidates = companyStudents.filter(s => s.status === 'スカウト候補').slice(0, 4)

  return (
    <div className="flex min-h-screen">
      <CompanySidebar current="companyScouts" navigate={navigate} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm text-gray-500">学生への接点管理</p>
            <h1 className="text-2xl font-bold text-gray-900">スカウト</h1>
          </div>
          <button className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: '#6C5CE7' }}>
            + スカウト作成
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: '候補', value: companyScoutPipeline.filter(s => s.status === '候補').length },
            { label: '下書き', value: companyScoutPipeline.filter(s => s.status === '下書き').length },
            { label: '送信済み', value: companyScoutPipeline.filter(s => s.status === '送信済み').length },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl p-5">
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-white rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-gray-900">スカウト管理</h2>
              <span className="text-xs text-gray-400">学生側Scoutタブに反映</span>
            </div>
            <div className="space-y-3">
              {companyScoutPipeline.map(item => {
                const style = statusStyle[item.status] ?? statusStyle.候補
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate('studentDetail', { studentId: item.studentId })}
                    className="w-full text-left rounded-xl border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-bold text-gray-900">{item.studentName}</p>
                          <span className="text-[11px] font-bold rounded-full px-2 py-0.5" style={{ background: style.bg, color: style.color }}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{item.role}</p>
                        <p className="text-xs text-gray-700 mt-2">{item.fitReason}</p>
                        <div className="flex gap-1.5 mt-3 flex-wrap">
                          {item.viewed.map(v => (
                            <span key={v} className="text-[11px] bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{v}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">{item.lastAction}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">次に見る候補</h2>
            <div className="space-y-3">
              {candidates.map(student => (
                <button
                  key={student.id}
                  onClick={() => navigate('studentDetail', { studentId: student.id })}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-left hover:bg-[#EEF0FF]"
                >
                  <div className="w-9 h-9 rounded-full bg-[#6C5CE7] text-white text-sm font-bold flex items-center justify-center">
                    {student.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{student.name}</p>
                    <p className="text-xs text-gray-500 truncate">{student.fitTags.join('・')}</p>
                  </div>
                  <span className="text-xs text-[#6C5CE7] font-bold">確認</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
