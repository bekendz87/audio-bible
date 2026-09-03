import { Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import { usePlayerStore } from '@/store/usePlayerStore';
import { Chapter } from '@/types/bible';
import { BookOpen, Compass, Flame, Heart, Play } from 'lucide-react-native';
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
        audioUrl: 'https://example.com/audio/matthew-5.mp3',
        reader: 'Giọng đọc Nam',
    },
];

export default function HomeScreen() {
    const colors = useThemeColors();
    const { setCurrentChapter } = usePlayerStore();

    const handlePlay = (chapter: Chapter) => {
        setCurrentChapter(chapter);
    };

    const { playTrack } = useAudio();

    const handlePlayAudio = () => {
        playTrack({
            id: 'gen-1',
            title: 'Sáng Khải Huyền - Chương 1',
            subtitle: 'Sách Khải Huyền',
            audioUrl: 'https://s3.us-west-1.wasabisys.com/thanhlinh.net/drupal_files/2024-11/1307--khai-huyen---01.mp3',
            artworkUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=300',
            duration: 372,
        });
    };
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="default" />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <Text style={[styles.greeting, { color: colors.text }]}>Chào buổi sáng</Text>
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
                    onPress={() => handlePlayAudio()}
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
                        <Play color={colors.primaryElement} size={24} fill={colors.primaryElement} />
                    </View>
                </TouchableOpacity>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Chủ đề nổi bật</Text>
                <View style={styles.categoryGrid}>
                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <Flame color="#F59E0B" size={24} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Bình An</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <BookOpen color="#3B82F6" size={24} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Cựu Ước</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <Compass color="#10B981" size={24} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Tân Ước</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                    >
                        <Heart color="#EC4899" size={24} />
                        <Text style={[styles.categoryText, { color: colors.text }]}>Cầu Nguyện</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Gợi ý cho bạn</Text>
                {RECOMMENDED_CHAPTERS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.listItem,
                            { backgroundColor: colors.card, borderColor: colors.border },
                        ]}
                        onPress={() => handlePlayAudio()}
                    >
                        <View style={styles.listInfo}>
                            <Text style={[styles.listTitle, { color: colors.text }]}>
                                {item.bookName} - Chương {item.chapterNum}
                            </Text>
                            <Text style={[styles.listSub, { color: colors.textMuted }]}>
                                {item.reader} • {item.duration}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => handlePlayAudio()} style={styles.listPlayBtn}>
                            <Play color={colors.primary} size={20} fill={colors.primary} />
                        </TouchableOpacity>
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
    scrollContent: {
        padding: Spacing.four,
        paddingBottom: Spacing.six * 2,
    },
    header: {
        marginTop: Spacing.three,
        marginBottom: Spacing.six,
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
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: Fonts.sans,
        marginBottom: Spacing.three,
        marginTop: Spacing.four,
    },
    banner: {
        borderRadius: 16,
        padding: Spacing.five,
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
        borderRadius: 12,
        padding: Spacing.four,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        borderWidth: 1,
    },
    categoryText: {
        fontWeight: '500',
        fontFamily: Fonts.sans,
    },
    listItem: {
        borderRadius: 12,
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
        fontSize: 16,
        fontWeight: '500',
        fontFamily: Fonts.sans,
    },
    listSub: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        marginTop: Spacing.half,
    },
    listPlayBtn: {
        padding: Spacing.two,
    },
});