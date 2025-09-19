# Block Confidential

> **Secure Trading Platform for Confidential Transactions**

A cutting-edge decentralized trading platform that enables private, encrypted block trades with complete confidentiality. Built with modern Web3 technologies and featuring FHE (Fully Homomorphic Encryption) for maximum privacy.

## 🔐 Core Features

### **Confidential Trading**
- **FHE-Encrypted Orders**: All trade data encrypted using Zama's FHE technology
- **Private Settlement**: No public order book exposure
- **Secure Execution**: Encrypted trade matching and settlement

### **Web3 Integration**
- **Multi-Wallet Support**: Rainbow, MetaMask, WalletConnect, and more
- **Sepolia Testnet**: Deployed on Ethereum Sepolia for testing
- **Smart Contract Integration**: Direct blockchain interaction

### **Advanced Security**
- **End-to-End Encryption**: All sensitive data protected
- **Reputation System**: Trust-based trading with encrypted scoring
- **Portfolio Privacy**: Private balance and trade history tracking

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Web3**: RainbowKit + Wagmi + Viem
- **Encryption**: Zama FHE for confidential data
- **Blockchain**: Ethereum Sepolia Testnet

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/loganbaker11/block-confidential.git
cd block-confidential

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env.local` file:

```env
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_KEY
```

## 📋 Usage

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Select your preferred wallet provider
- Approve connection on Sepolia testnet

### 2. Create Encrypted Order
- Navigate to the trading panel
- Select buy/sell order type
- Enter amount and price (encrypted)
- Submit order to blockchain

### 3. Execute Trades
- Orders are matched privately
- Settlement occurs with FHE encryption
- Portfolio updated securely

## 🔧 Smart Contract

The platform uses a custom smart contract with FHE encryption:

```solidity
// Key features:
- Encrypted order creation
- Private trade execution  
- Secure portfolio tracking
- Reputation management
```

## 🚀 Deployment

### Vercel Deployment

1. **Import Project**
   - Connect GitHub repository to Vercel
   - Framework: Vite (auto-detected)

2. **Environment Variables**
   - Add all required environment variables
   - Configure for Production/Preview/Development

3. **Deploy**
   - Click "Deploy" button
   - Wait for build completion
   - Test functionality

### Manual Build

```bash
npm run build
npm run preview
```

## 🔒 Security Features

- **FHE Encryption**: All sensitive data encrypted
- **Private Transactions**: No public order exposure
- **Secure Wallets**: Multiple provider support
- **Encrypted Settlement**: Private trade execution
- **Reputation Privacy**: Encrypted scoring system

## 📊 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Smart         │    │   FHE           │
│   (React)       │◄──►│   Contract      │◄──►│   Encryption    │
│                 │    │   (Solidity)    │    │   (Zama)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web3          │    │   Ethereum      │    │   Private       │
│   Wallets       │    │   Sepolia       │    │   Data          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Key Benefits

- **Complete Privacy**: All trade data encrypted
- **No MEV**: Private order matching prevents front-running
- **Institutional Grade**: Professional trading features
- **Regulatory Compliance**: Privacy-focused design
- **Scalable**: Built for high-volume trading

## 🔗 Links

- **Repository**: [GitHub](https://github.com/loganbaker11/block-confidential)
- **Documentation**: [Deployment Guide](./DEPLOYMENT.md)
- **Smart Contract**: [BlockConfidential.sol](./contracts/BlockConfidential.sol)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## ⚠️ Disclaimer

This is a demonstration project for educational purposes. Always conduct thorough security audits before using in production environments.

---

**Built with ❤️ for the future of confidential trading**