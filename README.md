# LeRub - Sunscreen E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 14, specializing in sunscreen products. Features secure authentication, payment processing, and a comprehensive admin dashboard.

## Features

### Customer Features
- 🛍️ Browse and search sunscreen products
- 🛒 Shopping cart with persistent storage
- 💳 Secure checkout with Stripe integration
- 👤 User authentication and profile management
- 📦 Order tracking and history
- 🔍 Advanced product filtering and search

### Admin Features
- 📊 Comprehensive analytics dashboard
- 📦 Product management (CRUD operations)
- 🖼️ Image upload and management via Cloudinary
- 📈 Sales and revenue tracking
- 👥 User management
- 🔔 Order notifications and management

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Recharts** - Data visualization

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - ORM for database management
- **PostgreSQL** - Primary database (assumed)
- **Upstash Redis** - Caching and session management

### Authentication & Payments
- **Kinde Auth** - Authentication provider
- **Stripe** - Payment processing

### Infrastructure
- **Cloudinary** - Image hosting and optimization
- **Vercel** - Deployment platform (recommended)

### Validation & Forms
- **Zod** - Schema validation
- **Conform** - Form validation and management

## Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Redis instance (Upstash recommended)
- Kinde Auth account
- Stripe account
- Cloudinary account

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd azshop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://..."

# Kinde Auth
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
azshop/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (shop)/            # Customer-facing pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── lib/                   # Utility functions and configs
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint

# Database
npx prisma studio   # Open Prisma Studio
npx prisma migrate dev  # Run migrations
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Ensure you:
- Set all environment variables
- Run `npm run build`
- Configure database connection
- Set up Redis connection
- Configure webhook endpoints for Stripe

## Key Integrations

### Stripe Webhooks

Configure webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

Events to listen for:
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

### Cloudinary Setup

1. Create a Cloudinary account
2. Get your cloud name, API key, and secret
3. Configure upload presets for product images
4. Set up image transformations for optimization

## Performance Optimization

- Image optimization via Cloudinary and Next.js Image
- Redis caching for frequently accessed data
- Bundle analysis with `@next/bundle-analyzer`
- Unstable cache for improved data fetching

## Security Features

- Secure authentication with Kinde
- Payment security via Stripe
- Environment variable protection
- CSRF protection
- SQL injection prevention via Prisma

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, email support@azshop.com or open an issue in the repository.

## Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- Stripe for payment processing
- Cloudinary for image management
