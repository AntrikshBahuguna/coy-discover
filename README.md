# Coy Discover 

A profile discovery and matching application built with Next.js, React, Prisma, and SQLite.

Coy Discover allows users to explore profiles, like or pass on people, and discover mutual matches when two users express interest in each other.

##  Features

- **Profile Discovery:** Browse user profiles with images, locations, bios, and interests.
- **Like and Pass:** Express interest or skip a profile.
- **Mutual Matching:** A match is created when both users like each other.
- **Matches Page:** View profiles that have mutually matched.
- **Persistent Data:** Store profiles, swipes, and matches using Prisma and SQLite.
- **Responsive Interface:** A clean interface inspired by Coy's visual identity.

##  Tech Stack

| Technology    |            Purpose                 |
|               |                                    |
| Next.js       |      Application framework         |
| React         |      Frontend UI                   |
| Tailwind CSS  |      Styling                       | 
| Prisma ORM    |      Database access               |
| SQLite        |      Database                      | 
| JavaScript    |      Application logic             |
| Lucide React  |      Icons                         |
| Framer Motion |      Animations and swipe gestures |
| Git & GitHub  |      Version control               |

##  Tree Structure
coy-discover/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── public/
├── src/
│   ├── app/
│   │   ├── discover/
│   │   │   └── page.js
│   │   ├── feed/
│   │   │   └── route.js
│   │   ├── matches/
│   │   │   └── route.js
│   │   ├── swipe/
│   │   │   └── route.js
│   │   ├── globals.css
│   │   └── layout.js
│   ├── components/
│   │   ├── DiscoverApp.jsx
│   │   ├── MatchModal.jsx
│   │   ├── Navbar.jsx
│   │   └── ProfileCard.jsx
│   └── lib/
│       ├── constants.js
│       ├── prisma.js
│       └── profile.js
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/AntrikshBahuguna/coy-discover.git
cd coy-discover
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and configure the database connection:

```env
DATABASE_URL="file:../dev.db"
```

### 4. Set up the database

Apply the existing Prisma migrations:

```bash
npx prisma migrate deploy
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/feed` | Fetch available profiles |
| POST | `/swipe` | Like or pass on a profile |
| GET | `/matches` | Retrieve mutual matches |

## 💡 Matching Logic

The application uses a mutual-like matching system.

1. A user views another person's profile.
2. The user chooses Like or Pass.
3. The swipe is saved in the database.
4. If the other person has already liked the user, a match is created.
5. The confirmed match appears on the Matches page.

## 👨‍💻 Author

**Antriksh Bahuguna**

GitHub: [AntrikshBahuguna](https://github.com/AntrikshBahuguna)

---

*Coy Discover is a demonstration project developed as part of an SDE internship assignment.*
