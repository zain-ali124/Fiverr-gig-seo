# 🚀 GigRanker - Gig SEO Analyzer

Optimize your Fiverr and Upwork gigs with ease. GigRanker is a powerful full-stack application designed to help freelancers boost their gig visibility, improve search rankings, and gain a competitive edge using data-driven insights.

![GigRanker Preview](https://via.placeholder.com/800x400?text=GigRanker+Dashboard)

## ✨ Key Features

- **🔍 Deep SEO Analysis**: Instant analysis of your gig's title, description, and tags with actionable recommendations.
- **📊 Competitor Insights**: Compare your gigs with top-performing competitors and implement strategic improvements.
- **💡 Smart Tag Suggestions**: AI-powered keyword and tag recommendations based on market trends and high-converting search terms.
- **📈 Rank Tracking**: Monitor your gig's daily ranking position for key search terms over time.
- **💼 Market Analysis**: Understand niche demand and pricing strategies to optimize your earnings.
- **🏆 Gig Score**: A comprehensive 1/100 performance score with specific guidance on improvement areas.
- **🌓 Theme Management**: Full support for both Dark and Light modes for a comfortable user experience.
- **🛡️ Secure Authentication**: JWT-based authentication with protected dashboard access.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **State Management**: React Context API (Auth & Theme)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Security**: [Helmet](https://helmetjs.github.io/), [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit), [Express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)
- **Auth**: [JSON Web Tokens (JWT)](https://jwt.io/), [Cookie-parser](https://www.npmjs.com/package/cookie-parser)

## 📁 Project Structure

```bash
gig-seo-analyzer/
├── client/          # React Frontend (Vite)
│   ├── src/         # Components, Pages, Context, Services
│   └── public/      # Static assets
└── server/          # Node.js Backend
    ├── src/         # Controllers, Models, Routes, Utils
    └── config/      # Environment & database configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/gig-seo-analyzer.git
   cd gig-seo-analyzer
   ```

2. **Setup the Backend:**
   ```bash
   cd server
   npm install
   # Create a .env file based on the provided configuration
   npm run dev
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../client
   npm install
   # Configure VITE_API_URL in .env if needed
   npm run dev
   ```

## 📜 Usage Guide

1. **Register/Login**: Create an account to access the dashboard.
2. **Dashboard Overview**: See your overall gig performance and recent analyses.
3. **New Analysis**: Paste your gig URL or enter gig details to get a comprehensive SEO report.
4. **Implementation**: Follow the suggested improvements to optimize your title, description, and tags.
5. **Monitor**: Track your gig's ranking performance and see your "Gig Score" improve.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
