import type { ReactNode } from 'react'

interface Props {
  active: boolean
  label?: string
  children: ReactNode
  className?: string
  radius?: string
}

// 「次に押す・書く場所」を光る輪で囲むガイド。active のときだけ脈打つ輪と吹き出しを出す。
export default function GuideRing({ active, label, children, className = '', radius = '16px' }: Props) {
  return (
    <div className={`relative ${className}`}>
      <style>{`@keyframes ccGuideRing { 0% { box-shadow: 0 0 0 0 rgba(108,92,231,0.5); } 70% { box-shadow: 0 0 0 14px rgba(108,92,231,0); } 100% { box-shadow: 0 0 0 0 rgba(108,92,231,0); } }`}</style>
      {active && label && (
        <div className="absolute -top-3.5 right-3 z-20 rounded-full bg-[#6C5CE7] px-3 py-1 text-xs font-bold text-white shadow-md whitespace-nowrap">
          {label} ↓
        </div>
      )}
      <div
        style={active ? {
          borderRadius: radius,
          outline: '2px solid #6C5CE7',
          outlineOffset: '4px',
          animation: 'ccGuideRing 1.6s ease-out infinite',
        } : { borderRadius: radius }}
      >
        {children}
      </div>
    </div>
  )
}
