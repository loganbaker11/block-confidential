import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
  side: 'buy' | 'sell';
}

const mockOrders: OrderBookEntry[] = [
  { price: 42150.25, size: 2.5, total: 105375.63, side: 'sell' },
  { price: 42148.75, size: 1.8, total: 75867.75, side: 'sell' },
  { price: 42147.50, size: 3.2, total: 134872.00, side: 'sell' },
  { price: 42145.00, size: 5.1, total: 214939.50, side: 'sell' },
  { price: 42142.75, size: 2.9, total: 122213.98, side: 'sell' },
  { price: 42140.50, size: 4.7, total: 198060.35, side: 'buy' },
  { price: 42138.25, size: 3.1, total: 130628.58, side: 'buy' },
  { price: 42136.00, size: 6.2, total: 261243.20, side: 'buy' },
  { price: 42134.75, size: 2.3, total: 96909.93, side: 'buy' },
  { price: 42132.50, size: 4.8, total: 202236.00, side: 'buy' },
];

const OrderBook = () => {
  const sellOrders = mockOrders.filter(order => order.side === 'sell').reverse();
  const buyOrders = mockOrders.filter(order => order.side === 'buy');

  return (
    <Card className="bg-gradient-card border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-terminal font-semibold">Order Book</h3>
          <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
            BTC/USD
          </Badge>
        </div>

        <div className="space-y-1">
          <div className="grid grid-cols-3 gap-4 text-xs font-data text-muted-foreground border-b border-border pb-2 mb-2">
            <div>Price (USD)</div>
            <div className="text-right">Size (BTC)</div>
            <div className="text-right">Total (USD)</div>
          </div>

          {/* Sell Orders */}
          <div className="space-y-1">
            {sellOrders.map((order, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-3 gap-4 text-sm font-data hover:bg-muted/20 rounded p-1 transition-colors"
              >
                <div className="text-sell font-semibold">
                  {order.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-right text-foreground">
                  {order.size.toFixed(2)}
                </div>
                <div className="text-right text-muted-foreground">
                  {order.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>

          {/* Spread */}
          <div className="py-3 border-y border-border my-2">
            <div className="text-center">
              <div className="text-lg font-data font-bold text-primary">
                42,141.38
              </div>
              <div className="text-xs text-muted-foreground">
                Spread: $0.87 (0.002%)
              </div>
            </div>
          </div>

          {/* Buy Orders */}
          <div className="space-y-1">
            {buyOrders.map((order, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-3 gap-4 text-sm font-data hover:bg-muted/20 rounded p-1 transition-colors"
              >
                <div className="text-buy font-semibold">
                  {order.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-right text-foreground">
                  {order.size.toFixed(2)}
                </div>
                <div className="text-right text-muted-foreground">
                  {order.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderBook;