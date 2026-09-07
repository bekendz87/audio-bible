import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import {
    Bookmark,
    Clock,
    DownloadCloud,
    Headphones,
    MoreVertical,
    Pause,
    Play
} from 'lucide-react-native';
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

const SAVED_ITEMS = [
    {
        id: '1',
        title: 'Sáng Thế Ký - Chương 1',
        subtitle: 'Sách Sáng Thế Ký',
        duration: '05:12',
        artworkUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: '2',
        title: 'Ma-thi-ơ - Chương 5',
        subtitle: 'Bài giảng trên núi',
        duration: '08:45',
        artworkUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
];

const HISTORY_ITEMS = [
    {
        id: '3',
        title: 'Khải Huyền - Chương 23',
        subtitle: 'Nghe lần cuối 2 giờ trước',
        duration: '06:10',
        artworkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
];

type TabType = 'saved' | 'history' | 'downloaded';

export default function LibraryScreen() {
    const colors = useThemeColors();
    const { currentTrack, isPlaying, togglePlayPause, playTrack } = useAudio();
    const [activeTab, setActiveTab] = useState<TabType>('saved');

    const getListData = () => {
        switch (activeTab) {
            case 'saved':
                return SAVED_ITEMS;
            case 'history':
                return HISTORY_ITEMS;
            case 'downloaded':
                return SAVED_ITEMS.slice(0, 1); 
            default:
                return [];
        }
    };

    const handleItemPress = (item: typeof SAVED_ITEMS[0]) => {
        if (currentTrack?.id === item.id) {
            togglePlayPause();
        } else {
            playTrack({
                id: item.id,
                title: item.title,
                subtitle: item.subtitle,
                audioUrl: item.audioUrl,
                artworkUrl: item.artworkUrl,
            });
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Thư viện của tôi</Text>
            </View>

            <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        activeTab === 'saved' && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
                    ]}
                    onPress={() => setActiveTab('saved')}
                >
                    <Bookmark
                        size={18}
                        color={activeTab === 'saved' ? colors.primary : colors.textMuted}
                    />
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'saved' ? colors.primary : colors.textMuted },
                        ]}
                    >
                        Đã lưu
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        activeTab === 'history' && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
                    ]}
                    onPress={() => setActiveTab('history')}
                >
                    <Clock
                        size={18}
                        color={activeTab === 'history' ? colors.primary : colors.textMuted}
                    />
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'history' ? colors.primary : colors.textMuted },
                        ]}
                    >
                        Lịch sử
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        activeTab === 'downloaded' && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
                    ]}
                    onPress={() => setActiveTab('downloaded')}
                >
                    <DownloadCloud
                        size={18}
                        color={activeTab === 'downloaded' ? colors.primary : colors.textMuted}
                    />
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'downloaded' ? colors.primary : colors.textMuted },
                        ]}
                    >
                        Tải về
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={getListData()}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Headphones size={48} color={colors.textMuted} />
                        <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                            Chưa có nội dung nào ở mục này
                        </Text>
                    </View>
                }
                renderItem={({ item }) => {
                    const isCurrentPlaying = currentTrack?.id === item.id && isPlaying;

                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={[styles.trackCard, { backgroundColor: colors.card }]}
                            onPress={() => handleItemPress(item)}
                        >
                            <Image source={{ uri: item.artworkUrl }} style={styles.artwork} />

                            <View style={styles.trackInfo}>
                                <Text numberOfLines={1} style={[styles.trackTitle, { color: colors.text }]}>
                                    {item.title}
                                </Text>
                                <Text numberOfLines={1} style={[styles.trackSubtitle, { color: colors.textMuted }]}>
                                    {item.subtitle} • {item.duration}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.playActionBtn,
                                    { backgroundColor: isCurrentPlaying ? colors.primary : colors.background },
                                ]}
                                onPress={() => handleItemPress(item)}
                            >
                                {isCurrentPlaying ? (
                                    <Pause size={18} color={colors.primaryElement} />
                                ) : (
                                    <Play size={18} color={colors.primary} style={{ marginLeft: 2 }} />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.moreBtn}>
                                <MoreVertical size={20} color={colors.textMuted} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
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
        paddingBottom: Spacing.two,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.four,
        borderBottomWidth: 1,
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 12,
        marginRight: Spacing.four,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    listContent: {
        padding: Spacing.four,
        paddingBottom: 100, 
        gap: Spacing.two,
    },
    trackCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.two,
        borderRadius: BorderRadius.lg,
    },
    artwork: {
        width: 52,
        height: 52,
        borderRadius: BorderRadius.md,
    },
    trackInfo: {
        flex: 1,
        marginLeft: Spacing.three,
        justifyContent: 'center',
    },
    trackTitle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    trackSubtitle: {
        fontSize: 12,
        marginTop: 3,
        fontFamily: Fonts.sans,
    },
    playActionBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Spacing.one,
    },
    moreBtn: {
        padding: Spacing.one,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    emptyText: {
        fontSize: 14,
        fontFamily: Fonts.sans,
    },
});