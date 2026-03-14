import * as Icons from 'lucide-react';

export function Icon({ name, size = 16, className, strokeWidth = 1.4, ...props }) {
  const LucideIcon = Icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} strokeWidth={strokeWidth} {...props} />;
}
