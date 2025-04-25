
import { useCallback, useEffect, useState } from 'react';

export const useVoiceAssistant = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
      
      // Initial voices load
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Try to find a female English voice
        const femaleVoice = availableVoices.find(
          voice => voice.name.includes('Female') || 
                  voice.name.includes('female') || 
                  voice.name.includes('Samantha') ||
                  (voice.name.includes('Google') && voice.lang.includes('en-US'))
        );
        
        // Fallback to any English voice
        const englishVoice = availableVoices.find(
          voice => voice.lang.includes('en')
        );
        
        setPreferredVoice(femaleVoice || englishVoice || availableVoices[0]);
      };
      
      // Chrome loads voices asynchronously
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      loadVoices();
    }
  }, []);

  // Stop any current speech before unloading
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis]);

  // Speak text function
  const speak = useCallback((text: string) => {
    if (!speechSynthesis) return;
    
    // Stop any current speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesis.speak(utterance);
  }, [speechSynthesis, preferredVoice]);

  // Stop speaking
  const stop = useCallback(() => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [speechSynthesis]);

  return {
    speak,
    stop,
    isSpeaking,
    voices,
    preferredVoice,
  };
};
