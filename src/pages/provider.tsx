import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import ProviderDashboard from "@/components/portal/provider-dashboard";

export default function Provider() {
  const { user, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated and has provider role
  if (user && user.role === 'provider') {
    return <ProviderDashboard />;
  }

  // Show login/register for unauthenticated users or patients
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Provider Portal</h2>
          <p className="text-muted-foreground">Healthcare professional access only</p>
        </div>
        {isLoginMode ? (
          <LoginForm onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
}