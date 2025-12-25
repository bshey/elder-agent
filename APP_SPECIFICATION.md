# ElderAgent – Swiss Companion App for Seniors

## Overview

**ElderAgent** is a companion application designed specifically for elderly individuals in Switzerland. The app provides a conversational AI agent that helps seniors track their health, manage their schedules, and stay connected with their advocates (family members, caregivers). The application emphasizes accessibility, cultural relevance, and a warm, personable user experience.

---

## Target Market

- **Primary Users**: Elderly individuals (65+) residing in Switzerland
- **Secondary Users**: Advocates (adult children, caregivers, family members) who monitor and support the elderly user
- **Geography**: Switzerland
- **Languages**: Swiss German (Schwiizerdütsch) and English

---

## Core Philosophy

### Design Principles

1. **Accessibility First**: Every design decision prioritizes ease of use for seniors with potential vision, motor, or cognitive limitations
2. **Emotional Warmth**: The app should feel like a friendly companion, not clinical software
3. **Cultural Authenticity**: Subtle Swiss design elements create familiarity and trust
4. **Simplicity Over Features**: Fewer, well-executed features beat feature overload

---

## User Personas

### Primary Persona: The Elderly User ("Elder")

- **Age**: 65-90+
- **Tech Comfort**: Low to moderate
- **Needs**: 
  - Daily health check-ins
  - Medication and appointment reminders
  - Easy communication with family
  - Feeling heard and cared for
- **Challenges**:
  - Small text and buttons are difficult
  - Complex navigation is confusing
  - Easily overwhelmed by too many options

### Secondary Persona: The Advocate

- **Relationship**: Adult child, spouse, or professional caregiver
- **Needs**:
  - Monitor loved one's wellbeing remotely
  - Receive alerts about concerning changes
  - View health trends and summaries
  - Manage elder's schedule and contacts
- **Challenges**:
  - Balancing oversight with elder's privacy/dignity
  - Time constraints limit in-person visits

---

## The Agent Persona: "Heidi"

### Character Profile

- **Name**: Heidi (a recognizable, friendly Swiss name)
- **Personality**: 
  - Warm and nurturing, like a caring neighbor
  - Patient and never rushed
  - Gently encouraging without being pushy
  - Uses simple, clear language
  - Remembers past conversations and shows continuity
- **Voice Characteristics**:
  - Calm and soothing tone
  - Short, clear sentences
  - Avoids medical jargon
  - Uses the elder's name frequently
  - Celebrates small victories ("That's wonderful that you took your walk today!")
- **Visual Representation**:
  - Friendly avatar (optional: illustrated Swiss woman, 50s-60s, warm smile)
  - Could be abstract/symbolic rather than photorealistic
  - Appears in a consistent location for familiarity

### Sample Interactions

**Morning Check-in:**
> "Good morning, Hans! ☀️ How are you feeling today? Would you say you're feeling good, okay, or not so well?"

**Health Tracking:**
> "I noticed you mentioned your knee was bothering you yesterday. Is it feeling any better today?"

**Gentle Reminders:**
> "Hans, just a friendly reminder – you have an appointment with Dr. Müller tomorrow at 10:00. Would you like me to remind you again in the morning?"

---

## Feature Specification

### 1. Daily Check-In System

#### Purpose
Allow elders to quickly report how they're feeling each day, creating a health diary for themselves and their advocates.

#### UI Components

- **Mood Selector**: Three large, colorful buttons with emoji faces
  - 😊 "Feeling Good" (Green)
  - 😐 "Feeling Okay" (Yellow)
  - 😔 "Not So Well" (Red/Orange)
  
- **Optional Follow-up Questions** (only if "Not So Well" selected):
  - "Are you in pain?" (Yes/No)
  - "Would you like me to notify [Advocate Name]?" (Yes/No)
  - Free-text field: "Would you like to tell me more?"

