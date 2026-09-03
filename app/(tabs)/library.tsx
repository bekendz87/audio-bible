import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import { BookMarked, Download, History, Play } from 'lucide-react-native';
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

const HISTORY_DATA = [
    {
        id: '1',
        title: 'Thiết Kế Hệ Thống Microservices',
        subtitle: 'Chương 1: Tổng quan kiến trúc',
        artworkUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 1800,
    },
    {
        id: '2',
        title: 'Đắc Nhân Tâm',
        subtitle: 'Chương 2: Bí mật lớn nhất trong ứng xử',
        artworkUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 1200,
    },
];

export default function LibraryScreen() {
    const colors = useThemeColors();
    const { playTrack } = useAudio();
    const [activeTab, setActiveTab] = useState<'history' | 'saved' | 'downloaded'>('history');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Thư viện của tôi</Text>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        activeTab === 'history' && { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setActiveTab('history')}
                >
                    <History color={activeTab === 'history' ? colors.primaryElement : colors.text} size={16} />
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'history' ? colors.primaryElement : colors.text },
                        ]}
                    >
                        Đã nghe
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        activeTab === 'saved' && { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setActiveTab('saved')}
                >
                    <BookMarked color={activeTab === 'saved' ? colors.primaryElement : colors.text} size={16} />
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'saved' ? colors.primaryElement : colors.text },
                        ]}
                    >
                        Đã lưu
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tabItem,
                        activeTab === 'downloaded' && { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setActiveTab('downloaded')}
                >
                    <Download color={activeTab === 'downloaded' ? colors.primaryElement : colors.text} size={16} />
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'downloaded' ? colors.primaryElement : colors.text },
                        ]}
                    >
                        Đã tải
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={HISTORY_DATA}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.itemCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={() => playTrack(item)}
                        activeOpacity={0.7}
                    >
                        <Image source={{ uri: item.artworkUrl }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <Text style={[styles.itemSubtitle, { color: colors.textMuted }]} numberOfLines={1}>
                                {item.subtitle}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.playBtn, { backgroundColor: colors.primary }]}
                            onPress={() => playTrack(item)}
                        >
                            <Play color={colors.primaryElement} size={16} style={{ marginLeft: 2 }} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: Spacing.four, paddingTop: Spacing.two },
    title: { fontSize: 28, fontWeight: 'bold', fontFamily: Fonts.sans },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.four,
        marginVertical: Spacing.four,
        gap: Spacing.two,
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: BorderRadius.full,
    },
    tabText: { fontSize: 13, fontWeight: '600', fontFamily: Fonts.sans },
    listContent: { paddingHorizontal: Spacing.four, gap: Spacing.three },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.two,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        gap: Spacing.three,
    },
    image: { width: 56, height: 56, borderRadius: BorderRadius.md },
    info: { flex: 1 },
    itemTitle: { fontSize: 15, fontWeight: '600', fontFamily: Fonts.sans },
    itemSubtitle: { fontSize: 13, fontFamily: Fonts.sans, marginTop: 2 },
    playBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});