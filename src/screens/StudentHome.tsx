import { Screen } from '../App'
import type { NavParams } from '../App'
import { missions, mockStudent, scoutInvitations } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

export default function StudentHome({ navigate }: Props) {
  const featured = missions.find(m => (m as any).source === 'core') ?? missions[0]
  const latestScout = scoutInvitations[0]

  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Career Compass</p>
            <h2 className="text-xl font-bold text-gray-900">{mockStudent.name}</h2>
          </div>
          <button onClick={() => navigate('studentProfile')}
            className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white text-sm font-bold flex items-center justify-center">
            美
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-4 space-y-3">
        <button
          onClick={() => navigate('missionDetail', { missionId: featured.id })}
          className="w-full text-left rounded-3xl overflow-hidden card-shadow bg-white"
        >
          <div className="p-4 relative overflow-hidden min-h-[172px]" style={{ background: featured.color + '14' }}>
            <div className="absolute -right-6 -bottom-7 text-7xl opacity-20">{featured.emoji}</div>
            <div className="relative">
              <div className="flex gap-2 mb-3">
                <span className="chip text-white" style={{ background: featured.color }}>基礎Mission</span>
                <span className="chip bg-white text-gray-600">{featured.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{featured.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{featured.company}</p>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed line-clamp-3">{featured.summary}</p>
            </div>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-gray-500">まずは一般的な力を見ます</p>
            <span className="px-3 py-1.5 rounded-full text-white text-xs font-bold flex-shrink-0" style={{ background: featured.color }}>試す</span>
          </div>
        </button>

        <button onClick={() => navigate('scoutInbox')}
          className="w-full bg-white rounded-3xl p-3.5 card-shadow text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDF2F8] flex items-center justify-center text-lg flex-shrink-0">
              💌
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">スカウトが届いています</p>
                <span className="text-[10px] font-bold text-white bg-[#EC4899] rounded-full px-2 py-0.5">{scoutInvitations.length}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{latestScout.companyName} · {latestScout.signal}</p>
            </div>
            <span className="text-gray-300 text-lg">›</span>
          </div>
        </button>
      </div>

      <BottomNav current="home" navigate={navigate} />
    </div>
  )
}
