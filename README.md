# ElderAgent 🏔️

**Your Swiss Companion for Health and Wellbeing**

ElderAgent is a companion application designed for elderly individuals in Switzerland. It provides a friendly AI agent named "Heidi" who helps seniors track their health, manage schedules, and stay connected with their care circle.

## ✨ Features

### Elder View
- **Daily Check-in** with Heidi's personalized greeting
- **Mood Tracking** with large, accessible buttons (Good/Okay/Not Well)
- **Health History** with weekly mood calendar
- **Schedule** showing upcoming appointments
- **Contacts** with care circle (family & doctors)

### Advocate View
- **Dashboard** overview of elder's status
- **Weekly mood summary** with alerts
- **Upcoming appointments** at a glance

### Design
- **Elderly-friendly UI**: Large fonts (20px+), big buttons (60px+), clear colors
- **Swiss German & English**: Full dual-language support
- **Swiss cultural elements**: Alpine color palette, warm styling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/elder-agent.git
cd elder-agent

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎮 Demo Mode

This is a demo application that runs entirely in the browser with no backend required. All data is stored in localStorage.

### Accessing the Admin Panel

Two ways to access the demo admin panel:

1. **URL Parameter**: Add `?admin=true` to the URL
   ```
   http://localhost:5173/?admin=true
   ```

2. **Triple-tap**: Click the ElderAgent logo 3 times quickly

### Admin Panel Features

- **Switch User Type**: Toggle between Elder and Advocate views
- **Change Language**: Switch between Swiss German (🇨🇭) and English (🇬🇧)
- **Reset Demo Data**: Restore all data to default state

## 📱 User Flows

### Elder Check-in Flow
1. Heidi greets the elder by name with time-of-day message
2. Elder selects mood: 😊 Good / 😐 Okay / 😔 Not Well
3. Heidi responds with encouraging message
4. Check-in saved and visible in Health history

### Advocate Monitoring
1. Switch to Advocate view in admin panel
2. See elder's summary card with last check-in
3. View weekly mood calendar with color-coded days
4. Alert banner shows if recent "not well" days
5. See upcoming appointments

## 🗂️ Project Structure

```
elder-agent/
├── src/
│   ├── components/
│   │   ├── admin/        # Admin panel components
│   │   ├── common/       # Shared UI components
│   │   └── elder/        # Elder-specific components
│   ├── contexts/         # React contexts
│   ├── data/             # Demo data & translations
│   ├── pages/            # Page components
│   │   └── advocate/     # Advocate pages
│   └── styles/           # Global styles & variables
├── APP_SPECIFICATION.md  # Detailed app specification
└── package.json
```

## 🎨 Design System

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Alpine Blue | #4A6FA5 | Primary actions |
| Swiss Meadow | #7CB342 | Positive states |
| Warm Cream | #FFF8E7 | Backgrounds |
| Mountain Rose | #E57373 | Alerts |
| Golden Hour | #FFB74D | Warnings |

### Typography
- **Font**: Nunito (Google Fonts)
- **Base size**: 20px
- **Headings**: 24-32px
- **Buttons**: 24px bold

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Vanilla CSS with CSS Variables
- **State**: React Context + localStorage

## 📋 Roadmap

See [APP_SPECIFICATION.md](./APP_SPECIFICATION.md) for the complete development roadmap.

### Phase 1 (Current): MVP Demo ✅
- [x] Project setup
- [x] Design system
- [x] Navigation & layout
- [x] Language system
- [x] Demo data & admin panel
- [x] Elder check-in flow
- [x] Health history
- [x] Contacts page
- [x] Schedule page
- [x] Advocate dashboard

### Phase 2: Enhanced Demo
- [ ] Full scheduling system
- [ ] Medication tracking
- [ ] Advocate notifications
- [ ] Health trends visualization

### Phase 3: Production
- [ ] Authentication
- [ ] Backend API
- [ ] Push notifications
- [ ] Swiss data compliance

## 📄 License

MIT

---

Made with ❤️ in Switzerland 🇨🇭
