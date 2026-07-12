import {
  FileText,
  MessageCircle,
  Instagram,
  DollarSign,
  PackageCheck,
  Gift,
  Lightbulb,
  Sparkles,
  Search,
  Mail,
  Palette,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const ICONS: Record<string, LucideIcon> = {
  FileText,
  MessageCircle,
  Instagram,
  DollarSign,
  PackageCheck,
  Gift,
  Lightbulb,
  Sparkles,
  Search,
  Mail,
  Palette,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles;
}
