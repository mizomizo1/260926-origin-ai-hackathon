import { useRef, useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'
import GuideRing from '../components/GuideRing'
import { demoTrial } from '../data/demoTrial'
import { submitDemoTrial } from '../state/demoTrial'
import { DataIcon } from '../components/AppIcon'

interface Props { navigate: (s: Screen, p?: NavParams) => void; missionId?: string }

export default function MissionTrial({ navigate, missionId }: Props) {
  const m = missions.find(x => x.id === missionId) ?? missions[0]
  const isDemo = m.id === demoTrial.missionId
  const [answer, setAnswer] = useState(isDemo ? demoTrial.answer : '')
  const [memo, setMemo] = useState(isDemo ? demoTrial.memo : '')
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const tasks = ['課題確認', '調査', '分析', '提案', '提出']
  const done = [true, memo.length > 0, memo.length >= 30, answer.length > 0, answer.length >= 10]
  const doneCount = done.filter(Boolean).length

  const guideTarget = memo.length < 30 ? 'memo' : answer.length < 10 ? 'answer' : 'submit'
  const memoRef = useRef<HTMLTextAreaElement>(null)
  const answerRef = useRef<HTMLTextAreaElement>(null)
  const submitRef = useRef<HTMLDivElement>(null)

  const submit = () => {
    if (isDemo) {
      submitDemoTrial(answer)
      navigate('trialEvaluation')
    } else {
      navigate('reflection', { missionId: m.id })
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="explore" navigate={navigate} />

      <main className="mx-auto max-w-[1200px] px-6 py-6">
        <button onClick={() => navigate('missionDetail', { missionId: m.id })} className="text-gray-500 text-sm mb-5 block">← Trialの詳細</button>

        {isDemo && (
          <div className="mb-5 rounded-2xl border border-[#C7D2FE] bg-[#EEF0FF] px-5 py-4">
            <p className="text-xs font-bold text-[#4F46E5]">提出前の確認</p>
            <p className="mt-1 text-sm text-gray-700">作業メモと提出内容は入力済みです。内容を確認して、そのまま提出できます。</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr_260px] gap-5">
          <aside className="bg-white border border-gray-100 rounded-2xl p-4 h-fit shadow-sm">
            <p className="text-sm font-bold text-gray-900 mb-4">進め方</p>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <button key={task} className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left ${done[index] ? 'bg-[#EEF0FF] text-[#6C5CE7]' : 'text-gray-500 hover:bg-gray-50'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${done[index] ? 'bg-[#6C5CE7] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{task}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: m.color + '18', color: m.color }}>
                <DataIcon value={m.emoji} className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{m.company}</p>
                <h1 className="text-lg font-bold text-gray-900">{m.title}</h1>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-[#F7F6FF] rounded-2xl p-5">
                <p className="text-xs font-bold text-[#6C5CE7] mb-2 uppercase tracking-wide">課題</p>
                <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">{m.problemStatement}</pre>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900 mb-3">参考資料</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                    <p className="text-sm font-bold text-gray-800">背景メモ</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-6">{isDemo ? demoTrial.backgroundMemo : 'イベントの背景、参加者の声、直近の状況を確認します。'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                    <p className="text-sm font-bold text-gray-800">参考データ</p>
                    <div className="mt-3 space-y-2">
                      {(isDemo ? demoTrial.referenceData : []).map(row => (
                        <div key={row.label} className="grid grid-cols-[44px_1fr_auto] items-center gap-2 text-xs">
                          <span className="font-bold text-gray-700">{row.label}</span>
                          <span className="h-2 rounded-full bg-white overflow-hidden">
                            <span className="block h-full rounded-full bg-[#6C5CE7]" style={{ width: `${row.snsReactions}%` }} />
                          </span>
                          <span className="text-gray-500">新規{row.firstTimers}名</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                    <p className="text-sm font-bold text-gray-800">提出データ例</p>
                    <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-gray-600">{isDemo ? demoTrial.sampleSubmission : '提出例を確認します。'}</pre>
                  </div>
                </div>
              </div>

              <GuideRing active={guideTarget === 'memo'} label="まずは気づいたことをメモ" radius="12px">
                <label className="text-sm font-bold text-gray-900 block mb-2">作業メモ</label>
                <textarea
                  ref={memoRef}
                  value={memo} onChange={e => setMemo(e.target.value)}
                  placeholder="考えをメモしておこう..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors"
                />
              </GuideRing>

              <GuideRing active={guideTarget === 'answer'} label="課題の①〜④に答えよう" radius="12px">
                <label className="text-sm font-bold text-gray-900 block mb-2">提出内容 <span className="text-red-400">*</span></label>
                <textarea
                  ref={answerRef}
                  value={answer} onChange={e => setAnswer(e.target.value)}
                  placeholder="ここに回答を入力してください..."
                  rows={9}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{answer.length} 文字</p>
              </GuideRing>
            </div>
          </section>

          <aside className="bg-white border border-gray-100 rounded-2xl p-4 h-fit shadow-sm">
            <p className="text-sm font-bold text-gray-900 mb-4">進捗</p>
            <div className="rounded-xl bg-gray-50 p-4 mb-4">
              <p className="text-2xl font-bold text-gray-900">{doneCount} / {tasks.length}</p>
              <p className="text-xs text-gray-500">タスク</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(doneCount / tasks.length) * 100}%`, background: m.color }} />
              </div>
              <p className="text-xs font-bold mt-2" style={{ color: m.color }}>{doneCount === tasks.length ? '準備完了です。提出できます' : `あと${tasks.length - doneCount}ステップ`}</p>
            </div>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between"><span className="text-gray-500">残り目安</span><span className="font-bold text-gray-900">{m.duration}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">保存状態</span><span className="font-bold text-gray-900">{saved ? '保存しました' : '下書き'}</span></div>
            </div>
            <div className="space-y-2">
              <button onClick={save}
                className="w-full py-2.5 rounded-xl border border-[#6C5CE7] text-[#6C5CE7] text-sm font-bold transition-all"
                style={saved ? { background: '#EEF0FF' } : {}}>
                {saved ? '✓ 保存済み' : '保存する'}
              </button>
              <div ref={submitRef} className="pt-2">
                <GuideRing active={guideTarget === 'submit'} label="準備完了！提出しよう" radius="12px">
                  <button
                    onClick={submit}
                    disabled={answer.length < 10}
                    className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all"
                    style={{ background: answer.length >= 10 ? '#6C5CE7' : '#D1D5DB' }}>
                    {isDemo ? '提出して評価を見る' : '提出して振り返る'}
                  </button>
                </GuideRing>
              </div>
              {answer.length < 10 && <p className="text-xs text-gray-400 text-center">あと{10 - answer.length}文字で提出できます</p>}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
