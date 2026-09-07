import { MiniPlayer } from '@/components/audio/MiniPlayer';
import { AudioProvider } from '@/context/AudioContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { setupAudioSession } from './track-player-service';
import { GlobalAlertContainer } from "@/components/ui/GlobalAlertContainer"
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  const initAudioMode = async () => {
    try {
      setupAudioSession().catch((err) =>
        console.error('Lỗi khởi tạo Audio Session:', err)
      );
    } catch (error) {
      console.error('Lỗi khởi tạo AudioMode:', error);
    }
  };

  useEffect(() => {
    setupAudioSession().catch((err) =>
      console.error('Lỗi khởi tạo Audio Session:', err)
    );
  }, []);

  useEffect(() => {
    initAudioMode();
  }, []);

  useEffect(() => {
    async function prepareApp() {
      try {
        await SplashScreen.hideAsync();

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepareApp();
  }, []);



  return (
    <ThemeProvider>
      <AudioProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="player"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              headerShown: false,
              gestureEnabled: false,
            }}
          />

        </Stack>
        <MiniPlayer />
        <GlobalAlertContainer />
      </AudioProvider>
    </ThemeProvider>

  );
}