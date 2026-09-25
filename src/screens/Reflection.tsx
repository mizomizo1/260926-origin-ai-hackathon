import { useState } from 'react'
import { Screen } from '../App'
import { missions } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'
import { AppIcon, DataIcon } from '../components/AppIcon'

interface Props { navigate: (s: Screen) => void; missionId?: string }

const questions = [
  { id: 'enjoyment', label: '楽しかったですか？', emoji: '😄' },
  { id: 'willingness', label: 'もっとやってみたいですか？', emoji: '🔥' },
  { id: 'fit', label: '自分に合っていると感じましたか？', emoji: '🎯' },
  { id: 'difficulty', label: '難しかったですか？', emoji: '🧠' },
]

export default function Reflection({ navigate, missionId }: Props) {
  const m = missions.find(x => x.id === missionId) ?? missions[0]
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [style, setStyle] = useState<'solo' | 'team' | null>(null)
  const [comment, setComment] = useState('')

  const setRating = (id: string, val: number) => setRatings(prev => ({ ...prev, [id]: val }))
  const canSubmit = questions.every(q => ratings[q.id]) && style

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="explore" navigate={navigate} />
      <main className="mx-auto max-w-[760px] px-6 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
      <div className="mb-6">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6C5CE7]">
          <AppIcon name="chat" className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">体験の振り返り</h2>
        <p className="text-sm text-gray-500 mt-1">「{m.title}」を終えて</p>
        <p className="text-xs font-bold text-[#6C5CE7] mt-3">振り返りを送ると、この体験がキャリアパスポートに記録され、キャリア地図が更新されます。</p>
      </div>

      <div className="space-y-6">
        {questions.map(q => (
          <div key={q.id}>
            <p className="text-sm font-medium text-gray-800 mb-2">
              <span className="inline-flex items-center gap-1.5"><DataIcon value={q.emoji} className="h-4 w-4 text-[#6C5CE7]" /> {q.label}</span>
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(v => (
                <button key={v} onClick={() => setRating(q.id, v)}
                  className="flex-1 py-2.5 rounded-2xl text-sm font-semibold transition-all"
                  style={ratings[q.id] === v
                    ? { background: '#6C5CE7', color: 'white' }
                    : { background: '#F3F4F6', color: '#9CA3AF' }
                  }>
                  {v}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
              <span>全くない</span><span>とても</span>
            </div>
          </div>
        ))}

        {/* Work style */}
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-800"><AppIcon name="handshake" className="h-4 w-4 text-[#6C5CE7]" /> どちらが合っていた？</p>
          <div className="flex gap-3">
            {[{ id: 'solo' as const, label: '一人作業', emoji: '🧑‍💻' }, { id: 'team' as const, label: 'チーム作業', emoji: '👥' }].map(({ id, label, emoji }) => (
              <button key={id} onClick={() => setStyle(id)}
                className="flex-1 py-3 rounded-2xl border-2 text-sm font-medium transition-all"
                style={style === id
                  ? { borderColor: '#6C5CE7', background: '#EEF0FF', color: '#6C5CE7' }
                  : { borderColor: '#E5E7EB', color: '#6B7280' }
                }>
                <span className="inline-flex items-center justify-center gap-1.5"><DataIcon value={emoji} className="h-4 w-4" /> {label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-800"><AppIcon name="write" className="h-4 w-4 text-[#6C5CE7]" /> 一言感想（任意）</p>
          <textarea
            value={comment} onChange={e => setComment(e.target.value)}
            placeholder="感じたことを書いてみよう..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => navigate('updatedResult')}
          disabled={!canSubmit}
          className="primary-btn"
          style={{ background: canSubmit ? '#6C5CE7' : '#D1D5DB' }}>
          振り返りを送信する
        </button>
        {!canSubmit && <p className="text-xs text-gray-400 text-center mt-2">あと{questions.filter(q => !ratings[q.id]).length + (style ? 0 : 1)}項目で送信できます</p>}
      </div>
      </div>
      </main>
    </div>
  )
}
