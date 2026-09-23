import { Screen } from '../App'
import { companies } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen) => void }

export default function CompanyMatch({ navigate }: Props) {
  const featured = companies[0]
  const highFit = companies.slice(1, 5)
  const growing = companies.slice(4)

  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-4">
        <p className="text-xs text-gray-500 mb-1">あなたの体験から</p>
        <h2 className="text-xl font-bold text-gray-900">マッチした企業</h2>
        <p className="text-sm text-gray-500 mt-1">体験結果と価値観から近い企業を並べています</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 pt-4 space-y-6">
        {/* Featured company */}
        <div className="px-5">
          <div className="rounded-[28px] overflow-hidden card-shadow bg-gray-900 text-white relative">
            <div className="absolute inset-0 opacity-90" style={{ background: `linear-gradient(145deg, ${featured.color}, #111827 72%)` }} />
            <div className="absolute -right-12 -top-14 text-[132px] opacity-20">{featured.emoji}</div>
            <div className="relative p-5 min-h-64 flex flex-col justify-end">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] bg-white/20 rounded-full px-3 py-1">BEST MATCH</span>
                <span className="text-[11px] bg-white text-gray-900 font-bold rounded-full px-3 py-1">92%</span>
              </div>
              <div className="text-5xl mb-3">{featured.emoji}</div>
              <h3 className="text-2xl font-bold leading-tight">{featured.name}</h3>
              <p className="text-xs text-white/70 mt-1">{featured.industry} · {featured.location}</p>
              <p className="text-sm text-white/85 mt-4 leading-relaxed line-clamp-3">{featured.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { label: 'Trial参加', value: featured.trialCount },
                  { label: '興味あり', value: featured.interestCount },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-2xl bg-white/12 px-3 py-2">
                    <p className="text-lg font-bold">{value}</p>
                    <p className="text-[11px] text-white/65">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-3 rounded-full bg-white text-gray-900 text-sm font-bold">企業を見る</button>
                <button className="flex-1 py-3 rounded-full bg-white/15 text-white text-sm font-bold">興味あり</button>
              </div>
            </div>
          </div>
        </div>

        {/* Company shelves */}
        {[
          { title: 'マッチ度が高い企業', items: highFit, scores: [89, 86, 84, 81] },
          { title: '新しく見つかった企業', items: growing, scores: [79, 77, 74, 71] },
        ].map(section => (
          <div key={section.title}>
            <div className="flex items-end justify-between px-5 mb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{section.items.length}社が候補です</p>
              </div>
              <span className="text-xs text-gray-400">横にスワイプ</span>
            </div>

            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 pb-1">
              {section.items.map((company, index) => (
                <div key={company.id} className="snap-start shrink-0 w-64 bg-white rounded-3xl card-shadow overflow-hidden">
                  <div className="h-36 p-4 relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${company.color}, #1F2937)` }}>
                    <div className="absolute -right-5 -bottom-10 text-8xl opacity-25">{company.emoji}</div>
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[11px] bg-white/20 rounded-full px-2.5 py-1">{company.industry}</span>
                      <span className="text-[11px] bg-white text-gray-900 font-bold rounded-full px-2.5 py-1">{section.scores[index]}%</span>
                    </div>
                    <div className="absolute left-4 bottom-4">
                      <p className="text-4xl mb-2">{company.emoji}</p>
                      <p className="text-lg font-bold leading-tight">{company.name}</p>
                      <p className="text-xs text-white/70">{company.location}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="bg-[#F7F6FF] rounded-2xl p-3 mb-3">
                      <p className="text-[11px] font-semibold text-[#6C5CE7] mb-1">合いそうな理由</p>
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{company.whyFit[0]}</p>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 min-h-8">{company.culture}</p>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 py-2.5 rounded-2xl text-xs font-bold text-white"
                        style={{ background: company.color }}>
                        企業を見る
                      </button>
                      <button className="px-3 py-2.5 rounded-2xl text-xs font-bold border-2"
                        style={{ borderColor: company.color, color: company.color }}>
                        興味あり
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mx-5 bg-white rounded-3xl p-4">
          <p className="text-sm font-bold text-gray-900 mb-1">もっと精度を上げる</p>
          <p className="text-xs text-gray-500 leading-relaxed">Missionを追加で体験すると、マッチ企業の並びがよりあなた向けに更新されます。</p>
          <button onClick={() => navigate('missionExplore')} className="mt-3 w-full py-3 rounded-full bg-[#6C5CE7] text-white text-sm font-bold">
            Missionを探す
          </button>
        </div>
      </div>

      <BottomNav current="companies" navigate={navigate} />
    </div>
  )
}
