import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyMissions } from '../../data/mock'

interface Props { navigate: (s: Screen) => void }

export default function MissionList({ navigate }: Props) {
  return (
    <div className="flex min-h-screen">
      <CompanySidebar current="missionList" navigate={navigate} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mission一覧</h1>
            <p className="text-sm text-gray-500 mt-0.5">{companyMissions.length}件のMission</p>
          </div>
          <button onClick={() => navigate('createMission')}
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: '#6C5CE7' }}>
            + Mission作成
          </button>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Mission名', 'カテゴリ', '状態', '参加者', '完了率', '興味あり率', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {companyMissions.map((m, i) => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-900">{m.title}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">{m.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`chip ${m.status === '公開中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-mono text-gray-700">{m.participants}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-[#6C5CE7]" style={{ width: `${m.completionRate}%` }} />
                      </div>
                      <span className="text-xs font-mono text-gray-600">{m.completionRate}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-pink-400" style={{ width: `${m.interestRate}%` }} />
                      </div>
                      <span className="text-xs font-mono text-gray-600">{m.interestRate}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => navigate('missionAnalytics')}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#EEF0FF] text-[#6C5CE7] font-medium">
                        分析
                      </button>
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-medium">
                        編集
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
