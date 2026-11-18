# Coy Discover Tab • SDE Intern Assignment

> A standalone mobile-first **"Discover"** swipe experience built alongside Coy's existing double-blind crush matching model.

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-000000?logo=express&logoColor=white)](https://expressjs.com)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20Neo--Brutalism-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Motion-Framer%20Motion-FF0055?logo=framer&logoColor=white)](https://framer.com/motion)

---

## 📌 Repository Overview

This repository contains the complete submission for the **Coy SDE Intern Assignment**:

1. **Part A (Product Strategy & Security Teardown)**:
   * See [PART_A_SUBMISSION.md](./PART_A_SUBMISSION.md) for the complete teardown and feature proposals:
     * **Feature 1**: The *Admirer Funnel Bridge* (fixing the 53-admirers vs. 3-slots conversion drop-off).
     * **Feature 2**: *Sender-Chosen Circle Categorization* (College, Work, Friends) with $k$-anonymity protection.
     * **Security Audit**: Secondary identifier hijacking vulnerability fix & delta timing attack defense.

2. **Part B (Discover Tab Application)**:
   * Mobile-first swipe-based discovery tab designed with **1:1 fidelity to Coy's neo-brutalist pop brand** (`#ff2d78` electric pink, 2px borders, 0-blur drop shadows, Bricolage Grotesque & Plus Jakarta Sans typography).
   * Strict adherence to Coy's core privacy promise: **Never reveal who liked the user unless it is mutual**.

---

## ✨ Features & Capabilities

### Core Requirements (Assignment Spec)
* **Mobile-First Responsive Layout**: Native mobile feel (375px–430px) with centered mobile preview container on desktop screens.
* **Swipe Deck Physics**: Fluid drag gestures on touch devices using **Framer Motion** (`rotate: x * 0.05`), combined with accessible desktop action buttons (`Pass ✕`, `Like ♥`).
* **Dynamic Feedback Stamps**: Real-time opacity scaling of green **`LIKE 💚`** and pink **`PASS ✕`** stamps during drags.
* **Server-Enforced Double-Blind Matching**:
  * The `GET /feed` payload strictly excludes the `hasLikedUser` field. The client never learns if a profile liked them beforehand.
  * Only when the user swipes right does `POST /swipe` check the server-side match graph and return `{ isMatch: true }`.
* **"It's a Match!" Celebration**:
  * Animated celebration modal with multi-colored confetti fireworks burst.
  * Colliding profile avatars with pulsing heart badge.
  * Instant icebreaker generator with one-click copy and WhatsApp launch link.
* **Mutual Matches View**:
  * Dedicated tab displaying all confirmed mutual matches with college, city, matched timestamp, and direct chat actions.
* **30 Seeded Realistic Profiles**:
  * Authentic Indian young adult demographic (Bangalore, Mumbai, Delhi, Pune, Hyderabad - colleges like BITS, IIT, DU, NMIMS, Christ).
  * 8 pre-seeded profiles have already liked the user, guaranteeing matches during evaluation.
* **Persistent State**:
  * Swipes, matches, and deck progress persist across browser page reloads via atomic JSON state persistence.
* **Empty State**:
  * Clear neo-brutalist empty state when all profiles have been reviewed.

### Added Quality-of-Life (QoL) Enhancements
1. **↺ Undo / Rewind Last Swipe**: Revert accidental passes or likes with full server state synchronization.
2. **⌨️ Desktop Keyboard Navigation**: Use `<kbd>←</kbd>` to pass, `<kbd>→</kbd>` to like, and `<kbd>Ctrl+Z</kbd>` to undo.
3. **🏷️ Circle Filter Chips**: Filter feed by affiliation (`All`, `🎓 Campus`, `💼 Work / Tech`, `☕ Social`) directly integrating Part A's circle concept.
4. **🛠️ Reviewer Demo Bar**: Top banner with live stats (remaining count, matches count) and a **"Reset Feed"** button to restart the deck in 1 click.
5. **🎰 Coy Slots Store Preview**: Interactive slot upsell modal (`₹99`, `₹199`, `₹299`) matching Coy's live economy.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Canvas Confetti.
* **Backend**: Node.js, Express.js, CORS, file-backed atomic JSON data store.
* **API Architecture**: Clean RESTful endpoints mounted at `/api` and root `/`.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18.0 or higher)
* **npm** (v9.0 or higher)

### 1. Clone & Install
```bash
git clone https://github.com/Raphel6969/coy-discover-assignment.git
cd coy-discover-assignment

# Install dependencies for both backend and frontend
npm run install:all
```

### 2. Run the Application
In one terminal, start the backend API:
```bash
npm run backend
# Server runs at http://localhost:5000
```

In a second terminal, start the frontend Vite development server:
```bash
npm run frontend
# Frontend runs at http://localhost:5173
```

Now open [http://localhost:5173](http://localhost:5173) in your browser (or switch to mobile viewport inspection via Chrome DevTools `Cmd+Shift+M` / `Ctrl+Shift+M`).

---

## 📡 Backend API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/feed` (or `/api/feed`) | Returns unswiped profiles. Optional `?circle=Campus` query param. Strips match indicators. |
| `POST` | `/swipe` (or `/api/swipe`) | Body: `{ profileId: string, action: "like" \| "pass" }`. Evaluates mutual match server-side. |
| `GET` | `/matches` (or `/api/matches`) | Returns all confirmed mutual matches. |
| `POST` | `/undo` (or `/api/undo`) | Reverts the last swipe action. |
| `POST` | `/reset` (or `/api/reset`) | Resets all swipes and matches to initial state for repeated demo testing. |
| `GET` | `/stats` (or `/api/stats`) | Returns feed remaining, swiped count, and mutual match counts. |

---

## 🎨 Design Tokens (1:1 Coy Brand Reproduction)

```
Primary Hot Pink:   #ff2d78
Primary Hover:      #e0246a
Dark / Ink Border:  #18181b (2px solid on all interactive elements)
Warm Cream Canvas:  #faf8f5 (Editorial off-white)
Pure White Surface: #ffffff
Success Green:      #22c55e / #16a34a
WhatsApp Green:     #25d366

Typography:
- Headings: Bricolage Grotesque (Bold, deep ink traps, tight letter-spacing)
- Body: Plus Jakarta Sans (Clean geometric readability)
- Monospace / Badges: JetBrains Mono

Box Shadows:
- Card: 6px 6px 0px #18181b
- Button: 4px 4px 0px #18181b
- Active Push: translate(2px, 2px), 2px 2px 0px #18181b
```

---

## 📄 License
This project was authored as part of the Coy SDE Intern recruitment assignment. MIT License.
