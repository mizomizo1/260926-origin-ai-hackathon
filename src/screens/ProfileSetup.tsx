import { useState } from 'react'
import { Screen } from '../App'
import { AppIcon } from '../components/AppIcon'

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
    <div className="min-h-screen bg-white px-6 py-10">
      <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1120px] grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>プロフィール設定 · あと2ステップ(約1分)</span><span>1/2</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-full rounded-full bg-[#6C5CE7] transition-all" style={{ width: `${progress}%` }} />
        </div>

      <div className="mt-10 mb-6">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6C5CE7]">
          <AppIcon name="write" className="h-5 w-5" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">基本情報を教えてください</h1>
        <p className="text-base leading-8 text-gray-500 mt-3">入力済みの内容のままで進めます。後から変更できます。</p>
      </div>
      </section>

      <section className="rounded-3xl border border-gray-100 bg-[#F7F8FB] p-7 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
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
      <button onClick={() => navigate('abQuestion')} className="text-center text-sm text-gray-400 mt-3 py-2">あとで設定する</button>
      </section>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1120px] grid-cols-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>プロフィール設定 · あと1ステップで完了</span><span>2/2</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-full rounded-full bg-[#6C5CE7]" style={{ width: '100%' }} />
        </div>

      <div className="mt-10 mb-6">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6C5CE7]">
          <AppIcon name="target" className="h-5 w-5" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">興味のある職種を選んでください</h1>
        <p className="text-base text-gray-500 mt-3">複数選択可 · {interests.length}個選択中</p>
      </div>
      </section>

      <section className="rounded-3xl border border-gray-100 bg-[#F7F8FB] p-7 shadow-sm">
      <div className="flex flex-wrap gap-3 content-start">
        {interestOptions.map(i => (
          <button
            key={i}
            onClick={() => toggleInterest(i)}
            className="px-5 py-3 rounded-full text-sm font-medium transition-all border-2"
            style={interests.includes(i)
              ? { background: '#6C5CE7', color: 'white', borderColor: '#6C5CE7' }
              : { background: 'white', color: '#374151', borderColor: '#E5E7EB' }
            }
          >
            {i}
          </button>
        ))}
      </div>

      <button onClick={() => navigate('abQuestion')} className="primary-btn mt-6">次へ</button>
      </section>
      </main>
    </div>
  )
}
