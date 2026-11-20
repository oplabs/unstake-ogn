# Legacy OGN Unstake

A web application that allows users to withdraw OGN (Origin Protocol) tokens from legacy staking programs. This tool is designed to help users migrate from old staking contracts to new ones.

## 🚀 Features

- **Wallet Connection**: Connect your Web3 wallet using RainbowKit
- **Legacy Staking Support**: Unstake from both Story and Legacy staking contracts
- **Real-time Balance Checking**: View your current staked amounts
- **Transaction Management**: Built-in transaction status tracking and confirmation
- **Ethereum Integration**: Built on Ethereum mainnet with proper contract interactions

## 📋 Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended) or npm

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:oplabs/unstake-ogn.git
   cd unstake-ogn
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .dev.vars.example .dev.vars
   ```

   Edit `.dev.vars` and add your [dRPC](https://drpc.org) API key:

   ```
   VITE_DRPC_KEY=your_drpc_key
   ```

   If no key is set, the app falls back to the public RPC endpoint for Ethereum mainnet.

## 🚀 Development

### Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

### Type Checking

```bash
pnpm typecheck
```

### Preview Build

```bash
pnpm preview
```

## 📱 Usage

1. **Connect Wallet**: Click the "Connect Wallet" button and select your preferred wallet
2. **Check Balances**: The app will automatically display your staked OGN amounts from both contracts
3. **Unstake**: Click the "Unstake" button for the contract you want to withdraw from
4. **Confirm Transaction**: Approve the transaction in your wallet
5. **Monitor Status**: Track transaction progress through the built-in modal

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
