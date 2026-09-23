import { useState } from 'react'
import { Screen } from '../App'

interface Props { navigate: (s: Screen) => void }

export default function StudentLogin({ navigate }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex flex-col min-h-[780px] bg-white px-6 py-8">
      <button onClick={() => navigate('roleSelect')} className="text-left text-gray-400 mb-6 text-sm">← 戻る</button>

      <div className="mb-8">
        <div className="text-4xl mb-3">👋</div>
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
    </div>
  )
}
