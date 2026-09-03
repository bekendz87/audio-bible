import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Chapter } from '@/types/bible';
import { ChevronRight, Play } from 'lucide-react-native';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const TESTAMENTS = [
    { id: 'old', name: 'Cựu Ước', booksCount: 39 },
    { id: 'new', name: 'Tân Ước', booksCount: 27 },
];

const BOOKS_MOCK = [
    { id: '1', name: 'Sáng Thế Ký', chapters: 50 },
    { id: '2', name: 'Xuất Ê-díp-tô Ký', chapters: 40 },
    { id: '3', name: 'Thi Thiên', chapters: 150 },
    { id: '4', name: 'Ma-thi-ơ', chapters: 28 },
    { id: '5', name: 'Mác', chapters: 16 },
];

export default function BibleScreen() {
    const colors = useThemeColors();
    const { setCurrentChapter } = usePlayerStore();
    const [selectedTestament, setSelectedTestament] = useState<'old' | 'new'>('old');

    const handlePlaySample = (bookName: string) => {
        const sampleChapter: Chapter = {
            id: Date.now().toString(),
            bookName,
            chapterNum: 1,
            duration: '04:20',
            audioUrl: 'https://example.com/audio/sample.mp3',
            reader: 'Giọng đọc Nam',
        };
        setCurrentChapter(sampleChapter);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Kinh Thánh</Text>
            </View>

            <View style={[styles.segmentContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                {TESTAMENTS.map((t) => {
                    const active = selectedTestament === t.id;
                    return (
                        <TouchableOpacity
                            key={t.id}
                            style={[
                                styles.segmentBtn,
                                active && { backgroundColor: colors.primary },
                            ]}
                            onPress={() => setSelectedTestament(t.id as 'old' | 'new')}
                        >
                            <Text
                                style={[
                                    styles.segmentText,
                                    { color: active ? colors.primaryElement : colors.textMuted },
                                ]}
                            >
                                {t.name} ({t.booksCount})
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {BOOKS_MOCK.map((book) => (
                    <TouchableOpacity
                        key={book.id}
                        style={[
                            styles.bookCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                    >
                        <View style={styles.bookInfo}>
                            <Text style={[styles.bookName, { color: colors.text }]}>{book.name}</Text>
                            <Text style={[styles.chapterCount, { color: colors.textMuted }]}>
                                {book.chapters} chương
                            </Text>
                        </View>
                        <View style={styles.actionRow}>
                            <TouchableOpacity
                                style={[styles.playBtn, { backgroundColor: colors.backgroundElement }]}
                                onPress={() => handlePlaySample(book.name)}
                            >
                                <Play color={colors.primary} size={16} fill={colors.primary} />
                            </TouchableOpacity>
                            <ChevronRight color={colors.textMuted} size={20} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    segmentContainer: {
        flexDirection: 'row',
        marginHorizontal: Spacing.four,
        marginBottom: Spacing.three,
        borderRadius: BorderRadius.lg,
        padding: 4,
        borderWidth: 1,
    },
    segmentBtn: {
        flex: 1,
        paddingVertical: Spacing.two,
        alignItems: 'center',
        borderRadius: BorderRadius.md,
    },
    segmentText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    scrollContent: {
        paddingHorizontal: Spacing.four,
        paddingBottom: Spacing.six * 2,
    },
    bookCard: {
        borderRadius: BorderRadius.md,
        padding: Spacing.four,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.two,
        borderWidth: 1,
    },
    bookInfo: {
        flex: 1,
    },
    bookName: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    chapterCount: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        marginTop: Spacing.half,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
    },
    playBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});