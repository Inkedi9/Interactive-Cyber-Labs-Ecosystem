# 🧠 Interac. Lab Index

> Cyber Simulation & Security Labs Platform

---

## 🌍 Live Demo

👉 https://interac-lab-index.vercel.app

## 🚀 Overview

**Interac. Lab Index** is a modern, interactive cybersecurity platform designed to centralize multiple security labs, simulations and tools into a single immersive interface.

This project is not a traditional portfolio.

It is built as a **SaaS-like cyber platform**, combining:

- interactive labs
- simulated system states
- command-based navigation
- infrastructure experimentation

👉 The goal is to demonstrate both **technical skills** and **product thinking**.

---

## 🎯 Objectives

- Transform a portfolio into a **cyber platform experience**
- Showcase multiple domains:
  - SOC & Detection
  - OSINT
  - Threat Intelligence
  - Identity & Access
  - Infrastructure (Active Directory lab)
- Create an interface that feels like a **real product**

---

## 🧩 Features

### 🧪 Interactive Lab Index

- Centralized view of all cybersecurity projects
- Premium UI cards with:
  - type (Blue / Red / Purple / OSINT / Infra)
  - level (Beginner → Advanced)
  - status (Deployed / In Progress)
- Quick preview drawer + full lab pages

---

### ⚡ Command Palette (Ctrl + K)

- Keyboard navigation (↑ ↓ Enter)
- Smart search across:
  - labs
  - tags
  - skills
  - MITRE references
- Actions & navigation shortcuts
- Hidden commands system

---

### 🧠 Cyber Identity Layer

Hidden commands add an interactive “cyber OS” feel:

```
/whoami → operator identity
/root → enable root UI mode
/matrix → toggle matrix visual layer
/status → system runtime status
/reset → reset modes
/exploit → safe simulation (easter egg)
```

---

### 📊 System Status Simulation

- Simulated runtime environment
- Platform health overview
- Active labs & nodes
- Command tracking

---

### 🖥️ Mini Lab IT (Infrastructure Lab)

A real virtualized lab environment including:

- Windows Server (Active Directory)
- Domain-joined endpoint
- Kali Linux (controlled testing)
- Linux node (network analysis)

👉 Demonstrates hands-on infrastructure practice beyond UI.

---

## 🎨 UI / UX

Design philosophy:

- **Apple-like SaaS UI**
- Cyber / futuristic aesthetic
- Obsidian + emerald color system
- Glassmorphism + soft glow
- Smooth animations (Framer Motion)

---

## 🛠️ Tech Stack

- React (Vite)
- TailwindCSS
- Framer Motion
- Lucide Icons

No backend (V1) — simulated state system.

---

## 🧱 Project Structure

```bash
src/
├── components/
│ ├── layout/
│ ├── sections/
│ ├── ui/
│
├── pages/
│ ├── HomePage.jsx
│ ├── LabDetailPage.jsx
│ ├── MiniLabITPage.jsx
│
├── data/
│ ├── labs.js
│ ├── systemStatus.js
│
├── context/
│ └── CyberModeContext.jsx
├── utils/
│   ├── cn.js
│   └── filters.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

```npm install
npm install framer-motion lucide-react
npm run dev
```

---

Why this project is strong

This project is designed to make recruiters think:

“This is not just a portfolio. This looks like a real cyber platform.”

It emphasizes:

product thinking
premium UI execution
modular architecture
interactive UX
realistic cyber SaaS positioning

---

## Future Improvements

- Dedicated lab pages
- Advanced preview drawer metrics
- Global command palette
- Category tabs
- Multi-view layout (grid / list / command)
- Live terminal decorative module
- Theme switching
- Lab detail routes with React Router

## Author

Built as a premium cybersecurity portfolio platform project.
Focused on:

Security labs
Detection & simulation
Cyber platform design
