import { Screen } from '../App'
import { companies } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen) => void }

export default function CompanyMatch({ navigate }: Props) {
  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-5">
        <p className="text-xs text-gray-500 mb-1">あなたの体験から</p>
        <h2 className="text-xl font-bold text-gray-900">マッチした企業</h2>
        <p className="text-sm text-gray-500 mt-1">高い満足度を示したMissionを提供した企業です</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-5 py-4 space-y-4">
        {companies.map(company => (
          <div key={company.id} className="bg-white rounded-3xl p-5 card-shadow">
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: company.color + '20' }}>
                {company.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900">{company.name}</h3>
                  <span className="chip text-xs px-2 py-0.5" style={{ background: company.color + '20', color: company.color }}>
                    マッチ度高
                  </span>
                </div>
                <p className="text-xs text-gray-500">{company.industry} · {company.location}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">{company.description}</p>

            {/* Why fit */}
            <div className="bg-[#F7F6FF] rounded-2xl p-3 mb-4">
              <p className="text-xs font-medium text-[#6C5CE7] mb-2">なぜ合いそうか</p>
              {company.whyFit.map((reason, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-700 mt-1">
                  <span className="text-[#6C5CE7] mt-0.5">✓</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>

            {/* Culture */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-gray-600">文化:</span>
              <span className="text-xs text-gray-700">{company.culture}</span>
            </div>

            {/* Stats */}
            <div className="flex gap-3 mb-4">
              {[
                { label: 'Trial参加', value: company.trialCount },
                { label: '興味あり', value: company.interestCount },
              ].map(({ label, value }) => (
                <div key={label} className="flex-1 text-center bg-gray-50 rounded-xl p-2">
                  <p className="text-base font-bold text-gray-800">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-2xl text-sm font-semibold text-white transition-all"
                style={{ background: company.color }}>
                企業を見る
              </button>
              <button className="flex-1 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all"
                style={{ borderColor: company.color, color: company.color }}>
                興味ありを送る
              </button>
            </div>
          </div>
        ))}

        <p className="text-center text-xs text-gray-400 py-4">
          体験を増やすほど、より多くの企業とマッチします ✨
        </p>
      </div>

      <BottomNav current="companies" navigate={navigate} />
    </div>
  )
}
