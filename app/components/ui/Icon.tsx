import { useIcons } from '@/components/providers/IconProvider';
import { cn } from '@/lib/utils/styles.util';
import type { IconProps } from '@/types/components/common.type';

interface IconComponentProps extends IconProps {
  name: string;
}

export function Icon({ name, size, className }: IconComponentProps): JSX.Element | null {
  const { getIcon } = useIcons();
  const IconComponent = getIcon(name);

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} className={cn('transition-colors duration-200', className)} />;
}

export default Icon;
