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
        <h2 className="text-xl font-bold text-gray-900">あなたに関心が近い企業</h2>
        <p className="text-sm text-gray-500 mt-1">体験結果から、候補企業が{companies.length}社見つかりました</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 pt-4 space-y-6">
        {/* Featured company */}
        <div className="px-5">
          <div className="rounded-[28px] bg-white card-shadow p-5 border-l-4" style={{ borderColor: featured.color }}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: featured.color + '18' }}>
                  {featured.emoji}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#6C5CE7] bg-[#EEF0FF] rounded-full px-2.5 py-1">最有力候補</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">{featured.name}</h3>
                  <p className="text-xs text-gray-500">{featured.industry} · {featured.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold" style={{ color: featured.color }}>92%</p>
                <p className="text-[10px] text-gray-400">match</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{featured.description}</p>
            <div className="mt-4 rounded-2xl bg-[#F7F6FF] p-3">
              <p className="text-[11px] font-semibold text-[#6C5CE7] mb-1">合いそうな理由</p>
              <p className="text-xs text-gray-700 leading-relaxed">{featured.whyFit[0]}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-3 rounded-full text-white text-sm font-bold" style={{ background: featured.color }}>候補を見る</button>
              <button className="flex-1 py-3 rounded-full bg-gray-100 text-gray-700 text-sm font-bold">興味あり</button>
            </div>
          </div>
        </div>

        {/* Company shelves */}
        {[
          { title: 'あなたに合いそうな企業', items: highFit, scores: [89, 86, 84, 81] },
          { title: '次に見ておきたい企業', items: growing, scores: [79, 77, 74, 71] },
        ].map(section => (
          <div key={section.title}>
            <div className="flex items-end justify-between px-5 mb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">体験結果から優先表示しています</p>
              </div>
              <span className="text-xs text-gray-400">横にスワイプ</span>
            </div>

            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 pb-1">
              {section.items.map((company, index) => (
                <div key={company.id} className="snap-start shrink-0 w-64 bg-white rounded-3xl card-shadow p-4 border-t-4"
                  style={{ borderColor: company.color }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: company.color + '18' }}>
                        {company.emoji}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{company.name}</p>
                        <p className="text-xs text-gray-500 truncate">{company.industry}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold" style={{ color: company.color }}>{section.scores[index]}%</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 min-h-8">{company.whyFit[0]}</p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{company.location}</span>
                    <span>·</span>
                    <span>{company.openMissions} Mission</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="px-5">
          <button onClick={() => navigate('missionExplore')} className="w-full py-3 rounded-full bg-[#6C5CE7] text-white text-sm font-bold">
            次のMissionを選ぶ
          </button>
        </div>
      </div>

      <BottomNav current="companies" navigate={navigate} />
    </div>
  )
}
