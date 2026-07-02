# Taejoon — Premium Assistive Technology Platform

A premium, full-stack Next.js 16 website for Taejoon's ALIF (Adaptive Learning Integration Framework) devices. Features AI-powered assistive communication technology with a modern design inspired by Xiaomi India.

## 🌟 Features

### Pages & Sections
- **Home Page** — Hero section with parallax animations, product showcase, features, pricing tiers, and CTAs
- **Products Page** — Product grid with category filters, search, product cards with quick actions
- **About Page** — Company story, mission/vision, values, timeline, and team section
- **Services Page** — Warranty information, extended care plans, FAQ accordion, repair booking
- **Store Page** — Shopping cart, product listing with add-to-cart, checkout flow with address form
- **Contact Page** — Contact form, office locations, quick links, customer support info

### Authentication & Admin
- **Login/Register Pages** — Email/password authentication with form validation
- **Auth Context** — JWT-based authentication with httpOnly cookies, user session management
- **Admin Dashboard** — Protected route for admins to manage products, orders, and contact inquiries
- **Role-based Access Control** — Student/Parent/Institute pricing tiers, admin-only features

### Technical Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, TailwindCSS v4, Framer Motion
- **Backend:** Node.js API routes, MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken), bcryptjs password hashing
- **UI Components:** React Icons, React Hot Toast, custom CSS utilities
- **3D Components:** Three.js, React Three Fiber (ready for 3D product viewer)

