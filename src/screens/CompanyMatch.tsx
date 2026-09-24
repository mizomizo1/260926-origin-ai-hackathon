import { useEffect, useState } from 'react'
import { Screen } from '../App'
import { companies, profileViews, scoutInvitations } from '../data/mock'
import StudentTopNav from '../components/StudentTopNav'
import { demoTrialScout } from '../data/demoTrial'
import { markDemoMatchSeen, useDemoTrial } from '../state/demoTrial'

interface Props { navigate: (s: Screen) => void }

export default function CompanyMatch({ navigate }: Props) {
  const [filter, setFilter] = useState<'all' | 'scout' | 'viewed' | 'planning'>('all')
  const { notified } = useDemoTrial()
  const featured = companies.find(company => company.id === 'com_003') ?? companies[0]
  const remaining = companies.filter(company => company.id !== featured.id)
  const highFit = remaining.slice(0, 5)
  const growing = remaining.slice(5)
  const scoreFor = (index: number, base: number) => Math.max(base - index * 3, 68)
  const analysisSignals = [
    { label: 'Trial評価', value: '課題発見 86 / 相手視点 88', color: '#6C5CE7' },
    { label: '価値観傾向', value: '人・雰囲気 / 成長を重視', color: '#00B894' },
    { label: '行動傾向', value: '相談しながら企画する場面で強み', color: '#F59E0B' },
  ]
  const fitMap = [
    { company: featured, score: 92, trial: 91, values: 88, x: 72, y: 18, note: 'イベント企画・集客と相性高' },
    { company: companies.find(c => c.id === 'com_001') ?? companies[0], score: 89, trial: 78, values: 86, x: 54, y: 34, note: '商品企画への関心が近い' },
    { company: companies.find(c => c.id === 'com_004') ?? companies[0], score: 86, trial: 84, values: 72, x: 31, y: 26, note: '改善提案・UX思考が近い' },
    { company: companies.find(c => c.id === 'com_006') ?? companies[0], score: 84, trial: 70, values: 90, x: 73, y: 52, note: '人や成長への関心が近い' },
    { company: companies.find(c => c.id === 'com_010') ?? companies[0], score: 81, trial: 74, values: 80, x: 49, y: 61, note: '教育・相手視点に接点' },
    { company: companies.find(c => c.id === 'com_012') ?? companies[0], score: 77, trial: 80, values: 64, x: 23, y: 54, note: '整理力・改善思考に接点' },
  ]
  const scoutCompanyIds = new Set([demoTrialScout, ...scoutInvitations].map(scout => scout.companyId))
  const viewedCompanyIds = new Set(profileViews.map(view => view.companyId))
  const filterItems = [
    { key: 'all' as const, label: 'すべて', count: fitMap.length },
    { key: 'scout' as const, label: 'スカウトあり', count: fitMap.filter(item => scoutCompanyIds.has(item.company.id)).length },
    { key: 'viewed' as const, label: '足跡あり', count: fitMap.filter(item => viewedCompanyIds.has(item.company.id)).length },
    { key: 'planning' as const, label: '企画・イベント', count: fitMap.filter(item => /イベント|消費財|教育/.test(item.company.industry)).length },
  ]
  const visibleFitMap = fitMap.filter(item => {
    if (filter === 'scout') return scoutCompanyIds.has(item.company.id)
    if (filter === 'viewed') return viewedCompanyIds.has(item.company.id)
    if (filter === 'planning') return /イベント|消費財|教育/.test(item.company.industry)
    return true
  })

  useEffect(() => {
    if (notified) markDemoMatchSeen()
  }, [notified])

  return (
    <div className="min-h-screen bg-[#F7F8FB]">
      <StudentTopNav current="companies" navigate={navigate} spotlight={notified ? 'scout' : undefined} />

      <main className="mx-auto max-w-[1200px] px-6 py-8 space-y-10">
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#6C5CE7]">Trial・価値観の相性分析</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">あなたと相性が高い企業</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">Trialの評価、A/Bで見えた価値観、企業が重視する人物像を照らし合わせて候補企業を並べています。</p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-5">
          <div className="relative overflow-hidden rounded-3xl bg-[#17152B] p-7 lg:p-9 text-white min-h-[300px]">
            <div className="relative z-10 max-w-lg">
              <span className="chip bg-white/10 text-[#A29BFE]">総合相性 · 92%</span>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: featured.color + '35' }}>{featured.emoji}</div>
                <div><h2 className="text-2xl font-bold">{featured.name}</h2><p className="text-sm text-white/55">{featured.industry} · {featured.location}</p></div>
              </div>
              <p className="text-sm text-white/65 leading-relaxed mt-6">{featured.description}</p>
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {analysisSignals.map(signal => (
                  <div key={signal.label} className="rounded-2xl bg-white/10 px-3 py-3">
                    <p className="text-[10px] font-bold text-white/45">{signal.label}</p>
                    <p className="mt-1 text-xs font-bold leading-relaxed text-white">{signal.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3"><button className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#17152B]">分析を見る</button><span className="text-xs text-white/45">{featured.openMissions}つの公開Trial</span></div>
            </div>
            <div className="absolute -right-8 -bottom-12 text-[170px] opacity-20">{featured.emoji}</div>
          </div>
          <div className="rounded-3xl bg-white border border-gray-100 p-6 shadow-sm">
            <p className="text-xs font-bold text-[#6C5CE7]">相性が高い理由</p>
            <h2 className="text-xl font-bold text-gray-900 mt-3">Trial結果と<br />性格傾向の重なり</h2>
            <div className="mt-6 space-y-3">
              {[
                'イベント改善Trialで課題発見と相手視点が高い',
                'チームで相談しながら考える価値観と近い',
                '企画・集客・コミュニティ運営の職種と接点が多い',
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-[#F7F6FF] px-3 py-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6C5CE7] text-xs text-white">{index + 1}</span><span className="text-sm font-medium leading-relaxed text-gray-700">{item}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold text-[#6C5CE7]">Fit Map</p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">相性を俯瞰する</h2>
              <p className="mt-1 text-xs text-gray-500">右に行くほど価値観相性が高く、上に行くほどTrial結果との相性が高い企業です。</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${filter === item.key ? 'bg-[#17152B] text-white' : 'bg-[#F7F6FF] text-gray-500 hover:bg-[#EEF0FF]'}`}
                >
                  {item.label} <span className={filter === item.key ? 'text-white/55' : 'text-gray-400'}>{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-3xl border border-gray-100 bg-[#F7F8FB] p-6">
              <div className="absolute inset-6 rounded-2xl bg-white" />
              <div className="absolute inset-x-6 top-[25%] h-px bg-gray-100" />
              <div className="absolute inset-x-6 top-[50%] h-px bg-gray-100" />
              <div className="absolute inset-x-6 top-[75%] h-px bg-gray-100" />
              <div className="absolute inset-y-6 left-[25%] w-px bg-gray-100" />
              <div className="absolute inset-y-6 left-[50%] w-px bg-gray-100" />
              <div className="absolute inset-y-6 left-[75%] w-px bg-gray-100" />
              <div className="absolute left-8 top-8 z-10 rounded-full bg-[#EEF0FF] px-3 py-1 text-[11px] font-bold text-[#6C5CE7]">Trial相性 100</div>
              <div className="absolute bottom-8 right-8 z-10 rounded-full bg-[#E8FBF5] px-3 py-1 text-[11px] font-bold text-[#00B894]">価値観相性 100</div>
              <div className="absolute bottom-8 left-8 z-10 text-[11px] font-bold text-gray-300">0</div>
              <div className="absolute right-8 top-8 z-10 text-[11px] font-bold text-gray-300">100</div>
              <div className="absolute right-10 top-12 z-0 rounded-2xl bg-[#F7F6FF] px-4 py-3 text-right">
                <p className="text-xs font-bold text-[#6C5CE7]">高相性ゾーン</p>
                <p className="mt-1 text-[11px] text-gray-400">Trialも価値観も近い</p>
              </div>
              <div className="absolute left-10 top-24 z-0 rounded-2xl bg-white/80 px-4 py-3">
                <p className="text-xs font-bold text-gray-500">仕事相性型</p>
                <p className="mt-1 text-[11px] text-gray-400">Trial結果が近い</p>
              </div>
              <div className="absolute bottom-14 right-16 z-0 rounded-2xl bg-white/80 px-4 py-3 text-right">
                <p className="text-xs font-bold text-gray-500">価値観先行型</p>
                <p className="mt-1 text-[11px] text-gray-400">文化・人が近い</p>
              </div>

              {visibleFitMap.map((item) => (
                <button
                  key={item.company.id}
                  className="absolute z-20 w-[168px] rounded-2xl border border-white bg-white p-3 text-left shadow-md transition-transform hover:scale-[1.03]"
                  style={{
                    left: `calc(${item.x}% - 84px)`,
                    top: `calc(${item.y}% - 42px)`,
                    boxShadow: `0 14px 34px ${item.company.color}22`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg" style={{ background: item.company.color + '18' }}>{item.company.emoji}</span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-gray-900">{item.company.name}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[11px] font-bold" style={{ color: item.company.color }}>{item.score}%</span>
                        <span className="text-[10px] text-gray-400">match</span>
                      </div>
                      <div className="mt-1 flex gap-1">
                        {scoutCompanyIds.has(item.company.id) && <span className="rounded-full bg-[#FDF2F8] px-1.5 py-0.5 text-[9px] font-bold text-[#EC4899]">Scout</span>}
                        {viewedCompanyIds.has(item.company.id) && <span className="rounded-full bg-[#EEF0FF] px-1.5 py-0.5 text-[9px] font-bold text-[#6C5CE7]">View</span>}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
        </section>

        {[
          { title: 'あなたに合いそうな企業', items: highFit, baseScore: 89 },
          { title: '次に見ておきたい企業', items: growing, baseScore: 78 },
        ].map(section => (
          <section key={section.title}>
            <div className="flex items-end justify-between mb-4"><div><h2 className="text-lg font-bold text-gray-900">{section.title}</h2><p className="text-xs text-gray-500 mt-1">Trial結果と価値観スコアから優先表示しています</p></div><span className="text-xs text-gray-400">横にスクロール →</span></div>
            <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
              {section.items.map((company, index) => (
                <div key={company.id} className="snap-start shrink-0 w-[280px] bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:-translate-y-1 transition-transform" style={{ borderTop: `4px solid ${company.color}` }}>
                  <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3 min-w-0"><div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: company.color + '18' }}>{company.emoji}</div><div className="min-w-0"><p className="font-bold text-gray-900 truncate">{company.name}</p><p className="text-xs text-gray-500 truncate">{company.industry}</p></div></div><span className="text-sm font-bold" style={{ color: company.color }}>{scoreFor(index, section.baseScore)}%</span></div>
                  <p className="text-sm text-gray-600 leading-relaxed mt-6 line-clamp-2 min-h-[42px]">{company.whyFit[0]}</p>
                  <div className="mt-4 rounded-2xl bg-gray-50 px-3 py-2">
                    <p className="text-[11px] font-bold text-gray-400">分析根拠</p>
                    <p className="mt-1 text-xs text-gray-600">価値観・Trial評価・職種特徴の一致</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400"><span>{company.location}</span><span>{company.openMissions} Trial</span></div>
                </div>
              ))}
            </div>
          </section>
        ))}

      </main>
    </div>
  )
}
