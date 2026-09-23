import { useState } from 'react'
import { Screen } from '../App'

interface Props { navigate: (s: Screen) => void }

const interestOptions = ['商品企画', 'マーケティング', 'データ分析', '人事・採用', 'エンジニア', 'デザイン', '営業', 'コンサル', '経営企画', 'PR・広報']

export default function ProfileSetup({ navigate }: Props) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('佐藤 美咲')
  const [year, setYear] = useState('大学3年')
  const [faculty, setFaculty] = useState('経済学部')
  const [interests, setInterests] = useState<string[]>(['商品企画', 'マーケティング'])

  const toggleInterest = (i: string) => {
    setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  const progress = ((step + 1) / 2) * 100

  if (step === 0) return (
    <div className="flex flex-col min-h-[780px] bg-white px-6 py-8">
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>プロフィール設定</span><span>1/2</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-full rounded-full bg-[#6C5CE7] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-8 mb-6">
        <div className="text-3xl mb-2">📝</div>
        <h2 className="text-2xl font-bold text-gray-900">基本情報を教えてください</h2>
        <p className="text-sm text-gray-500 mt-1">後から変更できます</p>
      </div>

      <div className="space-y-4 flex-1">
        {[
          { label: '名前', value: name, onChange: setName, placeholder: '佐藤 美咲' },
          { label: '学年', value: year, onChange: setYear, placeholder: '大学3年' },
          { label: '学部', value: faculty, onChange: setFaculty, placeholder: '経済学部' },
        ].map(({ label, value, onChange, placeholder }) => (
          <div key={label}>
            <label className="text-sm font-medium text-gray-700 block mb-2">{label}</label>
            <input
              value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors"
            />
          </div>
        ))}
      </div>

      <button onClick={() => setStep(1)} className="primary-btn mt-6">次へ</button>
      <button onClick={() => navigate('abIntro')} className="text-center text-sm text-gray-400 mt-3 py-2">あとで設定する</button>
    </div>
  )

  return (
    <div className="flex flex-col min-h-[780px] bg-white px-6 py-8">
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>プロフィール設定</span><span>2/2</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-full rounded-full bg-[#6C5CE7]" style={{ width: '100%' }} />
        </div>
      </div>

      <div className="mt-8 mb-6">
        <div className="text-3xl mb-2">🎯</div>
        <h2 className="text-2xl font-bold text-gray-900">興味のある職種を選んでください</h2>
        <p className="text-sm text-gray-500 mt-1">複数選択可 · {interests.length}個選択中</p>
      </div>

      <div className="flex-1 flex flex-wrap gap-2 content-start">
        {interestOptions.map(i => (
          <button
            key={i}
            onClick={() => toggleInterest(i)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all border-2"
            style={interests.includes(i)
              ? { background: '#6C5CE7', color: 'white', borderColor: '#6C5CE7' }
              : { background: 'white', color: '#374151', borderColor: '#E5E7EB' }
            }
          >
            {i}
          </button>
        ))}
      </div>

      <button onClick={() => navigate('abIntro')} className="primary-btn mt-6">次へ</button>
    </div>
  )
}
