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
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#6C5CE7]">Explore Trials</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">Job Trial Catalog</h1>
          <p className="text-sm text-gray-500 mt-2">求人ではなく、仕事を短く試して自分の理解を更新します。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <aside className="bg-white border border-gray-100 rounded-2xl p-5 h-fit shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Filter</h2>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">難易度</p>
                <div className="flex flex-wrap gap-2">
                  {['すべて', '初級', '中級'].map(c => (
                    <button key={c} onClick={() => setCat(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${cat === c ? 'bg-[#6C5CE7] text-white' : 'bg-gray-50 text-gray-500'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">形式</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex gap-2"><input type="checkbox" defaultChecked /> 個人向き</label>
                  <label className="flex gap-2"><input type="checkbox" /> チーム向き</label>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">職種</p>
                <div className="flex flex-wrap gap-2">
                  {['基礎力', '商品企画', 'マーケティング', 'データ分析', '人事'].map(item => (
                    <span key={item} className="px-2.5 py-1 rounded-full bg-gray-50 text-xs text-gray-500">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section>
            {showShelves && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {shelves.map(section => (
                  <div key={section.title} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-sm font-bold text-gray-900">{section.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{section.items.length} Trials</p>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {catalogItems.map(m => (
                <button key={m.id} onClick={() => navigate('missionDetail', { missionId: m.id })}
                  className="text-left bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-[#6C5CE7] transition-colors">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: m.color + '18' }}>
                      {m.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 truncate">{m.company}</p>
                      <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2">{m.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 min-h-[62px]">{m.summary}</p>
                  <div className="flex gap-1.5 mt-4 flex-wrap">
                    {(m as any).source === 'core' && <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">Core</span>}
                    <span className="chip bg-gray-100 text-gray-600">{m.duration}</span>
                    <span className="chip bg-gray-100 text-gray-600">{m.difficulty}</span>
                    <span className="chip bg-gray-100 text-gray-600">{m.category}</span>
                  </div>
                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <p className="text-xs text-[#6C5CE7] font-bold">詳細を見る</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
