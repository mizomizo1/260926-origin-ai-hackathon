import { useEffect, useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { companies, profileViews, scoutInvitations } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'
import CompanyDetailModal from '../components/CompanyDetailModal'
import { demoTrialScout } from '../data/demoTrial'
import { useDemoTrial } from '../state/demoTrial'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

export default function ScoutInbox({ navigate }: Props) {
  const { notified } = useDemoTrial()
  const [countProgress, setCountProgress] = useState(0)
  const [visibleActivityCount, setVisibleActivityCount] = useState(1)
  const [selectedCompany, setSelectedCompany] = useState<(typeof companies)[number] | null>(null)
  const [selectedScout, setSelectedScout] = useState<(typeof scoutInvitations)[number] | typeof demoTrialScout | null>(null)
  const [savedScoutIds, setSavedScoutIds] = useState<Set<string>>(() => new Set(scoutInvitations.filter(scout => scout.status === '保存中').map(scout => scout.id)))
  // Trial の提出・評価で届いたスカウトを先頭に出す
  const allScouts = [demoTrialScout, ...scoutInvitations]
  const scouts = allScouts.map(scout => ({
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
  const interestStats = [
    { label: 'スカウト', value: allScouts.length, color: '#EC4899', bg: '#FDF2F8', note: 'あなた宛てのオファー' },
    { label: 'プロフィール閲覧', value: profileViews.length, color: '#6C5CE7', bg: '#EEF0FF', note: '企業が確認した回数' },
    { label: '企業', value: interestedCompanies.length, color: '#00B894', bg: '#E8FBF5', note: '関心を持った会社' },
  ]
  const liveActivities = [
    `${demoTrialScout.companyName}がTrial回答を確認`,
    `${views[0]?.companyName}がプロフィールを閲覧`,
    `${scouts[1]?.scout.companyName}から新しいスカウト`,
  ].filter(Boolean)

  useEffect(() => {
    if (!notified) return
    setCountProgress(0)
    setVisibleActivityCount(1)
    const startedAt = window.performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / 900, 1)
      setCountProgress(progress)
      if (progress < 1) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    const activityTimers = [650, 1250].map((ms, index) =>
      window.setTimeout(() => setVisibleActivityCount(index + 2), ms)
    )
    return () => {
      window.cancelAnimationFrame(frame)
      activityTimers.forEach(timer => window.clearTimeout(timer))
    }
  }, [notified])

  const animatedValue = (value: number) => Math.round(value * countProgress)

  // 提出前は通知を出さない(答えたから届いた、という体験にするため)
  if (!notified) return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="scout" navigate={navigate} />
      <main className="mx-auto max-w-[640px] px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FDF2F8] text-3xl flex items-center justify-center mx-auto">💌</div>
        <h1 className="text-2xl font-bold text-gray-900 mt-5">スカウトはまだ届いていません</h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">最初のTrial(12分)を提出すると、<br />あなたの回答を見た企業から反応が届きます。</p>
        <button onClick={() => navigate('missionDetail', { missionId: 'core_001' })} className="mt-6 rounded-xl bg-[#EC4899] px-6 py-3 text-sm font-bold text-white">
          最初のTrialを始める →
        </button>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="scout" navigate={navigate} />
      <style>{`
        @keyframes ccScoutSlideIn {
          from { opacity: 0; transform: translateX(42px) scale(0.92); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes ccScoutFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ccScoutPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,184,148,0.32); }
          50% { box-shadow: 0 0 0 8px rgba(0,184,148,0); }
        }
      `}</style>

      <main className="mx-auto max-w-[1200px] px-6 py-8 space-y-8">
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#EC4899]">企業からの関心</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">スカウト</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">Trialやプロフィールを見た企業からの反応をまとめています。</p>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px]">
          <div className="overflow-hidden rounded-3xl bg-[#17152B] text-white shadow-sm">
            <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold text-[#F9A8D4]">企業からの反応が増えています</p>
                <h2 className="mt-2 text-2xl font-bold">あなたのTrialを見た企業が動き始めました</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">提出内容やプロフィールを見た企業が、スカウトや閲覧として反応しています。</p>
                <button onClick={() => navigate('missionExplore')} className="mt-5 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/15">
                  Trialを増やして見つけてもらう →
                </button>
              </div>
              <div className="flex min-w-[170px] justify-end -space-x-4 overflow-visible pr-1">
                {interestedCompanies.map((company, index) => (
                  <div key={company.id} className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#17152B] text-xl opacity-0"
                    style={{
                      background: company.color,
                      animation: `ccScoutSlideIn 520ms ease-out ${index * 160}ms forwards`,
                      zIndex: interestedCompanies.length + index,
                    }}>
                    {company.emoji}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
              {interestStats.map(item => (
                <div key={item.label} className="border-white/10 px-6 py-5 sm:border-r sm:last:border-r-0">
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold tabular-nums transition-all" style={{ color: item.color }}>{animatedValue(item.value)}</p>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                  </div>
                  <p className="mt-2 text-xs text-white/45">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">いまの動き</p>
              <span className="rounded-full bg-[#E8FBF5] px-2.5 py-1 text-[11px] font-bold text-[#00B894]" style={{ animation: 'ccScoutPulse 1.5s ease-in-out infinite' }}>Live</span>
            </div>
            <div className="mt-4 space-y-4">
              {liveActivities.slice(0, visibleActivityCount).map((activity, index) => (
                <div key={activity} className="relative flex gap-3 opacity-0" style={{ animation: 'ccScoutFadeUp 420ms ease-out forwards' }}>
                  {index < liveActivities.length - 1 && <div className="absolute left-[13px] top-8 bottom-[-16px] w-px bg-gray-100" />}
                  <span className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF0FF] text-[11px] font-bold text-[#6C5CE7]">{index + 1}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{activity}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{index === 0 ? 'たった今' : index === 1 ? '今日' : '昨日'}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold text-[#EC4899]">新着のスカウト</p><h3 className="text-xl font-bold text-gray-900 mt-1">スカウト</h3>
              </div>
              <span className="text-xs font-bold text-gray-400">{scouts.length}件</span>
            </div>

            <div className="space-y-4">
              {scouts.map(({ scout, company }, index) => (
                <div key={scout.id} className={`bg-white rounded-3xl border p-5 shadow-sm hover:-translate-y-1 transition-transform ${index === 0 ? 'border-[#FBCFE8]' : 'border-gray-100'}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: company.color + '18' }}>
                        {company.emoji}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-[#EC4899] bg-[#FDF2F8] rounded-full px-2 py-0.5">{scout.status}</span>
                          {index === 0 && <span className="text-[10px] font-bold text-white bg-[#EC4899] rounded-full px-2 py-0.5">NEW</span>}
                          <span className="text-[10px] text-gray-400">{scout.receivedAt}</span>
                        </div>
                        <p className="text-base font-bold text-gray-900 truncate">{scout.companyName}</p>
                        <p className="text-xs text-gray-500 truncate">{scout.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 sm:shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCompany(company)
                          setSelectedScout(scout)
                        }}
                        className="rounded-xl bg-[#6C5CE7] px-4 py-2 text-xs font-bold text-white"
                      >
                        詳細
                      </button>
                      <button
                        type="button"
                        onClick={() => setSavedScoutIds(prev => {
                          const next = new Set(prev)
                          if (next.has(scout.id)) next.delete(scout.id)
                          else next.add(scout.id)
                          return next
                        })}
                        className={`rounded-xl px-4 py-2 text-xs font-bold ${savedScoutIds.has(scout.id) ? 'bg-[#E8FBF5] text-[#00B894]' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {savedScoutIds.has(scout.id) ? '保存済み' : '保存'}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-[#F7F6FF] px-4 py-3">
                    <p className="text-xs font-bold text-[#6C5CE7]">{scout.signal}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">{scout.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <div className="mb-3">
              <p className="text-xs font-bold text-[#6C5CE7]">足跡</p>
              <h3 className="mt-1 text-lg font-bold text-gray-900">あなたをチェックした会社</h3>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="space-y-3">
              {views.map((view, index) => (
                <div key={view.id} className="flex gap-3 rounded-2xl bg-gray-50 px-3 py-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 z-10"
                    style={{ background: view.company.color + '18' }}>
                    {view.company.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
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
          </aside>
        </section>
      </main>
      {selectedCompany && selectedScout && (
        <CompanyDetailModal
          company={selectedCompany}
          context={{
            label: 'Scout Detail',
            title: `${selectedScout.role}として関心が届いています`,
            body: `${selectedScout.signal}。${selectedScout.message}`,
          }}
          onClose={() => {
            setSelectedCompany(null)
            setSelectedScout(null)
          }}
          onExplore={() => {
            setSelectedCompany(null)
            setSelectedScout(null)
            navigate('missionExplore')
          }}
        />
      )}
    </div>
  )
}
