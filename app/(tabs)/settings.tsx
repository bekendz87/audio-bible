import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useTheme } from '@/context/ThemeContext';
import { useThemeColors } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import {
    Bell,
    ChevronRight,
    DownloadCloud,
    HelpCircle,
    Info,
    LogOut,
    Moon,
    ShieldCheck,
    Sun,
    User
} from 'lucide-react-native';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
    const { isDark, toggleTheme } = useTheme();
    const colors = useThemeColors();
    const router = useRouter();
    const { stop } = useAudio();

    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [autoDownload, setAutoDownload] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const user = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
    };

    const handleConfirmLogout = () => {
        stop();
        setIsLogoutModalVisible(false);
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Tài khoản & Cài đặt</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                    activeOpacity={0.7}
                    onPress={() => router.push('/profile' as any)}
                >
                    <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                        <User color={colors.primaryElement} size={28} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={[styles.profileName, { color: colors.text }]}>{user.name}</Text>
                        <Text style={[styles.profileEmail, { color: colors.textMuted }]}>{user.email}</Text>
                    </View>
                    <ChevronRight color={colors.textMuted} size={20} />
                </TouchableOpacity>

                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>GIAO DIỆN & ÂM THANH</Text>
                <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            {isDark ? <Moon color={colors.primary} size={20} /> : <Sun color={colors.primary} size={20} />}
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Chế độ {isDark ? 'tối' : 'sáng'}</Text>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={(val) => toggleTheme(val)}
                            trackColor={{ false: colors.border, true: colors.primary }}
                        />
                    </View>

                    {/* <View style={[styles.divider, { backgroundColor: colors.border }]} /> */}

                    {/* <TouchableOpacity style={styles.row} activeOpacity={0.7}>
                        <View style={styles.rowLeft}>
                            <Volume2 color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Giọng đọc mặc định</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={[styles.rowSubtext, { color: colors.textMuted }]}>Nam (Miền Nam)</Text>
                            <ChevronRight color={colors.textMuted} size={18} />
                        </View>
                    </TouchableOpacity> */}

                    {/* <View style={[styles.divider, { backgroundColor: colors.border }]} /> */}

                    {/* <TouchableOpacity style={styles.row} activeOpacity={0.7}>
                        <View style={styles.rowLeft}>
                            <Globe color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Ngôn ngữ Kinh Thánh</Text>
                        </View>
                        <View style={styles.rowRight}>
                            <Text style={[styles.rowSubtext, { color: colors.textMuted }]}>Tiếng Việt</Text>
                            <ChevronRight color={colors.textMuted} size={18} />
                        </View>
                    </TouchableOpacity> */}
                </View>

                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>DỮ LIỆU & THÔNG BÁO</Text>
                <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <DownloadCloud color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Tự động tải chương tiếp theo</Text>
                        </View>
                        <Switch
                            value={autoDownload}
                            onValueChange={setAutoDownload}
                            trackColor={{ false: colors.border, true: colors.primary }}
                        />
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Bell color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Thông báo Lời Chúa hằng ngày</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: colors.border, true: colors.primary }}
                        />
                    </View>
                </View>

                {/* <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>BẢO MẬT</Text>
                <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <TouchableOpacity
                        style={styles.row}
                        activeOpacity={0.7}
                        onPress={() => router.push('/change-password' as any)}
                    >
                        <View style={styles.rowLeft}>
                            <KeyRound color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Đổi mật khẩu</Text>
                        </View>
                        <ChevronRight color={colors.textMuted} size={18} />
                    </TouchableOpacity>
                </View> */}

                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>THÔNG TIN & HỖ TRỢ</Text>
                <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={() => router.push('/help' as any)}>
                        <View style={styles.rowLeft}>
                            <HelpCircle color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Hướng dẫn sử dụng</Text>
                        </View>
                        <ChevronRight color={colors.textMuted} size={18} />
                    </TouchableOpacity>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={() => router.push('/privacy' as any)}>
                        <View style={styles.rowLeft}>
                            <ShieldCheck color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Chính sách bảo mật</Text>
                        </View>
                        <ChevronRight color={colors.textMuted} size={18} />
                    </TouchableOpacity>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Info color={colors.primary} size={20} />
                            <Text style={[styles.rowLabel, { color: colors.text }]}>Phiên bản ứng dụng</Text>
                        </View>
                        <Text style={[styles.rowSubtext, { color: colors.textMuted }]}>v1.0.0</Text>
                    </View>
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
        paddingBottom: 120,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.four,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        marginBottom: Spacing.three,
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
        marginTop: Spacing.three,
    },
    group: {
        borderRadius: BorderRadius.md,
        borderWidth: 1,
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
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.one,
    },
    rowLabel: {
        fontSize: 15,
        fontFamily: Fonts.sans,
        fontWeight: '500',
    },
    rowSubtext: {
        fontSize: 13,
        fontFamily: Fonts.sans,
    },
    divider: {
        height: 1,
        marginLeft: Spacing.four,
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
        marginBottom: Spacing.four,
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
});