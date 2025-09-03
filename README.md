# Business Template

A complete, production-ready business website template built with Next.js 14, featuring user authentication, payment processing, database integration, and a modern UI. Perfect for quickly launching SaaS products, subscription services, or any business that needs user accounts and payments.

## Features

- ✅ **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- ✅ **Authentication**: NextAuth.js with credentials and Google OAuth
- ✅ **Database**: PostgreSQL with Prisma ORM
- ✅ **Payments**: Stripe integration for subscriptions and one-time payments
- ✅ **Responsive Design**: Mobile-first design that works on all devices
- ✅ **User Dashboard**: Complete user management and profile pages
- ✅ **Email Integration**: Ready for transactional emails
- ✅ **Security**: Built-in security best practices

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd business-template
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/business_template"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Open Prisma Studio to view data
npm run db:studio
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Configuration

### Database

This template uses PostgreSQL with Prisma ORM. The schema includes:

- User management with authentication
- Subscription tracking
- Order/payment history
- OAuth account linking

### Authentication

NextAuth.js is configured with:

- **Credentials Provider**: Email/password authentication
- **Google Provider**: OAuth authentication
- **Custom signup**: API route for user registration

### Payments

Stripe integration includes:

- **Checkout Sessions**: For subscription purchases
- **Webhook Handling**: Automatic subscription updates
- **Customer Management**: Automatic customer creation
- **Subscription Tracking**: Database sync with Stripe

### Customization

#### Branding

Update the following files to customize your branding:

- `components/Header.tsx` - Logo and navigation
- `components/Footer.tsx` - Footer content
- `app/layout.tsx` - Meta information
- `tailwind.config.ts` - Color scheme

#### Pricing Plans

Update subscription plans in:

- `components/Pricing.tsx` - Landing page pricing
- `app/dashboard/subscriptions/page.tsx` - Subscription management
- Replace Stripe Price IDs with your actual values

#### Email Templates

Set up transactional emails by configuring your email provider in the environment variables.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

This template works with any platform that supports Next.js:

- Railway
- Render
- AWS
- Digital Ocean

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_URL` | ✅ | Your app's URL |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing |
| `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` | ✅ | Stripe publishable key |
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe webhook signing secret |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth client secret |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   └── page.tsx           # Landing page
├── components/            # Reusable components
├── lib/                   # Utility functions
│   ├── auth.ts           # Password hashing
│   ├── db.ts             # Database client
│   └── stripe.ts         # Stripe configuration
├── prisma/               # Database schema
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Support

For issues and questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## License

MIT License - feel free to use this template for your projects!

---

## Next Steps

After setting up the template:

1. **Customize branding** and colors
2. **Set up your Stripe products** and update price IDs
3. **Configure your database** in production
4. **Set up email provider** for transactional emails
5. **Add your domain** to NextAuth.js configuration
6. **Configure Stripe webhooks** for your production URL
7. **Test payment flows** in both test and live modes

Happy building! 🚀