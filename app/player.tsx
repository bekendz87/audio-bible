import { ShareData, ShareModal } from '@/components/ui/ShareModal';
import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import {
    ChevronDown,
    FastForward,
    Heart,
    Moon,
    Pause,
    Play,
    Rewind,
    Share2,
    Volume2,
    VolumeX,
    Zap
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) {
        return '0:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function PlayerScreen() {
    const colors = useThemeColors();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [shareData, setShareData] = useState<ShareData | null>(null);
    const {
        currentTrack,
        isPlaying,
        togglePlayPause,
        currentTime,
        duration,
        seekTo,
        setSpeed,
        isMuted,
        toggleMute
    } = useAudio();

    const [isLiked, setIsLiked] = useState(false);
    const [playbackRate, setPlaybackRateState] = useState(1);
    const [isSeeking, setIsSeeking] = useState(false);
    const [seekPosition, setSeekPosition] = useState(0);

    if (!currentTrack) {
        return null;
    }

    const cardWidth = width - Spacing.four * 2;
    const artworkSize = cardWidth - Spacing.four * 2;

    const handleToggleRate = async () => {
        const rates = [1, 1.25, 1.5, 2];
        const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
        const newRate = rates[nextIndex];

        setPlaybackRateState(newRate);
        if (setSpeed) {
            await setSpeed(newRate);
        }
    };

    const handleOpenShare = () => {
        setShareData({
            title: currentTrack.title,
            subtitle: currentTrack.subtitle,
            url: `https://kinhthanh.app/book/${currentTrack.id}`,
        });
    };


    return (
        <SafeAreaView style={[styles.screenContainer, { backgroundColor: colors.background }]}>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.back()}
                style={styles.dragIndicatorWrapper}
            >
                <View style={[styles.dragIndicator, { backgroundColor: colors.border }]} />
            </TouchableOpacity>

            <View style={[styles.mainCard, { width: cardWidth, backgroundColor: colors.card }]}>

                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                        <ChevronDown color={colors.text} size={26} />
                    </TouchableOpacity>

                    <Text style={[styles.headerTitle, { color: colors.textMuted }]}>
                        Đang phát audio
                    </Text>

                    <TouchableOpacity style={styles.iconBtn} onPress={handleOpenShare}>
                        <Share2 color={colors.text} size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.artworkWrapper}>
                    <Image
                        source={{
                            uri:
                                currentTrack.artworkUrl ||
                                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600',
                        }}
                        style={[styles.artwork, { width: artworkSize, height: artworkSize }]}
                    />
                </View>


                <View style={styles.contentSection}>
                    <View style={styles.infoRow}>
                        <View style={styles.titleWrapper}>
                            <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
                                {currentTrack.title}
                            </Text>
                            <Text numberOfLines={1} style={[styles.subtitle, { color: colors.textMuted }]}>
                                {currentTrack.subtitle}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsLiked(!isLiked)}
                            activeOpacity={0.7}
                            style={styles.iconBtn}
                        >
                            <Heart
                                color={isLiked ? colors.primary : colors.textMuted}
                                fill={isLiked ? colors.primary : 'transparent'}
                                size={24}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.progressSection}>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={duration || 1}
                            value={isSeeking ? seekPosition : currentTime}
                            minimumTrackTintColor={colors.primary}
                            maximumTrackTintColor={colors.border}
                            thumbTintColor={colors.primary}
                            onValueChange={(val) => {
                                setIsSeeking(true);
                                setSeekPosition(val);
                            }}
                            onSlidingComplete={(val) => {
                                setIsSeeking(false);
                                seekTo(val);
                            }}
                        />
                        <View style={styles.timeRow}>
                            <Text style={[styles.timeText, { color: colors.textMuted }]}>
                                {formatTime(isSeeking ? seekPosition : currentTime)}
                            </Text>
                            <Text style={[styles.timeText, { color: colors.textMuted }]}>
                                {formatTime(duration)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.controlsRow}>
                        <TouchableOpacity
                            onPress={() => seekTo(Math.max(0, currentTime - 10))}
                            activeOpacity={0.7}
                            style={styles.controlBtn}
                        >
                            <Rewind color={colors.textMuted} fill={colors.textMuted} size={28} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={togglePlayPause}
                            activeOpacity={0.8}
                            style={[styles.playBtn, { backgroundColor: colors.primary }]}
                        >
                            {isPlaying ? (
                                <Pause color={colors.primaryElement} fill={colors.primaryElement} size={28} />
                            ) : (
                                <Play color={colors.primaryElement} fill={colors.primaryElement} size={28} style={{ marginLeft: 3 }} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => seekTo(Math.min(duration, currentTime + 10))}
                            activeOpacity={0.7}
                            style={styles.controlBtn}
                        >
                            <FastForward color={colors.textMuted} fill={colors.textMuted} size={28} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerTools}>
                        <TouchableOpacity
                            style={[styles.toolChip, { backgroundColor: colors.background, borderColor: colors.border }]}
                            onPress={handleToggleRate}
                        >
                            <Zap color={colors.primary} size={15} />
                            <Text style={[styles.toolText, { color: colors.text }]}>{playbackRate}x</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.toolChip, { backgroundColor: colors.background, borderColor: colors.border }]}
                            onPress={toggleMute}
                        >
                            {isMuted ? (
                                <VolumeX color={colors.primary} size={15} />
                            ) : (
                                <Volume2 color={colors.textMuted} size={15} />
                            )}
                            <Text style={[styles.toolText, { color: colors.text }]}>
                                {isMuted ? 'Mute' : 'Âm lượng'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.toolChip, { backgroundColor: colors.background, borderColor: colors.border }]}
                        >
                            <Moon color={colors.textMuted} size={15} />
                            <Text style={[styles.toolText, { color: colors.text }]}>Hẹn giờ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ShareModal
                visible={!!shareData}
                data={shareData}
                onClose={() => setShareData(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
    },
    dragIndicatorWrapper: {
        paddingVertical: Spacing.two,
        width: '100%',
        alignItems: 'center',
    },
    dragIndicator: {
        width: 36,
        height: 5,
        borderRadius: 3,
    },
    mainCard: {
        flex: 1,
        borderRadius: 32,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.two,
        paddingBottom: Spacing.four,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: Fonts.sans,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    iconBtn: {
        padding: Spacing.one,
    },
    artworkWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Spacing.two,
    },
    artwork: {
        borderRadius: BorderRadius.xl,
    },
    contentSection: {
        gap: Spacing.two,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.one,
    },
    titleWrapper: {
        flex: 1,
        marginRight: Spacing.two,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        marginTop: 2,
    },
    progressSection: {
        marginVertical: Spacing.one,
    },
    slider: {
        width: '100%',
        height: 30,
        marginHorizontal: -8,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.one,
        marginTop: -6,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    controlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.six,
        marginVertical: Spacing.one,
    },
    controlBtn: {
        padding: Spacing.two,
    },
    playBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    footerTools: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.two,
        marginTop: Spacing.one,
    },
    toolChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
    },
    toolText: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
});