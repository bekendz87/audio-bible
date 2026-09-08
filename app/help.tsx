import { Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, BookOpen, Headphones, Search } from 'lucide-react-native';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tips = [
    { icon: BookOpen, title: 'Chọn sách và chương', body: 'Mở  Kinh Thánh, chọn sách rồi chạm vào số chương để bắt đầu nghe.' },
    { icon: Headphones, title: 'Điều khiển audio', body: 'Trình phát luôn nằm phía trên thanh tab. Chạm vào để mở trình phát đầy đủ.' },
    { icon: Search, title: 'Tìm kiếm nhanh', body: 'Dùng ô tìm kiếm ở Kinh Thánh hoặc Khám phá để lọc nội dung.' },
];

export default function HelpScreen() {
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
                    <Text style={[styles.title, { color: colors.text }]}>Hướng dẫn sử dụng</Text>
                </View>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={[styles.intro, { color: colors.textSecondary }]}>Một vài hướng dẫn nhanh để bạn bắt đầu hành trình lắng nghe Lời Chúa.</Text>
                    {tips.map(({ icon: Icon, title, body }) => (
                        <View key={title} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                            <Icon color={colors.primary} size={24} />
                            <View style={styles.cardText}>
                                <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
                                <Text style={[styles.body, { color: colors.textSecondary }]}>{body}</Text>
                            </View>
                        </View>
                    ))}
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
    intro: {
        fontSize: 15,
        lineHeight: 23,
        fontFamily: Fonts.sans,
        marginBottom: Spacing.two
    },
    card: {
        flexDirection: 'row',
        gap: Spacing.three,
        padding: Spacing.three,
        borderRadius: 16,
        borderWidth: 1
    },
    cardText: {
        flex: 1,
        gap: Spacing.one
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: Fonts.sans
    },
    body: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: Fonts.sans
    },
});