- **Confirmation**: Heidi responds warmly to each check-in
  - Good: "Wonderful! I hope you have a lovely day, Hans!"
  - Okay: "I understand. Remember, every day is a new day. Is there anything I can help with?"
  - Not well: "I'm sorry to hear that. Know that I'm here for you. Should we let Maria know?"

#### Data Captured
- Date and time
- Mood rating (1-3)
- Pain indicator (boolean)
- Optional notes (text)
- Advocate notification sent (boolean)

---

### 2. Health Tracking

#### Metrics Tracked

| Metric | Input Method | Frequency |
|--------|--------------|-----------|
| Mood | Button selection | Daily |
| Sleep Quality | "How did you sleep?" (Good/Okay/Poor) | Daily |
| Pain Level | Optional 1-5 scale with body area | As needed |
| Medication Taken | Checkbox confirmation | Per medication schedule |
| Activity Level | "Did you go outside today?" | Daily |
| Appetite | "How was your appetite today?" | Daily |

#### Health Dashboard (Elder View)
- Simple weekly calendar with color-coded days based on overall mood
- Large, clear icons showing trends
- Encouraging messages for positive streaks

#### Health Dashboard (Advocate View)
- Detailed graphs and trends
- Alert history
- Downloadable reports for doctor visits
- Notes section for observations

---

### 3. Scheduling & Reminders

#### Appointment Management

- **Display**: Large calendar with extra-large date numbers
- **Appointment Types**:
  - Doctor visits
  - Medication reminders
  - Social events
  - Family visits
  - Therapy sessions
  
#### Reminder System

- Gentle audio chime + visual notification
- Heidi announces: "Hans, you have a doctor's appointment in one hour. Would you like me to remind you again in 30 minutes?"
- Confirmation required: "Got it!" button

#### Scheduling Features
- Recurring appointments
- Travel time estimates (for in-person visits)
- Preparation reminders ("Remember to bring your insurance card")

---

### 4. Contact Management

#### My Care Circle

**Advocates**
- Photo (large, circular)
- Name and relationship
- Phone number (tap to call)
- Last contact date
- Quick message button

**Healthcare Providers**
- Doctor name, specialty
- Clinic name and address
- Phone number
- Next appointment date
- Notes field

#### Display Requirements
- Maximum 4 contacts visible per screen
- Horizontal swipe for more contacts
- Giant tap targets for calling

---

### 5. Advocate Portal

#### Features

**Dashboard**
- Overview of elder's recent check-ins
- Alert notifications (mood drops, missed medications)
- Quick summary: "Mom has been feeling good 5 out of the last 7 days"

**Health History**
- Detailed timeline view
- Filter by date range
- Export functionality

**Communication**
- Send messages to elder (appear as Heidi reminders)
- Voice message capability
- View elder's notes and concerns

**Settings Management**
- Update elder's medications
- Manage doctor contacts
- Set notification preferences
- Edit elder's profile

**Shared Calendar**
- View all elder's appointments
- Add new appointments
- Set reminder preferences

---

### 6. Demo Admin Panel

#### Purpose
Allow demonstration of both user types without authentication infrastructure.

#### Features

- **User Switcher**: Toggle between "Elder View" and "Advocate View"
- **Demo Data Controls**:
  - Reset to default demo data
  - Generate sample check-in history
  - Simulate alerts and notifications
- **Language Override**: Force specific language regardless of user preference
- **Accessibility Preview**: Test different text sizes and contrast modes

#### Access
- Hidden triple-tap on logo reveals admin panel
- Or accessible via URL parameter: `?admin=true`

---

## UI/UX Specification

### Typography

| Element | Font Size | Weight | Notes |
|---------|-----------|--------|-------|
| Primary Buttons | 24px | Bold | All caps |
| Body Text | 20px | Regular | 1.6 line height |
| Heidi's Messages | 22px | Regular | Slightly friendly font |
| Headers | 32px | Bold | |
| Small/Secondary | 18px | Regular | Use sparingly |

**Font Family**: 
- Primary: "Inter" or "Nunito" (warm, readable)
- Fallback: System sans-serif

### Color Palette

