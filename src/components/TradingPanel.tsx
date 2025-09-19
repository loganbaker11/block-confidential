import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Send, Loader2 } from "lucide-react";
import { useTradingContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { toast } from "sonner";

const TradingPanel = () => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const { address, isConnected } = useAccount();
  const { createOrder, isPending, isConfirming, isConfirmed, error } = useTradingContract();

  const handleSubmitOrder = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!amount || !price) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const orderType = side === 'buy' ? 0 : 1;
      await createOrder('BTC', parseFloat(amount), parseFloat(price), orderType);
      toast.success("Order submitted successfully!");
      
      // Reset form
      setAmount('');
      setPrice('');
    } catch (err) {
      console.error('Error submitting order:', err);
      toast.error("Failed to submit order");
    }
  };

  return (
    <Card className="bg-gradient-card border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-terminal font-semibold">Block Trade</h3>
          <Badge variant="outline" className="bg-success/10 border-success text-success">
            <Lock className="w-3 h-3 mr-1" />
            Encrypted
          </Badge>
        </div>

        <Tabs value={side} onValueChange={(value) => setSide(value as 'buy' | 'sell')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="buy" className="data-[state=active]:bg-buy/20 data-[state=active]:text-buy">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-sell/20 data-[state=active]:text-sell">
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value={side} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-terminal">
                Amount (BTC)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-data text-lg bg-muted/20 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-terminal">
                Price (USD)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="42,141.38"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="font-data text-lg bg-muted/20 border-border"
              />
            </div>

            <div className="bg-muted/10 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-data">
                  {amount && price ? 
                    `$${(parseFloat(amount) * parseFloat(price)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                    : '$0.00'
                  }
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fee:</span>
                <span className="font-data text-muted-foreground">0.1%</span>
              </div>
            </div>

            <Button 
              className={`w-full ${side === 'buy' ? 'bg-buy hover:bg-buy/90' : 'bg-sell hover:bg-sell/90'} text-white font-terminal`}
              disabled={!amount || !price || !isConnected || isPending || isConfirming}
              onClick={handleSubmitOrder}
            >
              {isPending || isConfirming ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : `Submit Encrypted ${side === 'buy' ? 'Buy' : 'Sell'} Order`}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Order details are encrypted until both parties sign settlement
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default TradingPanel;