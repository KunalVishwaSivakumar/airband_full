import { User, Bell, Shield, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const Settings = () => {
  const [demoMode, setDemoMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen pb-24 px-4">
      <div className="max-w-md mx-auto pt-12 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your AirBand preferences</p>
        </div>

        {/* Health Profile */}
        <Card className="bg-card/30 backdrop-blur-sm border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Health Profile</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-foreground">Age</span>
              <span className="text-sm text-muted-foreground">28 years</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-foreground">Gender</span>
              <span className="text-sm text-muted-foreground">Not specified</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-foreground">Activity Level</span>
              <span className="text-sm text-muted-foreground">Moderate</span>
            </div>
          </div>
          <button className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-colors text-sm font-medium">
            Edit Profile
          </button>
        </Card>

        {/* App Settings */}
        <Card className="bg-card/30 backdrop-blur-sm border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Demo Mode</p>
                <p className="text-xs text-muted-foreground">Show sample data for testing</p>
              </div>
              <Switch checked={demoMode} onCheckedChange={setDemoMode} />
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground">Get health alerts and reminders</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="bg-card/30 backdrop-blur-sm border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Privacy & Security</h2>
          </div>
          <div className="space-y-2">
            <button className="w-full py-2 px-4 text-left hover:bg-primary/5 rounded-xl transition-colors text-sm text-foreground">
              Data & Privacy
            </button>
            <button className="w-full py-2 px-4 text-left hover:bg-primary/5 rounded-xl transition-colors text-sm text-foreground">
              Export Health Data
            </button>
            <button className="w-full py-2 px-4 text-left hover:bg-primary/5 rounded-xl transition-colors text-sm text-foreground">
              Delete All Data
            </button>
          </div>
        </Card>

        {/* About */}
        <Card className="bg-card/30 backdrop-blur-sm border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">About</h2>
          </div>
          <div className="space-y-2">
            <button className="w-full py-2 px-4 text-left hover:bg-primary/5 rounded-xl transition-colors text-sm text-foreground">
              Help & Support
            </button>
            <button className="w-full py-2 px-4 text-left hover:bg-primary/5 rounded-xl transition-colors text-sm text-foreground">
              Terms of Service
            </button>
            <button className="w-full py-2 px-4 text-left hover:bg-primary/5 rounded-xl transition-colors text-sm text-foreground">
              Privacy Policy
            </button>
          </div>
          <div className="pt-2 text-center">
            <p className="text-xs text-muted-foreground">AirBand v1.0.0</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
