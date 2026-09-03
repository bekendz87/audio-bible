import { Colors, Fonts, Spacing } from '@/constants/theme';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingScreenProps {
    message?: string;
}

export function LoadingScreen({ message = 'Đang tải Lời Chúa...' }: LoadingScreenProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.dark.primary} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        justifyContent: 'center',
        alignItems: 'center',
        gap: Spacing.three,
    },
    text: {
        color: Colors.dark.textSecondary,
        fontSize: 14,
        fontFamily: Fonts.sans,
    },
});