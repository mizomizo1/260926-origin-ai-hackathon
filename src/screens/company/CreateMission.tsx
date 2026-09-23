import { useState } from 'react'
import { Screen } from '../../App'
import CompanySidebar from '../../components/CompanySidebar'

interface Props { navigate: (s: Screen) => void }

const categories = ['商品企画', 'データ分析', 'マーケティング', 'エンジニア', 'デザイン', '営業', '経営企画', 'その他']
const durations = ['15分', '20分', '25分', '30分', '45分', '60分']
const difficulties = ['初級', '中級', '上級']

export default function CreateMission({ navigate }: Props) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [duration, setDuration] = useState('20分')
  const [difficulty, setDifficulty] = useState('初級')
  const [style, setStyle] = useState<'solo' | 'team' | 'both'>('both')
  const [prompt, setPrompt] = useState('')
  const [submissionType, setSubmissionType] = useState('')
  const [target, setTarget] = useState('')
  const [saved, setSaved] = useState(false)

  const handleDraft = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="flex min-h-screen">
      <CompanySidebar current="createMission" navigate={navigate} />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mission作成</h1>
            <p className="text-sm text-gray-500 mt-0.5">学生に体験してもらうMissionを作成します</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800">基本情報</h2>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Mission名 <span className="text-red-400">*</span></label>
                <input value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="例：新商品のSNS企画を考える"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">職種カテゴリ <span className="text-red-400">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button key={c} onClick={() => setCategory(c)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2"
                      style={category === c
                        ? { background: '#6C5CE7', color: 'white', borderColor: '#6C5CE7' }
                        : { borderColor: '#E5E7EB', color: '#6B7280' }
                      }>{c}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">概要</label>
                <textarea value={summary} onChange={e => setSummary(e.target.value)}
                  placeholder="このMissionで何をするか、簡潔に説明してください"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">所要時間</label>
                  <select value={duration} onChange={e => setDuration(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7]">
                    {durations.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">難易度</label>
                  <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7]">
                    {difficulties.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">スタイル</label>
                  <select value={style} onChange={e => setStyle(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7]">
                    <option value="solo">個人</option>
                    <option value="team">チーム</option>
                    <option value="both">どちらも可</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800">Mission内容</h2>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">課題本文 <span className="text-red-400">*</span></label>
                <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
                  placeholder="学生に取り組んでもらう課題を詳しく記述してください"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">提出物の形式</label>
                <input value={submissionType} onChange={e => setSubmissionType(e.target.value)}
                  placeholder="例：テキスト回答、スライド、提案書など"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] transition-colors" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">おすすめする人物像</label>
                <textarea value={target} onChange={e => setTarget(e.target.value)}
                  placeholder="例：アイデアを考えるのが好きな方、数字を扱うのが得意な方"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm focus:outline-none focus:border-[#6C5CE7] resize-none transition-colors" />
              </div>
            </div>
          </div>

          {/* Sidebar actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 space-y-3">
              <h2 className="text-sm font-bold text-gray-800">公開設定</h2>
              <button onClick={() => navigate('missionList')}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold"
                style={{ background: '#6C5CE7' }}>
                公開する 🚀
              </button>
              <button onClick={handleDraft}
                className="w-full py-3 rounded-xl text-sm font-medium border-2 border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors">
                {saved ? '✓ 保存しました' : '下書き保存'}
              </button>
              <button onClick={() => navigate('missionList')}
                className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                キャンセル
              </button>
            </div>

            <div className="bg-[#EEF0FF] rounded-2xl p-4">
              <h3 className="text-xs font-bold text-[#6C5CE7] mb-2">💡 ヒント</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                20〜30分以内に完了できるMissionが最も参加率が高い傾向があります。具体的な状況設定があると学生が取り組みやすくなります。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
