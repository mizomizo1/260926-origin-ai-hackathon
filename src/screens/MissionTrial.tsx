import { useState } from 'react'
import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions } from '../data/mock'

interface Props { navigate: (s: Screen, p?: NavParams) => void; missionId?: string }

export default function MissionTrial({ navigate, missionId }: Props) {
  const m = missions.find(x => x.id === missionId) ?? missions[0]
  const [answer, setAnswer] = useState('')
  const [memo, setMemo] = useState('')
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="flex flex-col min-h-[780px] bg-white">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 border-b border-gray-100">
        <button onClick={() => navigate('missionDetail', { missionId: m.id })} className="text-gray-400 text-sm mb-3 block">← 戻る</button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
            style={{ background: m.color + '20' }}>{m.emoji}</div>
          <div>
            <p className="text-xs text-gray-500">{m.company}</p>
            <h2 className="text-base font-bold text-gray-900">{m.title}</h2>
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>体験中</span><span>⏱️ {m.duration}</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div className="h-full rounded-full w-1/3" style={{ background: m.color }} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-32 space-y-4">
        {/* Problem */}
        <div className="bg-[#F7F6FF] rounded-2xl p-4">
          <p className="text-xs font-medium text-[#6C5CE7] mb-2 uppercase tracking-wide">課題</p>
          <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">{m.problemStatement}</pre>
        </div>

        {/* Reference cards */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">参考情報</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {['ターゲット設定例', '競合製品リスト', 'SNS傾向データ'].map(card => (
              <div key={card} className="flex-shrink-0 w-36 bg-white rounded-2xl border border-gray-100 p-3 card-shadow">
                <div className="text-xl mb-2">📄</div>
                <p className="text-xs font-medium text-gray-700">{card}</p>
                <p className="text-xs text-[#6C5CE7] mt-1">タップして見る</p>
              </div>
            ))}
          </div>
        </div>

        {/* Memo */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-2">メモ（自由記入）</label>
          <textarea
            value={memo} onChange={e => setMemo(e.target.value)}
            placeholder="考えをメモしておこう..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors"
          />
        </div>

        {/* Answer */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-2">回答欄 <span className="text-red-400">*</span></label>
          <textarea
            value={answer} onChange={e => setAnswer(e.target.value)}
            placeholder="ここに回答を入力してください..."
            rows={6}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{answer.length} 文字</p>
        </div>
      </div>

      {/* Footer actions */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-5 py-4 flex gap-3">
        <button onClick={save}
          className="flex-1 py-3 rounded-2xl border-2 border-[#6C5CE7] text-[#6C5CE7] text-sm font-semibold transition-all"
          style={saved ? { background: '#EEF0FF' } : {}}>
          {saved ? '✓ 保存済み' : '保存する'}
        </button>
        <button
          onClick={() => navigate('reflection', { missionId: m.id })}
          disabled={answer.length < 10}
          className="flex-1 py-3 rounded-2xl text-white text-sm font-semibold transition-all"
          style={{ background: answer.length >= 10 ? '#6C5CE7' : '#D1D5DB' }}>
          提出する →
        </button>
      </div>
    </div>
  )
}
