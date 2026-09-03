import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { Play, Search, Sparkles, X } from 'lucide-react-native';
import { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const MOODS = ['Bình an', 'Hi vọng', 'Cầu nguyện', 'Tạ ơn', 'Sức mạnh', 'Yêu thương'];

const COLLECTIONS = [
  { id: 'c1', title: 'Chương hay nhất về Thi Thiên', count: '10 bài audio • Tuyển chọn' },
  { id: 'c2', title: 'Lời hứa cho cuộc sống', count: '15 bài audio • Tuyển chọn' },
  { id: 'c3', title: 'Lời Chúa mỗi ngày', count: '30 bài audio • Tuyển chọn' },
];

const MOCK_AUDIO_DATA = [
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
    title: 'Suy Tẫm & Bình An',
    subtitle: 'Chương 2: Lời hứa ban sức mạnh',
    artworkUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 1200,
  },
];

export default function ExploreScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { playTrack } = useAudio();
  const [query, setQuery] = useState('');

  const filteredResults = query.trim()
    ? MOCK_AUDIO_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Khám Phá</Text>
      </View>

      <View
        style={[
          styles.searchBox,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Search color={colors.textMuted} size={20} />
        <TextInput
          placeholder="Tìm sách, chương, chủ đề..."
          placeholderTextColor={colors.textMuted}
          style={[styles.searchInput, { color: colors.text }]}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <X color={colors.textMuted} size={18} />
          </TouchableOpacity>
        )}
      </View>

      {query.trim().length > 0 ? (
        <View style={styles.searchResultsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Kết quả tìm kiếm</Text>
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: Spacing.two }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => playTrack(item)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.artworkUrl }} style={styles.resultImage} />
                <View style={styles.resultInfo}>
                  <Text style={[styles.resultTitle, { color: colors.text }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={[styles.resultSub, { color: colors.textMuted }]} numberOfLines={1}>
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
            ListEmptyComponent={
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                Không tìm thấy bài audio phù hợp.
              </Text>
            }
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Nghe theo tâm trạng</Text>
          <View style={styles.chipGrid}>
            {MOODS.map((mood, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.moodChip,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={() => setQuery(mood)}
              >
                <Sparkles color={colors.primary} size={16} />
                <Text style={[styles.moodText, { color: colors.text }]}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Bộ sưu tập nổi bật</Text>
          <View style={styles.collectionGrid}>
            {COLLECTIONS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.collectionCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
                onPress={() => router.push(`/book/${item.id}`)}
              >
                <Text style={[styles.collectionTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.collectionSub, { color: colors.textMuted }]}>
                  {item.count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
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
    marginBottom: Spacing.three,
    paddingHorizontal: Spacing.three,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.sans,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.six * 2,
  },
  searchResultsContainer: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.sans,
    marginTop: Spacing.four,
    marginBottom: Spacing.three,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: Spacing.one,
  },
  moodText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: Fonts.sans,
  },
  collectionGrid: {
    gap: Spacing.two,
  },
  collectionCard: {
    padding: Spacing.four,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.sans,
  },
  collectionSub: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    marginTop: Spacing.half,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.two,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.three,
  },
  resultImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Fonts.sans,
  },
  resultSub: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    marginTop: 2,
  },
  playBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: Fonts.sans,
    marginTop: Spacing.four,
    textAlign: 'center',
  },
});