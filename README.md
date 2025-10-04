# Modern QR Code Generator

A sleek, user-friendly web application for creating customizable QR codes for various purposes. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Multiple QR Types**: Generate QR codes for URLs, WiFi networks, locations, WhatsApp messages, emails, and files
- **Beautiful Customization**: Personalize your QR codes with colors, gradients, and logos
- **Logo Integration**: Add popular social media logos or upload your own custom logo
- **High Quality Downloads**: Export your QR codes in PNG, SVG, PDF, or JPEG formats in various sizes
- **Real-time Preview**: See your QR code update instantly as you make changes
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Project Structure

```
qr-code-web/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src/
│   ├── App.tsx                  # Main application component
│   ├── components/              # UI components
│   │   ├── QRCodePreview.tsx    # QR code preview display
│   │   ├── QRDataInput.tsx      # Input fields for QR data
│   │   ├── QRDownload.tsx       # Download options for QR codes
│   │   ├── QRStyleCustomizer.tsx # QR style customization
│   │   └── QRTypeSelector.tsx   # QR type selection
│   ├── index.css                # Global styles
│   ├── main.tsx                 # Entry point
│   ├── styles/                  # Additional styles
│   ├── types/                   # TypeScript type definitions
│   │   └── qr.ts               # QR code related types
│   ├── utils/                   # Utility functions
│   │   ├── countryCodes.ts      # Country codes for phone numbers
│   │   ├── qrGenerator.ts       # QR code generation logic
│   │   └── validation.ts        # Input validation
│   └── vite-env.d.ts           # Vite environment types
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.app.json           # TypeScript configuration for app
├── tsconfig.json               # Main TypeScript configuration
├── tsconfig.node.json          # TypeScript configuration for Node
└── vite.config.ts              # Vite configuration
```

## 🔧 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/4rmnd/qr-code-web.git
   cd qr-code-web
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 Usage

1. Select the type of QR code you want to create
2. Fill in the required information
3. Customize the appearance of your QR code
4. Download your QR code in your preferred format

## 🧑‍💻 Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Vite**: Build tool
- **qrcode.react**: QR code generation
- **Framer Motion**: Animations

## 👤 Author

- GitHub: [@4rmnd](https://github.com/4rmnd)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Thank You

Thank you for using or contributing to this project. Hope it's useful!