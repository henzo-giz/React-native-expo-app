import { type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { View } from '@/tw';

export type ThemedViewProps = ViewProps & {
  className?: string;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ className, style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const backgroundStyle = lightColor || darkColor ? { backgroundColor } : undefined;

  return (
    <View
      className={['bg-lingua-background', className].filter(Boolean).join(' ')}
      style={[backgroundStyle, style]}
      {...otherProps}
    />
  );
}
