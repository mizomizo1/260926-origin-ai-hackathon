import { useEffect, useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions, mockStudent, passportData, scoutInvitations } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'
import { demoTrialScout } from '../data/demoTrial'
import { markDemoNotified, useDemoTrial } from '../state/demoTrial'
import { AppIcon, DataIcon } from '../components/AppIcon'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

export default function StudentHome({ navigate }: Props) {
  const featured = missions.find(m => (m as any).source === 'core') ?? missions[0]
  const nextTrials = ['mis_003', 'mis_001', 'core_003']
    .map(id => missions.find(m => m.id === id))
    .filter(Boolean) as typeof missions
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
        <section className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#6C5CE7]">ホーム</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">こんにちは、{mockStudent.name}さん</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">今の仮説を確認しながら、次に試すTrialと企業からの反応を見ていきましょう。</p>
        </section>

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
          <aside className="overflow-hidden rounded-3xl border border-[#6C5CE7]/30 bg-white shadow-sm">
            <div className="relative p-5">
              <div className="absolute right-[-34px] top-5 z-20 rotate-45 bg-[#F59E0B] px-10 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                Best Match
              </div>
              <p className="text-xs font-bold text-[#6C5CE7]">次におすすめ</p>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: featured.color + '18', color: featured.color }}>
                  <DataIcon value={featured.emoji} className="h-5 w-5" />
                </div>
                <span className="chip bg-[#EEF0FF] text-[#6C5CE7]">{featured.duration}</span>
              </div>
              <h2 className="mt-5 min-h-[44px] text-base font-bold leading-snug text-gray-900">{featured.title}</h2>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">{featured.summary}</p>
              <div className="mt-5 flex gap-1.5 flex-wrap">
                <span className="chip bg-gray-100 text-gray-600">{featured.category}</span>
                <span className="chip bg-gray-100 text-gray-600">{featured.difficulty}</span>
              </div>
            </div>
            <button onClick={() => navigate('missionDetail', { missionId: featured.id })} className="w-full border-t border-gray-100 px-5 py-4 text-left text-xs font-bold text-[#6C5CE7]">
              詳しく見る →
            </button>
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
              <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <AppIcon name="envelope" className="h-4 w-4 text-[#EC4899]" />
                スカウトはまだ届いていません
              </p>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">最初のTrial(12分)を提出すると、あなたの回答を見た企業から反応が届きます。</p>
              <span className="inline-flex mt-3 text-xs font-bold text-white bg-[#EC4899] rounded-full px-3 py-1.5">
                最初のTrialを始める →
              </span>
            </button>
            )}
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">次のTrial</h2>
              <p className="mt-1 text-xs text-gray-500">相性が良さそうなTrialを優先表示しています</p>
            </div>
            <button onClick={() => navigate('missionExplore')} className="text-sm font-bold text-[#6C5CE7]">Trialを探す</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {nextTrials.map((trial, index) => {
              const isCore = (trial as any).source === 'core'
              return (
              <button key={trial.id} onClick={() => navigate('missionDetail', { missionId: trial.id })}
                className={`group relative text-left snap-start shrink-0 w-[292px] overflow-hidden border rounded-2xl shadow-sm hover:-translate-y-1 transition-all ${isCore ? 'bg-white border-[#6C5CE7]/40 hover:border-[#6C5CE7]' : 'bg-white border-gray-100 hover:border-gray-300'}`}>
                {index === 0 && (
                  <div className="absolute right-[-34px] top-5 z-20 rotate-45 bg-[#F59E0B] px-10 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                    Best Match
                  </div>
                )}
                <div className={isCore ? 'p-5' : 'p-5 text-white'} style={!isCore ? { background: `linear-gradient(135deg, ${trial.color}, #17152B)` } : undefined}>
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: isCore ? trial.color + '18' : 'rgba(255,255,255,0.18)', color: isCore ? trial.color : 'white' }}>
                      <DataIcon value={trial.emoji} className="h-5 w-5" />
                    </div>
                    <AppIcon name="arrowUpRight" className={isCore ? 'h-5 w-5 text-gray-300 group-hover:text-[#6C5CE7]' : 'h-5 w-5 text-white/55 group-hover:text-white'} />
                  </div>
                  <span className={isCore ? 'chip bg-[#EEF0FF] text-[#6C5CE7]' : 'chip bg-white/15 text-white'}>{isCore ? '基礎Trial' : '企業の仕事'}</span>
                  <h3 className={`text-base font-bold leading-snug mt-3 line-clamp-2 min-h-[44px] ${isCore ? 'text-gray-900' : 'text-white'}`}>{trial.title}</h3>
                  <p className={`mt-2 text-xs truncate ${isCore ? 'text-gray-500' : 'text-white/65'}`}>{trial.company}</p>
                </div>
                <div className="p-5">
                  {!isCore && <p className="mb-3 text-xs font-bold text-gray-400">実際の企業テーマを体験</p>}
                  <p className="line-clamp-2 min-h-[40px] text-xs leading-relaxed text-gray-600">{trial.summary}</p>
                  <div className="flex gap-1.5 mt-5 flex-wrap">
                    <span className="chip bg-gray-100 text-gray-600">{trial.duration}</span><span className="chip bg-gray-100 text-gray-600">{trial.difficulty}</span>
                  </div>
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between"><span className="text-xs text-gray-500">{trial.category}</span><span className="text-xs font-bold" style={{ color: isCore ? '#6C5CE7' : trial.color }}>詳しく見る</span></div>
                </div>
              </button>
              )
            })}
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
              <div key={exp.id} className="relative snap-start shrink-0 w-[292px] overflow-hidden rounded-2xl border border-gray-200 bg-[#F3F4F6] shadow-sm opacity-90">
                <div className="absolute right-[-32px] top-5 z-20 rotate-45 bg-gray-500 px-10 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                  Finished
                </div>
                <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg, #4B5563, #111827)' }}>
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                      <DataIcon value={exp.emoji} className="h-5 w-5" />
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70">
                      <AppIcon name="check" className="h-4 w-4" />
                    </span>
                  </div>
                  <span className="chip bg-white/10 text-white/70">完了済み</span>
                  <h3 className="mt-3 min-h-[44px] text-base font-bold leading-snug text-white line-clamp-2">{exp.mission}</h3>
                  <p className="mt-2 truncate text-xs text-white/65">{exp.company}</p>
                </div>
                <div className="p-5">
                  <p className="line-clamp-2 min-h-[40px] text-xs leading-relaxed text-gray-600">{exp.memo}</p>
                  <div className="mt-5 flex gap-1.5 flex-wrap">
                    <span className="chip bg-white text-gray-600">満足度 {exp.satisfaction}</span>
                    <span className="chip bg-white text-gray-500">{exp.date}</span>
                  </div>
                  <div className="mt-5 border-t border-gray-200 pt-3 text-xs font-bold text-gray-500">プロフィールに記録済み</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
