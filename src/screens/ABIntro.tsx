import { Screen } from '../App'

interface Props { navigate: (s: Screen) => void }

export default function ABIntro({ navigate }: Props) {
  return (
    <div className="flex flex-col min-h-[780px] bg-white px-6 py-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Visual */}
        <div className="relative mb-8">
          <div className="w-36 h-36 rounded-[40px] flex items-center justify-center mx-auto"
            style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', boxShadow: '0 16px 40px rgba(108,92,231,0.3)' }}>
            <span className="text-6xl">⚡</span>
          </div>
          {/* Decorative dots */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#F59E0B]" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-[#00B894]" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">まずは5問だけ</h2>
        <p className="text-base text-[#6C5CE7] font-medium mb-4">
          あなたが何を大切にしたいか、<br />選択から見つけます。
        </p>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
          AとBのカードを見て、今の自分に近い方を選ぶだけ。正解はありません。直感で選んでみてください。
        </p>

        {/* Info badges */}
        <div className="flex gap-3 mt-6">
          {[{ icon: '⏱️', text: '約1分' }, { icon: '❓', text: '5問' }, { icon: '✨', text: '正解なし' }].map(({ icon, text }) => (
            <div key={text} className="flex flex-col items-center gap-1 px-4 py-3 rounded-2xl bg-[#F7F6FF]">
              <span className="text-xl">{icon}</span>
              <span className="text-xs font-medium text-gray-700">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-4">
        <button onClick={() => navigate('abQuestion')} className="primary-btn">
          選択をはじめる
        </button>
      </div>
    </div>
  )
}
