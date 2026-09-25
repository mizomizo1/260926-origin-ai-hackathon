import { Screen } from '../App'
import { AppIcon } from '../components/AppIcon'

interface Props { navigate: (s: Screen) => void }

export default function RoleSelect({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex min-h-screen max-w-[1120px] flex-col justify-center px-6 py-12">
      <div className="mb-10">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] text-[#6C5CE7] flex items-center justify-center mb-4">
          <AppIcon name="compass" className="h-5 w-5" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6C5CE7]">Choose Role</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">利用する立場を選んでください</h1>
        <p className="text-base text-gray-500 mt-3">このデモでは学生側と企業側の両方の流れを確認できます。</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <button
          onClick={() => navigate('studentLogin')}
          className="min-h-[300px] w-full rounded-3xl p-8 text-left transition-all hover:-translate-y-1 active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', boxShadow: '0 8px 24px rgba(108,92,231,0.3)' }}
        >
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white">
            <AppIcon name="school" className="h-8 w-8" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">学生として使う</h3>
          <p className="text-base leading-7 text-white/80">仕事体験を通じて自分に合うキャリアを探す</p>
          <div className="mt-8 flex gap-2 flex-wrap">
            {['A/B選択', 'Job Trial', 'キャリアパスポート'].map(t => (
              <span key={t} className="text-xs bg-white/20 text-white rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        </button>

        <button
          onClick={() => navigate('companyLogin')}
          className="min-h-[300px] w-full rounded-3xl p-8 text-left transition-all hover:-translate-y-1 active:scale-[0.99]"
          style={{ background: 'linear-gradient(135deg, #1A1A2E, #0F3460)', boxShadow: '0 8px 24px rgba(26,26,46,0.3)' }}
        >
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white">
            <AppIcon name="buildings" className="h-8 w-8" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">企業として使う</h3>
          <p className="text-base leading-7 text-white/80">Missionを作成し、適性の高い学生を見つける</p>
          <div className="mt-8 flex gap-2 flex-wrap">
            {['Mission作成', '学生分析', 'スカウト'].map(t => (
              <span key={t} className="text-xs bg-white/20 text-white rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        ハッカソンデモ版 · すべてモックデータ
      </p>
      </main>
    </div>
  )
}
