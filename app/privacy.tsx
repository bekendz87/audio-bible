import { Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyScreen() {
    const colors = useThemeColors();
    const router = useRouter();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Quay lại">
                        <ArrowLeft color={colors.text} size={24} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: colors.text }]}>Chính sách bảo mật</Text>
                </View>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={[styles.updated, { color: colors.textMuted }]}>Cập nhật lần cuối: 08/09/2026</Text>
                    <Text style={[styles.heading, { color: colors.text }]}>Dữ liệu chúng tôi sử dụng</Text>
                    <Text style={[styles.body, { color: colors.textSecondary }]}>Ứng dụng chỉ sử dụng thông tin cần thiết để cung cấp tài khoản, lưu tùy chọn giao diện và cải thiện trải nghiệm nghe audio.</Text>
                    <Text style={[styles.heading, { color: colors.text }]}>Quyền kiểm soát của bạn</Text>
                    <Text style={[styles.body, { color: colors.textSecondary }]}>Bạn có thể thay đổi cài đặt thông báo, giao diện hoặc đăng xuất bất cứ lúc nào trong mục Cài đặt. Dữ liệu cục bộ sẽ không được chia sẻ cho bên thứ ba.</Text>
                </ScrollView>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        padding: Spacing.four
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        fontFamily: Fonts.sans
    },
    content: {
        padding: Spacing.four,
        gap: Spacing.three
    },
    updated: {
        fontSize: 13,
        fontFamily: Fonts.sans
    },
    heading: {
        fontSize: 17,
        fontWeight: '700',
        fontFamily: Fonts.sans,
        marginTop: Spacing.two
    },
    body: {
        fontSize: 15,
        lineHeight: 24,
        fontFamily: Fonts.sans
    },
});
