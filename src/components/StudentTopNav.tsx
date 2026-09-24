import { Screen } from '../App'
import { mockStudent, scoutInvitations } from '../data/mock'
import { useDemoTrial } from '../state/demoTrial'
import GuideRing from './GuideRing'

interface Props {
  current: 'home' | 'explore' | 'passport' | 'companies' | 'scout' | 'profile'
  navigate: (s: Screen) => void
  spotlight?: 'companies' | 'scout'
}

const navItems: { key: Props['current']; label: string; screen: Screen }[] = [
  { key: 'home', label: 'ホーム', screen: 'studentHome' },
  { key: 'explore', label: 'Trialを探す', screen: 'missionExplore' },
  { key: 'passport', label: 'キャリアパスポート', screen: 'careerPassport' },
  { key: 'companies', label: '企業', screen: 'companyMatch' },
  { key: 'scout', label: 'スカウト', screen: 'scoutInbox' },
]

export default function StudentTopNav({ current, navigate, spotlight }: Props) {
  // 通知は Trial を提出して評価が届いた後に来る
  const { notified } = useDemoTrial()
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate('studentHome')} className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-[#6C5CE7] text-white flex items-center justify-center font-bold">CC</div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">Career Compass Trial</p>
            <p className="text-xs text-gray-400 leading-tight">仕事体験プラットフォーム</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const button = (
              <button
                onClick={() => navigate(item.screen)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${current === item.key ? 'bg-[#EEF0FF] text-[#6C5CE7]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {item.label}
              </button>
            )
            return (
              <div key={item.key}>
                {spotlight === item.key ? (
                  <GuideRing active label={item.key === 'companies' ? 'まずマッチ企業を確認' : '次にスカウトを確認'} radius="10px">
                    {button}
                  </GuideRing>
                ) : button}
              </div>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('scoutInbox')} className="relative w-9 h-9 rounded-full bg-gray-50 text-lg flex items-center justify-center">
            💌
            {notified && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#EC4899] text-white text-[10px] leading-4 font-bold">
                {scoutInvitations.length + 1}
              </span>
            )}
          </button>
          <button onClick={() => navigate('studentProfile')} className="flex items-center gap-2 rounded-full bg-gray-50 pl-2 pr-3 py-1.5">
            <span className="w-7 h-7 rounded-full bg-[#6C5CE7] text-white text-xs font-bold flex items-center justify-center">
              {mockStudent.name[0]}
            </span>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">{mockStudent.name}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
