import { ShareData, ShareModal } from '@/components/ui/ShareModal';
import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import { AlertApp } from '@/services/alert';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, Clock, Play, Share2 } from 'lucide-react-native';
import { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const CHAPTERS = [
    {
        id: 'c1',
        title: 'Chương 1: Giới thiệu và Khởi đầu',
        subtitle: 'Thời lượng: 15 phút',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 900,
    },
    {
        id: 'c2',
        title: 'Chương 2: Nguyên lý cốt lõi',
        subtitle: 'Thời lượng: 25 phút',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 1500,
    },
    {
        id: 'c3',
        title: 'Chương 3: Thực hành và Áp dụng',
        subtitle: 'Thời lượng: 20 phút',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: 1200,
    },
];

export default function BookDetailScreen() {
    const { id } = useLocalSearchParams();
    const colors = useThemeColors();
    const router = useRouter();
    const { playTrack, currentTrack } = useAudio();

    const [shareData, setShareData] = useState<ShareData | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const bookDetail = {
        id,
        title: 'Thiết Kế Hệ Thống Microservices',
        author: 'Nguyễn Văn A',
        artworkUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600',
        description:
            'Cuốn sách hướng dẫn chi tiết cách xây dựng hệ thống phân tán, tối ưu hóa microservices với Spring Boot, Spring Cloud Gateway và cách triển khai trên hệ thống Linux.',
    };

    const handlePlayChapter = (chapter: (typeof CHAPTERS)[0]) => {
        playTrack({
            id: chapter.id,
            title: bookDetail.title,
            subtitle: chapter.title,
            artworkUrl: bookDetail.artworkUrl,
            audioUrl: chapter.audioUrl,
            duration: chapter.duration,
        });
    };

    const handleOpenShare = () => {
        setShareData({
            title: bookDetail.title,
            subtitle: `Tác giả: ${bookDetail.author}`,
            url: `https://kinhthanh.app/book/${bookDetail.id}`,
        });
    };

    const handleBookMarked = () => {
        const nextState = !isBookmarked;
        setIsBookmarked(nextState);

        if (nextState) {
            AlertApp.success("Đã thêm vào sách yêu thích");
            return
        } else {
            AlertApp.error("Đã xóa khỏi sách yêu thích");
            return
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
                    <ArrowLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconBtn} hitSlop={8} onPress={handleBookMarked}>
                        <Bookmark
                            color={isBookmarked ? colors.primary : colors.text}
                            fill={isBookmarked ? colors.primary : 'transparent'}
                            size={22}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOpenShare} style={styles.iconBtn} hitSlop={8}>
                        <Share2 color={colors.text} size={22} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={CHAPTERS}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.bookHeader}>
                        <Image source={{ uri: bookDetail.artworkUrl }} style={styles.artwork} />
                        <Text style={[styles.title, { color: colors.text }]}>{bookDetail.title}</Text>
                        <Text style={[styles.author, { color: colors.textMuted }]}>
                            Tác giả: {bookDetail.author}
                        </Text>

                        <TouchableOpacity
                            style={[styles.mainPlayBtn, { backgroundColor: colors.primary }]}
                            onPress={() => handlePlayChapter(CHAPTERS[0])}
                            activeOpacity={0.8}
                        >
                            <Play color={colors.primaryElement} size={20} style={{ marginLeft: 2 }} />
                            <Text style={[styles.mainPlayText, { color: colors.primaryElement }]}>
                                Phát từ đầu
                            </Text>
                        </TouchableOpacity>

                        <Text style={[styles.description, { color: colors.textMuted }]}>
                            {bookDetail.description}
                        </Text>

                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Danh sách chương ({CHAPTERS.length})
                        </Text>
                    </View>
                }
                renderItem={({ item, index }) => {
                    const isCurrent = currentTrack?.id === item.id;

                    return (
                        <TouchableOpacity
                            style={[
                                styles.chapterItem,
                                {
                                    backgroundColor: isCurrent ? colors.card : 'transparent',
                                    borderColor: colors.border,
                                },
                            ]}
                            onPress={() => handlePlayChapter(item)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.indexText, { color: colors.textMuted }]}>
                                {index + 1}
                            </Text>
                            <View style={styles.chapterInfo}>
                                <Text
                                    style={[
                                        styles.chapterTitle,
                                        { color: isCurrent ? colors.primary : colors.text },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.title}
                                </Text>
                                <View style={styles.timeRow}>
                                    <Clock color={colors.textMuted} size={12} />
                                    <Text style={[styles.chapterTime, { color: colors.textMuted }]}>
                                        {item.subtitle}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.playCircle, { backgroundColor: colors.card }]}
                                onPress={() => handlePlayChapter(item)}
                            >
                                <Play color={colors.primary} size={16} style={{ marginLeft: 2 }} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
                contentContainerStyle={styles.listContent}
            />

            <ShareModal
                visible={!!shareData}
                data={shareData}
                onClose={() => setShareData(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.four,
        height: 52,
    },
    headerActions: {
        flexDirection: 'row',
        gap: Spacing.two,
    },
    iconBtn: {
        padding: Spacing.two,
    },
    listContent: {
        paddingHorizontal: Spacing.four,
        paddingBottom: Spacing.six,
    },
    bookHeader: {
        alignItems: 'center',
        marginTop: Spacing.two,
        marginBottom: Spacing.four,
    },
    artwork: {
        width: 160,
        height: 160,
        borderRadius: BorderRadius.xl,
        marginBottom: Spacing.four,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        textAlign: 'center',
    },
    author: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        marginTop: Spacing.one,
    },
    mainPlayBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
        paddingHorizontal: Spacing.six,
        paddingVertical: Spacing.three,
        borderRadius: BorderRadius.full,
        marginTop: Spacing.four,
    },
    mainPlayText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    description: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        lineHeight: 20,
        textAlign: 'center',
        marginVertical: Spacing.four,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        alignSelf: 'flex-start',
        marginTop: Spacing.two,
    },
    chapterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.three,
        paddingHorizontal: Spacing.three,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        marginBottom: Spacing.two,
        gap: Spacing.three,
    },
    indexText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        width: 20,
    },
    chapterInfo: {
        flex: 1,
    },
    chapterTitle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    chapterTime: {
        fontSize: 12,
        fontFamily: Fonts.sans,
    },
    playCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
});