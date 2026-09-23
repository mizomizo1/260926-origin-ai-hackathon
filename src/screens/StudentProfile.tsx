import { Screen } from '../App'
import { mockStudent, preferenceLabels, passportData } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen) => void }

export default function StudentProfile({ navigate }: Props) {
  const radarSize = 220
  const center = radarSize / 2
  const maxRadius = 72
  const axes = preferenceLabels.map(({ key, label, icon }, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / preferenceLabels.length
    const value = (mockStudent.preferenceScores as any)[key] as number
    return {
      key,
      label,
      icon,
      value,
      angle,
      point: {
        x: center + Math.cos(angle) * maxRadius * (value / 100),
        y: center + Math.sin(angle) * maxRadius * (value / 100),
      },
      labelPoint: {
        x: center + Math.cos(angle) * (maxRadius + 27),
        y: center + Math.sin(angle) * (maxRadius + 27),
      },
    }
  })
  const polygonPoints = axes.map(axis => `${axis.point.x},${axis.point.y}`).join(' ')
  const gridLevels = [0.33, 0.66, 1]
  const topValues = [...axes].sort((a, b) => b.value - a.value).slice(0, 3)

  return (
    <div className="flex flex-col min-h-[780px] bg-[#F7F6FF]">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#6C5CE7] text-white text-3xl font-bold flex items-center justify-center mx-auto mb-3">
          美
        </div>
        <h2 className="text-xl font-bold text-gray-900">{mockStudent.name}</h2>
        <p className="text-sm text-gray-500">{mockStudent.schoolYear} · {mockStudent.faculty}</p>
        <div className="flex gap-2 justify-center mt-3 flex-wrap">
          {mockStudent.interests.map(i => (
            <span key={i} className="chip bg-[#EEF0FF] text-[#6C5CE7]">{i}</span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-5 py-4 space-y-4">
        {/* Value summary */}
        <div className="bg-white rounded-3xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">価値観サマリ</h3>
          <div className="flex justify-center">
            <svg width={radarSize} height={radarSize} viewBox={`0 0 ${radarSize} ${radarSize}`} role="img" aria-label="価値観サマリ">
              {gridLevels.map(level => (
                <polygon
                  key={level}
                  points={axes.map(axis => `${center + Math.cos(axis.angle) * maxRadius * level},${center + Math.sin(axis.angle) * maxRadius * level}`).join(' ')}
                  className="radar-axis"
                />
              ))}
              {axes.map(axis => (
                <line
                  key={axis.key}
                  x1={center}
                  y1={center}
                  x2={center + Math.cos(axis.angle) * maxRadius}
                  y2={center + Math.sin(axis.angle) * maxRadius}
                  className="radar-axis"
                />
              ))}
              <polygon points={polygonPoints} className="radar-polygon" />
              {axes.map(axis => (
                <g key={axis.key}>
                  <circle cx={axis.point.x} cy={axis.point.y} r="3.5" fill="#6C5CE7" />
                  <text
                    x={axis.labelPoint.x}
                    y={axis.labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-gray-600 text-[10px] font-semibold"
                  >
                    {axis.icon} {axis.label.split('・')[0]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {topValues.map(axis => (
              <div key={axis.key} className="bg-[#F7F6FF] rounded-2xl p-2 text-center">
                <p className="text-sm font-bold text-[#6C5CE7]">{axis.value}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 truncate">{axis.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Passport summary */}
        <div className="bg-white rounded-3xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-gray-900">体験記録</h3>
            <span className="text-xs text-gray-400">Career Passport</span>
          </div>
          <div className="flex gap-3">
            {[
              { label: 'Mission', value: `${passportData.completedMissions}個` },
              { label: '得意', value: '企画・チーム' },
              { label: '平均満足度', value: '4.4 ⭐' },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 bg-[#F7F6FF] rounded-2xl p-3 text-center">
                <p className="text-sm font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience log */}
        <div className="bg-white rounded-3xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">最近のログ</h3>
          <div className="space-y-3">
            {passportData.experiences.slice(0, 3).map(exp => (
              <div key={exp.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-xl flex-shrink-0">
                  {exp.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{exp.mission}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{exp.company} · {exp.date}</p>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-xs text-[#F59E0B] font-bold">満足度 {exp.satisfaction}</span>
                    <span className="text-xs text-[#6C5CE7] font-bold">意欲 {exp.willingness}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-3xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">設定</h3>
          <div className="space-y-1">
            {['プロフィール編集', '通知設定', 'プライバシー', 'ヘルプ', 'ログアウト'].map(item => (
              <div key={item} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{item}</span>
                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => navigate('splash')} className="w-full text-center text-xs text-gray-400 py-2">
          ← トップに戻る
        </button>
      </div>

      <BottomNav current="profile" navigate={navigate} />
    </div>
  )
}
