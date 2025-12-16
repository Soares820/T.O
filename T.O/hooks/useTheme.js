import { useColorScheme } from 'react-native';
import { dark, light } from '../constants/theme';

export default function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? dark : light;
  return { theme, scheme };
}
