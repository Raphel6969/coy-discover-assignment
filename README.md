# Coy Discover Tab • SDE Intern Assignment

> A production-grade, mobile-responsive **"Discover"** swipe experience engineered alongside Coy's signature double-blind crush matching model.

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-000000?logo=express&logoColor=white)](https://expressjs.com)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20Neo--Brutalism-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Motion-Framer%20Motion-FF0055?logo=framer&logoColor=white)](https://framer.com/motion)

---

## 📌 Repository & Deliverables Summary

This repository contains the complete submission for the **Coy SDE Intern Assignment**:

1. **Part A (Product Strategy, Innovations & Security Audit)**:
   * See [idea.md](./idea.md) and [PART_A_SUBMISSION.md](./PART_A_SUBMISSION.md) for the comprehensive teardown:
     * **Feature 1**: The *Admirer Funnel Bridge* (solving the 53-admirers vs. 3-slots drop-off cliff with dynamic onboarding bonus slots and contextual in-funnel monetization).
     * **Feature 2**: *Sender-Chosen Circle Categorization* (Campus, Work, Social) with $k$-anonymity protection ($k \ge 3$).
     * **Security Audit**: Secondary identifier hijacking vulnerability fix (mandating OTP verification on all added contact methods in Settings) and delta timing correlation attack defense.
2. **Part B (Discover Tab Application)**:
   * Standalone full-stack application built with React, Vite, Express, and Tailwind CSS.
   * Responsive across mobile (375px/390px/428px), tablets, and desktop/laptop screens.
   * 1:1 fidelity to Coy's neo-brutalist pop aesthetic (`#ff2d78` electric pink, 2px solid black borders, 0-blur drop shadows, Bricolage Grotesque & Plus Jakarta Sans typography, and classic plain hearts).

---

## ✅ Requirements Fulfillment Matrix

| Requirement | Spec Details | Status | Implementation Details |
| :--- | :--- | :--- | :--- |
| **Part A: Suggest Two Core Features** | Propose 2 features with deep rationale on why they are required. | ✅ **Fulfilled** | Fully detailed in [idea.md](./idea.md) with retention math, user journeys, and DPDP Act privacy safeguards. |
| **Frontend Framework** | React.js or Next.js, mobile-first & responsive. | ✅ **Fulfilled** | Built with **React 18 + Vite + Tailwind CSS**. Fluidly responsive across mobile viewports, tablets, and desktop screens. |
| **Backend Framework** | Node.js with Express or Next.js API routes. | ✅ **Fulfilled** | **Express.js** REST API with structured endpoints (`/feed`, `/swipe`, `/matches`, `/undo`, `/reset`, `/stats`). |
| **Data Persistence** | JSON, SQLite, or DB. Assume single logged-in user. | ✅ **Fulfilled** | File-backed atomic JSON store (`profiles.json` + `user_state.json`) persisting state across page reloads. |
| **Navigation & Tabs** | Simple tab bar with placeholder "Home" tab and "Discover" tab. | ✅ **Fulfilled** | Top header navigation for desktop + bottom bar for mobile. Placeholder Home tab (blank per spec) + Discover tab + Matches view. |
| **Seed Mock Profiles** | At least 30 profiles with name, age, photo, bio, city/college, interests. | ✅ **Fulfilled** | **30 seeded profiles** modeled on Coy's actual audience (BITS, IIT, DU, NMIMS, Christ; Bangalore, Mumbai, Delhi, Pune). |
| **Pre-Seeded Mutual Likes** | Some profiles must have already liked the user for demo matches. | ✅ **Fulfilled** | **8 pre-seeded mutual likes** (e.g. Ananya, Kabir, Tanvi, Sneha) ensuring guaranteed matches during reviewer evaluation. |
| **Swipe Experience** | One card at a time. Swipe right = like, left = pass. Drag gestures on mobile, buttons on desktop. | ✅ **Fulfilled** | **Framer Motion** physics with drag constraints, rotation (`rotate: x * 0.05`), dynamic stamps (`LIKE 💚` / `PASS ✕`), and tactile desktop buttons. |
| **Smooth Animations** | Smooth card exit animations and clear visual feedback. | ✅ **Fulfilled** | Spring physics exit animations, scale-proportional stamp opacities, and canvas confetti fireworks. |
| **Non-Repeating Swipes** | A swiped profile must never appear again. | ✅ **Fulfilled** | Filtered server-side and client-side; swiped profile IDs are recorded in `swipes` map and excluded from `/feed`. |
| **Clear Empty State** | Display a clear empty state when no profiles remain. | ✅ **Fulfilled** | Neo-brutalist empty state card with match summary and instant "Reset Feed" button. |
| **Mutual Match Trigger** | Match happens ONLY when both users like each other. Show "It's a match!" screen. | ✅ **Fulfilled** | High-energy celebration modal with colliding avatars, pulsing classic heart, and WhatsApp chat launcher. |
| **Matches View** | View listing all mutual matches. | ✅ **Fulfilled** | Responsive grid of mutual matches with college, city, matched timestamp, and one-tap WhatsApp icebreaker. |
| **Privacy Promise** | Never reveal who liked the user unless mutual. | ✅ **Fulfilled** | Strictly enforced on server: `hasLikedUser` is stripped from `GET /feed` before sending to the client. |
| **Backend APIs** | `GET /feed`, `POST /swipe`, `GET /matches`. Swipes/matches persist across reloads. | ✅ **Fulfilled** | All endpoints implemented, tested, and persisted to disk. |

---

## 🎁 Extra Features & Quality-of-Life (QoL) Enhancements

1. **Fluid Multi-Device Responsiveness**:
   * Seamless layout adapting from mobile phones (375px) to tablets and widescreen desktops.
   * On desktop, the top navigation bar provides quick tab switching, while mobile uses an ergonomic bottom tab bar.
   * Matches view automatically reflows from 1 column on mobile to 2, 3, and 4 columns on desktop.
2. **↺ Undo / Rewind Last Swipe**:
   * Allows users to recover from accidental left or right swipes with full server-side synchronization (`POST /api/undo`).
3. **⌨️ Desktop Keyboard Controls**:
   * Evaluators testing on laptop/desktop can use `<kbd>←</kbd>` to pass, `<kbd>→</kbd>` to like, and `<kbd>Ctrl+Z</kbd>` to undo.
4. **🏷️ Circle Affiliation Filter Chips**:
   * Interactive filter chips (`All`, `🎓 Campus`, `💼 Work / Tech`, `☕ Social`) directly illustrating the Part A circle feature.
5. **🛠️ Reviewer Demo Bar**:
   * Discreet top bar for interviewers displaying live remaining count, swiped count, mutual matches count, and a 1-click **"Reset Feed"** button.
6. **💬 Direct WhatsApp Icebreaker Launcher**:
   * When matched, users can tap "Say Hi on WhatsApp" to open `https://wa.me` with an automated friendly icebreaker message pre-filled.
7. **🎰 Coy Slots Store Preview**:
   * Interactive slot pack modal mirroring Coy's live monetization (`₹99 for +1`, `₹199 for +3`, `₹299 for +5`).

---

## 🗄️ Database & Data Schema

The application uses an atomic, file-backed persistent data store designed for zero-configuration testing and review.

### 1. `profiles.json` (Seed Profiles Schema)
```typescript
interface Profile {
  id: string;            // Unique identifier (e.g., "p1", "p2", ..., "p30")
  name: string;          // Full name (e.g., "Ananya Sharma")
  age: number;           // Age (e.g., 22)
  photo: string;         // High-res Unsplash portrait URL
  shortBio: string;      // Relatable campus/young adult bio
  college: string;       // College / University (e.g., "Christ University, Bangalore")
  city: string;          // Metro city (e.g., "Bengaluru", "Mumbai", "Delhi NCR")
  circle: "Campus" | "Work / Tech" | "Social"; // Affiliation category
  interests: string[];   // Array of 3-4 interest tags (e.g., ["Filter Coffee", "Indie Music"])
  prompt: {
    question: string;    // Icebreaker question (e.g., "My ideal Sunday in Bangalore")
    answer: string;      // Profile answer
  };
  hasLikedUser: boolean; // Server-only flag: true if this profile pre-liked the logged-in user
}
```

### 2. `user_state.json` (User State & Persistence Schema)
```typescript
interface UserState {
  swipes: {
    [profileId: string]: "like" | "pass"; // Key-value map of recorded swipes
  };
  matches: Array<{
    id: string;
    name: string;
    age: number;
    photo: string;
    shortBio: string;
    college: string;
    city: string;
    circle: string;
    interests: string[];
    prompt?: { question: string; answer: string };
    matchedAt: string; // ISO 8601 timestamp of mutual match
  }>;
  swipeHistory: Array<{
    profileId: string;
    action: "like" | "pass";
    timestamp: string; // ISO 8601 timestamp for Undo stack
  }>;
  activeCircle: string; // Last selected circle filter ("All", "Campus", etc.)
}
```

### 3. Double-Blind Privacy Transformation Pipeline
```
[Disk: profiles.json (includes hasLikedUser)]
                   │
                   ▼  (Server Store Pipeline)
  Filter: Remove profiles in user_state.swipes
  Filter: Apply optional circle category filter
  Sanitize: Deconstruct and omit `hasLikedUser`
                   │
                   ▼
[Network Response: GET /feed]
{
  success: true,
  count: 29,
  feed: [ { id: "p1", name: "Ananya", ... } ] // ZERO client exposure of pre-likes
}
```

---

## 📡 API Reference

All routes are accessible under both `/api/*` and root `/*` for maximum client compatibility:

| Method | Endpoint | Request Body | Response Payload | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/feed` | None | `{ success, count, feed: Profile[] }` | Returns unswiped profiles. Supports `?circle=Campus`. |
| `POST` | `/swipe` | `{ profileId: string, action: "like" \| "pass" }` | `{ success, profileId, action, isMatch, matchProfile? }` | Records swipe and evaluates mutual match server-side. |
| `GET` | `/matches` | None | `{ success, count, matches: Match[] }` | Returns all confirmed mutual matches. |
| `POST` | `/undo` | None | `{ success, restoredProfile, remainingHistoryCount }` | Rewinds the most recent swipe action. |
| `POST` | `/reset` | None | `{ success, message }` | Resets all swipes and matches for repeat testing. |
| `GET` | `/stats` | None | `{ success, stats: { totalProfiles, swipedCount, matchesCount, remainingCount, seededPreLikes } }` | Telemetry statistics for reviewer bar. |

---

## 🎨 Visual Identity & Design System

The application faithfully mirrors Coy's exact Neo-Brutalist Pop design tokens:

```
Primary Hot Pink:   #ff2d78  (Accent, CTA, Logo dot)
Hover Hot Pink:     #e0246a
Dark / Ink Border:  #18181b  (Zinc 900 - 2px solid on all interactive elements)
Warm Cream Canvas:  #faf8f5  (Editorial off-white background)
Pure White Surface: #ffffff  (Card surfaces)
Vibrant Like Green: #00e676  (Electric emerald LIKE stamp & match badges)
Vibrant Pass Red:   #ff2d55  (Electric crimson PASS stamp)
WhatsApp Green:     #25d366  (Direct chat integration)

Typography:
- Headings: Bricolage Grotesque (Bold, deep ink traps, tight letter-spacing)
- Body: Plus Jakarta Sans (Clean geometric legibility)
- Monospace / Badges: JetBrains Mono

Box Shadows:
- Card Shadow:   6px 6px 0px #18181b
- Button Shadow: 4px 4px 0px #18181b
- Active Push:   translate(2px, 2px), 2px 2px 0px #18181b
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18.0 or higher)
* **npm** (v9.0 or higher)

