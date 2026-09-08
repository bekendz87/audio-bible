import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { loginWithEmail } from '@/services/firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const router = useRouter();
    const signIn = useAuthStore((state) => state.signIn);
    const theme = useThemeColors();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            setError('Vui lòng nhập email và mật khẩu.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const user = await loginWithEmail(email, password);
            signIn({ id: user.uid, name: user.displayName || email.split('@')[0], email: user.email || email, provider: 'email' });
            router.replace('/(tabs)');
        } catch {
            setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <View style={[styles.iconCircle, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <Image
                            source={require('@/assets/images/logo-bible.png')}
                            style={styles.logoImage}
                            contentFit="contain"
                        />
                    </View>
                    <Text style={[styles.title, { color: theme.text }]}>Kinh Thánh Audio</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Lắng nghe Lời Chúa mỗi ngày</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Email</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: theme.card,
                                    borderColor: theme.border,
                                    color: theme.text,
                                },
                            ]}
                            placeholder="nhap@email.com"
                            placeholderTextColor={theme.textMuted}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: theme.textSecondary }]}>Mật khẩu</Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: theme.card,
                                    borderColor: theme.border,
                                    color: theme.text,
                                },
                            ]}
                            placeholder="••••••••"
                            placeholderTextColor={theme.textMuted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.loginBtn, { backgroundColor: theme.primary }]}
                        onPress={handleLogin}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.loginBtnText, { color: theme.background }]}>{isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}</Text>
                    </TouchableOpacity>
                    {!!error && <Text style={[styles.errorText, { color: '#EF4444' }]}>{error}</Text>}
                    <TouchableOpacity style={styles.registerLink} onPress={() => router.push('/(auth)/register')}>
                        <Text style={[styles.registerLinkText, { color: theme.primary }]}>Chưa có tài khoản? Đăng ký</Text>
                    </TouchableOpacity>
                    <SocialAuthButtons onError={setError} />
                </View>

                <TouchableOpacity style={styles.guestBtn} onPress={() => router.replace('/(tabs)')}>
                    <Text style={[styles.guestBtnText, { color: theme.textMuted }]}>
                        Trải nghiệm không cần đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: Spacing.six,
    },
    logoImage: {
        width: 200,
        height: 200,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.three,
        borderWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.serif,
        marginTop: Spacing.one,
    },
    form: {
        gap: Spacing.three,
    },
    inputGroup: {
        gap: Spacing.one,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.sans,
    },
    input: {
        borderWidth: 1,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.three,
        fontSize: 16,
        fontFamily: Fonts.sans,
    },
    loginBtn: {
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.three,
        alignItems: 'center',
        marginTop: Spacing.two,
    },
    loginBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    guestBtn: {
        alignItems: 'center',
        marginTop: Spacing.five,
    },
    guestBtnText: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        textDecorationLine: 'underline',
    },
    errorText: {
        fontSize: 13,
        fontFamily: Fonts.sans,
        textAlign: 'center'
    },
    registerLink: {
        alignItems: 'center'
    },
    registerLinkText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: Fonts.sans
    },
});