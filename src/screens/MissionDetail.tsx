import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'
import GuideRing from '../components/GuideRing'
import { AppIcon, DataIcon } from '../components/AppIcon'

interface Props { navigate: (s: Screen, p?: NavParams) => void; missionId?: string }

export default function MissionDetail({ navigate, missionId }: Props) {
  const m = missions.find(x => x.id === missionId) ?? missions[0]
  const isCore = (m as any).source === 'core'

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="explore" navigate={navigate} />

      <main className="mx-auto max-w-[1200px] px-6 py-8 pb-24 lg:pb-8">
        <button onClick={() => navigate('missionExplore')} className="text-gray-500 text-sm mb-5 block">← Trialを探す</button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 lg:p-8" style={{ background: m.color + '10' }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: m.color + '22', color: m.color }}>
                  <DataIcon value={m.emoji} className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {isCore && <span className="chip text-white bg-[#111827]">基礎Trial</span>}
                    <span className="chip text-white" style={{ background: m.color }}>{m.category}</span>
                    <span className="chip bg-white text-gray-600">{m.difficulty}</span>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{m.title}</h1>
                  <p className="text-sm text-gray-500 mt-2">{m.company}</p>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-8 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">概要</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{m.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">このTrialで体験すること</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {m.gains.map(g => (
                    <div key={g} className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                      <p className="text-sm font-bold text-gray-800">{g}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">進め方</h2>
                <div className="space-y-3">
                  {m.steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                      <div className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center text-white flex-shrink-0" style={{ background: m.color }}>
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#EEF0FF] rounded-2xl p-5">
                <h2 className="text-base font-bold text-[#6C5CE7] mb-3">こんな人におすすめ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {m.recommendedFor.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <AppIcon name="check" className="h-4 w-4 shrink-0 text-[#6C5CE7]" /> {r}
                    </div>
                  ))}
                </div>
              </div>

              {isCore && (
                <div className="bg-[#F7F6FF] rounded-2xl p-5 border-l-4 border-[#6C5CE7]">
                  <h2 className="text-base font-bold text-[#6C5CE7] mb-1">このTrialで見ること</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">企業との相性を見る前に、整理力・伝える力・判断のクセを把握します。</p>
                </div>
              )}
            </div>
          </section>

          <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit sticky top-24">
            <h2 className="text-base font-bold text-gray-900 mb-4">Trialの情報</h2>
            <div className="space-y-3 mb-5">
              {[
                { label: '所要時間', value: m.duration },
                { label: '難易度', value: m.difficulty },
                { label: '形式', value: m.style },
                { label: '提出物', value: 'テキスト回答' },
              ].map(item => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-gray-100 pb-3 last:border-0">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900 text-right">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-[#EEF0FF] p-3 mb-3 space-y-1.5 text-xs text-gray-700">
              <p className="flex items-center gap-1.5"><AppIcon name="check" className="h-3.5 w-3.5 text-[#6C5CE7]" /> 正解はありません</p>
              <p className="flex items-center gap-1.5"><AppIcon name="check" className="h-3.5 w-3.5 text-[#6C5CE7]" /> 途中で保存できます</p>
              <p className="flex items-center gap-1.5"><AppIcon name="check" className="h-3.5 w-3.5 text-[#6C5CE7]" /> 目安は{m.duration}です</p>
            </div>
            <GuideRing active label="ここから始めよう" radius="12px" className="mt-5">
              <button onClick={() => navigate('missionTrial', { missionId: m.id })} className="w-full py-3 rounded-xl bg-[#6C5CE7] text-white text-sm font-bold">
                {m.duration}だけ試してみる
              </button>
            </GuideRing>
            <div className="flex gap-2 flex-wrap mt-4">
              {m.tags.map(t => (
                <span key={t} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-gray-100 bg-white/95 backdrop-blur px-4 py-3">
        <button onClick={() => navigate('missionTrial', { missionId: m.id })} className="w-full py-3 rounded-xl bg-[#6C5CE7] text-white text-sm font-bold">
          {m.duration}だけ試してみる
        </button>
      </div>
    </div>
  )
}
