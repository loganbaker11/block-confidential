import { Badge } from "@/components/ui/badge";
import { MessageSquare, Shield, Globe, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-gradient-card backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm font-terminal text-muted-foreground">
                End-to-End Encryption
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-terminal text-muted-foreground">
                Global Liquidity
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-warning" />
              <span className="text-sm font-terminal text-muted-foreground">
                Instant Settlement
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 animate-pulse">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-xs font-terminal text-primary">
                New encrypted message...
              </span>
            </div>
            
            <Badge variant="outline" className="bg-success/10 border-success text-success">
              <div className="w-2 h-2 rounded-full bg-success mr-1 animate-pulse"></div>
              System Secure
            </Badge>
            
            <div className="text-xs font-data text-muted-foreground">
              Latency: 0.8ms
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>
              © 2024 Encrypted OTC Trading Desk. All trades secured by cryptographic protocols.
            </div>
            <div className="flex items-center space-x-4">
              <span>Compliance: MiFID II, EMIR</span>
              <span>Licensed: FCA, SEC, CFTC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;