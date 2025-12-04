# 🇪🇺 Schengen 90/180 Day Calculator

A web application for calculating and tracking stays in the Schengen Area under the 90/180-day short-stay rule.

## 📋 Overview

The Schengen Area allows visa-free travelers to stay for up to **90 days within any 180-day period**. This calculator helps travelers:

- ✅ Track their days spent in the Schengen Area
- ✅ Calculate remaining days available
- ✅ Detect overstays before they happen
- ✅ Plan future trips with confidence
- ✅ Visualize travel history on an interactive timeline

### Why This Tool Exists

The 90/180 rule is deceptively complex:
- It uses a **rolling/moving 180-day window**, not fixed calendar blocks
- Both entry and exit days count as full days of stay
- Manual calculation is error-prone and time-consuming

This calculator implements the official EU regulations to provide accurate, reliable results.

## ⚖️ Legal Foundation

This calculator is based on primary EU legal sources:

- **[Regulation (EU) 2016/399](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32016R0399)** (Schengen Borders Code)
  - Article 6(1): Definition of "short stay" as 90 days in any 180-day period
  - Article 6(1a): Calculation applies to entire Schengen area as a single territory

- **[Regulation (EU) No 610/2013](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32013R0610)** 
  - Clarification of the moving/rolling 180-day reference period

- **European Commission Short-stay Calculator Guidance**
  - Entry and exit days both count as full days

## ✨ Features

### Core Functionality
- **Accurate Day Counting**: Implements the official moving 180-day window algorithm
- **Overstay Detection**: Identifies violations and shows when they occurred
- **Trip Validation**: Check if proposed future trips are legal
- **Next Entry Calculator**: Find the earliest date you can return for a full stay

### User Experience
- **Interactive Timeline**: Visual representation of all stays and the 180-day window
- **Mobile Responsive**: Optimized layouts for desktop, tablet, and mobile
- **Real-time Calculations**: Instant feedback as you add or modify stays
- **Export Capability**: Download your travel history and calculations
- **No Registration Required**: Use immediately without creating an account

### Accuracy Features
- Handles overlapping stays (automatic deduplication)
- Correctly processes stays that extend before/after the 180-day window
- Works with unordered input data
- Accounts for multiple countries (Schengen treated as single area)

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/schengen-calculator.git
cd schengen-calculator

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📖 Usage

### Basic Usage

1. **Add Your Stays**
   - Click "Add Stay"
   - Enter entry and exit dates

2. **View Results**
   - See days used out of 90
   - Check days remaining
   - View your 180-day window
   - Identify any overstays

3. **Plan Future Trips**
   - Toggle "Show Proposed Trips"
   - Add proposed stays to check if they're legal
   - See when you can next travel

## 🧪 Algorithm Details

### The Moving 180-Day Window

For any given date, the calculator:
1. Looks back exactly 180 days (including the reference date)
2. Counts all days spent on "short stay" status within that window
3. Each calendar date counts only once (overlaps are deduplicated)
4. Compares total to the 90-day maximum

### Day Counting Rules

Per EU regulations:
- ✅ Entry day counts as a full day
- ✅ Exit day counts as a full day
- ✅ All calendar dates between entry and exit are counted
- ❌ Days outside the 180-day window are NOT counted

### Example Calculation

**Scenario**: Check status on December 4, 2025

```
180-day window: June 8, 2025 → December 4, 2025

Stays:
- June 1-15, 2025: 15 days total
  → Only June 8-15 in window = 8 days counted
  
- August 10-25, 2025: 16 days
  → Fully in window = 16 days counted
  
- November 1-20, 2025: 20 days
  → Fully in window = 20 days counted

Total: 8 + 16 + 20 = 44 days used
Remaining: 90 - 44 = 46 days
```

## 🧩 Project Structure

```
schengen-calculator/
├── app/
│   ├── page.tsx                 # Main calculator page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── Calculator.tsx           # Main calculator component
│   ├── StayForm.tsx            # Form for adding stays
│   ├── Timeline.tsx            # Visual timeline chart
│   └── Results.tsx             # Results display
├── lib/
│   ├── schengenCalculator.ts   # Core calculation logic
│   └── utils.ts                # Helper functions
├── public/
│   └── ...                     # Static assets
└── README.md
```

## 🧪 Testing

### Manual Test Cases

The calculator has been tested against multiple scenarios:

1. **Close to Limit**: 88/90 days used
2. **Overstay Detection**: Identifies violations accurately
3. **Unordered Input**: Processes stays regardless of input order
4. **Partial Windows**: Handles stays extending before/after 180-day period
5. **Overlapping Stays**: Deduplicates correctly

### Running Tests

```bash
# Add test command when implemented
npm test
```

## ⚠️ Legal Disclaimer

**IMPORTANT**: This calculator is provided for informational purposes only and does not constitute legal advice. 

- This tool implements EU regulations to the best of our understanding
- Border control authorities make final decisions on entry/stay
- Individual circumstances may affect your specific situation
- For official guidance, consult:
  - [European Commission Short-stay Calculator](https://home-affairs.ec.europa.eu/content/visa-calculator_en)
  - Immigration lawyers
  - Embassy/consulate of your destination country

**The author assumes no liability for decisions made based on this calculator's results.**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💼 Author

**[Romie Bajwa]**
- Product Manager
- LinkedIn: [your-linkedin-profile](https://linkedin.com/in/romie-bajwa)

## 🙏 Acknowledgments

- European Commission for clear documentation of the 90/180 rule
- The open-source community for excellent tools and libraries
- Travelers who provided feedback and test cases

---

**Made with ❤️ by an person who got tired of doing this manually**

**Last Updated**: December 2025
