import { useState } from 'react'
import { Screen } from '../../App'

interface Props { navigate: (s: Screen) => void }

export default function CompanyLogin({ navigate }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)' }}>
      {/* Left */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6C5CE7] flex items-center justify-center text-xl">🧭</div>
          <span className="text-white text-lg font-bold">Career Compass</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            仕事体験を通じて、<br />
            <span style={{ color: '#A29BFE' }}>採用を再定義する。</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-xs">
            Missionを通じて、本当に仕事に興味のある学生を見つけましょう。
          </p>
          <div className="flex gap-4 mt-8">
            {[{ label: '登録企業数', value: '120+' }, { label: '学生体験数', value: '3,200+' }, { label: '平均マッチ率', value: '68%' }].map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-white/50 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/30 text-xs">© 2025 Career Compass Trial · Hackathon Edition</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">企業ログイン</h2>
            <p className="text-sm text-gray-500 mt-1">採用ダッシュボードにアクセス</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">メールアドレス</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="company@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">パスワード</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors"
              />
            </div>
            <button onClick={() => navigate('companyDashboard')}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm"
              style={{ background: '#6C5CE7' }}>
              ログイン
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button onClick={() => navigate('companyDashboard')}
              className="w-full py-3 rounded-xl text-sm font-medium text-gray-600 border-2 border-gray-100 hover:bg-gray-50 transition-colors">
              🎯 デモ企業で入る
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            <button onClick={() => navigate('roleSelect')} className="text-[#6C5CE7]">← 学生として使う</button>
          </p>
        </div>
      </div>
    </div>
  )
}
