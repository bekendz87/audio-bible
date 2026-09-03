import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Track {
    id: string;
    title: string;
    subtitle: string;
    audioUrl: string;
    artworkUrl?: string;
    duration?: number;
}

interface AudioContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    playbackRate: number;
    isMuted: boolean;
    playTrack: (track: Track) => void;
    togglePlayPause: () => void;
    seekTo: (seconds: number) => void;
    setSpeed: (rate: number) => void;
    toggleMute: () => void;
    stop: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [sourceUrl, setSourceUrl] = useState<string | null>(null);
    const [playbackRate, setPlaybackRateState] = useState<number>(1.0);
    const [isMuted, setIsMutedState] = useState<boolean>(false);

    useEffect(() => {
        setAudioModeAsync({
            playsInSilentMode: true,
            allowsRecording: false,
        }).catch((error) => {
            console.log("Không thể thiết lập Audio Mode chạy ngầm:", error);
        });
    }, []);

    const player = useAudioPlayer(sourceUrl ? { uri: sourceUrl } : null, {
        updateInterval: 500,
    });

    const status = useAudioPlayerStatus(player);

    const playTrack = (track: Track) => {
        if (currentTrack?.id === track.id) {
            togglePlayPause();
            return;
        }
        setCurrentTrack(track);
        setSourceUrl(track.audioUrl);
    };

    useEffect(() => {
        if (sourceUrl && player) {
            player.play();
        }
    }, [sourceUrl, player]);

    const togglePlayPause = () => {
        if (!player) return;
        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
    };

    const seekTo = (seconds: number) => {
        if (player) {
            player.seekTo(seconds);
        }
    };

    const setSpeed = (rate: number) => {
        if (player) {
            player.setPlaybackRate(rate);
            setPlaybackRateState(rate);
        }
    };

    const toggleMute = () => {
        if (!player) {
            return;
        }
        const nextMute = !isMuted;
        player.muted = nextMute;
        setIsMutedState(nextMute);
    };

    const stop = () => {
        if (player) {
            player.pause();
            setCurrentTrack(null);
            setSourceUrl(null);
        }
    };

    const currentTime = status?.currentTime ?? player?.currentTime ?? 0;
    const duration = (status?.duration && status.duration > 0)
        ? status.duration
        : (currentTrack?.duration ?? player?.duration ?? 0);

    return (
        <AudioContext.Provider
            value={{
                currentTrack,
                isPlaying: status?.playing || false,
                currentTime,
                duration,
                playbackRate,
                isMuted,
                playTrack,
                togglePlayPause,
                seekTo,
                setSpeed,
                toggleMute,
                stop,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio phải được sử dụng bên trong AudioProvider');
    }
    return context;
}