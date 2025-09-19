import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Wallet } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import SettingsPanel from "./SettingsPanel";
import tradingLogo from "@/assets/trading-logo.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-gradient-card backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <img 
            src={tradingLogo} 
            alt="OTC Trading Desk" 
            className="h-10 w-20 object-contain"
          />
          <div>
            <h1 className="text-xl font-terminal font-bold text-foreground">
              Execute Block Trades Confidentially.
            </h1>
            <p className="text-sm text-muted-foreground">
              Institutional OTC Trading Desk
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-success/10 border-success text-success">
            <Shield className="w-3 h-3 mr-1" />
            Encrypted
          </Badge>
          
          <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
            Live Market
          </Badge>

          <SettingsPanel />

          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;