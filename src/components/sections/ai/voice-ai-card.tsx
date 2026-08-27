"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const VOICE_LANGUAGES = [
  { id: "en", label: "English", flag: "/ai/flags/en.svg" },
  { id: "de", label: "Deutsch", flag: "/ai/flags/de.svg" },
  { id: "fr", label: "Français", flag: "/ai/flags/fr.svg" },
  { id: "ja", label: "日本語", flag: "/ai/flags/ja.svg" },
  { id: "ar", label: "عربي", flag: "/ai/flags/ar.svg" },
] as const;

export type VoiceLangId = (typeof VOICE_LANGUAGES)[number]["id"];

const VOICE_GREETINGS: Record<VoiceLangId, string> = {
  en: "Hello, I'm your AI voice assistant. I can help you automate support, transcribe calls, and respond in any language — instantly and naturally.",
  de: "Hallo, ich bin Ihr KI-Sprachassistent. Ich kann Ihnen helfen, Support zu automatisieren, Anrufe zu transkribieren und in jeder Sprache zu antworten — sofort und natürlich.",
  fr: "Bonjour, je suis votre assistant vocal IA. Je peux vous aider à automatiser le support, transcrire les appels et répondre dans n'importe quelle langue — instantanément et naturellement.",
  ja: "こんにちは、AI音声アシスタントです。サポートの自動化、通話の文字起こし、あらゆる言語での応答を、即座に自然に行えます。",
  ar: "مرحباً، أنا مساعدك الصوتي بالذكاء الاصطناعي. يمكنني مساعدتك في أتمتة الدعم، ونسخ المكالمات، والرد بأي لغة — فوراً وبشكل طبيعي.",
};

const VOICE_AUDIO: Record<VoiceLangId, string> = {
  en: "/ai/voice/us.mp3",
  de: "/ai/voice/de.mp3",
  fr: "/ai/voice/fr.mp3",
  ja: "/ai/voice/jp.mp3",
  ar: "/ai/voice/arbi.mp3",
};

function splitGreetingSegments(text: string, lang: VoiceLangId): string[] {
  if (lang === "ja") {
    return text.match(/[^、。]+[、。]?/g) ?? [text];
  }
  return text.split(/\s+/).filter(Boolean);
}

function WaveformBars() {
  return (
    <div className="flex h-8 items-end justify-center gap-1">
      {[3, 5, 8, 12, 8, 14, 10, 6, 9, 13, 7, 4].map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-white/40"
          animate={{ height: [h, h * 1.6, h] }}
          transition={{
            duration: 1.2 + i * 0.08,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

function FlagIcon({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full",
        className ?? "h-7 w-7"
      )}
    >
      <Image src={src} alt={`${label} flag`} fill className="object-cover" sizes="28px" />
    </span>
  );
}

function VoiceGreetingText({ lang }: { lang: VoiceLangId }) {
  const segments = splitGreetingSegments(VOICE_GREETINGS[lang], lang);

  return (
    <div className="mb-6 min-h-[5.5rem] overflow-hidden sm:min-h-[4.5rem]">
      <AnimatePresence mode="wait">
        <motion.p
          key={lang}
          dir={lang === "ar" ? "rtl" : "ltr"}
          className={cn(
            "flex flex-wrap gap-x-[0.28em] gap-y-0.5 text-sm leading-relaxed text-zinc-400",
            lang === "ar" && "justify-end text-right"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {segments.map((segment, i) => (
            <span key={`${lang}-${i}`} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{
                  y: i % 2 === 0 ? "110%" : "-110%",
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: i * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                exit={{
                  y: i % 2 === 0 ? "-80%" : "80%",
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    delay: i * 0.025,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
              >
                {segment}
                {lang !== "ja" ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function LanguageSelector({
  selected,
  onSelect,
}: {
  selected: VoiceLangId;
  onSelect: (id: VoiceLangId) => void;
}) {
  const [open, setOpen] = useState(false);
  const current =
    VOICE_LANGUAGES.find((lang) => lang.id === selected) ?? VOICE_LANGUAGES[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-white/20"
      >
        <FlagIcon src={current.flag} label={current.label} className="h-5 w-5" />
        {current.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-zinc-600 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-20 mt-2 w-full min-w-[220px] space-y-2">
          {VOICE_LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => {
                onSelect(lang.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors",
                selected === lang.id
                  ? "border-white/20 bg-zinc-900"
                  : "border-white/10 bg-zinc-950 hover:bg-zinc-900"
              )}
            >
              <FlagIcon src={lang.flag} label={lang.label} />
              <span className="text-sm font-medium text-zinc-200">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function VoiceAICard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [paused, setPaused] = useState(false);
  const [selectedLang, setSelectedLang] = useState<VoiceLangId>("en");
  const [isPlaying, setIsPlaying] = useState(false);

  const playLanguageAudio = useCallback(async (lang: VoiceLangId) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.src = VOICE_AUDIO[lang];
    audio.currentTime = 0;

    try {
      await audio.play();
      setPaused(false);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const handleLanguageSelect = (lang: VoiceLangId) => {
    setSelectedLang(lang);
    void playLanguageAudio(lang);
  };

  const handlePauseToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (paused) {
      if (!audio.src) {
        await playLanguageAudio(selectedLang);
        return;
      }
      try {
        await audio.play();
        setPaused(false);
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setPaused(true);
    setIsPlaying(false);
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
        onEnded={() => {
          setPaused(true);
          setIsPlaying(false);
        }}
        className="hidden"
      />
      <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <VoiceGreetingText lang={selectedLang} />
        <div className="flex flex-wrap items-center gap-3">
          <LanguageSelector selected={selectedLang} onSelect={handleLanguageSelect} />
          <button
            type="button"
            onClick={() => void handlePauseToggle()}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
        {!paused && isPlaying && (
          <div className="mt-5">
            <WaveformBars />
          </div>
        )}
      </div>
    </>
  );
}
