import { useState } from 'react'
import { Screen } from '../App'
import { AppIcon } from '../components/AppIcon'

interface Props { navigate: (s: Screen) => void }

export default function StudentLogin({ navigate }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-[#F7F8FB] px-6 py-10">
      <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1120px] grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_420px]">
      <section>
        <button onClick={() => navigate('roleSelect')} className="text-left text-gray-400 mb-8 text-sm">← 戻る</button>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">Student Account</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">学生として始める</h1>
        <p className="mt-4 max-w-xl text-base leading-8 text-gray-600">ログインしても、ゲストとして体験しても大丈夫です。次にプロフィールとA/B選択へ進みます。</p>
        <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
          {['価値観を選ぶ', 'Trialを試す', '企業の反応を見る'].map((item, index) => (
            <div key={item} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <span className="text-xs font-bold text-[#6C5CE7]">0{index + 1}</span>
              <p className="mt-2 text-sm font-bold text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-gray-100 bg-white p-7 shadow-[0_24px_70px_rgba(31,41,55,0.10)]">
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#6C5CE7]">
          <AppIcon name="handshake" className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">ログイン / 登録</h2>
        <p className="text-sm text-gray-500 mt-1">アカウントで続けましょう</p>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">メールアドレス</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="student@university.ac.jp"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">パスワード</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors"
          />
        </div>

        <button
          onClick={() => navigate('profileSetup')}
          className="primary-btn mt-2"
        >
          ログイン / 登録
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">または</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <button
          onClick={() => navigate('profileSetup')}
          className="w-full py-3 rounded-2xl border-2 border-gray-100 text-sm font-medium text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <span className="text-xl">G</span> Googleで続ける
        </button>
      </div>

      <button
        onClick={() => navigate('profileSetup')}
        className="text-center text-sm text-[#6C5CE7] font-medium mt-6 py-2"
      >
        まずは体験してみる（ゲスト）→
      </button>
      </section>
      </main>
    </div>
  )
}
