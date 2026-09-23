import { Screen } from '../App'
import type { NavParams } from '../App'
import { companies, missions, mockStudent, preferenceLabels } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen, p?: NavParams) => void }

export default function StudentHome({ navigate }: Props) {
  const featured = missions[0]
  const topCompany = companies[0]
  const topValues = [...preferenceLabels]
    .sort((a, b) => (mockStudent.preferenceScores as any)[b.key] - (mockStudent.preferenceScores as any)[a.key])
    .slice(0, 2)

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

      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-4 space-y-4">
        <div className="bg-white rounded-[28px] p-4 card-shadow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500">今の仮説</p>
              <p className="text-base font-bold text-gray-900 mt-0.5">人と話しながら考える仕事に向いているかも</p>
            </div>
            <button onClick={() => navigate('studentProfile')} className="text-xs text-[#6C5CE7] font-bold flex-shrink-0">詳しく</button>
          </div>
          <div className="flex gap-2 mt-3">
            {topValues.map(({ key, label, icon }) => (
              <span key={key} className="text-xs bg-[#EEF0FF] text-[#6C5CE7] rounded-full px-3 py-1">
                {icon} {label}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('missionDetail', { missionId: featured.id })}
          className="w-full text-left rounded-[28px] overflow-hidden card-shadow bg-white"
        >
          <div className="p-5 relative overflow-hidden" style={{ background: featured.color + '14' }}>
            <div className="absolute -right-8 -bottom-8 text-8xl opacity-20">{featured.emoji}</div>
            <div className="relative">
              <div className="flex gap-2 mb-3">
                <span className="chip text-white" style={{ background: featured.color }}>今日のおすすめ</span>
                <span className="chip bg-white text-gray-600">{featured.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{featured.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{featured.company}</p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed line-clamp-2">{featured.summary}</p>
            </div>
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">試すと、企業候補の精度が少し上がります</p>
            <span className="px-4 py-2 rounded-full text-white text-sm font-bold flex-shrink-0" style={{ background: featured.color }}>試す</span>
          </div>
        </button>

        <button onClick={() => navigate('companyMatch')}
          className="w-full bg-white rounded-3xl p-4 card-shadow text-left flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: topCompany.color + '18' }}>
            {topCompany.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900">企業候補が見つかっています</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{topCompany.name} ほか{companies.length - 1}社</p>
          </div>
          <span className="text-gray-300 text-lg">›</span>
        </button>
      </div>

      <BottomNav current="home" navigate={navigate} />
    </div>
  )
}
