import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyCoreTrialInsights, companyMissions } from '../../data/mock'

interface Props { navigate: (s: Screen) => void }

const statusClass: Record<string, string> = {
  公開中: 'bg-[#E8FBF5] text-[#00B894]',
  下書き: 'bg-[#FEF3C7] text-[#D97706]',
}

export default function MissionList({ navigate }: Props) {
  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="missionList" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <section className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#6C5CE7]">Mission管理</p>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">自社Mission一覧</h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">学生側に出るTrialカードと同じ項目で、公開状態・参加・興味ありを確認できます。</p>
            </div>
            <button onClick={() => navigate('createMission')} className="rounded-xl bg-[#17152B] px-5 py-3 text-sm font-bold text-white hover:bg-[#24213A]">
              Mission作成
            </button>
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">株式会社Lumoの公開・下書き</h2>
              <p className="mt-1 text-xs text-gray-500">タイトル、概要、タグ、評価観点まで学生側のTrialデータと同じ構造で管理します。</p>
            </div>
            <span className="text-xs font-bold text-gray-400">{companyMissions.length}件</span>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {companyMissions.map(mission => (
              <article key={mission.id} className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <div className="p-5">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusClass[mission.status] ?? 'bg-gray-100 text-gray-500'}`}>{mission.status}</span>
                    <span className="text-[11px] font-bold text-gray-400">{mission.updatedAt}</span>
                  </div>
                  <p className="text-xs font-bold text-[#6C5CE7]">{mission.category}</p>
                  <h3 className="mt-2 min-h-[48px] text-lg font-bold leading-snug text-gray-900">{mission.title}</h3>
                  <p className="mt-3 line-clamp-2 min-h-[40px] text-xs leading-relaxed text-gray-500">{mission.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {mission.tags.map(tag => <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500">{tag}</span>)}
                  </div>
                </div>
                <div className="border-t border-gray-100 bg-[#F7F8FB] p-5">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: '参加', value: mission.participants },
                      { label: '完了率', value: `${mission.completionRate}%` },
                      { label: '興味あり', value: `${mission.interestRate}%` },
                    ].map(item => (
                      <div key={item.label} className="rounded-2xl bg-white px-3 py-2 text-center">
                        <p className="text-sm font-bold text-gray-900">{item.value}</p>
                        <p className="mt-0.5 text-[10px] text-gray-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => navigate('missionAnalytics')} className="flex-1 rounded-xl bg-[#EEF0FF] px-3 py-2.5 text-xs font-bold text-[#6C5CE7]">分析</button>
                    <button onClick={() => navigate('createMission')} className="flex-1 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-gray-600">編集</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-bold text-[#F59E0B]">Core Trial Reference</p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">基礎Trialの反応も確認できます</h2>
            <p className="mt-1 text-xs text-gray-500">企業が作ったMissionではありませんが、候補学生の前段シグナルとして分析に使います。</p>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {companyCoreTrialInsights.map(trial => (
              <div key={trial.id} className="rounded-2xl bg-[#F7F8FB] p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold leading-snug text-gray-900">{trial.title}</h3>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#F59E0B]">{trial.participants}名</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{trial.note}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {trial.strongSignals.map(signal => <span key={signal} className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-gray-500">{signal}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
