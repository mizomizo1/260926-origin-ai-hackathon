import { useState } from 'react'
import { Screen } from '../App'
import { abQuestions } from '../data/mock'

interface Props {
  navigate: (s: Screen) => void
  questionIndex: number
  answers: ('a' | 'b')[]
  setAnswers: (a: ('a' | 'b')[]) => void
  setQuestionIndex: (i: number) => void
}

export default function ABQuestion({ navigate, questionIndex, answers, setAnswers, setQuestionIndex }: Props) {
  const [selected, setSelected] = useState<'a' | 'b' | null>(null)
  const q = abQuestions[questionIndex]
  const progress = ((questionIndex) / abQuestions.length) * 100

  const choose = (choice: 'a' | 'b') => {
    if (selected) return
    setSelected(choice)
    setTimeout(() => {
      const newAnswers = [...answers, choice]
      setAnswers(newAnswers)
      setSelected(null)
      if (questionIndex < abQuestions.length - 1) {
        setQuestionIndex(questionIndex + 1)
      } else {
        navigate('preferenceResult')
      }
    }, 400)
  }

  return (
    <div className="flex flex-col min-h-[780px] bg-white px-5 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <button onClick={() => questionIndex > 0 ? setQuestionIndex(questionIndex - 1) : navigate('abIntro')}
            className="text-gray-400 text-sm">← 戻る</button>
          <span className="text-sm font-medium text-gray-500">{questionIndex + 1} / {abQuestions.length}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((questionIndex + 1) / abQuestions.length) * 100}%`, background: '#6C5CE7' }} />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <p className="text-xs font-medium text-[#6C5CE7] mb-2 uppercase tracking-wider">Q{questionIndex + 1}</p>
        <h3 className="text-lg font-bold text-gray-900">{q.question}</h3>
      </div>

      {/* Cards */}
      <div className="flex-1 flex flex-col gap-4">
        {(['a', 'b'] as const).map(choice => {
          const card = q[choice]
          const isSelected = selected === choice
          return (
            <button
              key={choice}
              onClick={() => choose(choice)}
              disabled={selected !== null}
              className="w-full rounded-3xl p-5 text-left transition-all duration-200 active:scale-[0.98]"
              style={{
                border: isSelected ? '2.5px solid #6C5CE7' : '2px solid #E8E6F5',
                background: isSelected ? '#EEF0FF' : 'white',
                transform: isSelected ? 'scale(0.98)' : 'scale(1)',
                boxShadow: isSelected ? '0 14px 30px rgba(108,92,231,0.18)' : '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: choice === 'a' ? '#6C5CE7' : '#00B894' }}>
                  {choice.toUpperCase()}
                </div>
                <span className="text-xs font-medium text-gray-400">{choice === 'a' ? 'タイプA' : 'タイプB'}</span>
                {isSelected && (
                  <span className="ml-auto text-xs font-bold text-[#6C5CE7]">選択中</span>
                )}
              </div>
              <ul className="space-y-2">
                {card.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#6C5CE7] mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </button>
          )
        })}

        <button
          onClick={() => choose(Math.random() > 0.5 ? 'a' : 'b')}
          disabled={selected !== null}
          className="text-center text-sm text-gray-400 py-2 active:scale-95 transition-transform disabled:opacity-50"
        >
          どちらも気になる（どちらかをランダム選択）
        </button>
      </div>
    </div>
  )
}
