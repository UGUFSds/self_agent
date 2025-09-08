import { BaseComponentProps } from "./global";

// Standard component base interface
export interface StandardComponentProps extends BaseComponentProps {
  // Common event handlers
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;

  // Common state
  disabled?: boolean;
  loading?: boolean;

  // Common styles
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline";
}

// Input component interface
export interface InputComponentProps extends StandardComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
}

// Button component interface
export interface ButtonComponentProps extends StandardComponentProps {
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
}

// Animation component interface
export interface AnimatedComponentProps extends StandardComponentProps {
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

// Responsive component interface
export interface ResponsiveComponentProps extends StandardComponentProps {
  mobile?: Partial<StandardComponentProps>;
  tablet?: Partial<StandardComponentProps>;
  desktop?: Partial<StandardComponentProps>;
}
