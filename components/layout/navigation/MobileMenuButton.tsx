import { CloseIcon, MenuIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <div className="md:hidden flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="text-white"
        onClick={onClick}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </Button>
    </div>
  );
}
