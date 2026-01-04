"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Music2, Waves, ExternalLink, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

export default function AudioShowcase() {
    const { t, lang } = useLanguage();
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [duration, setDuration] = useState(0);

    const rawPlaylist = t("audio.playlist");
    const playlist = Array.isArray(rawPlaylist) ? rawPlaylist : [];
    const currentTrack = playlist[currentTrackIndex] || {
        title: "Loading...",
        description: "",
        url: "",
        category: ""
    };

    // Handle track loading when source changes
    useEffect(() => {
        if (audioRef.current && currentTrack.url) {
            console.log("Loading track:", currentTrack.title, currentTrack.url);
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play()
                    .then(() => console.log("Playback resumed after track change"))
                    .catch((err) => {
                        console.error("Playback failed after track change:", err);
                        setIsPlaying(false);
                    });
            }
        }
    }, [currentTrack.url]);

    // Handle play/pause toggling
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                console.log("Play requested");
                audioRef.current.play()
                    .then(() => console.log("Playback started"))
                    .catch((err) => {
                        console.error("Playback failed:", err);
                        setIsPlaying(false);
                    });
            } else {
                console.log("Pause requested");
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleTogglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setProgress(0);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setProgress(0);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            if (total) {
                setProgress((current / total) * 100);
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-6 py-20">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
                {/* Left: Info & Link */}
                <div className="space-y-12 order-2 lg:order-1">
                    <div className="space-y-8">
                        <Badge variant="glass" className="bg-brand-purple/10 text-brand-purple border-brand-purple/20 px-4 py-1.5 uppercase tracking-widest text-xs font-bold">
                            {t("audio.badge")}
                        </Badge>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.05]">
                            {t("audio.title1")} <span className="text-brand-purple italic font-serif">{t("audio.title2")}</span>
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                            {t("audio.description")}
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="glass-panel p-8 rounded-[2.5rem] space-y-4 border-border/40 hover:border-brand-purple/30 transition-all group">
                            <div className="size-12 rounded-2xl bg-brand-purple/5 flex items-center justify-center group-hover:bg-brand-purple/10 transition-colors">
                                <Headphones className="size-6 text-brand-purple/60 group-hover:text-brand-purple transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{t("audio.gen.title")}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium">{t("audio.gen.detail")}</p>
                        </div>
                        <a
                            href="https://naga-mastering.vercel.app/#wedo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-panel p-8 rounded-[2.5rem] space-y-4 border-border/40 hover:border-accent/40 transition-all group cursor-pointer"
                        >
                            <div className="size-12 rounded-2xl bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                <Waves className="size-6 text-accent/60 group-hover:text-accent transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                {t("audio.mastering.title")}
                                <ExternalLink className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium">{t("audio.mastering.detail")}</p>
                        </a>
                    </div>
                </div>

                {/* Right: Premium Player UI */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <motion.div
                        className="glass-panel relative aspect-square w-full max-w-md rounded-[4rem] overflow-hidden p-12 flex flex-col justify-between shadow-2xl border-white/20 dark:border-white/5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-purple/10 via-transparent to-accent/10 opacity-50" />

                        {/* Top Info */}
                        <div className="flex justify-between items-start">
                            <div className="size-14 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-xl flex items-center justify-center border border-white/20">
                                <Music2 className={`size-7 text-brand-purple transition-all duration-700 ${isPlaying ? 'scale-110' : 'opacity-40'}`} />
                            </div>
                            <Badge variant="outline" className="bg-white/20 dark:bg-black/20 backdrop-blur-md border-white/30 uppercase tracking-[0.2em] text-[10px] font-bold px-3 py-1">
                                {currentTrack.category}
                            </Badge>
                        </div>

                        {/* Visualizer */}
                        <div className="flex items-center justify-center gap-2 h-20">
                            {[...Array(16)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-brand-purple/40 rounded-full"
                                    animate={{
                                        height: isPlaying ? [10, 48, 24, 64, 16, 40][i % 6] : 8,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: i * 0.04,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Track Info */}
                        <div className="space-y-8 text-center">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold text-foreground truncate px-4 tracking-tight">
                                    {currentTrack.title}
                                </h3>
                                <p className="text-sm text-muted-foreground/80 line-clamp-2 px-8 font-medium italic">
                                    {currentTrack.description}
                                </p>
                            </div>

                            {/* Progress slider placeholder refined */}
                            <div className="space-y-3 px-4">
                                <div className="relative h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-brand-purple shadow-[0_0_12px_rgba(var(--brand-purple),0.4)]"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                                    <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-10">
                                <button
                                    onClick={handlePrev}
                                    className="text-foreground/40 hover:text-brand-purple transition-all duration-300 hover:scale-110"
                                >
                                    <SkipBack className="size-8" />
                                </button>

                                <Button
                                    onClick={handleTogglePlay}
                                    className="size-20 rounded-full bg-foreground text-background shadow-2xl hover:scale-105 transition-all duration-500 hover:shadow-brand-purple/20 p-0 flex items-center justify-center"
                                >
                                    {isPlaying ? <Pause className="size-10 fill-current" /> : <Play className="size-10 fill-current translate-x-1" />}
                                </Button>

                                <button
                                    onClick={handleNext}
                                    className="text-foreground/40 hover:text-brand-purple transition-all duration-300 hover:scale-110"
                                >
                                    <SkipForward className="size-8" />
                                </button>
                            </div>
                        </div>

                        <audio
                            ref={audioRef}
                            src={currentTrack.url}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleNext}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
