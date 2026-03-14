import { Badge } from '../../../../shared/components/Badge/Badge';

export function RoleBadge({ label, dotColor }) {
  return <Badge dot dotColor={dotColor}>{label}</Badge>;
}
