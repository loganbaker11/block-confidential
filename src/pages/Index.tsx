import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketStats from "@/components/MarketStats";
import OrderBook from "@/components/OrderBook";
import TradingPanel from "@/components/TradingPanel";
import ChatPanel from "@/components/ChatPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-terminal">
      <Header />
      
      <main className="container mx-auto px-6 py-6 space-y-6">
        <MarketStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TradingPanel />
          </div>
          
          <div className="lg:col-span-1">
            <OrderBook />
          </div>
          
          <div className="lg:col-span-1">
            <ChatPanel />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
