import { useThemeColors } from '@/hooks/use-theme';
import { Tabs } from 'expo-router';
import { BookOpen, Bookmark, Compass, Home, Settings } from 'lucide-react-native';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function CustomTabBarBackground({ backgroundColor, borderColor }: { backgroundColor: string; borderColor: string }) {
    const tabWidth = SCREEN_WIDTH;
    const tabHeight = 65;
    const center = tabWidth / 2;
    const r = 32;
    const depth = 30;

    const d = `
        M 0,0 
        L ${center - r - 12},0 
        C ${center - r},0 ${center - r + 8},${depth} ${center},${depth} 
        C ${center + r - 8},${depth} ${center + r},0 ${center + r + 12},0 
        L ${tabWidth},0 
        L ${tabWidth},${tabHeight} 
        L 0,${tabHeight} 
        Z
    `;

    return (
        <View style={StyleSheet.absoluteFill}>
            <Svg width={tabWidth} height={tabHeight}>
                <Path d={d} fill={backgroundColor} stroke={borderColor} strokeWidth={1} />
            </Svg>
        </View>
    );
}

export default function TabsLayout() {
    const colors = useThemeColors();

    return (
        <View style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.textMuted,
                    tabBarBackground: () => (
                        <CustomTabBarBackground
                            backgroundColor={colors.background}
                            borderColor={colors.border}
                        />
                    ),
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        elevation: 0,
                        height: 65
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
                        tabBarButton: (props) => (
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={styles.centerBtnContainer}
                                onPress={props.onPress}
                            >
                                <View style={[styles.centerBtn, { backgroundColor: colors.primary }]}>
                                    <BookOpen color={colors.primaryElement || '#ffffff'} size={26} />
                                </View>
                            </TouchableOpacity>
                        ),
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

const styles = StyleSheet.create({
    centerBtnContainer: {
        top: -14,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    centerBtn: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});