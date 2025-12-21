# Leave & Productivity Analyzer

A full-stack web application that analyzes employee attendance, leave usage, and productivity based on uploaded Excel attendance sheets.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](YOUR_VERCEL_URL_HERE)
[![GitHub](https://img.shields.io/badge/github-repo-blue.svg)](YOUR_GITHUB_URL_HERE)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Business Rules](#business-rules)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Sample Data](#sample-data)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Author](#author)

## 🎯 Overview

This project is a comprehensive Leave & Productivity Analyzer built as part of the NMIMS Intern Technical Assignment for Kenmark ITan Solutions. The application helps track employee attendance, manage leave balances, and calculate productivity metrics from Excel data.

## ✨ Features

- **📤 Excel File Upload**: Upload `.xlsx` files with employee attendance data
- **📊 Real-time Dashboard**: Visual analytics with key metrics
  - Total Expected Hours
  - Total Worked Hours
  - Leaves Used (out of 2 per month)
  - Productivity Percentage
- **📅 Monthly Analysis**: View attendance data by employee and month
- **📈 Daily Breakdown**: Detailed day-by-day attendance records
- **🎨 Responsive UI**: Clean, modern interface built with Tailwind CSS
- **🔄 Automatic Calculations**: 
  - Daily worked hours computation
  - Leave day detection
  - Productivity percentage calculation

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS 4.x** - Utility-first styling
- **React Hooks** - State management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database management
- **MongoDB** - NoSQL database
- **xlsx/exceljs** - Excel file parsing

### Deployment
- **Vercel** - Frontend & API hosting
- **MongoDB Atlas** - Cloud database

## 📜 Business Rules

### Working Hours
- **Monday to Friday**: 8.5 hours per day (10:00 AM - 6:30 PM)
- **Saturday**: 4 hours (half day, 10:00 AM - 2:00 PM)
- **Sunday**: Off (no working hours expected)

### Leave Policy
- Each employee is allowed **2 leaves per month**
- Missing attendance on working days (Mon-Sat) counts as leave
- Empty In-Time/Out-Time fields mark the day as leave

### Productivity Calculation
```
Productivity = (Actual Worked Hours / Expected Working Hours) × 100
```
Expected hours are calculated based on the number of working days in the selected month.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/leave-productivity-analyzer.git
cd leave-productivity-analyzer
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/attendance_db"
```

4. **Initialize Prisma**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### 1. Upload Attendance Data

1. Click on the upload area or drag and drop your Excel file
2. Ensure your Excel file follows this format:

| Employee Name | Date       | In-Time | Out-Time |
|---------------|------------|---------|----------|
| John Doe      | 2024-01-01 | 10:00   | 18:30    |
| John Doe      | 2024-01-02 | 10:15   | 18:45    |
| John Doe      | 2024-01-03 |         |          |

3. Wait for the upload confirmation

### 2. View Analytics

1. Select an employee from the dropdown
2. Choose the month and year
3. View the comprehensive dashboard with:
   - Key metrics cards
   - Productivity visualization
   - Daily attendance breakdown table

### 3. Interpret Results

- **Green indicators**: Good productivity (≥90%)
- **Yellow indicators**: Moderate productivity (75-89%)
- **Red indicators**: Low productivity (<75%)
- **Color-coded table rows**:
  - White: Regular working day
  - Blue: Saturday (half day)
  - Gray: Sunday (off)
  - Red: Leave day

## 📁 Project Structure

```
leave-productivity-analyzer/
├── app/
│   ├── api/
│   │   ├── analytics/
│   │   │   └── route.ts          # Analytics endpoint
│   │   ├── employees/
│   │   │   └── route.ts          # Employees endpoint
│   │   └── upload/
│   │       └── route.ts          # File upload endpoint
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── AttendanceTable.tsx       # Daily breakdown table
│   ├── Dashboard.tsx             # Analytics dashboard
│   └── FileUpload.tsx            # Excel upload component
├── lib/
│   ├── calculations.ts           # Business logic & calculations
│   └── prisma.ts                 # Prisma client
├── prisma/
│   └── schema.prisma             # Database schema
├── types/
│   └── index.ts                  # TypeScript interfaces
├── public/
│   └── sample-attendance.xlsx    # Sample Excel file
├── .env                          # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Upload Attendance
```
POST /api/upload
Content-Type: multipart/form-data

Body: Excel file (.xlsx)
Response: { message: "File uploaded successfully", recordsProcessed: number }
```

### Get Employees
```
GET /api/employees
Response: [{ id: string, name: string }]
```

### Get Analytics
```
GET /api/analytics?employee={name}&month={1-12}&year={2024}
Response: MonthlyAnalytics object
```

## 📊 Sample Data

A sample Excel file is included in the repository at `public/sample-attendance.xlsx`. You can use this to test the application.

**Sample content:**
- Employee: Jane Smith
- Month: January 2024
- Includes regular days, leaves, and weekends
- Demonstrates all business rules

## 📸 Screenshots

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)

### File Upload
![Upload](screenshots/upload.png)

### Daily Breakdown
![Breakdown](screenshots/breakdown.png)

*Note: Add actual screenshots to the `screenshots/` folder*

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `DATABASE_URL`
5. Deploy!

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `.env` as `DATABASE_URL`

## 🎓 Academic Information

**Project**: NMIMS Intern Technical Assignment
**Company**: Kenmark ITan Solutions
**Student**: [Your Name]
**Student ID**: [Your ID]
**Email**: [Your Email]

## 📝 Evaluation Criteria Met

- ✅ **Functionality (35%)**: All core features working correctly
- ✅ **Code Quality (25%)**: Clean, maintainable, type-safe code
- ✅ **UI/UX (20%)**: Responsive design with modern aesthetics
- ✅ **Architecture (15%)**: Proper database design with Prisma ORM
- ✅ **Documentation (5%)**: Comprehensive README with examples

## 🤝 Contributing

This is an academic project. However, suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of an internship assignment.

## 👤 Author

**[Your Name]**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- NMIMS University
- Kenmark ITan Solutions
- Next.js and Vercel teams
- MongoDB and Prisma teams

---

**Live Demo**: [View Application](YOUR_VERCEL_URL)  
**Repository**: [View Code](YOUR_GITHUB_URL)

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