**Primary Brand Colors**
| Color | Hex | Usage |
|-------|-----|-------|
| Alpine Blue | #4A6FA5 | Primary buttons, links |
| Swiss Meadow | #7CB342 | Positive states, confirmations |
| Warm Cream | #FFF8E7 | Backgrounds |
| Gentle Charcoal | #3D3D3D | Primary text |

**Accent Colors**
| Color | Hex | Usage |
|-------|-----|-------|
| Mountain Rose | #E57373 | Alerts, "Not well" states |
| Golden Hour | #FFB74D | Warnings, "Okay" states |
| Snow White | #FFFFFF | Cards, overlays |

**Swiss Cultural Accents**
- Subtle use of red (#CE1126) and white from Swiss flag
- Alpine imagery in decorative elements (mountains, edelweiss)
- Clean, precise aesthetic reflecting Swiss design tradition

### Button Design

```
┌─────────────────────────────────────┐
│                                     │
│           BUTTON TEXT               │
│                                     │
└─────────────────────────────────────┘
```

- **Minimum Size**: 60px height, 200px width
- **Border Radius**: 12px (friendly, not harsh)
- **Touch Target**: Minimum 48px padding around interactive elements
- **States**: Clear hover/active states with color change and subtle shadow

### Layout Principles

1. **Maximum content width**: 800px (prevents eye strain from wide reading)
2. **Generous whitespace**: 32px minimum between major sections
3. **Consistent navigation**: Always visible, always in same position
4. **No scrolling for primary actions**: Key features above the fold
5. **Card-based design**: Clear visual separation of different content areas

### Navigation Structure

```
┌──────────────────────────────────────────────────────┐
│  🏠 Home    ❤️ Health    📅 Schedule    👥 Contacts  │
└──────────────────────────────────────────────────────┘
```

- **Fixed bottom navigation** (following mobile patterns seniors may know)
- **Maximum 4 primary destinations**
- **Large icons + text labels** (never icons alone)
- **Clear active state** (filled icon, underline, background change)

---

## Swiss German / English Localization

### Language Switcher

- **Location**: Top-right corner, always visible
- **Display**: Flag icon + language name
  - 🇨🇭 Schwiizerdütsch
  - 🇬🇧 English
- **Persistence**: Language choice saved to local storage
- **Default**: Swiss German

### Translation Requirements

All user-facing text must be available in both languages:

| English | Swiss German |
|---------|--------------|
| Good morning! | Guete Morge! |
| How are you feeling? | Wie gaht's dir? |
| Feeling Good | Mir gaht's guet |
| Feeling Okay | Es gaht |
| Not So Well | Mir gaht's nöd so guet |
| My Health | Mini Gsundheit |
| My Schedule | Min Kalender |
| My Contacts | Mini Kontäkt |
| Settings | Iistellige |

### Cultural Adaptations

- Swiss German version uses informal "du" (you) for warmth
- Date format: DD.MM.YYYY (Swiss standard)
- Time format: 24-hour (e.g., 14:30)
- Number format: Use apostrophe as thousands separator (1'000)

---

## Technical Specification

### Architecture

```
┌─────────────────────────────────────────┐
│           Frontend (React/Next.js)       │
│  ┌─────────────────────────────────────┐│
│  │         UI Components               ││
│  │  - Elder Dashboard                  ││
│  │  - Advocate Dashboard               ││
│  │  - Shared Components                ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │         State Management            ││
│  │  - User Context (Elder/Advocate)    ││
│  │  - Language Context                 ││
│  │  - Demo Data Store                  ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │         Local Storage               ││
│  │  - Check-in History                 ││
│  │  - User Preferences                 ││
│  │  - Demo State                       ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### Demo Mode Implementation

Since this is a demo without backend:

1. **Local Storage** for all data persistence
2. **Hardcoded demo data** that can be reset
3. **Simulated delays** for realistic feel (500ms for "loading" states)
4. **No authentication** – user type switched via admin panel

### Demo Data Structure

```javascript
{
  elder: {
    id: "elder-001",
    name: "Hans Müller",
    age: 78,
    avatar: "/avatars/hans.jpg",
    language: "de-CH",
    advocates: ["advocate-001"],
    doctors: ["doctor-001", "doctor-002"]
  },
  
  advocate: {
    id: "advocate-001",
    name: "Maria Müller",
    relationship: "Daughter",
    phone: "+41 79 123 4567",
    email: "maria@example.com"
  },
  
  checkIns: [
    {
      date: "2024-01-15",
      mood: 3, // 1=not well, 2=okay, 3=good
      sleep: 2,
      painLevel: null,
      notes: "",
      medicationTaken: true
    }
    // ... more entries
  ],
  
  appointments: [
    {
      id: "apt-001",
      title: "Dr. Müller - Checkup",
      date: "2024-01-20",
      time: "10:00",
      location: "Hausarztpraxis Zürich",
      type: "doctor",
      reminderSet: true
    }
  ],
  
  medications: [
    {
      id: "med-001",
      name: "Aspirin",
      dosage: "100mg",
      frequency: "daily",
      time: "08:00"
    }
  ]
}
```

### File Structure

```
elder-agent/
├── public/
│   ├── avatars/
│   ├── icons/
│   └── images/
│       └── swiss-elements/     # Mountains, edelweiss, etc.
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Avatar.jsx
│   │   ├── elder/
│   │   │   ├── CheckInWidget.jsx
│   │   │   ├── MoodSelector.jsx
│   │   │   ├── HealthSummary.jsx
│   │   │   └── HeidiMessage.jsx
│   │   ├── advocate/
│   │   │   ├── ElderOverview.jsx
│   │   │   ├── AlertList.jsx
│   │   │   └── HealthTimeline.jsx
│   │   └── admin/
│   │       └── DemoPanel.jsx
│   ├── pages/
│   │   ├── elder/
│   │   │   ├── index.jsx        # Home/Check-in
│   │   │   ├── health.jsx
│   │   │   ├── schedule.jsx
│   │   │   └── contacts.jsx
│   │   ├── advocate/
│   │   │   ├── index.jsx        # Dashboard
│   │   │   ├── health.jsx
│   │   │   ├── schedule.jsx
│   │   │   └── settings.jsx
│   │   └── index.jsx            # Entry point / Demo selector
│   ├── contexts/
│   │   ├── UserContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── DataContext.jsx
│   ├── hooks/
│   │   ├── useCheckIn.js
│   │   ├── useTranslation.js
│   │   └── useDemoData.js
│   ├── data/
│   │   ├── demoData.js
│   │   └── translations/
│   │       ├── en.json
│   │       └── de-CH.json
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── components/
│   └── utils/
│       ├── storage.js
│       └── dateHelpers.js
├── package.json
└── README.md
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

1. **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
2. **Focus Indicators**: Visible, high-contrast focus rings
3. **Keyboard Navigation**: Full functionality without mouse
4. **Screen Reader Support**: Proper ARIA labels and semantic HTML
5. **Reduced Motion**: Respect `prefers-reduced-motion` setting

### Senior-Specific Considerations

1. **No time-limited interactions** – Users have unlimited time to respond
2. **Error prevention** – Confirmation dialogs for important actions
3. **Clear feedback** – Visual and optional audio confirmation of actions
4. **Undo capability** – Allow reversal of accidental actions
5. **Consistent placement** – Navigation and key elements never move

---

## Success Metrics (For Future Reference)

While this is a demo, consider these metrics for eventual production:

1. **Daily Active Usage**: % of elders completing daily check-in
2. **Advocate Engagement**: How often advocates view dashboard
3. **Task Completion Rate**: % of scheduled reminders acknowledged
4. **Error Rate**: How often users need help or get stuck
5. **Satisfaction Score**: User feedback ratings

---

## Development Roadmap

> **Goal**: Fastest path to a viewable, interactive demo running on localhost that demonstrates core value proposition to stakeholders.

---

### Development Principles

1. **Vertical Slices**: Each sprint delivers something viewable/usable
2. **Foundation First**: Infrastructure before features
3. **One User Flow at a Time**: Complete one flow end-to-end before starting another
4. **Demo-Ready Always**: Every sprint ends with a demo-able state

---

## Phase 1: MVP Demo (10 Sprints to Demo-Ready)

### Sprint 0: Project Bootstrap
**Goal**: Running app skeleton viewable in browser

**Prerequisites**: Node.js installed

**Deliverables**:
- [ ] Initialize Vite + React project 
- [ ] Install core dependencies (react-router-dom)
- [ ] Create basic folder structure
- [ ] Set up CSS variables file with color palette
- [ ] Create App shell with placeholder content
- [ ] Verify `npm run dev` shows something in browser

**Files Created**:
```
elder-agent/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── styles/
│       └── variables.css
├── index.html
├── package.json
└── vite.config.js
```

**Acceptance Criteria**:
- Running `npm run dev` opens browser to localhost
- Page displays "ElderAgent" placeholder text
- Swiss color scheme visible (warm cream background, alpine blue accent)

**Estimated Time**: 30 minutes

---

### Sprint 1: Design System Foundation
**Goal**: Reusable UI components matching elderly-friendly specifications

**Dependencies**: Sprint 0 complete

**Deliverables**:
- [ ] CSS reset and base typography (large fonts)
- [ ] Button component (large, accessible, 3 variants)
- [ ] Card component (rounded, shadowed containers)
- [ ] Global styles applied (font family, colors, spacing)

**Files Created**:
```
src/
├── components/
│   └── common/
│       ├── Button.jsx
│       ├── Button.css
│       ├── Card.jsx
│       └── Card.css
└── styles/
    ├── reset.css
    ├── typography.css
    └── globals.css
```

**Acceptance Criteria**:
- Button renders at 60px height minimum
- Text is 20px minimum throughout
- Card has visible shadow and rounded corners
- Color contrast passes WCAG AA

**Estimated Time**: 1 hour

---

### Sprint 2: Layout & Navigation Shell
**Goal**: App structure with bottom navigation that routes between pages

**Dependencies**: Sprint 1 complete

**Deliverables**:
- [ ] Layout wrapper component with header + content + fixed bottom nav
- [ ] Bottom navigation with 4 tabs (Home, Health, Schedule, Contacts)
- [ ] React Router setup with 4 placeholder pages
- [ ] Navigation highlights active page
- [ ] Header component with app name and language switcher placeholder

**Files Created**:
```
src/
├── components/
│   └── common/
│       ├── Layout.jsx
│       ├── Layout.css
│       ├── Navigation.jsx
│       ├── Navigation.css
│       ├── Header.jsx
│       └── Header.css
├── pages/
│   ├── HomePage.jsx
│   ├── HealthPage.jsx
│   ├── SchedulePage.jsx
│   └── ContactsPage.jsx
```

**Acceptance Criteria**:
- Clicking each nav tab routes to corresponding page
- Navigation bar is fixed at bottom
- Active tab is visually distinct
- All nav items have icon + text labels

**Estimated Time**: 1.5 hours

---

### Sprint 3: Language System (i18n)
**Goal**: Functional language switcher with Swiss German and English

**Dependencies**: Sprint 2 complete

**Deliverables**:
- [ ] Language context provider
- [ ] Translation JSON files for both languages
- [ ] useTranslation hook
- [ ] Language switcher component in header
- [ ] All existing UI text uses translation system

**Files Created**:
```
src/
├── contexts/
│   └── LanguageContext.jsx
├── hooks/
│   └── useTranslation.js
├── data/
│   └── translations/
│       ├── en.json
│       └── de-CH.json
├── components/
│   └── common/
│       └── LanguageSwitcher.jsx
```

**Acceptance Criteria**:
- Clicking language switcher toggles between 🇨🇭 and 🇬🇧
- All visible text updates when language changes
- Language preference persists in localStorage
- Navigation labels translate correctly

**Estimated Time**: 1.5 hours

---

### Sprint 4: Demo Data & User Context
**Goal**: Hardcoded demo data and ability to switch between Elder/Advocate views

**Dependencies**: Sprint 3 complete

**Deliverables**:
- [ ] Demo data file with Elder profile, Advocate profile, sample check-ins
- [ ] User context (current user type: elder or advocate)
- [ ] Data context (access to demo data)
- [ ] Hidden admin panel (accessible via triple-tap on logo or ?admin=true)
- [ ] Admin panel shows user type switcher and data reset button

**Files Created**:
```
src/
├── contexts/
│   ├── UserContext.jsx
│   └── DataContext.jsx
├── data/
│   └── demoData.js
├── components/
│   └── admin/
│       ├── DemoPanel.jsx
│       └── DemoPanel.css
```

**Demo Data Includes**:
- Elder: Hans Müller, 78, with avatar
- Advocate: Maria Müller (daughter)
- 14 days of sample check-in history
- 3 upcoming appointments
- 2 doctors, 2 medications

**Acceptance Criteria**:
- Admin panel opens with ?admin=true URL param
- Switching user type changes which dashboard is shown
- Reset button restores original demo data
- User type shown in admin panel

**Estimated Time**: 2 hours

---

### Sprint 5: Elder Home Page – Daily Check-In
**Goal**: Core feature - Elder can record how they're feeling today

**Dependencies**: Sprint 4 complete

**Deliverables**:
- [ ] Heidi greeting message component (personalized with name, time of day)
- [ ] Mood selector with 3 large emoji buttons (Good/Okay/Not Well)
- [ ] Check-in confirmation with Heidi's response
- [ ] Check-in saved to demo data (localStorage)
- [ ] Today's check-in status shown if already completed

**Files Created**:
```
src/
├── components/
│   └── elder/
│       ├── HeidiMessage.jsx
│       ├── HeidiMessage.css
│       ├── MoodSelector.jsx
│       ├── MoodSelector.css
│       ├── CheckInConfirmation.jsx
│       └── CheckInConfirmation.css
├── pages/
│   └── elder/
│       └── HomePage.jsx (replace placeholder)
```

**Acceptance Criteria**:
- Heidi says "Good morning/afternoon/evening, Hans!"
- Three mood buttons are large (min 100px tall) and colorful
- Clicking mood shows confirmation message from Heidi
- Refreshing page shows "already checked in today" state
- Check-in appears in demo data

**Estimated Time**: 2 hours

---

### Sprint 6: Health History Page (Elder View)
**Goal**: Elder can see their recent mood history

**Dependencies**: Sprint 5 complete

**Deliverables**:
- [ ] Weekly mood calendar visualization
- [ ] Last 7 days shown as color-coded circles
- [ ] Tap on day shows details
- [ ] Encouraging message based on streak
- [ ] Simple trend indicator (improving/stable/declining)

**Files Created**:
```
src/
├── components/
│   └── elder/
│       ├── WeeklyMoodCalendar.jsx
│       ├── WeeklyMoodCalendar.css
│       ├── DayDetail.jsx
│       └── TrendIndicator.jsx
├── pages/
│   └── elder/
│       └── HealthPage.jsx (replace placeholder)
```

**Acceptance Criteria**:
- Last 7 days visible as row of circles
- Each circle colored: green (good), yellow (okay), red (not well), gray (missing)
- Tapping circle shows date and any notes
- Heidi gives encouraging message about the week

**Estimated Time**: 1.5 hours

---

### Sprint 7: Contacts Page (Elder View)
**Goal**: Elder can see their care circle

**Dependencies**: Sprint 4 complete (can run parallel with Sprint 5-6)

**Deliverables**:
- [ ] Contact card component (large photo, name, relationship, phone)
- [ ] Two sections: "My Family" and "My Doctors"
- [ ] Tap-to-call functionality (tel: links)
- [ ] Use demo data for contacts

**Files Created**:
```
src/
├── components/
│   └── elder/
│       ├── ContactCard.jsx
│       ├── ContactCard.css
│       └── ContactSection.jsx
├── pages/
│   └── elder/
│       └── ContactsPage.jsx (replace placeholder)
```

**Acceptance Criteria**:
- Each contact shows large circular avatar
- Name and relationship clearly visible (24px+)
- Phone number is clickable
- Maximum 2 contacts per row

**Estimated Time**: 1 hour

---

### Sprint 8: Schedule Page (Elder View)
**Goal**: Elder can see upcoming appointments

**Dependencies**: Sprint 4 complete (can run parallel with Sprint 5-7)

**Deliverables**:
- [ ] Simple list of upcoming appointments (next 7 days)
- [ ] Appointment card with date, time, title, location
- [ ] Large, readable date format
- [ ] Today's appointments highlighted
- [ ] No add/edit functionality (advocate manages)

**Files Created**:
```
src/
├── components/
│   └── elder/
│       ├── AppointmentCard.jsx
│       ├── AppointmentCard.css
│       └── UpcomingAppointments.jsx
├── pages/
│   └── elder/
│       └── SchedulePage.jsx (replace placeholder)
```

**Acceptance Criteria**:
- Appointments sorted by date/time
- Date shown in Swiss format (DD.MM.YYYY)
- Time shown in 24h format
- Today's appointments have distinct background color
- Empty state shows "No upcoming appointments"

**Estimated Time**: 1 hour

---

### Sprint 9: Advocate Dashboard
**Goal**: Advocate can see elder's status at a glance

**Dependencies**: Sprints 5-6 complete

**Deliverables**:
- [ ] Advocate layout variant (different header styling)
- [ ] Elder summary card (photo, name, last check-in, current status)
- [ ] Week overview showing mood trend
- [ ] Alert section (shows if any "not well" days)
- [ ] Quick stats: "5 of 7 days feeling good"

**Files Created**:
```
src/
├── components/
│   └── advocate/
│       ├── ElderSummaryCard.jsx
│       ├── ElderSummaryCard.css
│       ├── WeekOverview.jsx
│       ├── WeekOverview.css
│       ├── AlertBanner.jsx
│       └── QuickStats.jsx
├── pages/
│   └── advocate/
│       └── DashboardPage.jsx
```

**Acceptance Criteria**:
- Switching to Advocate view shows different dashboard
- Elder's photo and name prominently displayed
- Last check-in time shown ("Last check-in: Today at 9:30")
- Red alert banner if recent "not well" entries
- Week summary matches elder's actual data

**Estimated Time**: 2 hours

---

### Sprint 10: Polish & Demo Readiness
**Goal**: Professional appearance ready for stakeholder demo

**Dependencies**: All previous sprints complete

**Deliverables**:
- [ ] Swiss Alps decorative element (subtle background or header image)
- [ ] Loading states for any async operations
- [ ] Smooth page transitions
- [ ] Empty states styled nicely
- [ ] Favicon and page titles
- [ ] README with demo instructions
- [ ] Bug fixes from testing all flows

**Files Updated**:
```
- All pages: Add transitions
- public/: Add favicon, images
- README.md: Demo instructions
- Various: Bug fixes
```

**Acceptance Criteria**:
- App feels polished, not like a prototype
- No console errors
- Both user flows (Elder + Advocate) work end-to-end
- Language switching works on all pages
- Admin panel allows full demo control

**Estimated Time**: 2 hours

---

## Phase 1 Summary

| Sprint | Feature | Time Est. | Running Total |
|--------|---------|-----------|---------------|
| 0 | Project Bootstrap | 30 min | 30 min |
| 1 | Design System | 1 hr | 1.5 hrs |
| 2 | Layout & Navigation | 1.5 hrs | 3 hrs |
| 3 | Language System | 1.5 hrs | 4.5 hrs |
| 4 | Demo Data & Admin | 2 hrs | 6.5 hrs |
| 5 | Elder Check-In | 2 hrs | 8.5 hrs |
| 6 | Health History | 1.5 hrs | 10 hrs |
| 7 | Contacts Page | 1 hr | 11 hrs |
| 8 | Schedule Page | 1 hr | 12 hrs |
| 9 | Advocate Dashboard | 2 hrs | 14 hrs |
| 10 | Polish | 2 hrs | 16 hrs |

**Total Estimated Time: ~16 hours of development**

---

## Critical Path Visualization

```
Sprint 0 (Bootstrap)
    │
    ▼
Sprint 1 (Design System)
    │
    ▼
Sprint 2 (Layout/Nav)
    │
    ├──────────────────────────────────────┐
    ▼                                      ▼
Sprint 3 (Language)                   Sprint 7 (Contacts)*
    │                                      │
    ▼                                      │
Sprint 4 (Demo Data/Admin)            Sprint 8 (Schedule)*
    │                                      │
    ▼                                      │
Sprint 5 (Elder Check-In) ◄────────────────┘
    │
    ▼
Sprint 6 (Health History)
    │
    ▼
Sprint 9 (Advocate Dashboard)
    │
    ▼
Sprint 10 (Polish)

* Sprints 7 & 8 can run parallel after Sprint 4
```

---

## Minimum Viable Demo (Earliest Viewable State)

If you need the **absolute shortest path** to something demo-able:

**Sprints 0-5 only** (~8.5 hours) delivers:
- ✅ Working app on localhost
- ✅ Swiss branding and elderly-friendly UI
- ✅ Language switcher (DE/EN)
- ✅ Elder can complete daily check-in with Heidi
- ✅ Admin panel to reset data
- ❌ No health history
- ❌ No contacts/schedule
- ❌ No advocate view

This demonstrates the core interaction model and visual design.

---

## Phase 2: Enhanced Demo (Future Sprints)

*Only after Phase 1 is complete and validated*

### Sprint 11-12: Full Scheduling System
- Calendar month view
- Add/edit appointments (advocate only)
- Recurring appointment support
- Reminder preview

### Sprint 13-14: Medication Tracking
- Medication list management
- Daily medication check-in ("Did you take your morning pills?")
- Medication history

### Sprint 15-16: Advocate Deep Features
- Advocate health timeline view
- Detailed day-by-day breakdown
- Advocate settings page (edit elder's profile, contacts)
- Message elder (shows as Heidi message)

### Sprint 17-18: Enhanced Heidi Interactions
- Follow-up questions for "not well" responses
- Pain tracking with body area selection
- Activity and appetite tracking
- Sleep quality tracking

### Sprint 19-20: Advanced Visualizations
- Health trends charts (line graphs)
- Monthly summaries
- Exportable reports (PDF)

---

## Phase 3: Production Preparation (Future)

*Not in scope for demo, but documented for planning*

- Authentication system (Elder PIN, Advocate email/password)
- Backend API (Node.js/Express or similar)
- Database (PostgreSQL)
- Real push notifications
- Swiss data protection compliance (revDSG)
- Accessibility audit
- Performance optimization
- App store preparation (if mobile)

---

## Open Questions for Future Consideration

1. **Voice Interface**: Should Heidi be able to speak aloud? (Text-to-speech)
2. **Video Calling**: Integration with video call platforms for family?
3. **Emergency Features**: SOS button for urgent situations?
4. **Wearable Integration**: Connect with health wearables for automatic data?
5. **Multi-Elder Support**: Can one advocate monitor multiple elders?

---

## Appendix: Swiss Design References

### Visual Inspiration

- Swiss public transport apps (SBB) – clean, functional
- Swiss health insurance apps (CSS, Helsana) – trustworthy
- Traditional Swiss tourism imagery – mountains, villages, warmth
- Swiss watchmaking aesthetics – precision, quality, timelessness

### Cultural Considerations

- Swiss value privacy highly – be transparent about data usage
- Punctuality matters – reminders should be precise
- Quality expectations are high – the app should feel premium
- Multi-generational trust – advocates should feel the elder is safe

---

*Document Version: 1.0*  
*Last Updated: December 24, 2024*  
*Author: ElderAgent Development Team*
