import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { AlertApp } from '@/services/alert';
import * as Clipboard from 'expo-clipboard';
import {
    Check,
    Copy,
    MessageCircle,
    Send,
    Share2,
    X,
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Modal,
    Pressable,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export interface ShareData {
    title: string;
    subtitle?: string;
    url: string;
}

interface ShareModalProps {
    visible: boolean;
    data: ShareData | null;
    onClose: () => void;
}

export function ShareModal({ visible, data, onClose }: ShareModalProps) {
    const colors = useThemeColors();
    const [copied, setCopied] = useState(false);

    if (!data) {
        return null;
    }

    const handleCopyLink = async () => {
        await Clipboard.setStringAsync(data.url);
        setCopied(true);
        AlertApp.success('Đã sao chép liên kết vào bộ nhớ tạm!');

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleNativeShare = async () => {
        try {
            await Share.share({
                title: data.title,
                message: `${data.title}${data.subtitle ? ` - ${data.subtitle}` : ''}\n${data.url}`,
                url: data.url,
            });
            onClose();
        } catch (error) {
            AlertApp.error('Không thể mở bảng chia sẻ.');
        }
    };

    const SHARE_OPTIONS = [
        {
            id: 'system',
            label: 'Chia sẻ',
            icon: Share2,
            bgColor: colors.primary,
            onPress: handleNativeShare,
        },
       
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={[styles.sheet, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>Chia sẻ</Text>
                        <TouchableOpacity onPress={onClose} hitSlop={8} style={styles.closeBtn}>
                            <X color={colors.textMuted} size={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.previewBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                        <Text style={[styles.previewTitle, { color: colors.text }]} numberOfLines={1}>
                            {data.title}
                        </Text>
                        {data.subtitle && (
                            <Text style={[styles.previewSub, { color: colors.textMuted }]} numberOfLines={1}>
                                {data.subtitle}
                            </Text>
                        )}
                    </View>

                    <View style={styles.optionsGrid}>
                        {SHARE_OPTIONS.map((item) => {
                            const IconComp = item.icon;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.optionItem}
                                    onPress={item.onPress}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
                                        <IconComp color="#FFFFFF" size={22} />
                                    </View>
                                    <Text style={[styles.optionLabel, { color: colors.text }]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View style={[styles.copyBar, { backgroundColor: colors.background, borderColor: colors.border }]}>
                        <Text style={[styles.urlText, { color: colors.textMuted }]} numberOfLines={1}>
                            {data.url}
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.copyBtn,
                                { backgroundColor: copied ? '#10B981' : colors.primary },
                            ]}
                            onPress={handleCopyLink}
                            activeOpacity={0.8}
                        >
                            {copied ? (
                                <Check color={colors.primaryElement} size={16} />
                            ) : (
                                <Copy color={colors.primaryElement} size={16} />
                            )}
                            <Text style={[styles.copyBtnText, { color: colors.primaryElement }]}>
                                {copied ? 'Đã chép' : 'Sao chép'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        borderTopLeftRadius: BorderRadius.lg,
        borderTopRightRadius: BorderRadius.lg,
        borderWidth: 1,
        borderBottomWidth: 0,
        padding: Spacing.four,
        paddingBottom: Spacing.four + 20,
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
        padding: 4,
    },
    previewBox: {
        padding: Spacing.three,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        marginBottom: Spacing.four,
    },
    previewTitle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    previewSub: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        marginTop: 2,
    },
    optionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: Spacing.four,
    },
    optionItem: {
        alignItems: 'center',
        gap: Spacing.one,
    },
    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionLabel: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        fontWeight: '500',
    },
    copyBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: Spacing.three,
        paddingRight: Spacing.one,
        paddingVertical: Spacing.one,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
    },
    urlText: {
        flex: 1,
        fontSize: 13,
        fontFamily: Fonts.sans,
        marginRight: Spacing.two,
    },
    copyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.three,
        paddingVertical: 8,
        borderRadius: BorderRadius.sm,
        gap: 6,
    },
    copyBtnText: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
});