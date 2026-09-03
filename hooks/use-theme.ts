import { Colors } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

export function useThemeColors() {
    const { isDark } = useTheme();
    return Colors[isDark ? 'dark' : 'light'];
}