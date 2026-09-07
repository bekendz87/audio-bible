import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Chapter } from '@/types/bible';
import { BookOpen, ChevronRight, Play, Search, X } from 'lucide-react-native';
import { useState } from 'react';
import {
    FlatList,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const TESTAMENTS = [
    { id: 'old', name: 'Cựu Ước', booksCount: 39 },
    { id: 'new', name: 'Tân Ước', booksCount: 27 },
];

interface BookItem {
    id: string;
    name: string;
    testament: 'old' | 'new';
    chapters: number;
}

const BOOKS_MOCK: BookItem[] = [
    { id: 'gen', name: 'Sáng Thế Ký', testament: 'old', chapters: 50 },
    { id: 'exo', name: 'Xuất Ê-díp-tô Ký', testament: 'old', chapters: 40 },
    { id: 'psa', name: 'Thi Thiên', testament: 'old', chapters: 150 },
    { id: 'pro', name: 'Châm Ngôn', testament: 'old', chapters: 31 },
    { id: 'mat', name: 'Ma-thi-ơ', testament: 'new', chapters: 28 },
    { id: 'mar', name: 'Mác', testament: 'new', chapters: 16 },
    { id: 'luk', name: 'Lu-ca', testament: 'new', chapters: 24 },
    { id: 'jhn', name: 'Giăng', testament: 'new', chapters: 21 },
    { id: 'act', name: 'Công Vụ Các Sứ Đồ', testament: 'new', chapters: 28 },
    { id: 'rev', name: 'Khải Huyền', testament: 'new', chapters: 22 },
];

export default function BibleScreen() {
    const colors = useThemeColors();
    const { setCurrentChapter } = usePlayerStore();

    const [selectedTestament, setSelectedTestament] = useState<'old' | 'new'>('old');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBookModal, setSelectedBookModal] = useState<BookItem | null>(null);

    const filteredBooks = BOOKS_MOCK.filter((book) => {
        const matchesTestament = searchQuery.trim() ? true : book.testament === selectedTestament;
        const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTestament && matchesSearch;
    });

    const handlePlayChapter = (bookName: string, chapterNum: number) => {
        const sampleChapter: Chapter = {
            id: `${bookName}-${chapterNum}-${Date.now()}`,
            bookName,
            chapterNum,
            duration: '04:20',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            reader: 'Giọng đọc Nam',
        };
        setCurrentChapter(sampleChapter);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Kinh Thánh</Text>
            </View>

            <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Search color={colors.textMuted} size={18} />
                <TextInput
                    placeholder="Tìm tên sách..."
                    placeholderTextColor={colors.textMuted}
                    style={[styles.searchInput, { color: colors.text }]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={8}>
                        <X color={colors.textMuted} size={18} />
                    </TouchableOpacity>
                )}
            </View>

            {!searchQuery.trim() && (
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
            )}

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {filteredBooks.map((book) => (
                    <TouchableOpacity
                        key={book.id}
                        style={[
                            styles.bookCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => setSelectedBookModal(book)}
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
                                onPress={(e) => {
                                    e.stopPropagation();
                                    handlePlayChapter(book.name, 1);
                                }}
                            >
                                <Play color={colors.primary} size={16} fill={colors.primary} />
                            </TouchableOpacity>
                            <ChevronRight color={colors.textMuted} size={20} />
                        </View>
                    </TouchableOpacity>
                ))}

                {filteredBooks.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <BookOpen size={40} color={colors.textMuted} />
                        <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                            Không tìm thấy sách nào phù hợp.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <Modal visible={!!selectedBookModal} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>
                                {selectedBookModal?.name}
                            </Text>
                            <TouchableOpacity onPress={() => setSelectedBookModal(null)}>
                                <X color={colors.text} size={22} />
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.modalSub, { color: colors.textMuted }]}>
                            Chọn chương để nghe:
                        </Text>

                        <FlatList
                            data={Array.from({ length: selectedBookModal?.chapters || 0 }, (_, i) => i + 1)}
                            keyExtractor={(item) => item.toString()}
                            numColumns={5}
                            contentContainerStyle={styles.chapterGrid}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.chapterBtn, { backgroundColor: colors.background, borderColor: colors.border }]}
                                    onPress={() => {
                                        if (selectedBookModal) {
                                            handlePlayChapter(selectedBookModal.name, item);
                                            setSelectedBookModal(null);
                                        }
                                    }}
                                >
                                    <Text style={[styles.chapterText, { color: colors.text }]}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
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
        paddingBottom: Spacing.two,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Spacing.four,
        marginBottom: Spacing.two,
        paddingHorizontal: Spacing.three,
        height: 42,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        gap: Spacing.two,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
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
        paddingBottom: 120,
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
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        gap: Spacing.two,
    },
    emptyText: {
        fontSize: 14,
        fontFamily: Fonts.sans,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        borderTopLeftRadius: BorderRadius.lg,
        borderTopRightRadius: BorderRadius.lg,
        padding: Spacing.four,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    modalSub: {
        fontSize: 13,
        fontFamily: Fonts.sans,
        marginTop: Spacing.one,
        marginBottom: Spacing.three,
    },
    chapterGrid: {
        gap: Spacing.two,
        paddingBottom: Spacing.four,
    },
    chapterBtn: {
        flex: 1,
        aspectRatio: 1,
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BorderRadius.sm,
        borderWidth: 1,
    },
    chapterText: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
});