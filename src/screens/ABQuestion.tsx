import { useState } from 'react'
import { Screen } from '../App'
import { abQuestions } from '../data/mock'
import { AppIcon } from '../components/AppIcon'

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
    <div className="min-h-screen bg-white px-6 py-8">
      <main className="mx-auto max-w-[1040px]">
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
        <p className="text-xs text-gray-400 mt-2 text-right">
          {questionIndex < abQuestions.length - 1 ? `あと${abQuestions.length - questionIndex - 1}問で結果が見られます` : 'これが最後の質問です'}
        </p>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <p className="text-xs font-medium text-[#6C5CE7] mb-2 uppercase tracking-wider">Q{questionIndex + 1}</p>
        <h1 className="text-3xl font-bold text-gray-900">{q.question}</h1>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {(['a', 'b'] as const).map(choice => {
          const card = q[choice]
          const isSelected = selected === choice
          const color = choice === 'a' ? '#6C5CE7' : '#00B894'
          const bg = choice === 'a' ? '#EEF0FF' : '#ECFDF7'
          return (
            <button
              key={choice}
              onClick={() => choose(choice)}
              disabled={selected !== null}
              className="group min-h-[360px] w-full rounded-3xl p-6 text-center transition-all duration-200 active:scale-[0.98] disabled:cursor-default"
              style={{
                border: isSelected ? `2.5px solid ${color}` : '2px solid #E8E6F5',
                background: isSelected ? bg : 'white',
                transform: isSelected ? 'scale(0.98)' : 'scale(1)',
                boxShadow: isSelected ? `0 14px 30px ${color}24` : '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-sm" style={{ background: color }}>
                {choice.toUpperCase()}
              </div>

              <ul className="mt-6 space-y-3">
                {card.points.map((pt, i) => (
                  <li key={i} className="rounded-2xl bg-[#F7F8FB] px-4 py-3 text-base font-medium leading-relaxed text-gray-700">
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-center">
                {isSelected ? (
                  <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white" style={{ background: color }}>
                    <AppIcon name="check" className="h-3.5 w-3.5" />
                    選択しました
                  </span>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>
      </main>
    </div>
  )
}
