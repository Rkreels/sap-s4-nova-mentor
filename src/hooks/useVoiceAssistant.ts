
import { useCallback, useEffect, useState } from 'react';

export const useVoiceAssistant = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    // Safely check if speechSynthesis is available in the window object
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
      
      // Initial voices load
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
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
        }
      };
      
      // Load voices initially
      loadVoices();
      
      // Chrome loads voices asynchronously - only attach the event if it exists
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } else {
      console.warn("Speech synthesis not available in this browser");
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
    if (!speechSynthesis) {
      console.warn("Speech synthesis not available");
      return;
    }
    
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
