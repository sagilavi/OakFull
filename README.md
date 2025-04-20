# The Oak - Life Transition Support App

A mobile application designed to help elderly individuals and their relatives manage life transitions with ease and support.

## Features

- **Onboarding Flow**: Collect user information and documents
- **Rights Dashboard**: Access information about various rights and support services
- **Schedule Management**: Monthly, weekly, and daily views for managing appointments and activities
- **Technology Discovery**: Find helpful technology solutions
- **Community Support**: Connect with others going through similar transitions

## Tech Stack

- React Native with TypeScript
- Expo
- React Navigation
- NativeWind (Tailwind CSS for React Native)
- Redux Toolkit (for state management)
- Supabase (for backend services)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd TheOak
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Run on your preferred platform:
   ```bash
   npm run android
   # or
   npm run ios
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # App screens
├── navigation/     # Navigation configuration
├── store/         # Redux store and slices
├── types/         # TypeScript type definitions
├── assets/        # Images, fonts, etc.
├── hooks/         # Custom React hooks
├── services/      # API and external services
└── utils/         # Utility functions
```

## Design System

### Colors
- Primary: `#967AB5` (Oak Purple)
- Background: `#FFFCF2` (Oak White)
- Secondary: `#D5D9BA` (Oak Light)
- Accent: `#9CA786` (Oak Green)
- Text: `#414336` (Oak Dark)
- Black: `#000000`

### Fonts
- Headings: Frank Ruhl Libre
- Body: DM Sans

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.