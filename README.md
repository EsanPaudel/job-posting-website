<h1>🚀 JobBoardX</h1>

Modern job board app for recruiters and job seekers. Fast, smooth, and fully featured.

Features

🔐 Secure authentication (NextAuth.js + JWT)

💼 Post, edit, delete, and search jobs

📊 Dashboard analytics for applications and trends

📝 Applicant management (approve/reject)

🌐 Responsive design (mobile, tablet, desktop)

Tech Stack

Frontend: Next.js 15 + TypeScript + TailwindCSS

Backend: Node.js + Prisma ORM + PostgreSQL

Auth: NextAuth.js

Storage: ImageKit / AWS S3

Getting Started
# Clone repo
git clone https://github.com/your-username/jobboardx.git
cd jobboardx

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# edit .env

# Run migrations
npx prisma migrate dev --name init

# Start dev server
npm run dev


Open http://localhost:3000

Folder Structure
src/
├─ pages/          # Next.js pages
├─ components/     # UI components
├─ hooks/          # Custom hooks
├─ lib/            # Utilities
├─ providers/      # Auth providers
└─ styles/         # Tailwind CSS
prisma/            # DB schema & migrations

Contributing

Fork → create branch → commit → push → open PR

Keep it clean and documented

License

MIT © 2025 [Your Name]# job-posting-website
