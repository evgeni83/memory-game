# Memory Game Project

## Project Overview

This is a **Memory Game** application built with React, TypeScript, Redux Toolkit, and Webpack. The game presents players with a grid of cards that they must match by flipping two at a time. Features include game timer, scoring system, and record tracking.

### Key Technologies:
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management solution
- **React Redux** - Connect React components to Redux store
- **Framer Motion** - Animation library
- **Webpack 5** - Module bundler
- **SCSS/Sass** - CSS preprocessor
- **PostCSS** - CSS processing pipeline

### Architecture:
- **Components**: Organized in the `src/components` directory with subdirectories for each component
- **State Management**: Redux Toolkit for global application state
- **Hooks**: Custom hooks in `src/hooks` directory
- **Types**: TypeScript interfaces and enums in `src/types` directory
- **Assets**: Images stored in `public/images` directory

## Building and Running

### Development:
```bash
npm start
```
This will start the development server on port 3333 with hot reloading.

### Production Build:
```bash
npm run build
```
This creates an optimized production build in the `dist` directory.

## Project Structure

```
src/
├── index.html              # Main HTML template
├── index.tsx               # Application entry point
├── components/             # React components (organized in subdirectories)
│   ├── App.tsx             # Root application component
│   ├── App.scss            # Global application styles
│   ├── Button/             # Button component
│   ├── Card/               # Card component
│   ├── CardsGrid/          # Cards grid layout
│   ├── Header/             # Header component
│   ├── StartScreen/        # Start screen component
│   └── Timer/              # Timer component
├── hooks/                  # Custom React hooks
│   └── useTypedSelector.ts # Typed selector hook for Redux
├── store/                  # Redux store configuration
│   ├── index.ts           # Store configuration
│   ├── actions/           # Redux actions
│   └── reducers/          # Redux reducers
└── types/                 # TypeScript type definitions
    ├── cards.ts          # Card-related types
    ├── custom.d.ts       # Custom type declarations
    ├── game.ts           # Game-related types
    └── match.ts          # Match-related types
```

## State Management

The application uses Redux Toolkit to manage three main state slices:
- **cards**: Manages card list, visibility, matching, and count
- **game**: Tracks game status (started, over), results, timer
- **match**: Handles card matching logic

## Key Features

1. **Card Matching Logic**: Players flip cards to find matching pairs
2. **Timer**: Tracks game duration
3. **Results Tracking**: Stores game times and records
4. **Responsive Design**: Works on different screen sizes
5. **Animations**: Smooth transitions using Framer Motion

## Development Conventions

- Components are organized in dedicated folders with their associated styles and tests
- TypeScript interfaces define data structures in the `types` directory
- Redux actions and reducers follow Redux Toolkit best practices
- SCSS modules are used for component-scoped styling
- Custom hooks extend React functionality

## Configuration Files

- `webpack.config.js`: Bundling configuration with support for TypeScript, SCSS, and asset loading
- `tsconfig.json`: TypeScript compiler options with strict type checking
- `postcss.config.js`: PostCSS configuration for CSS processing
- `package.json`: Dependencies, scripts, and project metadata