import { BaseComponentProps } from "./global";

// 标准组件基础接口
export interface StandardComponentProps extends BaseComponentProps {
  // 通用事件处理器
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;

  // 通用状态
  disabled?: boolean;
  loading?: boolean;

  // 通用样式
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline";
}

// 输入组件接口
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

// 按钮组件接口
export interface ButtonComponentProps extends StandardComponentProps {
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
}

// 动画组件接口
export interface AnimatedComponentProps extends StandardComponentProps {
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

// 响应式组件接口
export interface ResponsiveComponentProps extends StandardComponentProps {
  mobile?: Partial<StandardComponentProps>;
  tablet?: Partial<StandardComponentProps>;
  desktop?: Partial<StandardComponentProps>;
}
