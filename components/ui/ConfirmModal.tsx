import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { AlertCircle, HelpCircle } from 'lucide-react-native';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ConfirmModalProps {
    visible: boolean;
    title: string;
    message: string;
    type?: 'danger' | 'info';
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({
    visible,
    title,
    message,
    type = 'info',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    showCancel = true,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    const colors = useThemeColors();

    const isDanger = type === 'danger';
    const confirmBtnColor = isDanger ? '#EF4444' : colors.primary;
    const confirmTextColor = isDanger ? '#FFFFFF' : colors.primaryElement;

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View
                    style={[
                        styles.dialog,
                        {
                            backgroundColor: colors.card,
                            borderColor: colors.border,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.iconBadge,
                            { backgroundColor: isDanger ? '#FEF2F2' : colors.backgroundElement },
                        ]}
                    >
                        {isDanger ? (
                            <AlertCircle color="#EF4444" size={28} />
                        ) : (
                            <HelpCircle color={colors.primary} size={28} />
                        )}
                    </View>

                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                    <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>


                    <View style={styles.actions}>
                        {showCancel && (
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.cancelBtn,
                                    { backgroundColor: colors.backgroundElement, borderColor: colors.border },
                                ]}
                                activeOpacity={0.7}
                                onPress={onCancel}
                            >
                                <Text style={[styles.btnText, { color: colors.text }]}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: confirmBtnColor, flex: showCancel ? 1 : 0, width: showCancel ? undefined : '100%' },
                            ]}
                            activeOpacity={0.8}
                            onPress={onConfirm}
                        >
                            <Text style={[styles.btnText, { color: confirmTextColor, fontWeight: '600' }]}>
                                {confirmText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.four,
    },
    dialog: {
        width: '100%',
        maxWidth: 340,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        padding: Spacing.four,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
    iconBadge: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.three,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        textAlign: 'center',
        marginBottom: Spacing.one,
    },
    message: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: Spacing.four,
    },
    actions: {
        flexDirection: 'row',
        gap: Spacing.two,
        width: '100%',
    },
    button: {
        height: 44,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.three,
    },
    cancelBtn: {
        flex: 1,
        borderWidth: 1,
    },
    btnText: {
        fontSize: 14,
        fontFamily: Fonts.sans,
    },
});