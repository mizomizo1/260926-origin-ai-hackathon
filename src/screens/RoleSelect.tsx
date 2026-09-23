import { Screen } from '../App'

interface Props { navigate: (s: Screen) => void }

export default function RoleSelect({ navigate }: Props) {
  return (
    <div className="flex flex-col min-h-[780px] bg-white px-6 py-10">
      <div className="mb-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-2xl mx-auto mb-4">🧭</div>
        <h2 className="text-2xl font-bold text-gray-900">あなたはどちらですか？</h2>
        <p className="text-sm text-gray-500 mt-2">利用目的に合わせて選んでください</p>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <button
          onClick={() => navigate('studentLogin')}
          className="w-full rounded-3xl p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', boxShadow: '0 8px 24px rgba(108,92,231,0.3)' }}
        >
          <div className="text-4xl mb-3">🎓</div>
          <h3 className="text-xl font-bold text-white mb-1">学生として使う</h3>
          <p className="text-sm text-white/80">仕事体験を通じて自分に合うキャリアを探す</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            {['A/B選択', 'Job Trial', 'Career Passport'].map(t => (
              <span key={t} className="text-xs bg-white/20 text-white rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        </button>

        <button
          onClick={() => navigate('companyLogin')}
          className="w-full rounded-3xl p-6 text-left transition-all hover:scale-[1.02] active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #1A1A2E, #0F3460)', boxShadow: '0 8px 24px rgba(26,26,46,0.3)' }}
        >
          <div className="text-4xl mb-3">🏢</div>
          <h3 className="text-xl font-bold text-white mb-1">企業として使う</h3>
          <p className="text-sm text-white/80">Missionを作成し、適性の高い学生を見つける</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            {['Mission作成', '学生分析', 'スカウト'].map(t => (
              <span key={t} className="text-xs bg-white/20 text-white rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        ハッカソンデモ版 · すべてモックデータ
      </p>
    </div>
  )
}
