import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    Info,
    X,
} from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface CustomAlertProps {
    type?: AlertType;
    title?: string;
    message: string;
    onClose?: () => void;
}

export function CustomAlert({
    type = 'info',
    title,
    message,
    onClose,
}: CustomAlertProps) {
    const colors = useThemeColors();

    const getAlertConfig = () => {
        switch (type) {
            case 'success':
                return {
                    icon: CheckCircle2,
                    color: '#10B981',
                    borderColor: '#10B98133',
                };
            case 'error':
                return {
                    icon: AlertCircle,
                    color: '#EF4444',
                    borderColor: '#EF444433',
                };
            case 'warning':
                return {
                    icon: AlertTriangle,
                    color: '#F59E0B',
                    borderColor: '#F59E0B33',
                };
            case 'info':
            default:
                return {
                    icon: Info,
                    color: '#3B82F6',
                    borderColor: '#3B82F633',
                };
        }
    };

    const config = getAlertConfig();
    const IconComponent = config.icon;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.card, // Dùng màu card đục hoàn toàn thay vì rgba
                    borderColor: config.borderColor,
                },
            ]}
        >
            <IconComponent color={config.color} size={22} style={styles.icon} />

            <View style={styles.content}>
                {title && (
                    <Text style={[styles.title, { color: colors.text }]}>
                        {title}
                    </Text>
                )}
                <Text style={[styles.message, { color: colors.text }]}>
                    {message}
                </Text>
            </View>

            {onClose && (
                <TouchableOpacity onPress={onClose} style={styles.closeBtn} hitSlop={8}>
                    <X color={colors.textMuted} size={18} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: Spacing.three,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        // Đổ bóng nổi đè lên các layer dưới
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
    },
    icon: {
        marginTop: 2,
        marginRight: Spacing.three,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        marginBottom: 2,
    },
    message: {
        fontSize: 13,
        fontFamily: Fonts.sans,
        lineHeight: 18,
    },
    closeBtn: {
        marginLeft: Spacing.two,
        padding: 2,
    },
});