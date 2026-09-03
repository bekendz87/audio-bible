import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react-native';
import { Colors, Spacing, Fonts, BorderRadius } from '@/constants/theme';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inner}
            >
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <ArrowLeft color={Colors.dark.text} size={24} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Tạo Tài Khoản</Text>
                    <Text style={styles.subtitle}>Bắt đầu hành trình lắng nghe và học hỏi Lời Chúa mỗi ngày</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <User color={Colors.dark.textMuted} size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Họ và tên"
                            placeholderTextColor={Colors.dark.textMuted}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Mail color={Colors.dark.textMuted} size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={Colors.dark.textMuted}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Lock color={Colors.dark.textMuted} size={20} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            placeholderTextColor={Colors.dark.textMuted}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.registerBtn} activeOpacity={0.8} onPress={() => router.replace('/(tabs)')}>
                        <Text style={styles.registerBtnText}>Đăng Ký</Text>
                        <ArrowRight color={Colors.dark.background} size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.loginText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    inner: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        justifyContent: 'center',
    },
    backBtn: {
        position: 'absolute',
        top: Spacing.four,
        left: Spacing.four,
        padding: Spacing.one,
    },
    header: {
        marginBottom: Spacing.five,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        color: Colors.dark.text,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: Colors.dark.textSecondary,
        marginTop: Spacing.one,
        lineHeight: 20,
    },
    form: {
        gap: Spacing.three,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.card,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        paddingHorizontal: Spacing.three,
        height: 52,
    },
    inputIcon: {
        marginRight: Spacing.two,
    },
    input: {
        flex: 1,
        color: Colors.dark.text,
        fontFamily: Fonts.sans,
        fontSize: 16,
    },
    registerBtn: {
        backgroundColor: Colors.dark.primary,
        height: 52,
        borderRadius: BorderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.two,
        marginTop: Spacing.two,
    },
    registerBtnText: {
        color: Colors.dark.background,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.five,
    },
    footerText: {
        color: Colors.dark.textSecondary,
        fontSize: 14,
        fontFamily: Fonts.sans,
    },
    loginText: {
        color: Colors.dark.primary,
        fontSize: 14,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
});