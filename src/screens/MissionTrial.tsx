import { useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void; missionId?: string }

export default function MissionTrial({ navigate, missionId }: Props) {
  const m = missions.find(x => x.id === missionId) ?? missions[0]
  const [answer, setAnswer] = useState('')
  const [memo, setMemo] = useState('')
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const tasks = ['課題確認', '調査', '分析', '提案', '提出']

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="explore" navigate={navigate} />

      <main className="mx-auto max-w-[1200px] px-6 py-6">
        <button onClick={() => navigate('missionDetail', { missionId: m.id })} className="text-gray-500 text-sm mb-5 block">← Trialの詳細</button>

        <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr_260px] gap-5">
          <aside className="bg-white border border-gray-100 rounded-2xl p-4 h-fit shadow-sm">
            <p className="text-sm font-bold text-gray-900 mb-4">進め方</p>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <button key={task} className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left ${index <= 2 ? 'bg-[#EEF0FF] text-[#6C5CE7]' : 'text-gray-500 hover:bg-gray-50'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index <= 2 ? 'bg-[#6C5CE7] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{task}</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ background: m.color + '18' }}>{m.emoji}</div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['背景メモ', '参考データ', '提出例'].map(card => (
                    <div key={card} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                      <div className="text-xl mb-2">📄</div>
                      <p className="text-sm font-bold text-gray-700">{card}</p>
                      <p className="text-xs text-gray-400 mt-1">確認用資料</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-900 block mb-2">作業メモ</label>
                <textarea
                  value={memo} onChange={e => setMemo(e.target.value)}
                  placeholder="考えをメモしておこう..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-900 block mb-2">提出内容 <span className="text-red-400">*</span></label>
                <textarea
                  value={answer} onChange={e => setAnswer(e.target.value)}
                  placeholder="ここに回答を入力してください..."
                  rows={9}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{answer.length} 文字</p>
              </div>
            </div>
          </section>

          <aside className="bg-white border border-gray-100 rounded-2xl p-4 h-fit shadow-sm">
            <p className="text-sm font-bold text-gray-900 mb-4">進捗</p>
            <div className="rounded-xl bg-gray-50 p-4 mb-4">
              <p className="text-2xl font-bold text-gray-900">3 / 5</p>
              <p className="text-xs text-gray-500">タスク</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                <div className="h-full w-3/5 rounded-full" style={{ background: m.color }} />
              </div>
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
              <button
                onClick={() => navigate('reflection', { missionId: m.id })}
                disabled={answer.length < 10}
                className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all"
                style={{ background: answer.length >= 10 ? '#6C5CE7' : '#D1D5DB' }}>
                提出して振り返る
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
