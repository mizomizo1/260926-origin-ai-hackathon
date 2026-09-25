import type { ComponentType } from 'react'
import {
  ArchiveFill,
  ArrowUpRight,
  BarChartFill,
  BasketFill,
  BookFill,
  BoxArrowRight,
  BriefcaseFill,
  BuildingFill,
  BuildingsFill,
  Bullseye,
  ChatDotsFill,
  CheckLg,
  ClipboardCheckFill,
  CloudFill,
  CompassFill,
  CpuFill,
  CupHotFill,
  CurrencyYen,
  EmojiSmileFill,
  EnvelopeFill,
  Fire,
  Flower1,
  GearFill,
  GraphUpArrow,
  HandThumbsUpFill,
  HouseDoorFill,
  JournalText,
  LeafFill,
  LightbulbFill,
  LightningChargeFill,
  MapFill,
  MegaphoneFill,
  MortarboardFill,
  PatchCheckFill,
  PencilSquare,
  PeopleFill,
  PersonFill,
  PersonWorkspace,
  PuzzleFill,
  RocketTakeoffFill,
  SendFill,
  Stars,
  SunFill,
  TrophyFill,
} from 'react-bootstrap-icons'

type BootstrapIcon = ComponentType<{ className?: string; size?: number | string; 'aria-hidden'?: boolean }>

const icons = {
  archive: ArchiveFill,
  arrowUpRight: ArrowUpRight,
  balance: SunFill,
  book: BookFill,
  building: BuildingFill,
  buildings: BuildingsFill,
  business: BriefcaseFill,
  chart: BarChartFill,
  chat: ChatDotsFill,
  check: CheckLg,
  clipboard: ClipboardCheckFill,
  cloud: CloudFill,
  compass: CompassFill,
  cpu: CpuFill,
  cup: CupHotFill,
  door: BoxArrowRight,
  emojiSmile: EmojiSmileFill,
  envelope: EnvelopeFill,
  fire: Fire,
  flower: Flower1,
  gear: GearFill,
  graph: GraphUpArrow,
  handshake: HandThumbsUpFill,
  home: HouseDoorFill,
  journal: JournalText,
  leaf: LeafFill,
  lightbulb: LightbulbFill,
  lightning: LightningChargeFill,
  map: MapFill,
  megaphone: MegaphoneFill,
  money: CurrencyYen,
  people: PeopleFill,
  person: PersonFill,
  profile: PersonWorkspace,
  puzzle: PuzzleFill,
  rocket: RocketTakeoffFill,
  school: MortarboardFill,
  send: SendFill,
  shopping: BasketFill,
  sparkle: Stars,
  target: Bullseye,
  trophy: TrophyFill,
  verified: PatchCheckFill,
  write: PencilSquare,
} satisfies Record<string, BootstrapIcon>

export type AppIconName = keyof typeof icons

export const emojiIconMap: Record<string, AppIconName> = {
  '🏠': 'home',
  '🎯': 'target',
  '🏢': 'buildings',
  '💌': 'envelope',
  '👤': 'person',
  '📊': 'chart',
  '📋': 'clipboard',
  '👥': 'people',
  '⚙️': 'gear',
  '🚪': 'door',
  '🧭': 'compass',
  '🎓': 'school',
  '🧩': 'puzzle',
  '🗣️': 'megaphone',
  '💡': 'lightbulb',
  '💬': 'chat',
  '🌱': 'flower',
  '☕': 'cup',
  '🌿': 'leaf',
  '🛒': 'shopping',
  '📚': 'book',
  '🏙️': 'building',
  '☁️': 'cloud',
  '✨': 'sparkle',
  '🔬': 'verified',
  '💰': 'money',
  '☀️': 'balance',
  '📈': 'graph',
  '🌀': 'compass',
  '🗺️': 'map',
  '🚀': 'rocket',
  '⚡': 'lightning',
  '📝': 'write',
  '🔥': 'fire',
  '🤝': 'handshake',
  '🧑‍💻': 'profile',
  '😄': 'emojiSmile',
  '🧠': 'cpu',
  '👋': 'handshake',
  '🔮': 'sparkle',
  '⭐': 'trophy',
}

interface AppIconProps {
  name: AppIconName
  className?: string
  size?: number | string
}

export function AppIcon({ name, className = '', size }: AppIconProps) {
  const Icon = icons[name]
  return <Icon aria-hidden className={className} size={size} />
}

interface DataIconProps {
  value?: string
  className?: string
  size?: number | string
}

export function DataIcon({ value, className = '', size }: DataIconProps) {
  return <AppIcon name={value ? emojiIconMap[value] ?? 'sparkle' : 'sparkle'} className={className} size={size} />
}
