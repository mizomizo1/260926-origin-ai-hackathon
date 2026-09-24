import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyMissions } from '../../data/mock'

interface Props { navigate: (s: Screen) => void }

export default function MissionList({ navigate }: Props) {
  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="missionList" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <section className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#6C5CE7]">Mission管理</p>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">自社Mission一覧</h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">学生に表示されるカードと同じ見え方で、Missionの状態と反応を確認できます。</p>
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
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
            {companyMissions.map(mission => (
              <article key={mission.id} className="group w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-gray-400">
                <div className="h-1" style={{ backgroundColor: mission.status === '公開中' ? '#00B894' : '#F59E0B' }} />
                <div className="p-5">
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <span className="chip bg-gray-100 text-gray-600">{mission.category}</span>
                    <span className={`text-[11px] font-bold ${mission.status === '公開中' ? 'text-[#00B894]' : 'text-[#D97706]'}`}>{mission.status}</span>
                  </div>
                  <h3 className="mt-2 min-h-[48px] text-lg font-bold leading-snug text-gray-900">{mission.title}</h3>
                  <p className="mt-3 line-clamp-2 min-h-[40px] text-xs leading-relaxed text-gray-500">{mission.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {mission.tags.map(tag => <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500">{tag}</span>)}
                  </div>
                </div>
                <div className="border-t border-gray-100 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900">完了率 {mission.completionRate}%</span>
                    <span className="text-gray-400">興味あり {mission.interestRate}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full" style={{ width: `${mission.completionRate}%`, backgroundColor: mission.status === '公開中' ? '#00B894' : '#F59E0B' }} />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>{mission.participants}名が体験</span>
                    <span>{mission.updatedAt}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => navigate('missionAnalytics')} className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-bold text-gray-700 hover:border-[#6C5CE7] hover:text-[#6C5CE7]">分析を見る</button>
                    <button onClick={() => navigate('createMission')} className="flex-1 rounded-xl bg-[#17152B] px-3 py-2.5 text-xs font-bold text-white hover:bg-[#24213A]">編集</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
