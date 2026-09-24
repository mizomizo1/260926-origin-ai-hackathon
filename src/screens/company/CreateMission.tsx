import { useState } from 'react'
import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'

interface Props { navigate: (s: Screen) => void }

const categories = ['商品企画', '販促企画', 'マーケティング', 'ブランディング', 'UX改善', '営業企画', 'CS', 'その他']
const durations = ['12分', '15分', '18分', '20分', '25分', '30分']
const difficulties = ['初級', '中級', '上級']

export default function CreateMission({ navigate }: Props) {
  const [title, setTitle] = useState('新商品の店頭POPを改善する')
  const [category, setCategory] = useState('販促企画')
  const [summary, setSummary] = useState('店頭で商品の魅力が伝わるPOPの見出しと訴求を考えるMissionです。')
  const [duration, setDuration] = useState('18分')
  const [difficulty, setDifficulty] = useState('初級')
  const [style, setStyle] = useState('個人向き')
  const [tags, setTags] = useState('販促, コピー, 顧客理解')
  const [target, setTarget] = useState('身近な購買体験や言葉づくりに関心がある学生')
  const [gains, setGains] = useState('顧客視点, 言語化, 改善提案')
  const [steps, setSteps] = useState('商品の状況を読む（4分）\n課題を見立てる（5分）\nPOPの見出しと理由を書く（9分）')
  const [prompt, setPrompt] = useState('【課題】\n若年層向けスキンケア商品「LUMÉ」の店頭POPを改善します。\n\n現在のPOPは商品名と価格だけが大きく、初めて見る人に魅力が伝わりにくい状態です。\n\n① どんな人に向けたPOPにするか\n② 今のPOPの課題\n③ 新しい見出し案\n④ そう考えた理由')
  const [evaluation, setEvaluation] = useState('顧客理解, 訴求のわかりやすさ, 改善仮説, 実行しやすさ')
  const [saved, setSaved] = useState(false)

  const handleDraft = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }

  const tagList = tags.split(',').map(tag => tag.trim()).filter(Boolean)

  return (
    <div className="flex min-h-screen bg-[#F7F8FB]">
      <CompanySidebar current="createMission" navigate={navigate} />

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <section className="mb-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-[#6C5CE7]">Mission作成</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">学生に表示されるTrialを作る</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">学生側のTrialカード・詳細・提出画面で使う項目を、ここでまとめて管理します。</p>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">基本情報</h2>
              <div className="mt-5 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">Mission名</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-[#F7F8FB] px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">概要</label>
                  <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} className="w-full resize-none rounded-xl border border-gray-100 bg-[#F7F8FB] px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">所要時間</label>
                    <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-[#F7F8FB] px-3 py-3 text-sm outline-none focus:border-[#6C5CE7]">
                      {durations.map(item => <option key={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">難易度</label>
                    <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-[#F7F8FB] px-3 py-3 text-sm outline-none focus:border-[#6C5CE7]">
                      {difficulties.map(item => <option key={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">スタイル</label>
                    <select value={style} onChange={e => setStyle(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-[#F7F8FB] px-3 py-3 text-sm outline-none focus:border-[#6C5CE7]">
                      {['個人向き', 'チーム向き', '個人/チーム両方'].map(item => <option key={item}>{item}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">職種カテゴリ</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(item => (
                      <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${category === item ? 'bg-[#17152B] text-white' : 'bg-[#F7F8FB] text-gray-500'}`}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">学生側で使う情報</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">タグ</label>
                  <input value={tags} onChange={e => setTags(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-[#F7F8FB] px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">得られる力</label>
                  <input value={gains} onChange={e => setGains(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-[#F7F8FB] px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">おすすめする学生</label>
                  <textarea value={target} onChange={e => setTarget(e.target.value)} rows={2} className="w-full resize-none rounded-xl border border-gray-100 bg-[#F7F8FB] px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-gray-700">取り組みステップ</label>
                  <textarea value={steps} onChange={e => setSteps(e.target.value)} rows={3} className="w-full resize-none rounded-xl border border-gray-100 bg-[#F7F8FB] px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]" />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">課題本文・評価観点</h2>
              <div className="mt-5 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">課題本文</label>
                  <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={8} className="w-full resize-none rounded-xl border border-gray-100 bg-[#F7F8FB] px-4 py-3 text-sm leading-7 outline-none focus:border-[#6C5CE7]" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">評価観点</label>
                  <input value={evaluation} onChange={e => setEvaluation(e.target.value)} className="w-full rounded-xl border border-gray-100 bg-[#F7F8FB] px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]" />
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-[#6C5CE7]">Preview</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-[#6C5CE7]/30 bg-white">
                <div className="p-5">
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6C5CE7]/10 text-2xl">✨</div>
                    <span className="rounded-full bg-[#EEF0FF] px-2.5 py-1 text-[11px] font-bold text-[#6C5CE7]">{duration}</span>
                  </div>
                  <p className="text-xs font-bold text-[#6C5CE7]">{category}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900">{title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-gray-500">{summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tagList.map(tag => <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500">{tag}</span>)}
                  </div>
                </div>
                <div className="border-t border-gray-100 bg-[#F7F8FB] p-4 text-xs text-gray-500">
                  {difficulty} · {style}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900">公開設定</h2>
              <button onClick={() => navigate('missionList')} className="mt-4 w-full rounded-xl bg-[#17152B] py-3 text-sm font-bold text-white hover:bg-[#24213A]">
                公開する
              </button>
              <button onClick={handleDraft} className="mt-2 w-full rounded-xl bg-[#EEF0FF] py-3 text-sm font-bold text-[#6C5CE7]">
                {saved ? '保存しました' : '下書き保存'}
              </button>
              <button onClick={() => navigate('missionList')} className="mt-3 w-full py-2 text-sm font-bold text-gray-400">
                キャンセル
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}
