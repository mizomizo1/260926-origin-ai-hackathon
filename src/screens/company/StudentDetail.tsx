import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyScoutPipeline, companyStudents, passportData, preferenceLabels } from '../../data/mock'
import { DataIcon } from '../../components/AppIcon'

interface Props { navigate: (s: Screen) => void; studentId?: string }

export default function StudentDetail({ navigate, studentId }: Props) {
  const student = companyStudents.find(item => item.id === studentId) ?? companyStudents[0]
  const scout = companyScoutPipeline.find(item => item.studentId === student.id)
  const values = preferenceLabels.map(label => ({
    ...label,
    value: (student.preferenceScores as any)[label.key] as number,
  })).sort((a, b) => b.value - a.value)
  const topValue = values[0]
  const experiences = passportData.experiences.slice(0, Math.min(student.missionCompleted, passportData.experiences.length))

  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="studentList" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <button onClick={() => navigate('studentList')} className="mb-5 text-sm font-bold text-gray-400 hover:text-gray-600">← 学生一覧</button>

        <section className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6C5CE7] text-2xl font-bold text-white">{student.name[0]}</span>
              <div>
                <p className="text-sm font-bold text-[#6C5CE7]">Student Analysis</p>
                <h1 className="mt-1 text-3xl font-bold text-gray-900">{student.name}</h1>
                <p className="mt-1 text-sm text-gray-500">{student.schoolYear} · {student.faculty}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 lg:w-[420px]">
              {[
                { label: '完了Trial', value: student.missionCompleted },
                { label: '満足度', value: student.satisfaction },
                { label: '興味度', value: student.interestLevel },
              ].map(item => (
                <div key={item.label} className="rounded-2xl bg-[#F7F8FB] px-3 py-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold text-[#6C5CE7]">価値観サマリ</p>
              <h2 className="mt-2 text-xl font-bold text-gray-900">{topValue.shortLabel}を重視する傾向</h2>
              <div className="mt-5 space-y-3">
                {values.slice(0, 4).map(item => (
                  <div key={item.key}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-700">{item.shortLabel}</span>
                      <span className="font-mono font-bold text-[#6C5CE7]">{item.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#EEF0FF]">
                      <div className="h-full rounded-full bg-[#6C5CE7]" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold text-[#EC4899]">Scout Reason</p>
              <h2 className="mt-2 text-xl font-bold text-gray-900">スカウト判断</h2>
              <div className="mt-4 rounded-2xl bg-[#FDF2F8] p-4">
                <p className="text-sm font-bold text-gray-900">{scout?.fitReason ?? `${student.fitTags.slice(0, 2).join('・')}が自社Missionに近い`}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">学生側には「企業がどこを見たか」として自然に伝わる情報です。</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(scout?.viewed ?? ['Mission履歴', '価値観サマリ']).map(item => (
                  <span key={item} className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-500">{item}</span>
                ))}
              </div>
              <button onClick={() => navigate('scoutCompose', { studentId: student.id })} className="mt-5 w-full rounded-xl bg-[#EC4899] py-3 text-sm font-bold text-white hover:bg-[#DB2777]">
                この学生にスカウトを作成
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold text-[#6C5CE7]">Trial Log</p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900">体験履歴と提出の手がかり</h2>
                </div>
                <span className="rounded-full bg-[#EEF0FF] px-2.5 py-1 text-xs font-bold text-[#6C5CE7]">{student.status}</span>
              </div>
              <div className="space-y-3">
                {experiences.map(exp => (
                  <div key={exp.id} className="rounded-2xl bg-[#F7F8FB] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#6C5CE7]">
                        <DataIcon value={exp.emoji} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900">{exp.mission}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{exp.company} · {exp.date}</p>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600">{exp.memo}</p>
                        <div className="mt-3 flex gap-2">
                          <span className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-[#F59E0B]">満足度 {exp.satisfaction}</span>
                          <span className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-[#6C5CE7]">継続 {exp.willingness}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}
