import { Screen } from '../App'
import { companies } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'

interface Props { navigate: (s: Screen) => void }

export default function CompanyMatch({ navigate }: Props) {
  const featured = companies[0]
  const highFit = companies.slice(1, 5)
  const growing = companies.slice(4)

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="companies" navigate={navigate} />
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1200px] px-6 py-8">
        <p className="text-xs text-gray-500 mb-1">あなたの体験から</p>
        <h1 className="text-3xl font-bold text-gray-900">あなたに関心が近い企業</h1>
        <p className="text-sm text-gray-500 mt-1">体験結果から、候補企業が{companies.length}社見つかりました</p>
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-6 py-8 space-y-8">
        {/* Featured company */}
        <div>
          <div className="rounded-3xl bg-white card-shadow p-4 border-l-4" style={{ borderColor: featured.color }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: featured.color + '18' }}>
                  {featured.emoji}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#6C5CE7] bg-[#EEF0FF] rounded-full px-2.5 py-1">最有力候補</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2">{featured.name}</h3>
                  <p className="text-xs text-gray-500">{featured.industry} · {featured.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold" style={{ color: featured.color }}>92%</p>
                <p className="text-[10px] text-gray-400">match</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{featured.description}</p>
            <div className="mt-3 rounded-2xl bg-[#F7F6FF] p-3">
              <p className="text-[11px] font-semibold text-[#6C5CE7] mb-1">合いそうな理由</p>
              <p className="text-xs text-gray-700 leading-relaxed">{featured.whyFit[0]}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 py-2.5 rounded-full text-white text-xs font-bold" style={{ background: featured.color }}>候補を見る</button>
              <button className="flex-1 py-2.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">興味あり</button>
            </div>
          </div>
        </div>

        {/* Company shelves */}
        {[
          { title: 'あなたに合いそうな企業', items: highFit, scores: [89, 86, 84, 81] },
          { title: '次に見ておきたい企業', items: growing, scores: [79, 77, 74, 71] },
        ].map((section, sectionIndex) => (
          <div key={section.title}>
            <div className="flex items-end justify-between px-5 mb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">{section.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">体験結果から優先表示しています</p>
              </div>
              <span className="text-xs text-gray-400">横にスワイプ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {section.items.map((company, index) => (
                <div key={company.id} className={`snap-start shrink-0 bg-white rounded-[22px] card-shadow p-3 border-t-4 ${index === 0 ? 'w-[232px]' : 'w-[200px]'}`}
                  style={{ borderColor: company.color }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
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
                  <div className="mt-2.5 flex items-center gap-2 text-[11px] text-gray-400">
                    <span>{company.location}</span>
                    <span>·</span>
                    <span>{company.openMissions} Mission</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div>
          <button onClick={() => navigate('missionExplore')} className="w-full py-3 rounded-full bg-[#6C5CE7] text-white text-sm font-bold">
            次のMissionを選ぶ
          </button>
        </div>
      </main>
    </div>
  )
}
