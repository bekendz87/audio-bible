import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChangePasswordScreen() {
    const colors = useThemeColors();
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alertConfig, setAlertConfig] = useState<{
        visible: boolean;
        title: string;
        message: string;
        type: 'info' | 'danger';
    }>({ visible: false, title: '', message: '', type: 'info' });

    const handleChangePassword = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setAlertConfig({
                visible: true,
                title: 'Thiếu thông tin',
                message: 'Vui lòng điền đầy đủ tất cả các trường mật khẩu.',
                type: 'danger',
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            setAlertConfig({
                visible: true,
                title: 'Mật khẩu không khớp',
                message: 'Mật khẩu mới và xác nhận mật khẩu không giống nhau.',
                type: 'danger',
            });
            return;
        }

        setAlertConfig({
            visible: true,
            title: 'Thành công',
            message: 'Mật khẩu của bạn đã được cập nhật thành công.',
            type: 'info',
        });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <ArrowLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Đổi mật khẩu</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.fieldGroup}>
                    <Text style={[styles.label, { color: colors.textMuted }]}>Mật khẩu hiện tại</Text>
                    <TextInput
                        secureTextEntry
                        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={[styles.label, { color: colors.textMuted }]}>Mật khẩu mới</Text>
                    <TextInput
                        secureTextEntry
                        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={[styles.label, { color: colors.textMuted }]}>Xác nhận mật khẩu mới</Text>
                    <TextInput
                        secureTextEntry
                        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.submitBtn, { backgroundColor: colors.primary }]}
                    onPress={handleChangePassword}
                >
                    <Text style={[styles.submitBtnText, { color: colors.primaryElement }]}>Cập nhật mật khẩu</Text>
                </TouchableOpacity>
            </View>

            <ConfirmModal
                visible={alertConfig.visible}
                type={alertConfig.type}
                title={alertConfig.title}
                message={alertConfig.message}
                showCancel={false}
                confirmText="Đồng ý"
                onConfirm={() => setAlertConfig((prev) => ({ ...prev, visible: false }))}
                onCancel={() => setAlertConfig((prev) => ({ ...prev, visible: false }))}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.four,
        height: 56,
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    content: {
        padding: Spacing.four,
    },
    fieldGroup: {
        marginBottom: Spacing.three,
    },
    label: {
        fontSize: 13,
        fontFamily: Fonts.sans,
        marginBottom: Spacing.one,
    },
    input: {
        height: 48,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        paddingHorizontal: Spacing.three,
        fontSize: 15,
        fontFamily: Fonts.sans,
    },
    submitBtn: {
        height: 48,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.four,
    },
    submitBtnText: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
});