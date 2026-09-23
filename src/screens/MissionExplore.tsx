import { useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

const shelves = [
  { title: 'まずは基礎Mission', hint: '企業に関係なく、一般的な力を見ます', items: missions.filter(m => (m as any).source === 'core') },
  { title: '企業の仕事を軽く試す', hint: '15〜20分で終わる初級Mission', items: missions.filter(m => m.difficulty === '初級' && (m as any).source !== 'core') },
  { title: 'もう少し深く試す', hint: '考える量が少し増える中級Mission', items: missions.filter(m => m.difficulty === '中級' && (m as any).source !== 'core') },
]

export default function MissionExplore({ navigate }: Props) {
  const [cat, setCat] = useState('すべて')
  const showShelves = cat === 'すべて'

  const filtered = missions.filter(m => {
    const matchCat = cat === 'すべて' || m.difficulty === cat
    return matchCat
  })

  const catalogItems = showShelves ? missions : filtered

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="explore" navigate={navigate} />

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-[#6C5CE7]">Explore Trials</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Job Trial Catalog</h1>
            <p className="text-sm text-gray-500 mt-2">気になる仕事を、求人を見る前に短く試してみる。</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white border border-gray-100 p-1.5 shadow-sm">
            {['すべて', '初級', '中級'].map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${cat === c ? 'bg-[#6C5CE7] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {c === 'すべて' ? 'All trials' : c}
              </button>
            ))}
          </div>
        </div>

        {showShelves && (
          <section className="mb-10 rounded-3xl bg-[#17152B] p-6 lg:p-8 text-white overflow-hidden relative">
            <div className="relative z-10 max-w-xl">
              <span className="chip bg-white/10 text-[#A29BFE]">START HERE</span>
              <h2 className="text-2xl lg:text-3xl font-bold mt-4">まずは、あなたの仮説を<br />ひとつ試してみよう。</h2>
              <p className="text-sm text-white/60 mt-3 leading-relaxed">初めてなら基礎Missionがおすすめ。正解ではなく、考え方のクセを知るための12分です。</p>
              <button onClick={() => navigate('missionDetail', { missionId: 'core_001' })} className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#17152B]">おすすめを開く →</button>
            </div>
            <div className="absolute -right-8 -bottom-16 text-[180px] opacity-20">🧩</div>
          </section>
        )}

        <section className="space-y-10">
          {(showShelves ? shelves : [{ title: `${cat}のTrial`, hint: '条件に合うMission', items: catalogItems }]).map(section => (
            <div key={section.title}>
              <div className="flex items-end justify-between mb-4">
                <div><h2 className="text-lg font-bold text-gray-900">{section.title}</h2><p className="text-xs text-gray-500 mt-1">{section.hint}</p></div>
                <span className="text-xs text-gray-400">{section.items.length} trials <span className="hidden sm:inline">· 横にスクロール</span></span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
                {section.items.map(m => (
                  <button key={m.id} onClick={() => navigate('missionDetail', { missionId: m.id })}
                    className="group text-left snap-start shrink-0 w-[280px] bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:-translate-y-1 hover:border-[#6C5CE7] transition-all">
                    <div className="flex items-start justify-between gap-3 mb-7">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: m.color + '18' }}>{m.emoji}</div>
                      <span className="text-gray-300 group-hover:text-[#6C5CE7] text-xl">↗</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{m.company}</p>
                    <h3 className="text-base font-bold text-gray-900 leading-snug mt-1 line-clamp-2 min-h-[44px]">{m.title}</h3>
                    <div className="flex gap-1.5 mt-5 flex-wrap">
                      {(m as any).source === 'core' && <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">Core</span>}
                      <span className="chip bg-gray-100 text-gray-600">{m.duration}</span><span className="chip bg-gray-100 text-gray-600">{m.difficulty}</span>
                    </div>
                    <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between"><span className="text-xs text-gray-500">{m.category}</span><span className="text-xs font-bold text-[#6C5CE7]">View trial</span></div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
