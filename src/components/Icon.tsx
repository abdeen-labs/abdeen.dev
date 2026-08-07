import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  DoubleCheck,
  Download,
  FingerprintScan,
  Github,
  HalfMoon,
  Lock,
  Mail,
  Menu,
  Plus,
  Search,
  Upload,
  WarningTriangle,
  Xmark,
} from "iconoir-react";
import type { ComponentType, SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "check"
  | "double-check"
  | "download"
  | "fingerprint"
  | "github"
  | "half-moon"
  | "lock"
  | "mail"
  | "menu"
  | "plus"
  | "search"
  | "upload"
  | "warning-triangle"
  | "xmark";

const icons: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "arrow-up-right": ArrowUpRight,
  check: Check,
  "double-check": DoubleCheck,
  download: Download,
  fingerprint: FingerprintScan,
  github: Github,
  "half-moon": HalfMoon,
  lock: Lock,
  mail: Mail,
  menu: Menu,
  plus: Plus,
  search: Search,
  upload: Upload,
  "warning-triangle": WarningTriangle,
  xmark: Xmark,
};

interface IconProps {
  name: IconName;
  size?: 16 | 20 | 24 | 28 | 32;
  className?: string;
  emphasized?: boolean;
}

/** Official Iconoir glyph, native 24×24, currentColor, 1.5/2px stroke. */
export default function Icon({ name, size = 16, className, emphasized = false }: IconProps) {
  const Glyph = icons[name];
  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      strokeWidth={emphasized ? 2 : 1.5}
      data-icon={name}
      className={className}
    />
  );
}
