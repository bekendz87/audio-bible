import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { Pause, Play, X } from 'lucide-react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function MiniPlayer() {
    const colors = useThemeColors();
    const router = useRouter();
    const { currentTrack, isPlaying, togglePlayPause, stop, currentTime, duration } = useAudio();

    if (!currentTrack) {
        return null;
    }

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <View style={[styles.container, { borderColor: colors.border }]}>
            {/* backgroundColor: colors.card, */}
            <View style={[styles.progressBarBackground,]}>
                {/* { backgroundColor: colors.border } */}
                <View
                    style={[
                        styles.progressBarFill,
                        { backgroundColor: colors.primary, width: `${Math.min(progressPercentage, 100)}%` },
                    ]}
                />
            </View>

            <TouchableOpacity
                style={styles.content}
                activeOpacity={0.9}
                onPress={() => router.push('/player' as never)}
            >
                <Image
                    source={{
                        uri:
                            currentTrack.artworkUrl ||
                            'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=300',
                    }}
                    style={styles.artwork}
                />

                <View style={styles.info}>
                    <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
                        {currentTrack.title}
                    </Text>
                    <Text numberOfLines={1} style={[styles.subtitle, { color: colors.textMuted }]}>
                        {currentTrack.subtitle}
                    </Text>
                </View>

                <TouchableOpacity style={styles.actionBtn} onPress={togglePlayPause}>
                    {isPlaying ? (
                        <Pause color={colors.text} size={22} />
                    ) : (
                        <Play color={colors.text} size={22} />
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} onPress={stop}>
                    <X color={colors.textMuted} size={20} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 90,
        left: Spacing.three,
        right: Spacing.three,
        borderRadius: BorderRadius.lg,
        borderWidth: 0.4,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    progressBarBackground: {
        height: 3,
        width: '100%',
    },
    progressBarFill: {
        height: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        gap: Spacing.three,
    },
    artwork: {
        width: 42,
        height: 42,
        borderRadius: BorderRadius.md,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        marginTop: 2,
    },
    actionBtn: {
        padding: Spacing.one,
    },
});