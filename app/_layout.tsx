import { MiniPlayer } from '@/components/audio/MiniPlayer';
import { GlobalAlertContainer } from "@/components/ui/GlobalAlertContainer";
import { AudioProvider } from '@/context/AudioContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { setupAudioSession } from './track-player-service';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Promise.all([setupAudioSession()])
      .catch((error) => console.warn('Không thể khởi tạo audio:', error))
      .finally(async () => {
        setIsReady(true);
        await SplashScreen.hideAsync();
      });
  }, []);

  if (!isReady) return null;


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