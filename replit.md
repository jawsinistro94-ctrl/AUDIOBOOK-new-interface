# AudioBook - Automation System

## Overview
A professional web-based interface for gaming automation, featuring an ember/magma themed design. This application provides hotkey management, automation controls, and profile management for game automation tasks.

## Project Structure
```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── ui/      # Shadcn UI components
│   │   │   ├── BestSellersPanel.tsx
│   │   │   ├── RunemakerPanel.tsx
│   │   │   └── HyperGrabPanel.tsx
│   │   ├── pages/       # Page components
│   │   │   └── Dashboard.tsx
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   ├── App.tsx      # Main app component
│   │   ├── index.css    # Global styles with ember theme
│   │   └── main.tsx     # Entry point
│   └── index.html
├── server/              # Backend Express application
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Data storage interface
│   └── index.ts         # Server entry point
├── shared/              # Shared types and schemas
│   └── schema.ts        # Zod schemas and types
└── design_guidelines.md # Design system documentation
```

## Features
- **Profile Management**: Create, rename, delete, and switch between automation profiles
- **Best Sellers Panel**: Auto SD, Auto EXPLO, Auto UH, Auto Mana controls with hotkey and delay settings
- **Runemaker Panel**: Potion and spell configuration with cycle settings
- **Hyper Grab Panel**: Fast item collection automation
- **Global Status Toggle**: ON/OFF switch for all automations
- **Global Pause Hotkey**: Alt+F12 to instantly pause all automations

## Hotkeys
- **Alt+F12**: Pauses the entire system (forces all automations to OFF)

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, TypeScript
- **Styling**: Custom ember/magma theme with CSS variables
- **State Management**: React Query, React Hook Form

## Design Theme
- Deep ember browns (#1B0F0B, #29140E, #3A1C10)
- Molten orange/gold accents (#D4631C, #FFE3AA, #E8B449)
- Status indicators: Gold for ON, dark ember for OFF
- Professional gaming aesthetic with subtle glow effects

## Running the Application
The application runs on port 5000 with both frontend and backend served together.

```bash
npm run dev
```

## Recent Changes (November 2025)
- **Compact Tabbed Interface**: ElfBot-inspired 5-tab navigation (Best Sellers, Runemaker, Hyper Grab, Targeting, Settings)
- **Ember/Magma Theme**: Full-viewport magma gradient background with layered panel borders
- **Best Sellers Panel**: Auto SD, EXPLO, UH, Mana controls with hotkey display and delay sliders
- **Runemaker Panel**: Potion/spell configuration, cycle timings, and magic level tracking
- **Hyper Grab Panel**: Fast item collection with delay and range settings
- **Targeting Panel**: Monster targeting with priority levels and target list management
- **Settings Panel**: Sound effects, notifications, and volume controls
- **Backend API**: Complete REST API for profiles and automation state persistence
- **Visual Feedback**: Status glow animations, themed switches, and gradient hotkey badges

## Desktop Application (audiobook_desktop/)
The project includes a standalone Python desktop application with identical UI design to the web version.

### Desktop Tech Stack
- **GUI Framework**: CustomTkinter (modern tkinter extension with rounded widgets)
- **Automation**: PyAutoGUI, pynput (keyboard/mouse control)
- **Image Processing**: OpenCV, Pillow, MSS (screen capture)
- **Theme**: Dark mode with ember/magma color palette matching web version

### Desktop Features
- CTkTabview with segmented navigation (Best Sellers, Runemaker, Hyper Grab, Targeting, Settings)
- CTkSwitch toggles for automation controls
- CTkSlider for delay settings
- CTkFrame cards with rounded corners
- CTkScrollableFrame for scrollable content areas
- Alt+F12 global pause hotkey

### Building the Desktop App
```bash
cd audiobook_desktop
pip install -r requirements.txt
python audiobook.py  # Run directly
# or
pyinstaller audiobook.py --onefile --add-data "*.png:." --add-data "*.ico:."  # Build executable
```

## User Preferences
- Interface should be compact and organized (not "a big huge thing")
- ElfBot-style tabbed navigation preferred
- Ember/magma color scheme with dark browns, oranges, and gold accents
- Desktop app should look identical to web version with modern rounded UI elements
