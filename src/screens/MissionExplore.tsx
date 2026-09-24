import { useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

const shelves = [
  { title: 'まずは基礎Trial', hint: '企業に関係なく、一般的な力を見ます', items: missions.filter(m => (m as any).source === 'core') },
  { title: '企業の仕事を軽く試す', hint: '15〜20分で終わる初級Trial', items: missions.filter(m => m.difficulty === '初級' && (m as any).source !== 'core') },
  { title: 'もう少し深く試す', hint: '考える量が少し増える中級Trial', items: missions.filter(m => m.difficulty === '中級' && (m as any).source !== 'core') },
]

export default function MissionExplore({ navigate }: Props) {
  const [cat, setCat] = useState('すべて')
  const showShelves = cat === 'すべて'

  const filtered = missions.filter(m => {
    const matchCat = cat === 'すべて' || m.difficulty === cat
    return matchCat
  })

  const catalogItems = showShelves ? missions : filtered
  const heroItems = [
    missions.find(m => m.id === 'core_001'),
    missions.find(m => m.id === 'core_002'),
    missions.find(m => m.id === 'mis_003'),
  ].filter(Boolean) as typeof missions

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="explore" navigate={navigate} />

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-[#6C5CE7]">Trialを探す</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Trial一覧</h1>
            <p className="text-sm text-gray-500 mt-2">気になる仕事を、求人を見る前に短く試してみる。</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white border border-gray-100 p-1.5 shadow-sm">
            {['すべて', '初級', '中級'].map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${cat === c ? 'bg-[#6C5CE7] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {c === 'すべて' ? 'すべて' : c}
              </button>
            ))}
          </div>
        </div>

        {showShelves && (
          <section className="mb-10 overflow-hidden rounded-3xl bg-[#17152B] text-white">
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
              <div className="flex flex-col justify-between">
                <div>
                  <span className="chip bg-white/10 text-[#A29BFE]">Start Point</span>
                  <h2 className="mt-4 text-2xl font-bold leading-tight lg:text-3xl">まずは、あなたの仮説を<br />ひとつ試してみよう。</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">初めてなら基礎Trialがおすすめ。正解ではなく、考え方のクセを知るための短い体験です。</p>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {[
                    { label: '平均時間', value: '12分' },
                    { label: '形式', value: 'テキスト' },
                    { label: '目的', value: '仮説検証' },
                  ].map(item => (
                    <div key={item.label} className="rounded-2xl bg-white/10 px-3 py-3">
                      <p className="text-[10px] font-bold text-white/40">{item.label}</p>
                      <p className="mt-1 text-sm font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                {heroItems.map((trial, index) => (
                  <button
                    key={trial.id}
                    onClick={() => navigate('missionDetail', { missionId: trial.id })}
                    className={`snap-start min-h-[250px] w-[270px] shrink-0 rounded-3xl border p-5 text-left transition-transform hover:-translate-y-1 ${index === 0 ? 'border-white/30 bg-white text-gray-900' : 'border-white/10 bg-white/10 text-white'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ background: index === 0 ? trial.color + '18' : 'rgba(255,255,255,0.15)' }}>{trial.emoji}</div>
                      <span className={`chip ${index === 0 ? 'bg-[#EEF0FF] text-[#6C5CE7]' : 'bg-white/10 text-white/70'}`}>{trial.duration}</span>
                    </div>
                    <p className={`mt-6 text-xs font-bold ${index === 0 ? 'text-[#6C5CE7]' : 'text-[#A29BFE]'}`}>{index === 0 ? '最初におすすめ' : (trial as any).source === 'core' ? '基礎Trial' : '企業Trial'}</p>
                    <h3 className="mt-2 min-h-[48px] text-lg font-bold leading-snug">{trial.title}</h3>
                    <p className={`mt-3 line-clamp-3 text-xs leading-relaxed ${index === 0 ? 'text-gray-500' : 'text-white/55'}`}>{trial.summary}</p>
                    <span className={`mt-5 inline-flex rounded-xl px-3 py-2 text-xs font-bold ${index === 0 ? 'bg-[#17152B] text-white' : 'bg-white text-[#17152B]'}`}>
                      詳しく見る →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="space-y-10">
          {(showShelves ? shelves : [{ title: `${cat}のTrial`, hint: '条件に合うTrial', items: catalogItems }]).map(section => {
            const bestId = section.items[0]?.id
            return (
            <div key={section.title}>
              <div className="flex items-end justify-between mb-4">
                <div><h2 className="text-lg font-bold text-gray-900">{section.title}</h2><p className="text-xs text-gray-500 mt-1">{section.hint}</p></div>
                <span className="text-xs text-gray-400">{section.items.length} trials <span className="hidden sm:inline">· 横にスクロール</span></span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
                {section.items.map(m => (
                  (() => {
                    const isCore = (m as any).source === 'core'
                    const isBest = m.id === bestId
                    return (
                  <button key={m.id} onClick={() => navigate('missionDetail', { missionId: m.id })}
                    className={`group relative text-left snap-start shrink-0 w-[292px] overflow-hidden border rounded-2xl shadow-sm hover:-translate-y-1 transition-all ${isCore ? 'bg-white border-[#6C5CE7]/40 hover:border-[#6C5CE7]' : 'bg-white border-gray-100 hover:border-gray-300'}`}>
                    {isBest && (
                      <div className="absolute right-[-34px] top-5 z-20 rotate-45 bg-[#F59E0B] px-10 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                        Best Match
                      </div>
                    )}
                    <div className={isCore ? 'p-5' : 'p-5 text-white'} style={!isCore ? { background: `linear-gradient(135deg, ${m.color}, #17152B)` } : undefined}>
                      <div className="flex items-start justify-between gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: isCore ? m.color + '18' : 'rgba(255,255,255,0.18)' }}>{m.emoji}</div>
                        <span className={isCore ? 'text-gray-300 group-hover:text-[#6C5CE7] text-xl' : 'text-white/55 group-hover:text-white text-xl'}>↗</span>
                      </div>
                      <span className={isCore ? 'chip bg-[#EEF0FF] text-[#6C5CE7]' : 'chip bg-white/15 text-white'}>{isCore ? '基礎Trial' : '企業の仕事'}</span>
                      <h3 className={`text-base font-bold leading-snug mt-3 line-clamp-2 min-h-[44px] ${isCore ? 'text-gray-900' : 'text-white'}`}>{m.title}</h3>
                      <p className={`mt-2 text-xs truncate ${isCore ? 'text-gray-500' : 'text-white/65'}`}>{m.company}</p>
                    </div>
                    <div className="p-5">
                      {!isCore && <p className="mb-3 text-xs font-bold text-gray-400">実際の企業テーマを体験</p>}
                      <p className="line-clamp-2 min-h-[40px] text-xs leading-relaxed text-gray-600">{m.summary}</p>
                      <div className="flex gap-1.5 mt-5 flex-wrap">
                        <span className="chip bg-gray-100 text-gray-600">{m.duration}</span><span className="chip bg-gray-100 text-gray-600">{m.difficulty}</span>
                      </div>
                      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between"><span className="text-xs text-gray-500">{m.category}</span><span className="text-xs font-bold" style={{ color: isCore ? '#6C5CE7' : m.color }}>詳しく見る</span></div>
                    </div>
                  </button>
                    )
                  })()
                ))}
              </div>
            </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}
