import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import { Chapter } from '@/types/bible';
import { useRouter } from 'expo-router';
import {
    BookOpen,
    ChevronRight,
    Compass,
    Flame,
    Heart,
    Pause,
    Play,
    Sparkles,
} from 'lucide-react-native';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const RECENT_CHAPTER = {
    id: '1',
    bookName: 'Khải Huyền',
    chapterNum: 23,
    duration: '02:30',
    audioUrl: 'https://s3.us-west-1.wasabisys.com/thanhlinh.net/drupal_files/2024-11/1307--khai-huyen---01.mp3',
    reader: 'Giọng đọc Nam',
    artworkUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFpqqqQ32bB83J9Zi2k2Gl34ykZSI1-2H6hdohpApaLN8HuRJsK4cRJaA&s=10',
};

const FEATURED_BOOKS = [
    {
        id: 'sang-the-ky',
        title: 'Sáng Thế Ký',
        subtitle: '50 Chương • Sáng tạo & Lịch sử',
        artworkUrl: 'https://cdn11.bigcommerce.com/s-loazqf80j9/images/stencil/1280x1280/products/283/1020/KPSSTK__84210.1521541044.1280.1280__79025.1521635075.jpg?c=2',
    },
    {
        id: 'thi-thien',
        title: 'Thi Thiên',
        subtitle: '150 Chương • Thơ ca & Tôn vinh',
        artworkUrl: 'https://cdn11.bigcommerce.com/s-loazqf80j9/product_images/uploaded_images/gen-n-z6956899887652-4e9a7b6b7f259f814f0ba1b6807c0840.jpg',
    },
    {
        id: 'ma-thi-o',
        title: 'Ma-thi-ơ',
        subtitle: '28 Chương • Tin Lành Cứu Rỗi',
        artworkUrl: 'https://httlvn.org/wp-content/uploads/2018/06/PA-Ma-thi-%C6%A1.jpg',
    },
    {
        id: 'cham-ngon',
        title: 'Châm Ngôn',
        subtitle: '31 Chương • Triết lý Khôn ngoan',
        artworkUrl: 'https://cdn11.bigcommerce.com/s-loazqf80j9/product_images/uploaded_images/img-1595.jpg',
    },
];

const RECOMMENDED_CHAPTERS: Chapter[] = [
    {
        id: '2',
        bookName: 'Khải Huyền',
        chapterNum: 1,
        duration: '05:12',
        audioUrl: 'https://s3.us-west-1.wasabisys.com/thanhlinh.net/drupal_files/2024-11/1307--khai-huyen---01.mp3',
        reader: 'Giọng đọc Nữ',
    },
    {
        id: '3',
        bookName: 'Ma-thi-ơ',
        chapterNum: 5,
        duration: '04:15',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        reader: 'Giọng đọc Nam',
    },
    {
        id: '4',
        bookName: 'Thi Thiên',
        chapterNum: 23,
        duration: '03:10',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        reader: 'Giọng đọc Nam',
    },
];

