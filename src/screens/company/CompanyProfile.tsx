import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { AppIcon, DataIcon } from '../../components/AppIcon'
import { companies, companyMissions } from '../../data/mock'

interface Props { navigate: (s: Screen) => void }

export default function CompanyProfile({ navigate }: Props) {
  const company = companies.find(item => item.id === 'com_001') ?? companies[0]
  const published = companyMissions.filter(mission => mission.status === '公開中')
  const draftCount = companyMissions.length - published.length
  const totalParticipants = companyMissions.reduce((sum, mission) => sum + mission.participants, 0)

  const basics = [
    { label: '企業名', value: company.name },
    { label: '業界', value: company.industry },
    { label: '所在地', value: company.location },
    { label: '公開Trial', value: `${company.openMissions}件` },
    { label: '学生体験数', value: `${company.trialCount}件` },
    { label: '興味あり', value: `${company.interestCount}件` },
  ]

  const studentPreview = [
    { label: '学生側に表示される紹介文', value: company.description },
    { label: '文化・働き方', value: company.culture },
    { label: '相性が高い学生への見え方', value: company.whyFit.join(' / ') },
  ]

  const profileHealth = [
    { label: '公開中', value: published.length, color: '#00B894' },
    { label: '下書き', value: draftCount, color: '#F59E0B' },
    { label: '体験学生', value: totalParticipants, color: '#6C5CE7' },
  ]

  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="companyProfile" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <section className="mb-6 border-b border-gray-200 pb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-[#6C5CE7]">企業プロフィール</p>
              <h1 className="mt-1 text-3xl font-bold text-gray-900">学生に見える会社情報</h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">マッチ企業一覧、スカウト、Trial詳細で使われる基本情報を確認できます。</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate('missionList')} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:border-[#6C5CE7] hover:text-[#6C5CE7]">
                Missionを見る
              </button>
              <button onClick={() => navigate('createMission')} className="rounded-xl bg-[#17152B] px-4 py-3 text-sm font-bold text-white hover:bg-[#24213A]">
                Trialを追加
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="relative bg-[#17152B] p-7 text-white">
              <div className="relative z-10 flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: company.color }}>
                  <DataIcon value={company.emoji} className="h-7 w-7" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white/45">Company Account</p>
                  <h2 className="mt-1 text-2xl font-bold">{company.name}</h2>
                  <p className="mt-1 text-sm text-white/55">{company.industry} · {company.location}</p>
                </div>
              </div>
              <div className="absolute -bottom-10 right-6 text-white/10">
                <DataIcon value={company.emoji} className="h-32 w-32" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-5 lg:grid-cols-3">
              {basics.map(item => (
                <div key={item.label} className="rounded-2xl bg-[#F7F8FB] px-4 py-3">
                  <p className="text-[11px] font-bold text-gray-400">{item.label}</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold text-[#6C5CE7]">Profile Health</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900">掲載状態</h2>
            <div className="mt-5 space-y-3">
              {profileHealth.map(item => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-[#F7F8FB] px-4 py-3">
                  <span className="text-sm font-bold text-gray-700">{item.label}</span>
                  <span className="text-xl font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#EEF0FF] px-4 py-3">
              <p className="text-xs font-bold text-[#6C5CE7]">学生側との接点</p>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">会社紹介、文化、公開Trialが学生側のマッチ画面と企業詳細モーダルに反映されます。</p>
            </div>
          </aside>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6C5CE7]">
                <AppIcon name="buildings" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold text-[#6C5CE7]">Student Preview</p>
                <h2 className="text-lg font-bold text-gray-900">学生に伝わる基本情報</h2>
              </div>
            </div>
            <div className="space-y-3">
              {studentPreview.map(row => (
                <div key={row.label} className="rounded-2xl border border-gray-100 p-4">
                  <p className="text-xs font-bold" style={{ color: company.color }}>{row.label}</p>
                  <p className="mt-2 text-sm leading-7 text-gray-700">{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#6C5CE7]">Open Trials</p>
                <h2 className="mt-1 text-lg font-bold text-gray-900">掲載中のTrial</h2>
              </div>
              <button onClick={() => navigate('missionList')} className="text-xs font-bold text-[#6C5CE7]">管理</button>
            </div>
            <div className="space-y-3">
              {companyMissions.map(mission => (
                <button
                  key={mission.id}
                  type="button"
                  onClick={() => navigate('missionAnalytics')}
                  className="w-full rounded-2xl border border-gray-100 bg-[#F7F8FB] p-4 text-left transition-colors hover:border-[#6C5CE7]/40 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900">{mission.title}</p>
                      <p className="mt-1 text-xs text-gray-500">{mission.category} · {mission.duration}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${mission.status === '公開中' ? 'bg-[#E8FBF5] text-[#00B894]' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                      {mission.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
                    <span>{mission.participants}名が体験</span>
                    <span>完了率 {mission.completionRate}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FDF2F8] text-[#EC4899]">
              <AppIcon name="profile" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold text-[#EC4899]">Recruiting Contact</p>
              <h2 className="text-lg font-bold text-gray-900">採用担当・連絡先</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              { label: '担当者', value: '田中 彩 / 新卒採用' },
              { label: '返信目安', value: '2営業日以内' },
              { label: '面談形式', value: 'オンライン中心' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl bg-[#F7F8FB] px-4 py-3">
                <p className="text-[11px] font-bold text-gray-400">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
