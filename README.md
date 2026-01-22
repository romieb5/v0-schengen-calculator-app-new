Schengen Monitor 🇪🇺

A simple, accurate Schengen 90/180-day calculator for real travel planning

Schengen Monitor is a lightweight web app that helps non-EU travellers understand and stay compliant with the Schengen 90/180-day rule — without spreadsheets, guesswork, or confusing legal language.

This project was built to solve a real problem I personally faced while planning extended travel and relocations across Europe. It focuses on clarity, correctness, and usability, rather than feature bloat.

✨ What it does

- Calculates remaining Schengen days based on past and future trips
- Correctly applies the rolling 180-day look-back window
- Helps users answer practical questions like:
- “Can I enter the EU on this date?”
- “When do I need to leave to stay compliant?”
- “How many days do I have left?”
- Works without accounts, sign-ups, or data storage

🧠 Why this exists

Most Schengen calculators:
- are inaccurate at edge cases
- don’t explain why a date is invalid
- or require unnecessary personal data

Schengen Monitor was designed with a product mindset:

- start from real user questions
- prioritise trust and transparency
- handle tricky edge cases explicitly
- keep the UX simple enough for anxious travellers

🛠️ Tech stack

- Next.js (App Router)
- TypeScript
- Vercel (hosting & analytics)
- Date-fns for deterministic date handling

Fully client-side logic (no backend dependency)

🧩 Key implementation details

- Deterministic rolling-window calculations (no server time ambiguity)
- Explicit handling of inclusive/exclusive date boundaries
- Defensive logic for overlapping and back-to-back trips
- Clear separation between calculation logic and UI components

The core date logic is intentionally readable and testable — correctness matters more than cleverness here.

🚀 Live version

You can try the live version here:
👉 https://schengenmonitor.com

📈 What I’d build next (if this were a larger product)

- Scenario simulation (“What if I delay this trip by 3 days?”)
- Exportable compliance summaries (PDF / shareable link)
- Automated test coverage for edge-case date scenarios

👋 About me

I’m a product-focused builder with experience across consumer-facing products, regulated environments, and data-driven decision making. I enjoy working close to users, validating assumptions quickly, and building tools that are genuinely useful.

This project reflects how I approach product work:

- start with a real user problem
- keep the solution simple and explainable

📄 License

MIT — use freely, fork responsibly.
