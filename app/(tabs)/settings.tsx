import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useThemeColors } from '@/hooks/use-theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ChevronRight, KeyRound, LogOut, Moon, Sun, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
const THEME_STORAGE_KEY = '@app_theme';

export default function SettingsScreen() {
    const { isDark, toggleTheme } = useTheme();
    const colors = useThemeColors();
    const router = useRouter();

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const user = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
    };

    useEffect(() => {
        const loadSavedTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme !== null) {
                    setIsDarkMode(savedTheme === 'dark');
                }
            } catch (error) {
                console.error('Lỗi đọc theme từ storage:', error);
            }
        };
        loadSavedTheme();
    }, []);

    const handleToggleTheme = async (val: boolean) => {
        setIsDarkMode(val);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, val ? 'dark' : 'light');
        } catch (error) {
            console.error('Lỗi lưu theme vào storage:', error);
        }
    };

    const handleConfirmLogout = () => {
        setIsLogoutModalVisible(false);

    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Tài khoản & Cài đặt</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                        <User color={colors.primaryElement} size={28} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={[styles.profileName, { color: colors.text }]}>{user.name}</Text>
                        <Text style={[styles.profileEmail, { color: colors.textMuted }]}>{user.email}</Text>
                    </View>
                </View>

                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>GIAO DIỆN</Text>
                <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            {isDarkMode ? <Moon color={colors.primary} size={20} /> : <Sun color={colors.primary} size={20} />}
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Chế độ {isDark ? 'tối' : 'sáng'}</Text>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={(val) => toggleTheme(val)}
                            trackColor={{ false: colors.border, true: colors.primary }}
                        />
                    </View>
                </View>

                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>BẢO MẬT</Text>
                <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <TouchableOpacity
                        style={styles.row}
                        activeOpacity={0.7}
                        onPress={() => router.push('/change-password')}
                    >
                        <View style={styles.rowLeft}>
                            <KeyRound color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Đổi mật khẩu</Text>
                        </View>
                        <ChevronRight color={colors.textMuted} size={20} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.logoutBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                    activeOpacity={0.7}
                    onPress={() => setIsLogoutModalVisible(true)}
                >
                    <LogOut color="#EF4444" size={20} />
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>

            <ConfirmModal
                visible={isLogoutModalVisible}
                type="danger"
                title="Đăng xuất"
                message="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?"
                confirmText="Đăng xuất"
                cancelText="Hủy"
                onConfirm={handleConfirmLogout}
                onCancel={() => setIsLogoutModalVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.two,
        paddingBottom: Spacing.three,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    scrollContent: {
        paddingHorizontal: Spacing.four,
        paddingBottom: Spacing.six * 2,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.four,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        marginBottom: Spacing.four,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInfo: {
        marginLeft: Spacing.three,
        flex: 1,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    profileEmail: {
        fontSize: 13,
        fontFamily: Fonts.sans,
        marginTop: 2,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        letterSpacing: 1,
        marginBottom: Spacing.two,
        marginTop: Spacing.two,
    },
    group: {
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        marginBottom: Spacing.three,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.three,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
    },
    rowLabel: {
        fontSize: 15,
        fontFamily: Fonts.sans,
        fontWeight: '500',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.two,
        paddingVertical: Spacing.three,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        marginTop: Spacing.four,
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
});