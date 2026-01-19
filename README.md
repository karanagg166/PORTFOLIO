# Karan Aggarwal Portfolio

A modern, responsive portfolio website built with **Next.js 16** and **Tailwind CSS 4**, featuring stunning space-themed animations and interactive elements.

![Portfolio Preview](/images/home-main.svg)

## 🚀 Features

- **Space Theme**: Beautiful dark theme with particle animations and space-inspired design
- **Interactive Particles**: Animated star field background using @tsparticles
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Project Showcase**: Display your projects with cards featuring GitHub and demo links
- **Tech Stack Display**: Showcase your skills with animated icons
- **GitHub Calendar**: Integration to display your coding activity
- **Resume Section**: Built-in PDF resume viewer

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, tsparticles
- **Icons**: React Icons
- **TypeScript**: Full type safety
- **Docker**: Production-ready containerization

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/karanagg166/PORTFOLIO.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run -p 3000:3000 portfolio
```

Or use Docker Compose:

```bash
docker-compose up -d
```

## 📂 Project Structure

```
portfolio/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── project/            # Projects page
│   └── resume/             # Resume page
├── components/             # React components
│   ├── Home/               # Home page components
│   ├── About/              # About page components
│   ├── Projects/           # Project cards and data
│   └── Resume/             # Resume viewer
├── public/                 # Static assets
│   ├── images/             # Image files
│   └── resume/             # PDF resume
├── Dockerfile              # Docker configuration
└── docker-compose.yml      # Docker Compose config
```

## 🎨 Customization

### Update Personal Info

1. Edit `components/Home/Home.tsx` for your name and greeting
2. Edit `components/Home/Type.tsx` for your roles/titles
3. Edit `components/About/AboutCard.tsx` for your bio
4. Replace images in `public/images/`

### Add Projects

Edit `components/Projects/Projects.tsx` and add your projects to the array:

```typescript
{
  imgPath: projectImages.yourProject,
  title: "Your Project",
  description: "Description...",
  ghLink: "https://github.com/...",
  demoLink: "https://..."
}
```

### Update Social Links

Edit social links in:
- `components/Footer.tsx`
- `components/Home/Home2.tsx`

## 📸 Screenshots

### Home Page
Beautiful landing page with animated greeting and particle effects.

### Projects Page
Showcase of projects with GitHub and demo links.

### About Page
Personal info, tech stack, and GitHub activity calendar.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Karan Aggarwal**
- GitHub: [@karanagg166](https://github.com/karanagg166)
- LinkedIn: [Karan Aggarwal](https://www.linkedin.com/in/karan-aggarwal-166/)
- Twitter: [@karanagg166](https://twitter.com/karanagg166)

---

⭐ Star this repo if you find it useful!
