import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

export const setupAudioSession = async () => {
    await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionMode: 'doNotMix',
    });
};

export const createPlayerWithControls = (
    audioSource: string | { uri: string },
    metadata?: { title?: string; artist?: string; artworkUrl?: string }
) => {
    const player = createAudioPlayer(audioSource);

    player.setActiveForLockScreen(true, {
        title: metadata?.title ?? 'Title',
        artist: metadata?.artist ?? 'Artist',
        artworkUrl: metadata?.artworkUrl,
    });

    return player;
};