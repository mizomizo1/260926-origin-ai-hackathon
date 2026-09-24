import { useEffect, useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions, passportData, scoutInvitations } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'
import { demoTrialScout } from '../data/demoTrial'
import { markDemoNotified, useDemoTrial } from '../state/demoTrial'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

export default function StudentHome({ navigate }: Props) {
  const featured = missions.find(m => (m as any).source === 'core') ?? missions[0]
  const nextTrials = missions.filter(m => m.id !== featured.id).slice(0, 3)
  const { evaluationComplete, notified, matchSeen } = useDemoTrial()
  const [noticeStage, setNoticeStage] = useState(0)
  const showDemoNotifications = notified || noticeStage > 0
  const latestScout = showDemoNotifications ? demoTrialScout : scoutInvitations[0]
  const scoutCount = showDemoNotifications ? scoutInvitations.length + 1 : 0

  useEffect(() => {
    if (!evaluationComplete || notified) return
    const first = window.setTimeout(() => setNoticeStage(1), 500)
    const second = window.setTimeout(() => {
      setNoticeStage(2)
      markDemoNotified()
    }, 1300)
    return () => {
      window.clearTimeout(first)
      window.clearTimeout(second)
    }
  }, [evaluationComplete, notified])

  const spotlight = showDemoNotifications ? (matchSeen ? 'scout' : 'companies') : undefined

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="home" navigate={navigate} spotlight={spotlight} />

      {noticeStage > 0 && (
        <div className="fixed right-6 top-20 z-50 w-[340px] space-y-2">
          <div className="rounded-2xl border border-[#C7D2FE] bg-white p-4 shadow-xl">
            <p className="text-xs font-bold text-[#6C5CE7]">新しい通知</p>
            <p className="mt-1 text-sm font-bold text-gray-900">マッチする企業が見つかりました</p>
          </div>
          {noticeStage > 1 && (
            <div className="rounded-2xl border border-[#FBCFE8] bg-white p-4 shadow-xl">
              <p className="text-xs font-bold text-[#EC4899]">新しい通知</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{demoTrialScout.companyName}からスカウトが届きました</p>
            </div>
          )}
        </div>
      )}

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <section className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl bg-[#17152B] p-7 text-white lg:p-9">
            <p className="text-sm font-semibold text-[#A29BFE] mb-2">あなたの現在のキャリア仮説</p>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">人と関わりながら、企画を考える仕事への関心が高いようです。</h1>
            <p className="text-sm text-white/55 mt-4 max-w-2xl leading-relaxed">Trialの回答と価値観から見えた仮説です。次は企業の仕事を試すと、相性の輪郭がもう少しはっきりします。</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => navigate('missionExplore')} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#17152B]">Trialを探す</button>
              <button onClick={() => navigate('studentProfile')} className="rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white">プロフィールを見る</button>
            </div>
          </div>
          <aside className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold text-[#6C5CE7]">次におすすめ</p>
            <div className="mt-4 rounded-2xl bg-[#F7F6FF] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ background: featured.color + '18' }}>{featured.emoji}</div>
                <div>
                <p className="text-sm font-bold text-gray-900">{featured.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{featured.duration} · {featured.category}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {featured.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="rounded-xl bg-white px-2 py-2 text-center text-[11px] font-bold text-gray-500">{tag}</span>
                ))}
              </div>
            </div>
            <button onClick={() => navigate('missionDetail', { missionId: featured.id })} className="mt-5 w-full rounded-xl bg-[#6C5CE7] px-4 py-3 text-sm font-bold text-white">詳しく見る</button>
          </aside>
        </section>

        <section className="mb-8">
            {showDemoNotifications ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <button onClick={() => navigate('companyMatch')} className="w-full text-left bg-white rounded-2xl border border-[#C7D2FE] p-5 shadow-sm">
                  <p className="text-sm font-bold text-gray-900">マッチする企業が見つかりました</p>
                  <p className="text-xs text-gray-500 mt-1">提出結果をもとに、関心が近い企業を並べました。</p>
                  <span className="inline-flex mt-3 text-xs font-bold text-[#6C5CE7] bg-[#EEF0FF] rounded-full px-2.5 py-1">
                    企業を確認
                  </span>
                </button>
                <button onClick={() => navigate('scoutInbox')} className="w-full text-left bg-white rounded-2xl border border-[#FBCFE8] p-5 shadow-sm">
                  <p className="text-sm font-bold text-gray-900">スカウト</p>
                  <p className="text-xs text-gray-500 mt-1">{latestScout.companyName} · {latestScout.signal}</p>
                  <span className="inline-flex mt-3 text-xs font-bold text-[#EC4899] bg-[#FDF2F8] rounded-full px-2.5 py-1">
                    {scoutCount}件
                  </span>
                </button>
            </div>
            ) : (
            <button onClick={() => navigate('missionDetail', { missionId: 'core_001' })} className="w-full text-left bg-[#FDF2F8] rounded-2xl border border-[#FBCFE8] p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900">💌 スカウトはまだ届いていません</p>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">最初のTrial(12分)を提出すると、あなたの回答を見た企業から反応が届きます。</p>
              <span className="inline-flex mt-3 text-xs font-bold text-white bg-[#EC4899] rounded-full px-3 py-1.5">
                最初のTrialを始める →
              </span>
            </button>
            )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">次のTrial</h2>
            <button onClick={() => navigate('missionExplore')} className="text-sm font-bold text-[#6C5CE7]">Trialを探す</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nextTrials.map(trial => (
              <button key={trial.id} onClick={() => navigate('missionDetail', { missionId: trial.id })}
                className="text-left bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:border-[#6C5CE7]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: trial.color + '18' }}>{trial.emoji}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{trial.title}</p>
                    <p className="text-xs text-gray-500">{trial.company}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{trial.summary}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">最近終えたTrial</h2>
              <p className="text-sm text-gray-500">体験から仮説を更新していきます</p>
            </div>
            <button onClick={() => navigate('studentProfile')} className="text-sm font-bold text-[#6C5CE7]">プロフィールで見る</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {passportData.experiences.slice(0, 3).map(exp => (
              <div key={exp.id} className="snap-start shrink-0 w-[300px] bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-2xl mb-3">{exp.emoji}</p>
                <p className="text-sm font-bold text-gray-900">{exp.mission}</p>
                <p className="text-xs text-gray-500 mt-1">{exp.company} · {exp.date}</p>
                <p className="text-xs text-gray-600 mt-3 line-clamp-2">{exp.memo}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
