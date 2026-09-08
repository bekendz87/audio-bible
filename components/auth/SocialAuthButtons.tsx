import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { loginWithApple, loginWithGoogle } from '@/services/firebase';
import { useAuthStore } from '@/store/useAuthStore';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Apple, Globe2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const hasGoogleClientId = (value?: string) => Boolean(value && !value.startsWith('your-'));

export function SocialAuthButtons({ onError }: { onError: (message: string) => void }) {
    const colors = useThemeColors();
    const router = useRouter();
    const signIn = useAuthStore((state) => state.signIn);
    const [isLoading, setIsLoading] = useState<'google' | 'apple' | null>(null);
    const [appleAvailable, setAppleAvailable] = useState(false);
    const redirectUri = AuthSession.makeRedirectUri({ scheme: 'audiobible', path: 'auth/callback' });
    const [request, response, promptAsync] = Google.useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
            iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
            androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
            redirectUri,
            responseType: AuthSession.ResponseType.IdToken,
            scopes: ['openid', 'profile', 'email'],
            selectAccount: true,
        },
    );

    useEffect(() => {
        AppleAuthentication.isAvailableAsync().then(setAppleAvailable).catch(() => setAppleAvailable(false));
    }, []);

    useEffect(() => {
        if (response?.type !== 'success') {
            return;
        }
        setIsLoading(null);
        const idToken = response.params?.id_token;
        if (!idToken) {
            onError('Google không trả về thông tin xác thực. Vui lòng thử lại.');
            return;
        }
        loginWithGoogle(idToken).then((user) => {
            signIn({ id: user.uid, name: user.displayName || 'Người dùng Google', email: user.email || undefined, provider: 'google' });
            router.replace('/(tabs)');
        }).catch(() => onError('Không thể xác thực tài khoản Google.'));
    }, [response, router, signIn]);

    const handleGoogle = async () => {
        if (!hasGoogleClientId(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID)) {
            onError('Chưa cấu hình Google Client ID. Hãy điền các biến EXPO_PUBLIC_GOOGLE_* trong file .env.');
            return;
        }
        if (!request) {
            return;
        }
        setIsLoading('google');
        try {
            const result = await promptAsync();
            if (result.type !== 'success') {
                setIsLoading(null);
            }
            if (result.type === 'error') {
                onError('Đăng nhập Google thất bại. Vui lòng thử lại.');
            }
        } catch {
            setIsLoading(null);
            onError('Không thể mở đăng nhập Google.');
        }
    };

    const handleApple = async () => {
        if (!appleAvailable) {
            onError('Đăng nhập Apple chỉ khả dụng trên thiết bị iOS hỗ trợ Apple Sign In.');
            return;
        }
        setIsLoading('apple');
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
            });
            const name = credential.fullName
                ? [credential.fullName.givenName, credential.fullName.familyName].filter(Boolean).join(' ')
                : 'Người dùng Apple';
            if (!credential.identityToken) {
                onError('Apple không trả về identity token. Vui lòng thử lại.');
                return;
            }
            const user = await loginWithApple(credential.identityToken);
            signIn({ id: user.uid, name: user.displayName || name, email: user.email || credential.email || undefined, provider: 'apple' });
            router.replace('/(tabs)');
        } catch (error: unknown) {
            if ((error as { code?: string })?.code !== 'ERR_REQUEST_CANCELED') {
                onError('Đăng nhập Apple thất bại. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(null);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.dividerRow}>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.textMuted }]}>hoặc tiếp tục với</Text>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleGoogle} disabled={isLoading !== null} accessibilityRole="button" accessibilityLabel="Đăng nhập bằng Google">
                    {isLoading === 'google' ? <ActivityIndicator color={colors.primary} /> : <Globe2 color="#4285F4" size={20} />}
                    <Text style={[styles.socialText, { color: colors.text }]}>Google</Text>
                </TouchableOpacity>
                {(Platform.OS === 'ios' || appleAvailable) && (
                    Platform.OS === 'ios' ? (
                        <AppleAuthentication.AppleAuthenticationButton
                            buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
                            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                            cornerRadius={BorderRadius.md}
                            style={styles.appleButton}
                            onPress={handleApple}
                        />
                    ) : (
                        <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={handleApple} disabled={isLoading !== null} accessibilityRole="button" accessibilityLabel="Đăng nhập bằng Apple">
                            <Apple color={colors.text} size={20} />
                            <Text style={[styles.socialText, { color: colors.text }]}>Apple</Text>
                        </TouchableOpacity>
                    )
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.three
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two
    },
    divider: {
        flex: 1,
        height: 1
    },
    dividerText: {
        fontSize: 12,
        fontFamily: Fonts.sans
    },
    buttons: {
        flexDirection: 'row',
        gap: Spacing.two
    },
    socialButton: {
        flex: 1,
        minHeight: 48,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.two
    },
    socialText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: Fonts.sans
    },
    appleButton: {
        flex: 1,
        height: 48
    },
});
