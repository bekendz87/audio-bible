import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Chapter } from '@/types/bible';
import { useRouter } from 'expo-router';
import { BookOpen, Compass, Flame, Heart, Play, Sparkles } from 'lucide-react-native';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const RECENT_CHAPTER: Chapter = {
    id: '1',
    bookName: 'Khải Huyền',
    chapterNum: 23,
    duration: '02:30',
    audioUrl: 'https://s3.us-west-1.wasabisys.com/thanhlinh.net/drupal_files/2024-11/1307--khai-huyen---01.mp3',
    reader: 'Giọng đọc Nam',
};

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
    const { setCurrentChapter } = usePlayerStore();
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
        setCurrentChapter(chapter);

        if (currentTrack?.id === chapter.id) {
            togglePlayPause();
        } else {
            playTrack({
                id: chapter.id,
                title: `${chapter.bookName} - Chương ${chapter.chapterNum}`,
                subtitle: chapter.reader,
                audioUrl: chapter.audioUrl,
                artworkUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=300',
                duration: 300,
            });
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="default" />
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

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Tiếp tục nghe</Text>
                <TouchableOpacity
                    style={[
                        styles.banner,
                        {
                            backgroundColor: colors.card,
                            borderColor: colors.border,
                        },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => handlePlayChapter(RECENT_CHAPTER)}
                >
                    <View style={styles.bannerInfo}>
                        <Text style={[styles.bannerTag, { color: colors.primary }]}>ĐANG NGHE DỞ</Text>
                        <Text style={[styles.bannerTitle, { color: colors.text }]}>
                            {RECENT_CHAPTER.bookName} - Chương {RECENT_CHAPTER.chapterNum}
                        </Text>
                        <Text style={[styles.bannerSub, { color: colors.textMuted }]}>
                            {RECENT_CHAPTER.reader} • {RECENT_CHAPTER.duration}
                        </Text>
                    </View>
                    <View style={[styles.playButtonCircle, { backgroundColor: colors.primary }]}>
                        <Play color={colors.primaryElement} size={22} fill={colors.primaryElement} style={{ marginLeft: 2 }} />
                    </View>
                </TouchableOpacity>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Chủ đề nổi bật</Text>
                <View style={styles.categoryGrid}>
                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/explore' as any)}
                    >
                        <Flame color="#F59E0B" size={24} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Bình An</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/bible' as any)}
                    >
                        <BookOpen color="#3B82F6" size={24} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Cựu Ước</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/bible' as any)}
                    >
                        <Compass color="#10B981" size={24} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Tân Ước</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/explore' as any)}
                    >
                        <Heart color="#EC4899" size={24} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Cầu Nguyện</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Gợi ý cho bạn</Text>
                {RECOMMENDED_CHAPTERS.map((item) => {
                    const isItemPlaying = currentTrack?.id === item.id && isPlaying;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.listItem,
                                { backgroundColor: colors.card, borderColor: colors.border },
                            ]}
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: Fonts.sans,
        marginBottom: Spacing.three,
        marginTop: Spacing.four,
    },
    banner: {
        borderRadius: BorderRadius.lg,
        padding: Spacing.four,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
    },
    bannerInfo: {
        flex: 1,
    },
    bannerTag: {
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        letterSpacing: 1,
        marginBottom: Spacing.one,
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    bannerSub: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        marginTop: Spacing.one,
    },
    playButtonCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: Spacing.four,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        borderWidth: 1,
    },
    categoryText: {
        fontWeight: '600',
        fontSize: 14,
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