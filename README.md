# Flexigo Platform

A unified platform for managing Rider, Franchise, and Admin operations.

## 📁 Project Structure

```
flexigo-platform/
│
├── frontend/                    # React Frontend Application
│   │
│   ├── public/                  # Static Files
│   │   ├── index.html           # Main HTML file
│   │   ├── icons/               # Icon assets
│   │   └── images/              # Image assets
│   │
│   ├── src/                     # Source Code
│   │   ├── assets/              # Media and static assets
│   │   ├── components/          # Reusable React components
│   │   ├── common/              # Common utilities and helpers
│   │   ├── modules/             # Feature modules
│   │   │   ├── admin/           # Admin module components
│   │   │   ├── franchise/       # Franchise module components
│   │   │   └── rider/           # Rider module components
│   │   │
│   │   ├── screens/             # Screen/Page components
│   │   │   ├── admin/           # Admin dashboard screens
│   │   │   ├── franchise/       # Franchise management screens
│   │   │   ├── rider/           # Rider app screens
│   │   │   └── shared/          # Shared screens (Landing, Login)
│   │   │
│   │   ├── App.tsx              # Root component
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Global styles
│   │
│   ├── package.json             # Dependencies and scripts
│   ├── package-lock.json        # Locked dependency versions
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── README.md                # Frontend documentation
│
└── README.md                    # Main project documentation
```

## 🚀 Quick Start

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm build
```

Builds the app for production to the `build` folder.

### Testing

```bash
npm test
```

Launches the test runner.

## 📦 Dependencies

### Core Libraries
- **React** (^18.2.0) - UI library
- **React Router DOM** (^6.14.0) - Routing
- **TypeScript** (^5.1.6) - Type safety
- **Tailwind CSS** (^3.3.2) - Utility-first CSS
- **Zustand** (^4.3.8) - State management

### Additional Libraries
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Query** - Data fetching & caching
- **Socket.io** - Real-time communication
- **Leaflet** - Map library
- **Recharts** - Charting library
- **Lottie React** - Animation library

## 📁 Folder Descriptions

- **screens/**: Container components for different pages/routes
  - `admin/`: Admin dashboard pages
  - `franchise/`: Franchise management pages
  - `rider/`: Rider app pages
  - `shared/`: Shared pages (Landing, Login)

- **components/**: Reusable UI components

- **modules/**: Feature-specific business logic and components

- **common/**: Shared utilities, hooks, and helpers

- **assets/**: Images, icons, and other static files

## 🎯 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (⚠️ irreversible)

## 🔧 Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Zustand
- Axios
- Framer Motion

## 📝 Notes

- All components should be typed with TypeScript
- Use functional components with hooks
- Keep components small and focused
- Follow the existing folder structure for new features

## 📄 License

This project is private and proprietary to Flexigo.
