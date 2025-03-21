import { useIcons } from '@/components/providers/IconProvider';
import { Button } from '@/components/ui/button';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps): JSX.Element | null {
  const { getIcon } = useIcons();
  const MenuIcon = getIcon('MenuIcon');
  const CloseIcon = getIcon('CloseIcon');

  if (!MenuIcon || !CloseIcon) return null;

  return (
    <div className="md:hidden flex items-center">
      <Button variant="ghost" size="icon" className="text-white" onClick={onClick}>
        {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </Button>
    </div>
  );
}
