# 🌟 Gabi Aharon Portfolio

A modern, animated portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

<!-- Test sync with Netlify - Domain connected successfully! -->

## 🚀 Live Demo
**[Visit Website](https://gabiaharon.com)**

## ✨ Features

- Responsive design for all device sizes
- Animated UI elements using Framer Motion
- Particle background animation
- Social media links with hover effects
- Featured links section
- Projects showcase
- Animated ticker for announcements

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🌐 GitHub Pages Setup

To deploy to GitHub Pages, ensure your repository settings are configured correctly:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (not Deploy from a branch)
3. The workflow will automatically deploy when you push to the master branch

## 🎨 Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/) (for icons)

## 📁 Project Structure

- `pages/index.js` - Main home page component
- `components/` - Reusable components
  - `Layout.js` - Main layout wrapper
  - `LanguageToggle.js` - Language switcher component
  - `Navbar.js` - Navigation component
  - `TestimonialsSection.js` - Client testimonials
- `data/` - Static data files
  - `testimonials-data.json` - Client testimonials data
- `styles/` - Global styles and Tailwind configuration
- `public/` - Static assets

## 🚀 Deployment

The site is automatically deployed to GitHub Pages when you push to the master branch. The deployment process:

1. Builds the Next.js app with static export
2. Uploads the built files to GitHub Pages
3. Makes the site available at the GitHub Pages URL

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

<!-- Trigger GitHub Pages build 05/25/2025 09:23:13 -->
## Test Update
This line was added to test the GitHub update script.
Another test line added to check change detection.
Testing Netlify automatic deployment - should update both GitHub and Netlify.