### Design System
- **Dark Mode Theme** — Black background (#0a0a0a) with white foreground (#fafafa)
- **Primary Color** — Orange (#ff6b00) with gradients and hover effects
- **Custom Utilities** — Glass effect, text gradients, button styles, animations
- **Animations** — Scroll-triggered animations, parallax effects, fade-in/slide-up transitions
- **Responsive Design** — Mobile-first approach with Tailwind breakpoints

## 🚀 Quick Start

### Prerequisites
- Node.js v20+ (npm 10+)
- MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repository
cd e:\Projects.101\taejoon

# Install dependencies
npm install

# Set up environment variables
# Create .env.local file with:
MONGODB_URI=mongodb://localhost:27017/taejoon
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Running Locally

```bash
# Development server
npm run dev

# Open http://localhost:3000

# Build for production
npm run build
npm start

# Linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── products/page.tsx           # Products listing
│   ├── about/page.tsx              # About page
│   ├── services/page.tsx           # Services & support
│   ├── store/page.tsx              # Shopping cart & checkout
│   ├── contact/page.tsx            # Contact form
│   ├── auth/login/page.tsx         # Login page
│   ├── auth/register/page.tsx      # Registration page
│   ├── admin/page.tsx              # Admin dashboard
│   ├── api/                        # API routes
│   │   ├── auth/                   # Authentication endpoints
│   │   ├── products/               # Product CRUD
│   │   ├── orders/                 # Order management
│   │   ├── contact/                # Contact form submission
│   │   └── admin/                  # Admin endpoints
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles & theme
├── components/
│   ├── Navbar.tsx                  # Navigation bar
│   └── Footer.tsx                  # Footer with links
├── context/
│   └── AuthContext.tsx             # Auth state management
├── lib/
│   ├── db.ts                       # MongoDB connection
│   ├── auth.ts                     # JWT utilities
│   └── utils.ts                    # Helper functions
└── models/
    ├── User.ts                     # User schema
    ├── Product.ts                  # Product schema
    ├── Order.ts                    # Order schema
    └── Contact.ts                  # Contact schema
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` — Create new user account
- `POST /api/auth/login` — Login and get JWT
- `GET /api/auth/me` — Get current user profile

### Products
- `GET /api/products` — Get all products
- `GET /api/products/[slug]` — Get single product
- `POST /api/admin/products` — Create product (admin)
- `PUT /api/admin/products/[id]` — Update product (admin)
- `DELETE /api/admin/products/[id]` — Delete product (admin)

### Orders
- `GET /api/orders` — Get user's orders (authenticated)
- `POST /api/orders` — Create new order
- `GET /api/admin/orders` — Get all orders (admin)
- `PATCH /api/admin/orders` — Update order status (admin)

### Contact
- `POST /api/contact` — Submit contact form
- `GET /api/admin/contacts` — Get all messages (admin)
- `PATCH /api/admin/contacts` — Mark message as read (admin)

## 🎨 Design Features

### Color Palette
```css
--color-primary: #ff6b00        /* Orange accent */
--color-background: #0a0a0a     /* Dark black */
--color-foreground: #fafafa     /* Off-white text */
--color-surface: #111111        /* Card background */
--color-border: #2a2a2a         /* Border color */
```

### CSS Utilities
- `.glass` — Frosted glass effect with blur
- `.text-gradient` — Orange gradient text
- `.btn-primary` — Primary action button
- `.btn-outline` — Outlined button variant
- `.section-padding` — Consistent section spacing
- `.container-custom` — Max-width container

### Animations
- `fade-in` — Fade in animation (0.6s)
- `slide-up` — Slide up from bottom (0.6s)
- `slide-down` — Slide down from top (0.3s)
- `scale-in` — Scale in from center (0.4s)
- `glow` — Pulsing glow effect (2s)

## 🔐 Authentication

### Flow
1. User registers with email/password
2. Password hashed with bcryptjs (12 salt rounds)
3. JWT token issued and stored in httpOnly cookie
4. Subsequent requests include token via AuthContext
5. Protected routes verify token server-side

### User Roles
- `customer` — Regular user (default)
- `admin` — Can access admin dashboard and manage content

### Protected Routes
- `/admin` — Admin dashboard (admin only)
- `/orders` — User's orders (authenticated)
- Store checkout — Requires authentication

## 📦 Products

### Product Model
```javascript
{
  name: String,
  slug: String (unique),
  tagline: String,
  description: String,
  features: [String],
  price: Number,
  originalPrice: Number,
  images: [String],
  category: String (core|voice|vision|solar|accessories),
  editions: [String],
  inStock: Boolean,
  stockCount: Number,
  specs: [Object],
  createdAt: Date,
  updatedAt: Date
}
```

### Pricing Tiers
- **Student** — 15% discount (valid student ID)
- **Parent/Guardian** — 10% discount
- **Institute** — Bulk pricing with onboarding

## 🛒 Shopping Cart

### Features
- Persistent cart state (localStorage)
- Add/remove items
- Adjust quantities
- Real-time total calculation
- Cart badge in navbar
- Checkout with address collection
- Order confirmation email

## 📧 Contact Form

### Submission
- Form validation (name, email, subject, message)
- Stored in MongoDB
- Admin notification via contact form
- Auto-reply email to user

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=your_domain.com
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

- **Next.js Image Optimization** — Automatic image resizing
- **Code Splitting** — Per-route code splitting
- **Lazy Loading** — Components and images loaded on demand
- **CSS Optimization** — Tailwind tree-shaking removes unused styles
- **Font Optimization** — Geist fonts via Next.js font loader

### Lighthouse Targets
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 🔒 Security

- **HTTPS Only** — All requests encrypted
- **CORS Protection** — Configured API endpoints
- **CSRF Prevention** — NextAuth ready
- **Password Security** — bcryptjs hashing
- **httpOnly Cookies** — JWT tokens secure
- **SQL Injection Prevention** — Mongoose parameterized queries
- **XSS Protection** — React sanitizes HTML

## 🧪 Testing

```bash
# Run linter
npm run lint

# Future: Unit tests
npm test

# Future: E2E tests
npm run test:e2e
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons (min 44x44px)
- Mobile navigation menu
- Fluid typography

## ♿ Accessibility

- **ARIA Labels** — Descriptive labels on all interactive elements
- **Semantic HTML** — Proper heading hierarchy, landmark elements
- **Keyboard Navigation** — Full keyboard support
- **Color Contrast** — WCAG AAA compliant contrast ratios
- **Focus Indicators** — Visible focus states
- **Alt Text** — All images have descriptive alt text

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check connection string in .env.local
# Ensure MongoDB service is running
# For local: mongod
# For Atlas: whitelist IP in network access
```

### JWT Token Errors
```bash
# Clear cookies: Open DevTools > Application > Cookies > Delete all
# Update JWT_SECRET in .env.local if changed
# Re-login to get new token
```

### Port Already in Use
```bash
# Kill process on port 3000
# Windows: taskkill /F /IM node.exe
# Mac/Linux: lsof -i :3000 && kill -9 <PID>
```

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📄 License

Proprietary — Taejoon Inc. All rights reserved.

## 📞 Support

- **Email:** support@taejoon.com
- **Phone:** +91 (11) 4050-5050
- **Website:** https://taejoon.com

---

**Built with ❤️ for accessibility and empowerment.**
