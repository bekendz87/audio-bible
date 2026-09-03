import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useAudio } from '@/context/AudioContext';
import { useThemeColors } from '@/hooks/use-theme';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import {
    ChevronDown,
    Gauge,
    Pause,
    Play,
    RotateCcw,
    RotateCw,
    Volume2,
    VolumeX,
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
    GestureResponderEvent,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];

export default function PlayerScreen() {
    const colors = useThemeColors();
    const router = useRouter();
    const {
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        isMuted,
        togglePlayPause,
        seekTo,
        setSpeed,
        toggleMute,
    } = useAudio();

    const [isSeeking, setIsSeeking] = useState(false);
    const [seekValue, setSeekValue] = useState(0);

    const sliderContainerRef = useRef<View>(null);
    const sliderLayoutRef = useRef<{ width: number; pageX: number }>({ width: 0, pageX: 0 });

    if (!currentTrack) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                        Chưa chọn bài audio nào để phát.
                    </Text>
                    <TouchableOpacity
                        style={[styles.backBtn, { backgroundColor: colors.primary }]}
                        onPress={() => router.back()}
                    >
                        <Text style={{ color: colors.primaryElement, fontWeight: '600' }}>
                            Quay lại
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds <= 0) {
            return '00:00';
        }
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSkipBackward = () => {
        seekTo(Math.max(0, currentTime - 10));
    };

    const handleSkipForward = () => {
        seekTo(Math.min(duration, currentTime + 10));
    };

    const handleToggleSpeed = () => {
        const currentIndex = SPEED_OPTIONS.indexOf(playbackRate);
        const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
        setSpeed(SPEED_OPTIONS[nextIndex]);
    };

    const measureSlider = () => {
        sliderContainerRef.current?.measure((x, y, width, height, pageX, pageY) => {
            sliderLayoutRef.current = { width, pageX };
        });
    };

   
    const handleTouchStart = (event: GestureResponderEvent) => {
        const { width, pageX } = sliderLayoutRef.current;
        if (width <= 0 || duration <= 0) {
            return;
        }

        const touchX = event.nativeEvent.pageX - pageX;
        const percentage = Math.max(0, Math.min(1, touchX / width));
        const targetTime = percentage * duration;

        setIsSeeking(true);
        setSeekValue(targetTime);
        seekTo(targetTime);

        setTimeout(() => {
            setIsSeeking(false);
        }, 150);
    };

    const displayTime = isSeeking ? seekValue : currentTime;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => router.dismiss()} activeOpacity={0.7}>
                    <ChevronDown color={colors.text} size={28} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.textMuted }]}>ĐANG PHÁT</Text>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.artworkContainer}>
                    <Image
                        source={{
                            uri:
                                currentTrack.artworkUrl ||
                                'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600',
                        }}
                        style={[styles.artwork, { borderColor: colors.border }]}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text numberOfLines={2} style={[styles.title, { color: colors.text }]}>
                        {currentTrack.title}
                    </Text>
                    <Text numberOfLines={1} style={[styles.subtitle, { color: colors.textMuted }]}>
                        {currentTrack.subtitle}
                    </Text>
                </View>

                <View style={styles.progressContainer}>
                    <View
                        ref={sliderContainerRef}
                        style={styles.sliderWrapper}
                        onLayout={measureSlider}
                        onTouchStart={handleTouchStart}
                    >
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={duration > 0 ? duration : 1}
                            value={displayTime}
                            minimumTrackTintColor={colors.primary}
                            maximumTrackTintColor={colors.border}
                            thumbTintColor={colors.primary}
                            onSlidingStart={(value) => {
                                setIsSeeking(true);
                                setSeekValue(value);
                            }}
                            onValueChange={(value) => {
                                setSeekValue(value);
                            }}
                            onSlidingComplete={(value) => {
                                seekTo(value);
                                setIsSeeking(false);
                            }}
                        />
                    </View>

                    <View style={styles.timeRow}>
                        <Text style={[styles.timeText, { color: colors.textMuted }]}>
                            {formatTime(displayTime)}
                        </Text>
                        <Text style={[styles.timeText, { color: colors.textMuted }]}>
                            {formatTime(duration)}
                        </Text>
                    </View>
                </View>

                <View style={styles.controlsRow}>
                    <TouchableOpacity style={styles.controlIconBtn} onPress={handleSkipBackward} activeOpacity={0.7}>
                        <RotateCcw color={colors.text} size={26} />
                        <Text style={[styles.skipLabel, { color: colors.text }]}>10</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.playBtn, { backgroundColor: colors.primary }]}
                        onPress={togglePlayPause}
                        activeOpacity={0.8}
                    >
                        {isPlaying ? (
                            <Pause color={colors.primaryElement} size={32} />
                        ) : (
                            <Play color={colors.primaryElement} size={32} style={{ marginLeft: 4 }} />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.controlIconBtn} onPress={handleSkipForward} activeOpacity={0.7}>
                        <RotateCw color={colors.text} size={26} />
                        <Text style={[styles.skipLabel, { color: colors.text }]}>10</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footerRow}>
                    <TouchableOpacity
                        style={[styles.chipBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={handleToggleSpeed}
                        activeOpacity={0.7}
                    >
                        <Gauge color={colors.primary} size={18} />
                        <Text style={[styles.chipText, { color: colors.text }]}>{playbackRate}x</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.chipBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
                        onPress={toggleMute}
                        activeOpacity={0.7}
                    >
                        {isMuted ? (
                            <VolumeX color="#EF4444" size={18} />
                        ) : (
                            <Volume2 color={colors.primary} size={18} />
                        )}
                        <Text style={[styles.chipText, { color: colors.text }]}>
                            {isMuted ? 'Tắt tiếng' : 'Âm thanh'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.three,
    },
    emptyText: {
        fontSize: 15,
        fontFamily: Fonts.sans,
    },
    backBtn: {
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.two,
        borderRadius: BorderRadius.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.two,
        height: 56,
    },
    iconBtn: {
        padding: Spacing.one,
    },
    headerTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        letterSpacing: 1.5,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.six,
        justifyContent: 'space-around',
        paddingBottom: Spacing.six,
    },
    artworkContainer: {
        alignItems: 'center',
        marginTop: Spacing.two,
    },
    artwork: {
        width: 260,
        height: 260,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
    },
    infoContainer: {
        alignItems: 'center',
        marginVertical: Spacing.three,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        textAlign: 'center',
        marginBottom: Spacing.one,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        textAlign: 'center',
    },
    progressContainer: {
        width: '100%',
    },
    sliderWrapper: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.one,
        marginTop: -8,
    },
    timeText: {
        fontSize: 12,
        fontFamily: Fonts.sans,
    },
    controlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.six,
        marginVertical: Spacing.two,
    },
    controlIconBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.two,
        position: 'relative',
    },
    skipLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        position: 'absolute',
        top: 19,
    },
    playBtn: {
        width: 68,
        height: 68,
        borderRadius: 34,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.three,
    },
    chipBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
    },
    chipText: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
});