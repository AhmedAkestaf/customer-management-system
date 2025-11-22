# Microservices Frontend - Angular Application

Modern Angular frontend application for the Customer Management microservices backend.

## 🚀 Features

- **Authentication**: Login and registration with JWT token management
- **Dashboard**: Overview with statistics, charts, and recent activities
- **Customer Management**: Full CRUD operations for customers
- **Analytics**: Dashboard with event tracking and statistics
- **Wallet Management**: View and manage customer wallets
- **Responsive Design**: Mobile-first approach with Material Design
- **Security**: Protected routes with auth guards and HTTP interceptors

## 📋 Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+
- Backend microservices running on localhost:4004 (API Gateway)

## 🛠️ Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd microservices-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Edit `src/environments/environment.ts` to point to your API Gateway:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:4004'
   };
   ```

## 🏃 Running the Application

**Development server:**
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

**Build for production:**
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
src/app/
├── core/                      # Core functionality
│   ├── guards/               # Route guards (auth)
│   ├── interceptors/         # HTTP interceptors (auth, error)
│   ├── models/              # Data models
│   └── services/            # Core services (auth, storage, notification)
├── features/                 # Feature modules
│   ├── auth/                # Login & Register
│   ├── dashboard/           # Main dashboard
│   ├── customers/           # Customer management
│   ├── analytics/           # Analytics dashboard
│   ├── wallet/              # Wallet management
│   ├── profile/             # User profile
│   └── settings/            # Application settings
├── layouts/                  # Layout components
│   ├── main-layout/         # Authenticated layout
│   └── auth-layout/         # Authentication layout
├── shared/                   # Shared components
│   └── components/          # Reusable components
│       ├── navbar/          # Top navigation
│       └── sidebar/         # Side navigation
└── environments/            # Environment configurations
```

## 🔑 Key Features

### Authentication
- JWT-based authentication
- Token storage in localStorage
- Auto-logout on token expiration
- Protected routes with auth guard

### Dashboard
- Statistics cards (Total Customers, New Today, Total Events, Growth Rate)
- Customer growth chart
- Recent activities timeline

### Customer Management
- List customers with pagination and search
- Create new customers
- View customer details with wallet information
- Edit customer information
- Delete customers

### Analytics
- Event tracking and visualization
- Dashboard statistics
- Date range filtering

### Wallet Management
- View all wallets
- Wallet details with transaction history
- Balance information

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Blue (#1976D2)
- **Accent**: Orange (#FF9800)
- **Success**: Green (#4CAF50)
- **Warning**: Yellow (#FFC107)
- **Danger**: Red (#F44336)

### Components
- Material Design components
- Responsive grid layouts
- Card-based UI
- Interactive charts (Chart.js)

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **HTTP Interceptors**: Automatic token attachment and error handling
- **Route Guards**: Protected routes requiring authentication
- **Input Validation**: Client-side form validation
- **Error Handling**: Global error interceptor with user-friendly messages

## 🌐 API Integration

The application connects to the following backend services through the API Gateway (port 4004):

- **Auth Service** (`/auth/*`): Login, register, validate
- **Customer Service** (`/api/customers/*`): Customer CRUD operations
- **Analytics Service** (`/api/analytics/*`): Statistics and events
- **Wallet Service** (Internal): Accessed through customer service

## 📱 Responsive Design

- **Mobile** (< 768px): Single column layout, hamburger menu
- **Tablet** (768px - 1024px): Two-column layout, collapsible sidebar
- **Desktop** (> 1024px): Multi-column layout, fixed sidebar

## 🧪 Testing

**Run unit tests:**
```bash
ng test
```

**Run end-to-end tests:**
```bash
ng e2e
```

## 🚀 Deployment

1. **Build the production bundle:**
   ```bash
   ng build --configuration production
   ```

2. **Deploy the `dist/` folder to your web server**

3. **Configure your web server** to serve `index.html` for all routes (for Angular routing)

### Example Nginx Configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist/microservices-frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📝 Development Guidelines

### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Implement OnPush change detection where possible
- Keep components under 300 lines

### Component Design
- Use standalone components
- Separate smart (container) and presentational components
- Use reactive forms for complex forms
- Implement proper error handling

### Service Design
- Singleton services (providedIn: 'root')
- Use RxJS for async operations
- Implement proper error handling
- Cache data when appropriate

## 🔧 Configuration

### Environment Variables
Edit `src/environments/environment.ts` and `environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4004'  // Your API Gateway URL
};
```

### Material Theme
Customize the Material theme in `src/styles.scss`:

```scss
@import '@angular/material/prebuilt-themes/indigo-pink.css';
```

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [Chart.js](https://www.chartjs.org)
- [RxJS](https://rxjs.dev)

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
ng serve --port 4201
```

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**CORS errors:**
Ensure your backend API Gateway has CORS properly configured to allow requests from `http://localhost:4200`

## 📄 License

This project is part of the Customer Management microservices system.

## 👥 Support

For issues and questions, please refer to the main project documentation or contact the development team.