export default function HomeScreen() {
    const colors = useThemeColors();
    const router = useRouter();
    const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return 'Chào buổi sáng';
        }

        if (hour < 18) {
            return 'Chào buổi chiều';
        }

        return 'Chào buổi tối';
    };

    const handlePlayChapter = (chapter: Chapter) => {
        if (currentTrack?.id === chapter.id) {
            togglePlayPause();
        } else {
            playTrack({
                id: chapter.id,
                title: `${chapter.bookName} - Chương ${chapter.chapterNum}`,
                subtitle: chapter.reader,
                audioUrl: chapter.audioUrl,
                artworkUrl: RECENT_CHAPTER.artworkUrl,
                duration: 300,
            });
        }
    };

    const isRecentPlaying = currentTrack?.id === RECENT_CHAPTER.id && isPlaying;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <View style={styles.greetingRow}>
                        <Text style={[styles.greeting, { color: colors.text }]}>{getGreeting()}</Text>
                        <Sparkles size={20} color={colors.primary} />
                    </View>
                    <Text style={[styles.subGreeting, { color: colors.textMuted }]}>
                        "Lời Chúa là ngọn đèn cho chân tôi, ánh sáng cho đường lối tôi"
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handlePlayChapter(RECENT_CHAPTER as any)}
                >
                    <ImageBackground
                        source={{ uri: RECENT_CHAPTER.artworkUrl }}
                        style={styles.heroBanner}
                        imageStyle={{ borderRadius: BorderRadius.xl }}
                    >
                        <View style={styles.heroOverlay}>
                            <View style={styles.heroInfo}>
                                <View style={[styles.tagBadge, { backgroundColor: colors.primary }]}>
                                    <Text style={[styles.tagText, { color: colors.primaryElement }]}>ĐANG NGHE DỞ</Text>
                                </View>
                                <Text style={styles.heroTitle}>
                                    {RECENT_CHAPTER.bookName} - Chương {RECENT_CHAPTER.chapterNum}
                                </Text>
                                <Text style={styles.heroSub}>
                                    {RECENT_CHAPTER.reader} • {RECENT_CHAPTER.duration}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={[styles.heroPlayBtn, { backgroundColor: colors.primary }]}
                                onPress={() => handlePlayChapter(RECENT_CHAPTER as any)}
                            >
                                {isRecentPlaying ? (
                                    <Pause color={colors.primaryElement} size={22} fill={colors.primaryElement} />
                                ) : (
                                    <Play color={colors.primaryElement} size={22} fill={colors.primaryElement} style={{ marginLeft: 2 }} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={styles.sectionHeaderRow}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Sách Nổi Bật</Text>
                    <TouchableOpacity
                        onPress={() => router.push({ pathname: '/explore', params: { category: 'all-books' } })}
                        style={styles.seeAllBtn}
                    >
                        <Text style={[styles.seeAllText, { color: colors.primary }]}>Xem tất cả</Text>
                        <ChevronRight color={colors.primary} size={16} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScroll}
                >
                    {FEATURED_BOOKS.map((book) => (
                        <TouchableOpacity
                            key={book.id}
                            style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                            activeOpacity={0.8}
                            onPress={() => router.push(`/book/${book.id}`)}
                        >
                            <Image source={{ uri: book.artworkUrl }} style={styles.bookArtwork} />
                            <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={1}>
                                {book.title}
                            </Text>
                            <Text style={[styles.bookSub, { color: colors.textMuted }]} numberOfLines={1}>
                                {book.subtitle}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Chủ đề nổi bật</Text>
                <View style={styles.categoryGrid}>
                    <TouchableOpacity
                        style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        activeOpacity={0.7}
                        onPress={() => router.push({ pathname: '/explore', params: { topic: 'binh-an' } })}
                    >
                        <Flame color="#F59E0B" size={22} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Bình An</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        activeOpacity={0.7}
                        onPress={() => router.push({ pathname: '/bible', params: { testament: 'old' } })}
                    >
                        <BookOpen color="#3B82F6" size={22} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Cựu Ước</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        activeOpacity={0.7}
                        onPress={() => router.push({ pathname: '/bible', params: { testament: 'new' } })}
                    >
                        <Compass color="#10B981" size={22} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Tân Ước</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        activeOpacity={0.7}
                        onPress={() => router.push({ pathname: '/explore', params: { topic: 'cau-nguyen' } })}
                    >
                        <Heart color="#EC4899" size={22} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Cầu Nguyện</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Gợi ý cho bạn</Text>
                {RECOMMENDED_CHAPTERS.map((item) => {
                    const isItemPlaying = currentTrack?.id === item.id && isPlaying;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.listItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                            activeOpacity={0.7}
                            onPress={() => handlePlayChapter(item)}
                        >
                            <View style={styles.listInfo}>
                                <Text style={[styles.listTitle, { color: colors.text }]}>
                                    {item.bookName} - Chương {item.chapterNum}
                                </Text>
                                <Text style={[styles.listSub, { color: colors.textMuted }]}>
                                    {item.reader} • {item.duration}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handlePlayChapter(item)}
                                style={[styles.listPlayBtn, { backgroundColor: colors.backgroundElement }]}
                            >
                                <Play
                                    color={colors.primary}
                                    size={16}
                                    fill={isItemPlaying ? colors.primary : 'transparent'}
                                    style={{ marginLeft: 2 }}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                })}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.two,
        paddingBottom: 120,
    },
    header: {
        marginTop: Spacing.two,
        marginBottom: Spacing.four,
    },
    greetingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    subGreeting: {
        fontSize: 12,
        fontStyle: 'italic',
        fontFamily: Fonts.sans,
        marginTop: Spacing.one,
        lineHeight: 18,
    },
    heroBanner: {
        height: 160,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginBottom: Spacing.four,
    },
    heroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        padding: Spacing.four,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    heroInfo: {
        flex: 1,
        marginRight: Spacing.two,
    },
    tagBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: Spacing.two,
        paddingVertical: 3,
        borderRadius: BorderRadius.sm,
        marginBottom: Spacing.two,
    },
    tagText: {
        fontSize: 9,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        letterSpacing: 0.8,
    },
    heroTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    heroSub: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontFamily: Fonts.sans,
        marginTop: 2,
    },
    heroPlayBtn: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.two,
        marginBottom: Spacing.one,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: Fonts.sans,
        marginTop: Spacing.three,
        marginBottom: Spacing.three,
    },
    seeAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    horizontalScroll: {
        gap: Spacing.three,
        paddingRight: Spacing.four,
        marginBottom: Spacing.three,
    },
    bookCard: {
        width: 140,
        borderRadius: BorderRadius.lg,
        padding: Spacing.two,
        borderWidth: 1,
    },
    bookArtwork: {
        width: '100%',
        height: 130,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.two,
    },
    bookTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    bookSub: {
        fontSize: 11,
        fontFamily: Fonts.sans,
        marginTop: 2,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: Spacing.three,
    },
    categoryCard: {
        width: '48.5%',
        borderRadius: BorderRadius.md,
        padding: Spacing.three,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
        borderWidth: 1,
    },
    categoryText: {
        fontWeight: '600',
        fontSize: 13,
        fontFamily: Fonts.sans,
    },
    listItem: {
        borderRadius: BorderRadius.md,
        padding: Spacing.four,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.two,
        borderWidth: 1,
    },
    listInfo: {
        flex: 1,
    },
    listTitle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    listSub: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        marginTop: Spacing.half,
    },
    listPlayBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
});