import { useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

const categories = ['すべて', '商品企画', 'マーケティング', 'データ分析', 'デザイン', 'カスタマーサクセス', '人事']
const shelves = [
  { title: '人気のMission', items: missions.slice(0, 6) },
  { title: '企画・マーケティング', items: missions.filter(m => ['商品企画', 'マーケティング'].includes(m.category)) },
  { title: '分析・改善に挑戦', items: missions.filter(m => ['データ分析', 'デザイン'].includes(m.category)) },
  { title: '人と向き合う仕事', items: missions.filter(m => ['カスタマーサクセス', '人事'].includes(m.category)) },
]

export default function MissionExplore({ navigate }: Props) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('すべて')
  const showShelves = search.trim() === '' && cat === 'すべて'

  const filtered = missions.filter(m => {
    const matchSearch = m.title.includes(search) || m.company.includes(search)
    const matchCat = cat === 'すべて' || m.category === cat
    return matchSearch && matchCat
  })

  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Mission を探す</h2>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Missionや企業名で検索"
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-100 text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="px-5 py-3 bg-white border-b border-gray-50 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap"
              style={cat === c
                ? { background: '#6C5CE7', color: 'white' }
                : { background: '#F3F4F6', color: '#6B7280' }
              }>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-24 pt-4">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm">該当するMissionが見つかりません</p>
          </div>
        )}
        {showShelves ? (
          <div className="space-y-6">
            {shelves.map(section => (
              <div key={section.title}>
                <div className="flex items-end justify-between px-5 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{section.items.length}件のTrial</p>
                  </div>
                  <span className="text-xs text-gray-400">横にスワイプ</span>
                </div>
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 pb-1">
                  {section.items.map(m => (
                    <button
                      key={m.id}
                      onClick={() => navigate('missionDetail', { missionId: m.id })}
                      className="snap-start shrink-0 w-52 rounded-3xl bg-white card-shadow text-left overflow-hidden"
                    >
                      <div className="h-32 relative overflow-hidden p-4 text-white" style={{ background: `linear-gradient(135deg, ${m.color}, #1F2937)` }}>
                        <div className="absolute -right-5 -bottom-8 text-7xl opacity-25">{m.emoji}</div>
                        <span className="text-[11px] bg-white/20 rounded-full px-2.5 py-1">{m.category}</span>
                        <div className="absolute left-4 bottom-4 text-4xl">{m.emoji}</div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 min-h-9">{m.title}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">{m.company}</p>
                        <div className="flex gap-1.5 mt-3">
                          <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">{m.difficulty}</span>
                          <span className="chip bg-gray-100 text-gray-600">{m.duration}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 space-y-3">
            {filtered.map(m => (
              <button key={m.id} onClick={() => navigate('missionDetail', { missionId: m.id })}
                className="w-full mission-card card-shadow text-left">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: m.color + '20' }}>
                    {m.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 mb-1">{m.title}</p>
                    <p className="text-xs text-gray-500 mb-2">{m.company}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">{m.difficulty}</span>
                      <span className="chip bg-gray-100 text-gray-600">{m.duration}</span>
                      <span className="chip bg-gray-100 text-gray-600">{m.style}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-500 line-clamp-2">{m.summary}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {m.tags.map(t => (
                      <span key={t} className="text-xs text-[#6C5CE7] bg-[#EEF0FF] px-2 py-0.5 rounded-full">#{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav current="explore" navigate={navigate} />
    </div>
  )
}
