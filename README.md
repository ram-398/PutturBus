# 🚌 PutturBus - Real-Time KSRTC Transit App

**PutturBus** is a modern, high-performance transit application built for the KSRTC Puttur division. It provides real-time bus tracking, physics-based travel estimates, and a premium mobile-first experience.

![PutturBus Banner](https://via.placeholder.com/1200x400?text=PutturBus+Transit+App)

## 🚀 Key Features

### ⏱️ Real-Time Intelligence
*   **Live Bus Filtering**: The app strictly filters past buses based on your local system time. No more ghost buses from the morning showing up in the afternoon.
*   **Dynamic Status**: Live indicators show "Departing Now" (pulsing red), "Boarding Soon" (emerald), or countdowns (e.g., "in 12 min").
*   **Auto-Refresh**: The list updates every 30 seconds to ensure data validity.

### 🍎 Physics-Based Route Engine
*   **Real-World Estimates**: Travel times are not static. They are calculated dynamically using a **Linear Reference System (LRS)** based on:
    *   **Distance**: Haversine formula calculation between stops.
    *   **Bus Type**: *Express* buses (45km/h) are correctly shown as faster than *Ordinary* buses (35km/h).
*   **Authentic Stoppages**: The map renders the actual geographic path (e.g., Puttur → Mani → BC Road → Mangalore) instead of straight lines.

### 📱 Premium UX/UI
*   **Docked Interface**: A Google Maps-style docked summary card that allows seamless interaction between the map and the bus list.
*   **Mobile First**: Optimized touch targets, swipeable elements, and responsive layouts.
*   **Production Grade Map**: Interactive Leaflet maps with custom markers, auto-fitting bounds, and smooth animations.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
*   **Maps**: [React Leaflet](https://react-leaflet.js.org/) + OpenStreetMap
*   **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
src/
├── app/                 # Next.js App Router
├── components/          # Reusable UI Components
│   ├── BusCard.tsx      # Intelligent bus card with live status
│   ├── RouteMap.tsx     # Map logic with auto-fit bounds
│   └── ...
├── data/                # Static Data & Configurations
│   ├── bus-routes.json  # Raw schedule data
│   └── stops.ts         # Route path definitions
├── lib/                 # Core Logic Engines
│   ├── geo.ts           # Location Intelligence (Coordinates, Distance)
│   ├── realtime.ts      # Live Status & Time Deltas
│   ├── route-engine.ts  # Physics & Travel Time Calculator
│   └── time.ts          # Strict Time Normalization Library
└── types/               # TypeScript Definitions
```

## ⚡ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Rajath2005/PutturBus.git
    cd PutturBus
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the app**
    Visit [http://localhost:3000](http://localhost:3000)

## 🔮 Roadmap

*   [ ] **Stop-Level ETAs**: Calculate arrival times for intermediate stops (e.g., "Reaching BC Road at 4:15 PM").
*   [ ] **Live Tracking**: API integration for GPS tracking.
*   [ ] **Smart Alerts**: Push notifications for "Catch this bus" reminders.
*   [ ] **PWA Support**: Offline schedule access.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

built with ❤️ for KSRTC Puttur