import { AlertType } from '@/components/ui/CustomAlert';

export interface AlertOptions {
    title?: string;
    message: string;
    type?: AlertType;
    duration?: number; 
}

type AlertRef = {
    show: (options: AlertOptions) => void;
    hide: () => void;
};

let alertRef: AlertRef | null = null;

export const setGlobalAlertRef = (ref: AlertRef | null) => {
    alertRef = ref;
};

export class AlertApp {
    static show(options: AlertOptions) {
        if (alertRef) {
            alertRef.show(options);
        } else {
            console.warn('AlertApp ref chưa được khởi tạo trong Root/Layout!');
        }
    }

    static success(message: string, title?: string, duration?: number) {
        this.show({ type: 'success', message, title, duration });
    }

    static error(message: string, title?: string, duration?: number) {
        this.show({ type: 'error', message, title, duration });
    }

    static warning(message: string, title?: string, duration?: number) {
        this.show({ type: 'warning', message, title, duration });
    }

    static info(message: string, title?: string, duration?: number) {
        this.show({ type: 'info', message, title, duration });
    }

    static hide() {
        if (alertRef) {
            alertRef.hide();
        }
    }
}