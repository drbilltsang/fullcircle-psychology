import { useState, useEffect, createContext, useContext } from "react";

interface AccessibilityContextType {
  speechEnabled: boolean;
  highContrast: boolean;
  fontSize: number;
  speechSynthesis: SpeechSynthesis | null;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSpeechEnabled(settings.speechEnabled || false);
      setHighContrast(settings.highContrast || false);
      setFontSize(settings.fontSize || 100);
    }
  }, []);

  useEffect(() => {
    // Apply speech enabled class to body
    if (speechEnabled) {
      document.body.classList.add('speech-enabled');
    } else {
      document.body.classList.remove('speech-enabled');
    }
  }, [speechEnabled]);

  const value = {
    speechEnabled,
    highContrast,
    fontSize,
    speechSynthesis
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}