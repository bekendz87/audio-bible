import { useThemeColors } from '@/hooks/use-theme';
import { Tabs } from 'expo-router';
import { BookOpen, Bookmark, Compass, Home, Settings } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabsLayout() {
    const colors = useThemeColors();

    return (
        <View style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.textMuted,
                    tabBarStyle: {
                        backgroundColor: colors.background,
                        borderTopColor: colors.border,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Trang chủ',
                        tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: 'Khám phá',
                        tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
                    }}
                />
                <Tabs.Screen
                    name="bible"
                    options={{
                        title: 'Kinh Thánh',
                        tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
                    }}
                />
                <Tabs.Screen
                    name="library"
                    options={{
                        title: 'Thư viện',
                        tabBarIcon: ({ color, size }) => <Bookmark color={color} size={size} />,
                    }}
                />

                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Cài đặt',
                        tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
                    }}
                />
            </Tabs>

        </View>
    );
}