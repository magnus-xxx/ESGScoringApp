// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chart.pie.fill': 'pie-chart',
  'archivebox.fill': 'archive',      // Icon cho header
  'bell.fill': 'notifications',     // Icon cho header
  'banknote.fill': 'payment',       // Icon cho giao dịch
  'creditcard.fill': 'credit-card', // Icon cho giao dịch
  'bus.fill': 'directions-bus',     // Icon cho giao dịch xe bus
  'gift.fill': 'card-giftcard',     // Icon cho tab Ưu đãi
  'leaf.fill': 'eco',               // <-- THÊM DÒNG NÀY cho tab Carbon
  'arrow.clockwise': 'refresh', // <-- THÊM DÒNG NÀY
  'arrow.up.right.circle.fill': 'open-in-new',
  'magnifyingglass': 'search', // Icon cho thanh tìm kiếm
  'chart.bar.fill': 'bar-chart', // Icon cho biểu đồ
  'globe.americas.fill': 'public', // Icon cho tab Bù đắp
} as IconMapping;
/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
