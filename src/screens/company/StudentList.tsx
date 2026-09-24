import { useState } from 'react'
import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyStudents, preferenceLabels } from '../../data/mock'

interface Props { navigate: (s: Screen, p?: { studentId?: string }) => void }

export default function StudentList({ navigate }: Props) {
  const [filter, setFilter] = useState('全員')
  const [search, setSearch] = useState('')

  const filtered = companyStudents.filter(student => {
    const matchFilter = filter === '全員' || student.interestLevel === filter || student.status === filter
    const matchSearch = !search || student.name.includes(search) || student.faculty?.includes(search) || student.fitTags.join('').includes(search)
    return matchFilter && matchSearch
  })

  const topPreference = (student: (typeof companyStudents)[number]) => {
    const [key] = Object.entries(student.preferenceScores).sort((a, b) => b[1] - a[1])[0]
    return preferenceLabels.find(label => label.key === key)?.shortLabel ?? '価値観'
  }

  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="studentList" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <section className="mb-6 border-b border-gray-200 pb-6">
          <p className="text-sm font-bold text-[#6C5CE7]">学生分析</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">Missionを体験した学生</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">反応と体験履歴を見ながら、次に話したい学生を探します。</p>
        </section>

        <section className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">検索</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="名前・学部・タグ"
              className="w-full rounded-xl border border-gray-100 bg-[#F7F8FB] py-3 pl-14 pr-4 text-sm outline-none focus:border-[#6C5CE7]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {['全員', '高', '中', 'スカウト候補', 'フォロー中'].map(item => (
              <button key={item} onClick={() => setFilter(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${filter === item ? 'bg-[#17152B] text-white' : 'bg-[#F7F8FB] text-gray-500 hover:bg-[#EEF0FF]'}`}>
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {filtered.map(student => (
            <article key={student.id} className="rounded-2xl border border-gray-200 bg-white p-5 transition-transform hover:-translate-y-1 hover:border-gray-400">
              <div className="flex items-start justify-between gap-3">
                <button onClick={() => navigate('studentDetail', { studentId: student.id })} className="flex min-w-0 items-center gap-3 text-left">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#6C5CE7] text-base font-bold text-white">{student.name[0]}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-base font-bold text-gray-900">{student.name}</span>
                    <span className="block truncate text-xs text-gray-500">{student.schoolYear} · {student.faculty}</span>
                  </span>
                </button>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${student.interestLevel === '高' ? 'bg-[#EEF0FF] text-[#6C5CE7]' : student.interestLevel === '中' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-gray-100 text-gray-500'}`}>
                  興味度 {student.interestLevel}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { label: 'Trial', value: student.missionCompleted },
                  { label: '満足度', value: student.satisfaction },
                  { label: '価値観', value: topPreference(student) },
                ].map(item => (
                  <div key={item.label} className="rounded-2xl bg-[#F7F8FB] px-3 py-2 text-center">
                    <p className="truncate text-sm font-bold text-gray-900">{item.value}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {student.fitTags.slice(0, 3).map(tag => <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500">{tag}</span>)}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${student.status === 'スカウト候補' ? 'bg-[#E8FBF5] text-[#00B894]' : 'bg-gray-100 text-gray-500'}`}>{student.status}</span>
                <div className="flex gap-2">
                    <button onClick={() => navigate('studentDetail', { studentId: student.id })} className="rounded-xl bg-[#EEF0FF] px-3 py-2 text-xs font-bold text-[#6C5CE7]">詳細</button>
                  {student.status === 'スカウト候補' && (
                    <button onClick={() => navigate('scoutCompose', { studentId: student.id })} className="rounded-xl bg-[#FDF2F8] px-3 py-2 text-xs font-bold text-[#EC4899]">スカウト</button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
