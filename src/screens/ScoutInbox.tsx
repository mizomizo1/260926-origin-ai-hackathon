import { Screen } from '../App'
import { companies, profileViews, scoutInvitations } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen) => void }

export default function ScoutInbox({ navigate }: Props) {
  const scouts = scoutInvitations.map(scout => ({
    scout,
    company: companies.find(company => company.id === scout.companyId) ?? companies[0],
  }))
  const views = profileViews.map(view => ({
    ...view,
    company: companies.find(company => company.id === view.companyId) ?? companies[0],
  }))
  const interestedCompanies = [...scouts.map(({ company }) => company), ...views.map(view => view.company)]
    .filter((company, index, list) => list.findIndex(item => item.id === company.id) === index)
    .slice(0, 4)

  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      <div className="bg-white px-5 pt-8 pb-4">
        <p className="text-xs text-gray-500 mb-1">企業からの関心</p>
        <h2 className="text-xl font-bold text-gray-900">Scout</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-4 space-y-4">
        <div className="bg-white rounded-3xl p-4 card-shadow">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#6C5CE7] mb-1">企業の反応</p>
              <h3 className="text-base font-bold text-gray-900">{scoutInvitations.length} Scout / {profileViews.length} Views</h3>
            </div>
            <div className="flex -space-x-2 pt-1">
              {interestedCompanies.map(company => (
                <div key={company.id} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm"
                  style={{ background: company.color + '20' }}>
                  {company.emoji}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {interestedCompanies.map(company => (
              <span key={company.id} className="shrink-0 rounded-full bg-[#F7F6FF] px-3 py-1.5 text-xs font-bold text-gray-700">
                {company.emoji} {company.name}
              </span>
            ))}
          </div>
        </div>

        <section>
          <div className="flex items-end justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">スカウト</h3>
            </div>
          </div>

          <div className="space-y-3">
            {scouts.map(({ scout, company }) => (
              <div key={scout.id} className="bg-white rounded-3xl p-3.5 card-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: company.color + '18' }}>
                    {company.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-[#EC4899] bg-[#FDF2F8] rounded-full px-2 py-0.5">{scout.status}</span>
                      <span className="text-[10px] text-gray-400">{scout.receivedAt}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 truncate">{scout.companyName}</p>
                    <p className="text-xs text-gray-500 truncate">{scout.role}</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#F7F6FF] px-3 py-2.5 my-3">
                  <p className="text-xs font-bold text-[#6C5CE7]">{scout.signal}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 rounded-full bg-[#6C5CE7] text-white text-xs font-bold">詳細を見る</button>
                  <button className="flex-1 py-2 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">保存</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">あなたをチェックした会社</h3>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-3.5 card-shadow">
            <div className="space-y-4">
              {views.map((view, index) => (
                <div key={view.id} className="relative flex gap-3">
                  {index < views.length - 1 && (
                    <div className="absolute left-[17px] top-9 bottom-[-16px] w-px bg-gray-100" />
                  )}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 z-10"
                    style={{ background: view.company.color + '18' }}>
                    {view.company.emoji}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-gray-800 truncate">{view.companyName}</p>
                      <span className="text-[11px] text-gray-400 flex-shrink-0">{view.viewedAt}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{view.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <BottomNav current="scout" navigate={navigate} />
    </div>
  )
}
