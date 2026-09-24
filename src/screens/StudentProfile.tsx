import { Screen } from '../App'
import { companies, mockStudent, preferenceLabels, passportData, profileViews, scoutInvitations } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'

interface Props { navigate: (s: Screen) => void }

export default function StudentProfile({ navigate }: Props) {
  const valueItems = preferenceLabels.map(({ key, label, shortLabel, icon }) => {
    const value = (mockStudent.preferenceScores as any)[key] as number
    return {
      key,
      label,
      shortLabel,
      icon,
      value,
    }
  })
  const sortedValues = [...valueItems].sort((a, b) => b.value - a.value)
  const [topValue, secondValue] = sortedValues
  const typeTitle = (() => {
    if (topValue.key === 'people_culture') return secondValue.key === 'growth' ? '人と関わりながら伸びるタイプ' : 'チームの空気を大切にするタイプ'
    if (topValue.key === 'growth') return '学びながら可能性を広げるタイプ'
    if (topValue.key === 'meaning') return '誰かの役に立つ実感で動けるタイプ'
    if (topValue.key === 'autonomy') return '自分で考えて形にするタイプ'
    if (topValue.key === 'work_life') return '無理なく続けられる環境を選ぶタイプ'
    return '安心できる土台を大切にするタイプ'
  })()
  const typeDescription = '人との相性や学べる環境を見ながら、小さく仕事を試すと選びやすそうです。'
  const analysisEvidence = [
    'チームで相談する選択が多い',
    '企画Missionの満足度が高い',
    '企業からも対話型の職種で反応あり',
  ]
  const weeklyGoal = 3
  const weeklyDone = 2
  const weeklyPct = Math.round((weeklyDone / weeklyGoal) * 100)
  const circleRadius = 38
  const circumference = 2 * Math.PI * circleRadius
  const enrichedViews = profileViews.map(view => ({
    ...view,
    company: companies.find(company => company.id === view.companyId) ?? companies[0],
  }))

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="profile" navigate={navigate} />
      {/* Header */}
      <div className="bg-[#17152B] text-white">
        <div className="mx-auto max-w-[1200px] px-6 py-8 flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-[#6C5CE7] text-white text-3xl font-bold flex items-center justify-center shrink-0 ring-4 ring-white/10">
          美
        </div>
        <div>
        <p className="text-xs font-bold text-[#A29BFE] mb-1">YOUR PROFILE</p>
        <h1 className="text-2xl font-bold">{mockStudent.name}</h1>
        <p className="text-sm text-white/55 mt-1">{mockStudent.schoolYear} · {mockStudent.faculty}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {mockStudent.interests.map(i => (
            <span key={i} className="chip bg-white/10 text-white/80">{i}</span>
          ))}
        </div>
        </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Value summary */}
        <div className="bg-white rounded-3xl p-6 card-shadow lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div><p className="text-xs font-bold text-[#6C5CE7]">YOUR HYPOTHESIS</p><h3 className="text-xl font-bold text-gray-900 mt-1">価値観サマリ</h3></div>
            <span className="text-[11px] font-bold text-[#6C5CE7] bg-[#EEF0FF] rounded-full px-2.5 py-1">更新中</span>
          </div>

          <div className="rounded-3xl bg-[#F7F6FF] p-5 border-l-4 border-[#6C5CE7] mt-5">
            <p className="text-xs font-bold text-[#6C5CE7] mb-2">現在の仮説</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">{typeTitle}</p>
            <p className="text-xs text-gray-600 leading-relaxed mt-2">{typeDescription}</p>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <p className="text-xs font-bold text-gray-500 mb-2">そう見ている理由</p>
            <div className="space-y-2 md:col-span-2">
              {analysisEvidence.map(item => (
                <div key={item} className="flex items-center gap-2 rounded-2xl bg-white border border-gray-100 px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] flex-shrink-0" />
                  <span className="text-xs font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-[#EEF0FF] px-4 py-3 md:col-span-2">
            <p className="text-[11px] font-bold text-[#6C5CE7] mb-1">次に確かめること</p>
            <p className="text-xs text-gray-700 leading-relaxed">人と話しながら企画を作るMissionで、楽しさが続くかを見る。</p>
          </div>
        </div>

        {/* Company signals */}
        <div className="bg-white rounded-3xl p-3.5 card-shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">企業からの反応</h3>
            <span className="text-xs text-gray-400">直近</span>
          </div>

          <div className="rounded-2xl bg-[#FDF2F8] p-3 mb-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg flex-shrink-0">💌</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-[#EC4899]">スカウト {scoutInvitations.length}件</p>
                  <span className="text-[11px] text-gray-400">{scoutInvitations[0].receivedAt}</span>
                </div>
                <p className="text-sm font-bold text-gray-900 mt-0.5 truncate">{scoutInvitations[0].companyName} · {scoutInvitations[0].role}</p>
                <p className="text-xs text-gray-600 leading-relaxed mt-1 line-clamp-2">{scoutInvitations[0].signal}がきっかけです。</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 mb-2">あなたをチェックした会社</p>
            <div className="space-y-2">
              {enrichedViews.map(view => (
                <div key={view.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: view.company.color + '18' }}>
                    {view.company.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{view.companyName}</p>
                    <p className="text-[11px] text-gray-400 truncate">{view.reason}</p>
                  </div>
                  <span className="text-[11px] text-gray-400">{view.viewedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Passport summary */}
        <div className="bg-white rounded-3xl p-3.5 card-shadow">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-gray-900">体験記録</h3>
            <span className="text-xs text-gray-400">Career Passport</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
                <circle cx="48" cy="48" r={circleRadius} stroke="#EEF0FF" strokeWidth="10" fill="none" />
                <circle
                  cx="48"
                  cy="48"
                  r={circleRadius}
                  stroke="#6C5CE7"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - weeklyDone / weeklyGoal)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-gray-900">{weeklyDone}/{weeklyGoal}</p>
                <p className="text-[10px] text-gray-500">今週</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-gray-900">今週はあと1つで目標達成</p>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">小さく試すほど、企業候補と価値観サマリが具体的になります。</p>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  { label: '累計', value: `${passportData.completedMissions}` },
                  { label: '満足度', value: '4.4' },
                  { label: '進捗', value: `${weeklyPct}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F7F6FF] rounded-2xl p-2 text-center">
                    <p className="text-sm font-bold text-[#6C5CE7]">{value}</p>
                    <p className="text-[10px] text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience log */}
        <div className="bg-white/70 rounded-3xl p-4">
          <h3 className="text-xs font-bold text-gray-500 mb-3">最近のログ</h3>
          <div className="space-y-2">
            {passportData.experiences.slice(0, 3).map(exp => (
              <div key={exp.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm flex-shrink-0">
                  {exp.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate">{exp.mission}</p>
                  <p className="text-[11px] text-gray-400">{exp.date}</p>
                </div>
                <span className="text-[11px] text-[#F59E0B] font-bold">{exp.satisfaction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white/70 rounded-3xl p-4">
          <h3 className="text-xs font-bold text-gray-500 mb-2">設定</h3>
          <div className="space-y-1">
            {['プロフィール編集', '通知設定', 'ヘルプ'].map(item => (
              <div key={item} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-600">{item}</span>
                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => navigate('splash')} className="w-full text-center text-xs text-gray-400 py-2 lg:col-span-2">
          ← トップに戻る
        </button>
      </main>
    </div>
  )
}
