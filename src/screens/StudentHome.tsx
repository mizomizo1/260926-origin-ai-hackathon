import { Screen } from '../App'
import type { NavParams } from '../App'
import { companies, missions, mockStudent } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

export default function StudentHome({ navigate }: Props) {
  const featured = missions[0]
  const topCompany = companies[0]

  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">おはようございます 👋</p>
            <h2 className="text-xl font-bold text-gray-900">{mockStudent.name}</h2>
          </div>
          <button onClick={() => navigate('studentProfile')}
            className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white text-sm font-bold flex items-center justify-center">
            美
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-4 space-y-4">
        {/* Primary next action */}
        <div>
          <button
            onClick={() => navigate('missionDetail', { missionId: featured.id })}
            className="w-full text-left rounded-[28px] overflow-hidden card-shadow bg-gray-900 text-white relative"
          >
            <div className="absolute inset-0 opacity-80" style={{ background: `linear-gradient(135deg, ${featured.color}, #111827)` }} />
            <div className="absolute -right-10 -top-10 text-[120px] opacity-20">{featured.emoji}</div>
            <div className="relative p-5 min-h-52 flex flex-col justify-end">
              <div className="flex gap-2 mb-3">
                <span className="text-[11px] bg-white/20 rounded-full px-2.5 py-1">今日のおすすめ</span>
                <span className="text-[11px] bg-white/20 rounded-full px-2.5 py-1">{featured.duration}</span>
              </div>
              <p className="text-2xl mb-2">{featured.emoji}</p>
              <h3 className="text-xl font-bold leading-tight">{featured.title}</h3>
              <p className="text-xs text-white/70 mt-1">{featured.company} · {featured.category}</p>
              <p className="text-xs text-white/80 mt-3 line-clamp-2">{featured.summary}</p>
              <div className="mt-4 flex gap-2">
                <span className="bg-white text-gray-900 text-xs font-bold rounded-full px-4 py-2">試してみる</span>
                <span className="bg-white/15 text-white text-xs font-semibold rounded-full px-4 py-2">詳細</span>
              </div>
            </div>
          </button>
        </div>

        {/* Route cards */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate('missionExplore')}
            className="bg-white rounded-3xl p-4 card-shadow text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF0FF] text-xl flex items-center justify-center mb-3">🔍</div>
            <p className="text-sm font-bold text-gray-900">Missionを探す</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">職種別に試せる仕事を見る</p>
          </button>
          <button onClick={() => navigate('companyMatch')}
            className="bg-white rounded-3xl p-4 card-shadow text-left">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl mb-3"
              style={{ background: topCompany.color + '18' }}>
              {topCompany.emoji}
            </div>
            <p className="text-sm font-bold text-gray-900">企業を見る</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{topCompany.name} ほか</p>
          </button>
        </div>
      </div>

      <BottomNav current="home" navigate={navigate} />
    </div>
  )
}
