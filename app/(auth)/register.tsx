import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { registerWithEmail } from '@/services/firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const signIn = useAuthStore((state) => state.signIn);
    const colors = useThemeColors();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || password.length < 8) {
            setError('Nhập đủ thông tin và dùng mật khẩu ít nhất 8 ký tự.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const user = await registerWithEmail(name, email, password);
            signIn({ id: user.uid, name: user.displayName || name.trim(), email: user.email || email, provider: 'email' });
            router.replace('/(tabs)');
        } catch {
            setError('Không thể tạo tài khoản. Email có thể đã được sử dụng.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Quay lại">
                <ArrowLeft color={colors.text} size={24} />
            </TouchableOpacity>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inner}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>Tạo Tài Khoản</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Bắt đầu hành trình lắng nghe và học hỏi Lời Chúa mỗi ngày</Text>
                </View>
                <View style={styles.form}>
                    <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <User color={colors.textMuted} size={20} style={styles.inputIcon} />
                        <TextInput style={[styles.input, { color: colors.text }]} placeholder="Họ và tên" placeholderTextColor={colors.textMuted} value={name} onChangeText={setName} />
                    </View>
                    <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Mail color={colors.textMuted} size={20} style={styles.inputIcon} />
                        <TextInput style={[styles.input, { color: colors.text }]} placeholder="Email" placeholderTextColor={colors.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    </View>
                    <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Lock color={colors.textMuted} size={20} style={styles.inputIcon} />
                        <TextInput style={[styles.input, { color: colors.text }]} placeholder="Mật khẩu (ít nhất 8 ký tự)" placeholderTextColor={colors.textMuted} value={password} onChangeText={setPassword} secureTextEntry />
                    </View>
                    <TouchableOpacity style={[styles.registerBtn, { backgroundColor: colors.primary }]} activeOpacity={0.8} onPress={handleRegister} disabled={isLoading}>
                        <Text style={[styles.registerBtnText, { color: colors.background }]}>{isLoading ? 'Đang tạo tài khoản...' : 'Đăng Ký'}</Text>
                        <ArrowRight color={colors.background} size={20} />
                    </TouchableOpacity>
                    {!!error && <Text style={styles.errorText}>{error}</Text>}
                    <SocialAuthButtons onError={setError} />
                </View>
                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>Đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => router.back()}><Text style={[styles.loginText, { color: colors.primary }]}>Đăng nhập</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        justifyContent: 'center'
    },
    backBtn: {
        position: 'absolute',
        top: Spacing.four,
        left: Spacing.four,
        padding: Spacing.one
    },
    header: {
        marginBottom: Spacing.five
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: Fonts.sans
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        marginTop: Spacing.one,
        lineHeight: 20
    },
    form: {
        gap: Spacing.three
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        paddingHorizontal: Spacing.three,
        height: 52
    },
    inputIcon: {
        marginRight: Spacing.two
    },
    input: {
        flex: 1,
        fontFamily: Fonts.sans,
        fontSize: 16
    },
    registerBtn: {
        height: 52,
        borderRadius: BorderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.two,
        marginTop: Spacing.two
    },
    registerBtnText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Fonts.sans
    },
    errorText: {
        color: '#EF4444',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: Fonts.sans
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.five
    },
    footerText: {
        fontSize: 14,
        fontFamily: Fonts.sans
    },
    loginText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: Fonts.sans
    },
});
