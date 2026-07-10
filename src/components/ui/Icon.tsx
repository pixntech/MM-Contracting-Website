import * as LucideIcons from 'lucide-react'
import type { LucideProps } from 'lucide-react'

interface IconProps extends LucideProps {
  name: string
}

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Building2: LucideIcons.Building2,
  Road: LucideIcons.Road,
  Home: LucideIcons.Home,
  Store: LucideIcons.Store,
  Factory: LucideIcons.Factory,
  PenTool: LucideIcons.PenTool,
  Trophy: LucideIcons.Trophy,
  ShieldCheck: LucideIcons.ShieldCheck,
  HardHat: LucideIcons.HardHat,
  Lightbulb: LucideIcons.Lightbulb,
  Clock: LucideIcons.Clock,
  Globe: LucideIcons.Globe,
  Fuel: LucideIcons.Fuel,
  Zap: LucideIcons.Zap,
  Train: LucideIcons.Train,
  Droplets: LucideIcons.Droplets,
  Hammer: LucideIcons.Hammer,
  HeartPulse: LucideIcons.HeartPulse,
  ChevronRight: LucideIcons.ChevronRight,
  ChevronDown: LucideIcons.ChevronDown,
  Menu: LucideIcons.Menu,
  X: LucideIcons.X,
  MapPin: LucideIcons.MapPin,
  Phone: LucideIcons.Phone,
  Mail: LucideIcons.Mail,
  ArrowRight: LucideIcons.ArrowRight,
  Check: LucideIcons.Check,
  Quote: LucideIcons.Quote,
  Calendar: LucideIcons.Calendar,
  ArrowUpRight: LucideIcons.ArrowUpRight,
  Play: LucideIcons.Play,
  Send: LucideIcons.Send,
  Linkedin: LucideIcons.ExternalLink,
  Twitter: LucideIcons.ExternalLink,
  Facebook: LucideIcons.ExternalLink,
  Instagram: LucideIcons.ExternalLink,
  Youtube: LucideIcons.ExternalLink,
  Users: LucideIcons.Users,
  Building: LucideIcons.Building,
  Award: LucideIcons.Award,
  Briefcase: LucideIcons.Briefcase,
  Target: LucideIcons.Target,
  Eye: LucideIcons.Eye,
  Search: LucideIcons.Search,
  Star: LucideIcons.Star,
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconMap[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent {...props} />
}
