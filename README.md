# Amphi - AI Agent Platform

A modern, responsive AI agent platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Glass morphism design with smooth animations
- **Responsive Design**: Optimized for desktop and mobile devices
- **Type Safety**: Full TypeScript support with strict type checking
- **Component Library**: Reusable, standardized components
- **Performance**: Optimized with Next.js 15 and React 19
- **Accessibility**: WCAG compliant components

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP, CSS Animations
- **3D Graphics**: OGL (WebGL)
- **Icons**: React Icons
- **Deployment**: Cloudflare Pages

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── CardNav.tsx        # Navigation component
│   ├── FluidGlassInput.tsx # Glass input component
│   ├── LogoLoop.tsx       # Logo carousel
│   ├── Orb.tsx            # 3D orb component
│   ├── ShinyText.tsx      # Animated text
│   └── StarBorder.tsx     # Star border button
├── lib/                   # Utilities and configuration
│   ├── api.ts             # API client
│   ├── config.ts          # App configuration
│   ├── constants.ts       # Design tokens
│   ├── styles.ts          # Style utilities
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript definitions
│   ├── api.ts             # API types
│   ├── components.ts      # Component types
│   ├── env.ts             # Environment types
│   └── global.d.ts        # Global types
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/UGUFSds/self_agent.git
cd self_agent
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp env.example .env.local
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export static files

### Component Development

All components follow a standardized interface:

```typescript
interface ComponentProps extends StandardComponentProps {
  // Component-specific props
}

// Standard props include:
// - className, children, id, 'data-testid'
// - onClick, onMouseEnter, onMouseLeave, onFocus, onBlur
// - disabled, loading, size, variant
```

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Avoid inline styles when possible
- Use design tokens from `lib/constants.ts`
- Follow responsive design patterns

### Type Safety

- All components are fully typed
- Use strict TypeScript configuration
- Avoid `any` types
- Define proper interfaces for all props

## 🚀 Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `out`
4. Deploy!

### Environment Variables

Set the following environment variables in production:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
NEXT_PUBLIC_APP_NAME=Amphi
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 📚 API Integration

The project includes a complete API client setup:

```typescript
import { ApiClient, SearchApi, AuthApi } from "@/lib/api";

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL);
const searchApi = new SearchApi(apiClient);
const authApi = new AuthApi(apiClient);
```

## 🎨 Design System

### Colors

- Primary: Black (#000000) and White (#ffffff)
- Glass effects with configurable opacity
- Semantic color tokens for different states

### Typography

- Font: Arial (brand), Geist (body)
- Responsive text sizes
- Consistent line heights and spacing

### Components

- Standardized props interface
- Consistent event handling
- Responsive design patterns
- Accessibility compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [GSAP](https://greensock.com/gsap/) - Animation library
- [OGL](https://github.com/oframe/ogl) - WebGL library
