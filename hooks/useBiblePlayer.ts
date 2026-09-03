import { AudioSource, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useEffect, useState } from 'react';

export function useBiblePlayer(audioUrl?: string) {
    const [source, setSource] = useState<AudioSource | null>(null);

    useEffect(() => {
        if (audioUrl) {
            setSource({ uri: audioUrl });
        }
    }, [audioUrl]);

    const player = useAudioPlayer(source);
    const status = useAudioPlayerStatus(player);

    const togglePlayPause = () => {
        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
    };

    const seekTo = (seconds: number) => {
        player.seekTo(seconds * 1000);
    };

    const skipForward = (seconds = 15) => {
        const nextTime = Math.min((status.currentTime + seconds * 1000), status.duration);
        player.seekTo(nextTime);
    };

    const skipBackward = (seconds = 15) => {
        const prevTime = Math.max((status.currentTime - seconds * 1000), 0);
        player.seekTo(prevTime);
    };

    const setPlaybackRate = (rate: number) => {
        player.setPlaybackRate(rate);
    };

    return {
        player,
        isPlaying: status.playing,
        currentTime: Math.floor((status.currentTime || 0) / 1000), 
        duration: Math.floor((status.duration || 0) / 1000),     
        isLoaded: status.isLoaded,
        togglePlayPause,
        seekTo,
        skipForward,
        skipBackward,
        setPlaybackRate,
    };
}