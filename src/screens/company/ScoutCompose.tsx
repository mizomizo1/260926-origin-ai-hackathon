import { useState } from 'react'
import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'
import { companyScoutPipeline, companyStudents } from '../../data/mock'

interface Props { navigate: (s: Screen, p?: { studentId?: string }) => void; studentId?: string }

export default function ScoutCompose({ navigate, studentId }: Props) {
  const student = companyStudents.find(item => item.id === studentId) ?? companyStudents[0]
  const scout = companyScoutPipeline.find(item => item.studentId === student.id)
  const [sent, setSent] = useState(false)
  const [subject, setSubject] = useState(`株式会社Lumoから、${student.name}さんへ`)
  const [message, setMessage] = useState(`${student.name}さん\n\nはじめまして。株式会社Lumoで採用を担当している田中です。\n\n${scout?.fitReason ?? `${student.fitTags.slice(0, 2).join('・')}への取り組み`}を拝見し、弊社のMissionと相性がよさそうだと感じてご連絡しました。\n\nまずは、実際の仕事を体験できるオンラインMissionについて、気軽にお話しできればと思っています。\nご都合のよいタイミングで、ぜひ一度ご返信ください。\n\n株式会社Lumo\n採用担当 田中`)

  if (sent) {
    return (
      <div className="flex min-h-screen bg-[#F7F8FB]">
        <CompanySidebar current="companyScouts" navigate={navigate} />
        <main className="flex flex-1 items-center justify-center px-6 py-12">
          <section className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8FBF5] text-2xl text-[#00B894]">✓</div>
            <p className="mt-5 text-xs font-bold text-[#00B894]">SCOUT SENT</p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{student.name}さんへ送信しました</h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">スカウト内容は学生側の受信箱に届きます。送信後の反応はスカウト管理から確認できます。</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => navigate('companyScouts')} className="flex-1 rounded-xl bg-[#17152B] px-4 py-3 text-sm font-bold text-white">スカウト管理へ</button>
              <button onClick={() => navigate('studentList')} className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700">学生一覧へ</button>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="companyScouts" navigate={navigate} />
      <main className="flex-1 overflow-y-auto px-8 py-8">
        <button onClick={() => navigate('studentDetail', { studentId: student.id })} className="mb-5 text-sm font-bold text-gray-400 hover:text-gray-600">← {student.name}さんの分析に戻る</button>
        <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <p className="text-sm font-bold text-[#EC4899]">スカウト作成</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">{student.name}さんへ声をかける</h1>
            <p className="mt-2 text-sm text-gray-500">内容を確認して、そのまま送信できます。</p>
          </div>
          <span className="hidden rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-500 sm:inline-flex">1 / 2 内容確認</span>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17152B] text-sm font-bold text-white">{student.name[0]}</span>
              <div>
                <p className="font-bold text-gray-900">{student.name}</p>
                <p className="text-xs text-gray-500">{student.schoolYear} · {student.faculty}</p>
              </div>
            </div>
            <label className="block text-xs font-bold text-gray-700">件名</label>
            <input value={subject} onChange={event => setSubject(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#EC4899]" />
            <label className="mt-5 block text-xs font-bold text-gray-700">メッセージ</label>
            <textarea value={message} onChange={event => setMessage(event.target.value)} rows={15} className="mt-2 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-relaxed outline-none focus:border-[#EC4899]" />
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => navigate('companyScouts')} className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600">下書きに戻す</button>
              <button onClick={() => setSent(true)} className="rounded-xl bg-[#EC4899] px-5 py-3 text-sm font-bold text-white hover:bg-[#DB2777]">内容を確認して送信</button>
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold text-[#6C5CE7]">SEND CHECK</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900">この学生に声をかける理由</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{scout?.fitReason ?? `${student.fitTags.slice(0, 2).join('・')}が自社Missionに近い`}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {student.fitTags.slice(0, 4).map(tag => <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-500">{tag}</span>)}
            </div>
            <div className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <p className="font-bold text-gray-700">送信前に確認</p>
              <p className="mt-2 leading-relaxed">Missionの体験内容と、学生のどこに関心を持ったかが伝わる文章になっています。</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
