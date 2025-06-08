import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Contrast, Sun, Moon, Type, Minus, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AccessibilitySettings {
  speechEnabled: boolean;
  highContrast: boolean;
  fontSize: number;
}

export default function AccessibilityToolbar() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    speechEnabled: false,
    highContrast: false,
    fontSize: 100
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  const applySettings = (newSettings: AccessibilitySettings) => {
    // Apply high contrast mode
    if (newSettings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply font size
    document.documentElement.style.fontSize = `${newSettings.fontSize}%`;
  };

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    applySettings(updated);
    localStorage.setItem('accessibility-settings', JSON.stringify(updated));
  };

  const speakText = (text: string) => {
    if (speechSynthesis && settings.speechEnabled) {
      speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeech = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };

  const toggleSpeech = () => {
    const newSpeechEnabled = !settings.speechEnabled;
    updateSettings({ speechEnabled: newSpeechEnabled });
    
    if (newSpeechEnabled) {
      speakText("Text to speech is now enabled. Click on any text to have it read aloud.");
    } else {
      stopSpeech();
    }
  };

  const toggleContrast = () => {
    updateSettings({ highContrast: !settings.highContrast });
  };

  const adjustFontSize = (increase: boolean) => {
    const newSize = increase 
      ? Math.min(settings.fontSize + 10, 150)
      : Math.max(settings.fontSize - 10, 80);
    updateSettings({ fontSize: newSize });
  };

  const resetSettings = () => {
    const defaultSettings = {
      speechEnabled: false,
      highContrast: false,
      fontSize: 100
    };
    updateSettings(defaultSettings);
    stopSpeech();
  };

  // Add click listener for text-to-speech
  useEffect(() => {
    if (!settings.speechEnabled) return;

    const handleTextClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'P' || target.tagName === 'H1' || 
          target.tagName === 'H2' || target.tagName === 'H3' || 
          target.tagName === 'H4' || target.tagName === 'LI' || 
          target.tagName === 'SPAN' || target.tagName === 'DIV')) {
        const text = target.textContent || target.innerText;
        if (text && text.trim().length > 0) {
          speakText(text.trim());
        }
      }
    };

    document.addEventListener('click', handleTextClick);
    return () => document.removeEventListener('click', handleTextClick);
  }, [settings.speechEnabled, speechSynthesis]);

  return (
    <div className="fixed right-4 top-20 z-50">
      <div className={`bg-white dark:bg-neutral-800 rounded-lg shadow-lg border transition-all duration-300 ${
        isExpanded ? 'p-4' : 'p-2'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2"
          >
            <Type className="w-4 h-4" />
          </Button>
          {isExpanded && (
            <span className="text-sm font-medium text-muted-foreground">Accessibility</span>
          )}
        </div>

        {isExpanded && (
          <div className="space-y-3 min-w-[200px]">
            {/* Text-to-Speech */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Text-to-Speech</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={settings.speechEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSpeech}
                    className="p-2"
                  >
                    {settings.speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{settings.speechEnabled ? "Disable" : "Enable"} text-to-speech</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <span className="text-sm">High Contrast</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={settings.highContrast ? "default" : "outline"}
                    size="sm"
                    onClick={toggleContrast}
                    className="p-2"
                  >
                    <Contrast className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{settings.highContrast ? "Disable" : "Enable"} high contrast mode</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <span className="text-sm">Font Size: {settings.fontSize}%</span>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustFontSize(false)}
                      disabled={settings.fontSize <= 80}
                      className="p-2"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Decrease font size</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustFontSize(true)}
                      disabled={settings.fontSize >= 150}
                      className="p-2"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Increase font size</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Reset Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={resetSettings}
              className="w-full text-xs"
            >
              Reset to Default
            </Button>

            {settings.speechEnabled && (
              <div className="text-xs text-muted-foreground border-t pt-2">
                Click on any text to hear it read aloud
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}