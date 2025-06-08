import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto border-2 border-primary shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Cookie Consent</h3>
              <p className="text-neutral-600 mb-4">
                We use essential cookies to ensure our website functions properly and provide you with the best experience. 
                We also use analytics cookies to understand how you interact with our site and improve our services. 
                No personal health information is tracked through cookies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={acceptCookies} className="flex-1 sm:flex-none">
                  Accept All Cookies
                </Button>
                <Button onClick={declineCookies} variant="outline" className="flex-1 sm:flex-none">
                  Essential Only
                </Button>
                <Button 
                  onClick={() => window.location.href = '/privacy-policy'}
                  variant="ghost" 
                  className="flex-1 sm:flex-none text-primary"
                >
                  Privacy Policy
                </Button>
              </div>
            </div>
            <Button
              onClick={declineCookies}
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
              aria-label="Close cookie banner"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}