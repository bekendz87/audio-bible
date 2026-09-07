import { CustomAlert } from '@/components/ui/CustomAlert';
import { Spacing } from '@/constants/theme';
import { AlertOptions, setGlobalAlertRef } from '@/services/alert';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function GlobalAlertContainer() {
    const insets = useSafeAreaInsets();
    const [alertConfig, setAlertConfig] = useState<AlertOptions | null>(null);
    const translateY = useRef(new Animated.Value(-150)).current;
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = (options: AlertOptions) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        setAlertConfig(options);

        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            speed: 14,
            bounciness: 6,
        }).start();

        const duration = options.duration ?? 3500;
        if (duration > 0) {
            timerRef.current = setTimeout(() => {
                hide();
            }, duration);
        }
    };

    const hide = () => {
        Animated.timing(translateY, {
            toValue: -150,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setAlertConfig(null);
        });
    };

    useEffect(() => {
        setGlobalAlertRef({ show, hide });
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            setGlobalAlertRef(null);
        };
    }, []);

    if (!alertConfig) return null;

    return (
        <View
            style={[styles.container, { top: insets.top + Spacing.two }]}
            pointerEvents="box-none"
        >
            <Animated.View style={[styles.animatedView, { transform: [{ translateY }] }]}>
                <CustomAlert
                    type={alertConfig.type}
                    title={alertConfig.title}
                    message={alertConfig.message}
                    onClose={hide}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: Spacing.four,
        right: Spacing.four,
        zIndex: 99999,
        elevation: 10,
    },
    animatedView: {
        width: '100%',
    },
});