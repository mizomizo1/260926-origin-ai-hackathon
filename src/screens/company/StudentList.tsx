import { useState } from 'react'
import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyStudents } from '../../data/mock'

interface Props { navigate: (s: Screen) => void }

export default function StudentList({ navigate }: Props) {
  const [filter, setFilter] = useState('全員')
  const [search, setSearch] = useState('')

  const filtered = companyStudents.filter(s => {
    const matchFilter = filter === '全員' || s.interestLevel === filter || s.status === filter
    const matchSearch = s.name.includes(search) || s.faculty?.includes(search) || false
    return matchFilter && matchSearch
  })

  return (
    <div className="flex min-h-screen">
      <CompanySidebar current="studentList" navigate={navigate} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">学生一覧</h1>
            <p className="text-sm text-gray-500 mt-0.5">Missionを体験した学生</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="名前・学部で検索"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-100 bg-white text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors"
            />
          </div>
          {['全員', '高', '中', 'スカウト候補', 'フォロー中'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-medium transition-all border-2"
              style={filter === f
                ? { background: '#6C5CE7', color: 'white', borderColor: '#6C5CE7' }
                : { borderColor: '#E5E7EB', color: '#6B7280', background: 'white' }
              }>{f}</button>
          ))}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['学生', '学年', '完了Mission', '興味度', 'タグ', 'ステータス', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate('studentDetail')}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#6C5CE7] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {s.name[0]}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600">{s.schoolYear}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-mono font-bold text-gray-800">{s.missionCompleted}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="chip text-xs"
                      style={s.interestLevel === '高'
                        ? { background: '#EEF0FF', color: '#6C5CE7' }
                        : s.interestLevel === '中'
                          ? { background: '#FEF3C7', color: '#D97706' }
                          : { background: '#F3F4F6', color: '#9CA3AF' }
                      }>
                      {s.interestLevel}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {s.fitTags.slice(0, 2).map(t => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`chip text-xs ${s.status === 'スカウト候補' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={e => { e.stopPropagation(); navigate('studentDetail') }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#EEF0FF] text-[#6C5CE7] font-medium">
                      詳細
                    </button>
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
