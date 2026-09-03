import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { X } from 'lucide-react-native';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ChapterGridModalProps {
    visible: boolean;
    bookName: string;
    totalChapters: number;
    onClose: () => void;
    onSelectChapter: (chapterNum: number) => void;
}

export function ChapterGridModal({
    visible,
    bookName,
    totalChapters,
    onClose,
    onSelectChapter,
}: ChapterGridModalProps) {
    const colors = useThemeColors();
    const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
                <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>
                            {bookName} - Chọn Chương
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <X color={colors.text} size={22} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.grid}>
                        {chapters.map((num) => (
                            <TouchableOpacity
                                key={num}
                                style={[
                                    styles.chapterBox,
                                    { backgroundColor: colors.backgroundElement },
                                ]}
                                onPress={() => onSelectChapter(num)}
                            >
                                <Text style={[styles.chapterNum, { color: colors.text }]}>
                                    {num}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        maxHeight: '70%',
        padding: Spacing.four,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.three,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    closeBtn: {
        padding: Spacing.one,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingBottom: Spacing.four,
    },
    chapterBox: {
        width: '18%',
        aspectRatio: 1,
        margin: '1%',
        borderRadius: BorderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chapterNum: {
        fontWeight: '600',
        fontFamily: Fonts.sans,
        textAlign: 'center',
        includeFontPadding: false,
    },
});