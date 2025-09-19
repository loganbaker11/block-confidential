import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Lock, Shield } from "lucide-react";

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  encrypted: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    user: 'JPMorgan_Desk',
    message: 'Looking for 50 BTC block, can you facilitate?',
    timestamp: new Date(Date.now() - 300000),
    encrypted: true
  },
  {
    id: '2',
    user: 'Goldman_OTC',
    message: 'Have 25 BTC available at market +0.15%',
    timestamp: new Date(Date.now() - 240000),
    encrypted: true
  },
  {
    id: '3',
    user: 'Citadel_Block',
    message: 'Interested in ETH blocks today?',
    timestamp: new Date(Date.now() - 180000),
    encrypted: true
  },
  {
    id: '4',
    user: 'Morgan_Stanley',
    message: 'Settlement ready for yesterday\'s 100 BTC block',
    timestamp: new Date(Date.now() - 120000),
    encrypted: true
  }
];

const ChatPanel = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      user: 'Your_Desk',
      message: newMessage,
      timestamp: new Date(),
      encrypted: true
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="bg-gradient-card border-border h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-terminal font-semibold">Private Chat</h3>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-success/10 border-success text-success">
              <Shield className="w-3 h-3 mr-1" />
              E2E Encrypted
            </Badge>
            <Badge variant="outline" className="bg-primary/10 border-primary text-primary">
              4 Online
            </Badge>
          </div>
        </div>
      </div>

      <ScrollArea className="h-80 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-terminal font-semibold text-primary">
                  {msg.user}
                </span>
                {msg.encrypted && (
                  <Lock className="w-3 h-3 text-success" />
                )}
                <span className="text-xs text-muted-foreground">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="bg-muted/20 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-foreground">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            placeholder="Type encrypted message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-muted/20 border-border font-terminal"
          />
          <Button 
            onClick={sendMessage}
            className="bg-gradient-primary hover:opacity-90"
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center">
          <Lock className="w-3 h-3 mr-1" />
          All messages are end-to-end encrypted
        </p>
      </div>
    </Card>
  );
};

export default ChatPanel;