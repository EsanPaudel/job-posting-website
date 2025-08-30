
  <h1>Job Board </h1>
  
  <p>
    <strong>Job Board</strong> is a modern web application built using Next.js for users to find, post, and manage job listings. It is designed to provide a seamless experience for job seekers, employers, and admins.
  </p>

  <h2>Features</h2>
  <ul>
    <li>User authentication and authorization</li>
    <li>Employer dashboard to post and manage job listings</li>
    <li>Job seeker dashboard to apply and track applications</li>
    <li>Search and filter jobs by category, location, and skills</li>
    <li>Responsive design for desktop and mobile devices</li>
    <li>Admin panel to manage users and jobs</li>
  </ul>

  <h2>Tech Stack</h2>
  <ul>
    <li>Frontend: Next.js, React, Tailwind CSS</li>
    <li>Backend: Next.js API Routes</li>
    <li>Database: PostgreSQL</li>
    <li>ORM: Prisma</li>
    <li>Authentication: NextAuth.js</li>
    <li>Deployment: Vercel (optional)</li>
  </ul>

  <h2>Installation</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/EsanPaudel/job-posting-website.git</code></pre>
    </li>
    <li>Navigate to the project directory:
      <pre><code>cd job-posting-website</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Set up environment variables:
      <pre><code>AUTH_SECRET=""
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
NEXTAUTH_URL=http://localhost:3000</code></pre>
      <p>Update the .env file with your database credentials and other secrets.</p>
    </li>
    <li>Run database migrations:
      <pre><code>npx prisma migrate dev</code></pre>
    </li>
    <li>Start the development server:
      <pre><code>npm run dev</code></pre>
    </li>
  </ol>

  <h2>Usage</h2>
  <p>
    Open your browser and visit <strong>http://localhost:3000</strong> to view the application. You can register as a job seeker or employer and start using the platform immediately.
  </p>

