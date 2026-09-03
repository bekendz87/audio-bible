import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Image } from 'expo-image';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function CustomSplashScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.iconCircle}>
                    <Image 
                        source={require('@/assets/images/logo-bible.png')} 
                        style={styles.logoImage}
                        contentFit="contain"
                    />
                </View>
                <Text style={styles.title}>Kinh Thánh Audio</Text>
                <Text style={styles.subtitle}>Lắng nghe Lời Chúa mỗi ngày</Text>
            </View>

            <View style={styles.footer}>
                <ActivityIndicator size="small" color={Colors.dark.primary} />
                <Text style={styles.loadingText}>Đang khởi tạo...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.four,
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.dark.card,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.four,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        overflow: 'hidden', 
    },
    logoImage: {
        width: 250,
        height: 250,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.dark.text,
        fontFamily: Fonts.sans,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: Colors.dark.textSecondary,
        fontFamily: Fonts.serif,
        marginTop: Spacing.two,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: Spacing.six,
        alignItems: 'center',
        gap: Spacing.two,
    },
    loadingText: {
        color: Colors.dark.textMuted,
        fontSize: 13,
        fontFamily: Fonts.sans,
    },
});