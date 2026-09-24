import { useSyncExternalStore } from 'react'

// デモ Trial の進行状態。バックエンドがないため画面間で共有する小さなストアにしている。
// 再読み込みでリセットされる(デモを毎回最初からやり直せるようにするため)。
type DemoTrialState = {
  answer: string
  notified: boolean // 評価が終わり、スカウト・マッチの通知が届いたか
}

let state: DemoTrialState = { answer: '', notified: false }
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

const update = (next: Partial<DemoTrialState>) => {
  state = { ...state, ...next }
  listeners.forEach(listener => listener())
}

export const submitDemoTrial = (answer: string) => update({ answer })
export const markDemoNotified = () => { if (!state.notified) update({ notified: true }) }

export function useDemoTrial() {
  return useSyncExternalStore(subscribe, () => state)
}
