import { useState } from 'react'
import { Screen } from '../App'
import { missions } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen) => void }

const categories = ['すべて', '商品企画', 'データ分析', 'マーケティング', 'エンジニア', 'デザイン']

export default function MissionExplore({ navigate }: Props) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('すべて')

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
      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-4 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm">該当するMissionが見つかりません</p>
          </div>
        )}
        {filtered.map(m => (
          <button key={m.id} onClick={() => navigate('missionDetail')}
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

      <BottomNav current="explore" navigate={navigate} />
    </div>
  )
}