### 1. Installation
```bash
git clone https://github.com/Raphel6969/coy-discover-assignment.git
cd coy-discover-assignment

# Install dependencies for backend and frontend
npm run install:all
```

### 2. Running Locally
In terminal 1, start the backend API:
```bash
npm run backend
# Backend runs at http://localhost:5000
```

In terminal 2, start the frontend client:
```bash
npm run frontend
# Frontend runs at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing the Live Demo

1. **Test Like & Mutual Match**:
   * The first profile in the deck is **Ananya Sharma** (pre-seeded like).
   * Click the **Like** button (or swipe right).
   * The **"It's a Match!"** celebration modal will immediately trigger with confetti fireworks!
2. **Test WhatsApp Icebreaker**:
   * On the match modal, click **"Say Hi on WhatsApp"** to test pre-filled message dispatch.
3. **Test Undo / Rewind**:
   * Click **Pass** on the next card. Notice the card vanishes.
   * Click the **↺ Undo** button (or press `Ctrl+Z`). The card returns to the top of the deck.
4. **Test Circle Filtering**:
   * Click `🎓 Campus` in the filter bar. The deck re-indexes to show only college batch profiles.
5. **Test Reset**:
   * In the top **Reviewer Bar**, click **"Reset Feed"**. All 30 profiles and matches reset to initial state instantly.

---

## 📄 License
This project was authored by **Raphel** as part of the Coy SDE Intern recruitment evaluation. MIT License.
