import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Bell, Wallet, Lock, User, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SettingsPanel = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Account Settings
    displayName: 'Institution_Alpha',
    email: 'trading@institution.com',
    timezone: 'UTC',
    
    // Security Settings
    twoFactorEnabled: true,
    encryptionLevel: 'AES-256',
    sessionTimeout: '30',
    
    // Trading Settings
    defaultOrderSize: '1000000',
    slippageTolerance: '0.5',
    autoConfirm: false,
    
    // Notification Settings
    tradeAlerts: true,
    priceAlerts: true,
    systemNotifications: true,
    
    // Wallet Settings
    defaultWallet: 'MetaMask',
    gasPreference: 'standard',
  });

  const handleSave = () => {
    toast({
      title: "设置已保存",
      description: "您的配置已成功更新",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-card border-border hover:bg-accent">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-terminal text-foreground">交易平台设置</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-muted">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              账户
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              安全
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              交易
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              通知
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              钱包
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">账户信息</CardTitle>
                <CardDescription className="text-muted-foreground">管理您的基本账户设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">显示名称</Label>
                    <Input 
                      id="displayName"
                      value={settings.displayName}
                      onChange={(e) => updateSetting('displayName', e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱地址</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">时区</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="CST">Central Time</SelectItem>
                      <SelectItem value="JST">Japan Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  安全设置
                </CardTitle>
                <CardDescription className="text-muted-foreground">配置您的安全和加密偏好</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">双因素认证</Label>
                    <p className="text-sm text-muted-foreground">为您的账户增加额外的安全层</p>
                  </div>
                  <Switch 
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => updateSetting('twoFactorEnabled', checked)}
                  />
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>加密级别</Label>
                    <Select value={settings.encryptionLevel} onValueChange={(value) => updateSetting('encryptionLevel', value)}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AES-128">AES-128</SelectItem>
                        <SelectItem value="AES-256">AES-256</SelectItem>
                        <SelectItem value="ChaCha20">ChaCha20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>会话超时 (分钟)</Label>
                    <Input 
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">交易偏好</CardTitle>
                <CardDescription className="text-muted-foreground">自定义您的交易体验</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>默认订单规模 (USD)</Label>
                    <Input 
                      type="number"
                      value={settings.defaultOrderSize}
                      onChange={(e) => updateSetting('defaultOrderSize', e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>滑点容忍度 (%)</Label>
                    <Input 
                      type="number"
                      step="0.1"
                      value={settings.slippageTolerance}
                      onChange={(e) => updateSetting('slippageTolerance', e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">自动确认交易</Label>
                    <p className="text-sm text-muted-foreground">符合条件时自动确认交易</p>
                  </div>
                  <Switch 
                    checked={settings.autoConfirm}
                    onCheckedChange={(checked) => updateSetting('autoConfirm', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">通知设置</CardTitle>
                <CardDescription className="text-muted-foreground">管理您接收的通知类型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">交易提醒</Label>
                    <p className="text-sm text-muted-foreground">交易执行和状态更新</p>
                  </div>
                  <Switch 
                    checked={settings.tradeAlerts}
                    onCheckedChange={(checked) => updateSetting('tradeAlerts', checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">价格提醒</Label>
                    <p className="text-sm text-muted-foreground">市场价格变动通知</p>
                  </div>
                  <Switch 
                    checked={settings.priceAlerts}
                    onCheckedChange={(checked) => updateSetting('priceAlerts', checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">系统通知</Label>
                    <p className="text-sm text-muted-foreground">平台维护和更新</p>
                  </div>
                  <Switch 
                    checked={settings.systemNotifications}
                    onCheckedChange={(checked) => updateSetting('systemNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">钱包配置</CardTitle>
                <CardDescription className="text-muted-foreground">管理钱包连接和Gas费用设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>默认钱包</Label>
                    <Select value={settings.defaultWallet} onValueChange={(value) => updateSetting('defaultWallet', value)}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MetaMask">MetaMask</SelectItem>
                        <SelectItem value="WalletConnect">WalletConnect</SelectItem>
                        <SelectItem value="Coinbase">Coinbase Wallet</SelectItem>
                        <SelectItem value="Ledger">Ledger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Gas费偏好</Label>
                    <Select value={settings.gasPreference} onValueChange={(value) => updateSetting('gasPreference', value)}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">慢速 (低费用)</SelectItem>
                        <SelectItem value="standard">标准</SelectItem>
                        <SelectItem value="fast">快速 (高费用)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" className="border-border">
            重置
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            保存设置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPanel;