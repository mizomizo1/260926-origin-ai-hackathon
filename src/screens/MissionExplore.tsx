import { useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'
import BottomNav from '../components/BottomNav'

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

  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Missionを選ぶ</h2>
        <p className="text-sm text-gray-500 mt-1">難易度から選ぶと迷いにくくなります</p>
      </div>

      {/* Category filter */}
      <div className="px-5 py-3 bg-white border-b border-gray-50 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {['すべて', '初級', '中級'].map(c => (
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
          <div className="space-y-5">
            {shelves.map((section, sectionIndex) => (
              <div key={section.title}>
                <div className="flex items-end justify-between px-5 mb-2.5">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{section.hint}</p>
                  </div>
                  <span className="text-xs text-gray-400">横にスワイプ</span>
                </div>
                <div className={`flex gap-2.5 overflow-x-auto snap-x snap-mandatory pb-2 ${sectionIndex % 2 === 0 ? 'pl-5 pr-8' : 'pl-8 pr-5'}`}>
                  {section.items.map((m, itemIndex) => (
                    <button
                      key={m.id}
                      onClick={() => navigate('missionDetail', { missionId: m.id })}
                      className={`snap-start shrink-0 rounded-[22px] bg-white card-shadow text-left overflow-hidden ${itemIndex === 0 ? 'w-[216px]' : 'w-[184px]'}`}
                    >
                      <div className={`${itemIndex === 0 ? 'h-[120px]' : 'h-[104px]'} relative overflow-hidden p-3 text-white`} style={{ background: `linear-gradient(135deg, ${m.color}, #1F2937)` }}>
                        <div className="absolute -right-4 -bottom-6 text-6xl opacity-25">{m.emoji}</div>
                        <span className="text-[11px] bg-white/20 rounded-full px-2.5 py-1">{m.duration}</span>
                        <div className="absolute left-3 bottom-3 text-3xl">{m.emoji}</div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 min-h-8">{m.title}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">{m.company}</p>
                        <div className="flex gap-1.5 mt-2.5 flex-wrap">
                          {(m as any).source === 'core' && <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">共通</span>}
                          <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">{m.difficulty}</span>
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
                      {(m as any).source === 'core' && <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">共通Mission</span>}
                      <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">{m.difficulty}</span>
                      <span className="chip bg-gray-100 text-gray-600">{m.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-500 line-clamp-2">{m.summary}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav current="mission" navigate={navigate} />
    </div>
  )
}
