/**
 * Props for the DesktopNav component
 */
export interface DesktopNavProps {
  /** Currently active section identifier */
  activeSection: string;
}

/**
 * Props for the MobileNav component
 */
export interface MobileNavProps {
  /** Whether the mobile menu is open */
  isOpen: boolean;
  /** Currently active section identifier */
  activeSection: string;
  /** Callback function when a link is clicked */
  onLinkClick: () => void;
}

/**
 * Props for the MobileMenuButton component
 */
export interface MobileMenuButtonProps {
  /** Whether the mobile menu is open */
  isOpen: boolean;
  /** Callback function when the button is clicked */
  onClick: () => void;
}

/**
 * Props for the Logo component
 */
export interface LogoProps {
  /** Optional variant for different logo styles */
  variant?: 'header' | 'footer';
}
