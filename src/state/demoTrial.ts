import { useSyncExternalStore } from 'react'

// デモ Trial の進行状態。バックエンドがないため画面間で共有する小さなストアにしている。
// 再読み込みでリセットされる(デモを毎回最初からやり直せるようにするため)。
type DemoTrialState = {
  answer: string
  evaluationComplete: boolean
  notified: boolean // 評価後、ホームでスカウト・マッチの通知が届いたか
  matchSeen: boolean
}

let state: DemoTrialState = { answer: '', evaluationComplete: false, notified: false, matchSeen: false }
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

const update = (next: Partial<DemoTrialState>) => {
  state = { ...state, ...next }
  listeners.forEach(listener => listener())
}

export const submitDemoTrial = (answer: string) => update({ answer, evaluationComplete: false, notified: false, matchSeen: false })
export const completeDemoEvaluation = () => update({ evaluationComplete: true })
export const markDemoNotified = () => { if (!state.notified) update({ notified: true }) }
export const markDemoMatchSeen = () => { if (!state.matchSeen) update({ matchSeen: true }) }

export function useDemoTrial() {
  return useSyncExternalStore(subscribe, () => state)
}
