import { Screen } from '../App'
import { mockStudent, preferenceLabels, passportData } from '../data/mock'
import BottomNav from '../components/BottomNav'

interface Props { navigate: (s: Screen) => void }

export default function StudentProfile({ navigate }: Props) {
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
          <div className="space-y-2">
            {preferenceLabels.map(({ key, label, icon }) => {
              const val = (mockStudent.preferenceScores as any)[key]
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-sm w-16 text-gray-600">{icon} {label.split('・')[0]}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: '#6C5CE7' }} />
                  </div>
                  <span className="text-xs font-mono text-gray-500 w-6">{val}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Passport summary */}
        <div className="bg-white rounded-3xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Passport概要</h3>
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
