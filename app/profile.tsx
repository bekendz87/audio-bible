import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { BorderRadius, Fonts, Spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme';
import { AlertApp } from '@/services/alert';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Camera,
    Check,
    KeyRound,
    Mail,
    Phone,
    Shield,
    User,
} from 'lucide-react-native';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProfileDetailScreen() {
    const colors = useThemeColors();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [name, setName] = useState('Nguyễn Văn A');
    const [email, setEmail] = useState('nguyenvana@gmail.com');
    const [phone, setPhone] = useState('0987654321');
    const role = 'Thành viên';

    const handlePickAvatar = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            AlertApp.warning('Cần cấp quyền truy cập thư viện ảnh để đổi đại diện.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0].uri) {
            setAvatarUri(result.assets[0].uri);
            AlertApp.success('Cập nhật ảnh đại diện thành công!');
        }
    };

    const handleSave = () => {
        setIsSaveModalVisible(false);
        setIsEditing(false);
        AlertApp.success('Thông tin cá nhân đã được cập nhật.');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => router.back()}
                    hitSlop={8}
                >
                    <ArrowLeft color={colors.text} size={24} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Thông tin tài khoản</Text>
                {isEditing ? (
                    <TouchableOpacity onPress={() => setIsSaveModalVisible(true)} hitSlop={8}>
                        <Check color={colors.primary} size={22} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)} hitSlop={8}>
                        <Text style={[styles.editBtnText, { color: colors.primary }]}>Sửa</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.avatarContainer}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
                        {avatarUri ? (
                            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                        ) : (
                            <User color={colors.primaryElement} size={48} />
                        )}
                        <TouchableOpacity
                            style={[styles.cameraBadge, { backgroundColor: colors.card, borderColor: colors.border }]}
                            activeOpacity={0.8}
                            onPress={handlePickAvatar}
                        >
                            <Camera color={colors.primary} size={16} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.userName, { color: colors.text }]}>{name}</Text>
                    <Text style={[styles.userRole, { color: colors.textMuted }]}>{role}</Text>
                </View>

                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>THÔNG TIN CÁ NHÂN</Text>
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.fieldRow}>
                        <User color={colors.primary} size={20} />
                        <View style={styles.fieldContent}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Họ và tên</Text>
                            {isEditing ? (
                                <TextInput
                                    style={[styles.fieldInput, { color: colors.text, borderColor: colors.border }]}
                                    value={name}
                                    onChangeText={setName}
                                />
                            ) : (
                                <Text style={[styles.fieldValue, { color: colors.text }]}>{name}</Text>
                            )}
                        </View>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <View style={styles.fieldRow}>
                        <Mail color={colors.primary} size={20} />
                        <View style={styles.fieldContent}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Địa chỉ Email</Text>
                            <Text style={[styles.fieldValue, { color: colors.text }]}>{email}</Text>
                        </View>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <View style={styles.fieldRow}>
                        <Phone color={colors.primary} size={20} />
                        <View style={styles.fieldContent}>
                            <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Số điện thoại</Text>
                            {isEditing ? (
                                <TextInput
                                    style={[styles.fieldInput, { color: colors.text, borderColor: colors.border }]}
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                />
                            ) : (
                                <Text style={[styles.fieldValue, { color: colors.text }]}>{phone}</Text>
                            )}
                        </View>
                    </View>
                </View>

                <Text style={[styles.sectionHeader, { color: colors.textMuted }]}>BẢO MẬT TÀI KHOẢN</Text>
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <TouchableOpacity
                        style={styles.actionRow}
                        activeOpacity={0.7}
                        onPress={() => router.push('/change-password' as any)}
                    >
                        <View style={styles.actionLeft}>
                            <KeyRound color={colors.primary} size={20} />
                            <Text style={[styles.actionText, { color: colors.text }]}>Đổi mật khẩu</Text>
                        </View>
                        <Shield color={colors.textMuted} size={18} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ConfirmModal
                visible={isSaveModalVisible}
                type="info"
                title="Lưu thay đổi"
                message="Bạn có chắc chắn muốn lưu thông tin vừa cập nhật không?"
                confirmText="Lưu"
                cancelText="Hủy"
                onConfirm={handleSave}
                onCancel={() => setIsSaveModalVisible(false)}
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
        paddingTop: Spacing.two,
        paddingBottom: Spacing.three,
    },
    backBtn: {
        padding: Spacing.one,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
    },
    editBtnText: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: Fonts.sans,
    },
    scrollContent: {
        paddingHorizontal: Spacing.four,
        paddingBottom: 120,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: Spacing.four,
    },
    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    avatarImage: {
        width: 88,
        height: 88,
        borderRadius: 44,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        marginTop: Spacing.three,
    },
    userRole: {
        fontSize: 13,
        fontFamily: Fonts.sans,
        marginTop: 2,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: Fonts.sans,
        letterSpacing: 1,
        marginBottom: Spacing.two,
        marginTop: Spacing.three,
    },
    card: {
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        overflow: 'hidden',
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.three,
        gap: Spacing.three,
    },
    fieldContent: {
        flex: 1,
    },
    fieldLabel: {
        fontSize: 12,
        fontFamily: Fonts.sans,
    },
    fieldValue: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: Fonts.sans,
        marginTop: 2,
    },
    fieldInput: {
        fontSize: 15,
        fontFamily: Fonts.sans,
        borderBottomWidth: 1,
        paddingVertical: 2,
        marginTop: 2,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.three,
    },
    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
    },
    actionText: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: Fonts.sans,
    },
    divider: {
        height: 1,
        marginLeft: Spacing.four,
    },
});