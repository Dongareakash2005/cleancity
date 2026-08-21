import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Languages } from 'lucide-react';
import { translations, Language } from './translations';

interface District {
  name: string;
  coordinates: { lat: number; lng: number };
}

const districts: District[] = [
  { name: 'Siliguri', coordinates: { lat: 26.7271, lng: 88.3953 } },
  { name: 'Darjeeling', coordinates: { lat: 27.036, lng: 88.2627 } },
  { name: 'Jalpaiguri', coordinates: { lat: 26.5499, lng: 88.7177 } },
  { name: 'Cooch Behar', coordinates: { lat: 26.3157, lng: 89.4591 } },
  { name: 'Alipurduar', coordinates: { lat: 26.4915, lng: 89.5229 } },
  { name: 'Kalimpong', coordinates: { lat: 27.0587, lng: 88.4669 } },
];

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिन्दी (Hindi)' },
  { value: 'bengali', label: 'বাংলা (Bengali)' },
  { value: 'santhali', label: 'ᱥᱟᱱᱛᱟᱲᱤ (Santhali)' },
  { value: 'nagpuri', label: 'नागपुरी (Nagpuri)' },
];

interface OnboardingScreenProps {
  onComplete: (district: string, coordinates: { lat: number; lng: number }, language: Language) => void;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function OnboardingScreen({ onComplete, currentLanguage, onLanguageChange }: OnboardingScreenProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const t = translations[currentLanguage];

  const handleContinue = () => {
    const district = districts.find((d) => d.name === selectedDistrict);
    if (!district) return;
    onComplete(district.name, district.coordinates, currentLanguage);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <img src="/logo.png" alt="App logo" className="w-14 h-14 object-contain rounded-full mx-auto" />
          <h1 className="text-2xl font-semibold text-foreground">Civic Connect</h1>
          <p className="text-sm text-muted-foreground">Set language and area to personalize your local issue feed.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2" htmlFor="language-select">
            <Languages className="w-4 h-4" />
            {t.selectLanguage}
          </label>
          <Select value={currentLanguage} onValueChange={(value: string) => onLanguageChange(value as Language)}>
            <SelectTrigger id="language-select" aria-label="Select language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2" htmlFor="district-select">
            <MapPin className="w-4 h-4" />
            {t.selectDistrict}
          </label>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger id="district-select" aria-label="Select district">
              <SelectValue placeholder="Choose district" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district.name} value={district.name}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={handleContinue} disabled={!selectedDistrict}>
          {t.continue}
        </Button>
      </div>
    </div>
  );
}
