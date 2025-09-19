import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const MarketStats = () => {
  const stats = [
    {
      symbol: "BTC/USD",
      price: 42141.38,
      change: 2.45,
      changePercent: 5.8,
      volume: "2.4B",
      trending: "up"
    },
    {
      symbol: "ETH/USD", 
      price: 2487.92,
      change: -18.33,
      changePercent: -0.7,
      volume: "1.8B",
      trending: "down"
    },
    {
      symbol: "SOL/USD",
      price: 98.45,
      change: 4.21,
      changePercent: 4.5,
      volume: "589M",
      trending: "up"
    },
    {
      symbol: "AVAX/USD",
      price: 34.67,
      change: -1.23,
      changePercent: -3.4,
      volume: "234M", 
      trending: "down"
    }
  ];

  return (
    <Card className="bg-gradient-card border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-terminal font-semibold">Market Overview</h3>
          <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
            <Activity className="w-3 h-3 mr-1" />
            Live
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div 
              key={stat.symbol}
              className="bg-muted/10 rounded-lg p-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-terminal font-semibold text-muted-foreground">
                  {stat.symbol}
                </span>
                {stat.trending === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
              
              <div className="space-y-1">
                <div className="text-lg font-data font-bold text-foreground">
                  ${stat.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-data ${stat.change > 0 ? 'text-success' : 'text-destructive'}`}>
                    {stat.change > 0 ? '+' : ''}${stat.change}
                  </span>
                  <span className={`text-xs font-data ${stat.changePercent > 0 ? 'text-success' : 'text-destructive'}`}>
                    ({stat.changePercent > 0 ? '+' : ''}{stat.changePercent}%)
                  </span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Vol: {stat.volume}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MarketStats;