import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { usePlayerStore } from '@/store/usePlayerStore';
import {
    ChevronDown,
    Disc,
    Pause,
    Play,
    RotateCcw,
    RotateCw,
    SkipBack,
    SkipForward,
} from 'lucide-react-native';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FullPlayerModalProps {
    visible: boolean;
    onClose: () => void;
}

export function FullPlayerModal({ visible, onClose }: FullPlayerModalProps) {
    const colors = useThemeColors();
    const insets = useSafeAreaInsets();
    const { currentChapter, isPlaying, togglePlay } = usePlayerStore();

    if (!currentChapter) {
        return null;
    }

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                        paddingTop: insets.top + Spacing.two,
                        paddingBottom: insets.bottom + Spacing.four,
                    },
                ]}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
                        <ChevronDown color={colors.text} size={28} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.textMuted }]}>ĐANG PHÁT</Text>
                    <View style={{ width: 28 }} />
                </View>

                <View style={styles.artworkContainer}>
                    <View style={[styles.artwork, { backgroundColor: colors.backgroundElement }]}>
                        <Disc color={colors.primary} size={120} />
                    </View>
                </View>


                <View style={styles.infoContainer}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {currentChapter.bookName} - Chương {currentChapter.chapterNum}
                    </Text>
                    <Text style={[styles.reader, { color: colors.textMuted }]}>
                        {currentChapter.reader}
                    </Text>
                </View>


                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                        <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '35%' }]} />
                    </View>
                    <View style={styles.timeRow}>
                        <Text style={[styles.timeText, { color: colors.textMuted }]}>01:15</Text>
                        <Text style={[styles.timeText, { color: colors.textMuted }]}>{currentChapter.duration}</Text>
                    </View>
                </View>


                <View style={styles.controlsRow}>
                    <TouchableOpacity>
                        <RotateCcw color={colors.text} size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <SkipBack color={colors.text} size={32} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainPlayBtn, { backgroundColor: colors.primary }]}
                        onPress={togglePlay}
                    >
                        {isPlaying ? (
                            <Pause color={colors.primaryElement} size={32} fill={colors.primaryElement} />
                        ) : (
                            <Play color={colors.primaryElement} size={32} fill={colors.primaryElement} />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <SkipForward color={colors.text} size={32} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <RotateCw color={colors.text} size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        letterSpacing: 1.5,
    },
    iconBtn: {
        padding: Spacing.one,
    },
    artworkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Spacing.two,
    },
    artwork: {
        width: 260,
        height: 260,
        borderRadius: BorderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        alignItems: 'center',
        marginVertical: Spacing.two,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        textAlign: 'center',
    },
    reader: {
        fontSize: 15,
        fontFamily: Fonts.sans,
        marginTop: Spacing.one,
    },
    progressContainer: {
        width: '100%',
        marginVertical: Spacing.three,
    },
    progressBar: {
        height: 4,
        borderRadius: 2,
        width: '100%',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spacing.two,
    },
    timeText: {
        fontSize: 12,
        fontFamily: Fonts.sans,
    },
    controlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: Spacing.two,
    },
    mainPlayBtn: {
        width: 68,
        height: 68,
        borderRadius: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },
});