import { type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Text } from '@/tw';
import type { TypographyRole } from '@/theme';

export type ThemedTextProps = TextProps & {
  className?: string;
  lightColor?: string;
  darkColor?: string;
  type?:
    | TypographyRole
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link';
};

const typeClasses = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  bodyLarge: 'body-lg',
  bodyMedium: 'body-md',
  bodySmall: 'body-sm',
  caption: 'caption',
  default: 'body-lg',
  title: 'h1',
  defaultSemiBold: 'h4',
  subtitle: 'h3',
  link: 'body-lg text-lingua-purple',
} as const;

export function ThemedText({
  className,
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const colorStyle = lightColor || darkColor ? { color } : undefined;
  const defaultColorClass = lightColor || darkColor ? undefined : 'text-lingua-text-primary';

  return (
    <Text
      className={[typeClasses[type], defaultColorClass, className].filter(Boolean).join(' ')}
      style={[colorStyle, style]}
      {...rest}
    />
  );
}
