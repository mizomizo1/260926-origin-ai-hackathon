import { Screen } from '../App'
import { companies, profileViews, scoutInvitations } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'

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
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="scout" navigate={navigate} />
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-[1200px] px-6 py-8">
        <p className="text-xs text-gray-500 mb-1">企業からの関心</p>
        <h1 className="text-3xl font-bold text-gray-900">スカウト</h1>
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-6 py-8 space-y-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'スカウト', value: scoutInvitations.length, color: '#EC4899' },
            { label: 'プロフィール閲覧', value: profileViews.length, color: '#6C5CE7' },
            { label: '企業', value: interestedCompanies.length, color: '#00B894' },
          ].map(item => (
            <div key={item.label} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm"><p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p><p className="text-xs text-gray-500 mt-1">{item.label}</p></div>
          ))}
        </div>
        <div className="bg-[#17152B] rounded-3xl p-6 text-white shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#F9A8D4] mb-1">あなたの傾向</p>
              <h3 className="text-xl font-bold">あなたに関心を持つ企業</h3>
              <p className="text-sm text-white/55 mt-2">Trialと価値観の記録を見て、企業があなたを見つけています。</p>
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
                <span key={company.id} className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80">
                {company.emoji} {company.name}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#FDF2F8] border border-[#FBCFE8] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-gray-900">Trialを増やすと、企業に見つけてもらいやすくなります</p>
            <p className="text-xs text-gray-600 mt-1">体験の記録が増えるほど、あなたの関心や強みが企業に伝わります。</p>
          </div>
          <button onClick={() => navigate('missionExplore')} className="shrink-0 rounded-xl bg-[#EC4899] px-5 py-2.5 text-sm font-bold text-white">
            Trialを探す →
          </button>
        </div>

        <section>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-xs font-bold text-[#EC4899]">新着のスカウト</p><h3 className="text-xl font-bold text-gray-900 mt-1">スカウト</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {scouts.map(({ scout, company }) => (
              <div key={scout.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:-translate-y-1 transition-transform">
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
              <p className="text-xs font-bold text-[#6C5CE7]">最近の動き</p><h3 className="text-xl font-bold text-gray-900 mt-1">あなたをチェックした会社</h3>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
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
      </main>
    </div>
  )
}
