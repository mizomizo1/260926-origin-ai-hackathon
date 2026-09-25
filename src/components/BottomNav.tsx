import { Screen } from '../App'
import { AppIcon, type AppIconName } from './AppIcon'

type NavItem = { icon: AppIconName; label: string; screen: Screen }
const items: NavItem[] = [
  { icon: 'home', label: 'Home', screen: 'studentHome' },
  { icon: 'target', label: 'Mission', screen: 'missionExplore' },
  { icon: 'buildings', label: 'Company', screen: 'companyMatch' },
  { icon: 'envelope', label: 'Scout', screen: 'scoutInbox' },
  { icon: 'person', label: 'Profile', screen: 'studentProfile' },
]

interface Props { current: string; navigate: (s: Screen) => void }

export default function BottomNav({ current, navigate }: Props) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 flex z-50"
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
      {items.map(({ icon, label, screen }) => {
        const isActive = current === label.toLowerCase()
        return (
          <button key={label} onClick={() => navigate(screen)} className={`bottom-nav-item flex-1 ${isActive ? 'active' : ''}`}>
            <AppIcon name={icon} className="h-5 w-5" />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
