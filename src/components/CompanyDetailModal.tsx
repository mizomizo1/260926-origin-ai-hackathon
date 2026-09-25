import { companies, missions } from '../data/mock'
import { DataIcon } from './AppIcon'

type Company = (typeof companies)[number]

interface Props {
  company: Company
  onClose: () => void
  onExplore?: () => void
  context?: {
    label: string
    title: string
    body: string
  }
}

export default function CompanyDetailModal({ company, onClose, onExplore, context }: Props) {
  const companyMissions = missions.filter(mission => mission.companyId === company.id)
  const focusRoles = companyMissions.length
    ? companyMissions.map(mission => mission.category).filter((item, index, list) => list.indexOf(item) === index).slice(0, 3)
    : ['企画', 'マーケティング', '改善提案']

  const basics = [
    { label: '業界', value: company.industry },
    { label: '所在地', value: company.location },
    { label: '公開Trial', value: `${company.openMissions}件` },
    { label: '参加記録', value: `${company.trialCount}件` },
  ]

  const detailRows = [
    { label: '事業内容', value: company.description },
    { label: '募集の接点', value: focusRoles.join(' / ') },
    { label: '働き方・文化', value: company.culture },
    { label: '確認しておきたいこと', value: '面談では、配属チーム、任される業務範囲、フィードバック頻度、働く場所を確認すると判断しやすくなります。' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17152B]/45 px-6 py-8 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-[920px] overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={event => event.stopPropagation()}>
        <div className="relative overflow-hidden bg-[#17152B] p-6 text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white hover:bg-white/15"
            aria-label="閉じる"
          >
            ×
          </button>
          <div className="relative z-10 flex flex-col gap-5 pr-10 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: company.color }}>
              <DataIcon value={company.emoji} className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-white/45">Company Detail</p>
              <h2 className="mt-1 text-2xl font-bold">{company.name}</h2>
              <p className="mt-1 text-sm text-white/55">{company.industry} · {company.location}</p>
            </div>
          </div>
          <div className="absolute -bottom-8 right-8 text-white/10">
            <DataIcon value={company.emoji} className="h-36 w-36" />
          </div>
        </div>

        <div className="max-h-[calc(92vh-150px)] overflow-y-auto p-6">
          {context && (
            <div className="mb-5 rounded-2xl border border-[#FBCFE8] bg-[#FDF2F8] px-4 py-3">
              <p className="text-[11px] font-bold text-[#EC4899]">{context.label}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{context.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">{context.body}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {basics.map(item => (
              <div key={item.label} className="rounded-2xl bg-[#F7F8FB] px-4 py-3">
                <p className="text-[11px] font-bold text-gray-400">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-3">
              {detailRows.map(row => (
                <div key={row.label} className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs font-bold" style={{ color: company.color }}>{row.label}</p>
                  <p className="mt-2 text-sm leading-7 text-gray-700">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#F7F6FF] p-4">
                <p className="text-xs font-bold text-[#6C5CE7]">あなたとの相性</p>
                <div className="mt-3 space-y-2">
                  {company.whyFit.map(reason => (
                    <div key={reason} className="flex gap-2 rounded-xl bg-white px-3 py-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: company.color }} />
                      <p className="text-xs font-medium leading-relaxed text-gray-700">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 p-4">
                <p className="text-xs font-bold text-gray-900">公開中のTrial</p>
                <div className="mt-3 space-y-2">
                  {(companyMissions.length ? companyMissions : missions.slice(0, 2)).slice(0, 3).map(mission => (
                    <div key={mission.id} className="rounded-xl bg-gray-50 px-3 py-2">
                      <p className="text-xs font-bold text-gray-800">{mission.title}</p>
                      <p className="mt-1 text-[11px] text-gray-400">{mission.duration} · {mission.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {onExplore && (
                  <button onClick={onExplore} className="flex-1 rounded-xl bg-[#17152B] px-4 py-3 text-sm font-bold text-white hover:bg-[#24213A]">
                    公開Trialを見る
                  </button>
                )}
                <button onClick={onClose} className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-200">
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
