import Image from "next/image"
import Link from "next/link"

export function Content() {
  return (
    <>
      <p>
        If you&apos;re a digital nomad working from European cafés and coworking spaces, you&apos;ve almost certainly
        encountered the Schengen 90/180-day rule. On the surface it seems straightforward: you can spend 90 days in the
        Schengen Area within any 180-day rolling window. But the &ldquo;rolling&rdquo; part trips up even seasoned
        travelers, and the consequences of getting it wrong are serious.
      </p>

      <h2 id="the-90-180-rule">The 90/180 Rule: Not as Simple as It Sounds</h2>
      <p>
        Unlike a fixed calendar period, the 180-day window moves with you. Every single day, a new window is calculated
        backwards from that date. Days you spent in the Schengen Area during that window count toward your 90-day
        limit, and they only &ldquo;roll off&rdquo; once they fall outside the current window.
      </p>
      <p>
        Here&apos;s where it gets tricky: both your entry and exit dates count as full days. A quick weekend trip from
        Friday to Sunday uses 3 days, not 2. And if you&apos;re hopping between Schengen countries, like flying from
        Lisbon to Berlin, those days all count toward the same 90-day pool. There&apos;s no separate allowance per country.
      </p>
      <p>
        For digital nomads who spend months at a time in Europe, moving between cities and countries, this rolling
        calculation becomes genuinely difficult to track manually.
      </p>

      <h2 id="why-spreadsheets-fail">Why Spreadsheets Fail</h2>
      <p>
        Many nomads try to track their days in a spreadsheet. You add your entry dates, exit dates, manually sum the
        days, and hope your formulas are right. But spreadsheets can&apos;t easily model a rolling window. They
        don&apos;t warn you when you&apos;re approaching your limit. And one miscounted day can mean the difference
        between compliance and a visa violation.
      </p>
      <p>
        The stakes are real. Overstaying can result in fines, deportation, or even multi-year entry bans. When
        you&apos;re bouncing between Lisbon, Berlin, and Barcelona, the last thing you want is manual date arithmetic
        standing between you and legal compliance.
      </p>
      <p>
        Even worse, spreadsheets give you a snapshot of <em>today</em>. They don&apos;t answer the question every
        nomad actually needs answered: &ldquo;If I book this trip next month, will I still be compliant?&rdquo;
      </p>

      <h2 id="see-your-days-visually">See Your Schengen Days, Visually</h2>
      <p>
        This is exactly why we built the{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          timeline visualization
        </Link>{" "}
        in Schengen Monitor. Instead of staring at rows and columns, you see your stays laid out on a visual
        timeline, color-coded with clear indicators showing how many days you&apos;ve used and how many remain.
      </p>

      <div className="my-8">
        <Image
          src="/blog/timeline-screenshot.webp"
          alt="Schengen Monitor timeline visualization showing stays across a 180-day rolling window with 86 days used and 4 days left"
          width={1200}
          height={400}
          className="rounded-xl border border-border"
        />
      </div>

      <p>
        You can add proposed future trips and immediately see whether they&apos;ll keep you compliant. The calculator
        does all the rolling-window math in real time, so you always know exactly where you stand. No formulas, no
        guesswork.
      </p>
      <p>
        The core calculator is completely free and works without an account. Your data stays in your browser. If you
        create an account, your stays sync across devices, which is handy when you&apos;re checking on your phone in
        an airport and planning on your laptop later that evening.
      </p>

      <h2 id="planning-your-exit">Planning Your Exit Strategy</h2>
      <p>
        Every digital nomad in Europe eventually faces the question: &ldquo;When do I <em>have</em> to leave?&rdquo;
        With the timeline visualization, the answer is immediately clear. You can see the exact date your days run out,
        plan your departure accordingly, and experiment with different return dates to see how they affect your balance.
      </p>
      <p>
        This kind of forward planning is invaluable. Instead of a stressful last-minute scramble, you can book flights
        weeks in advance, often at much better prices. You can also coordinate with other nomads, book coworking spaces,
        and line up accommodation without the anxiety of &ldquo;am I even allowed to be here?&rdquo;
      </p>
      <p>
        The proposed trips feature is especially powerful here. Add a hypothetical return trip and the calculator
        instantly shows you whether it works within your remaining balance. Adjust the dates until you find the sweet
        spot.
      </p>

      <h2 id="where-to-reset">Where to Go When You Need to Reset</h2>
      <p>
        When your Schengen days run low, you don&apos;t have to go far. Some of the best &ldquo;reset&rdquo;
        destinations for digital nomads are right next door, outside the Schengen Area but with great infrastructure
        for remote work:
      </p>
      <ul>
        <li>
          <strong>United Kingdom</strong>: London&apos;s tech scene and countless coworking spaces make it a natural
          choice. Edinburgh and Manchester are more affordable alternatives with strong nomad communities.
        </li>
        <li>
          <strong>Albania</strong>: Tirana has become a digital nomad favorite. Affordable cost of living, beautiful
          coastline in the south, and a growing number of coworking spaces. Plus, most nationalities can stay up to a
          year visa-free.
        </li>
        <li>
          <strong>Montenegro</strong>: Stunning Adriatic coast with a low cost of living. Budva and Kotor offer
          reliable internet and a relaxed pace of life.
        </li>
        <li>
          <strong>Turkey</strong>: Istanbul straddles two continents and delivers world-class food, culture, and
          coworking infrastructure. Antalya is another popular nomad base.
        </li>
        <li>
          <strong>Georgia</strong>: Tbilisi has emerged as one of the world&apos;s top digital nomad hubs, thanks to
          its one-year remote worker visa, low cost of living, and vibrant expat community.
        </li>
      </ul>
      <p>
        The key is knowing exactly how many days you need to spend outside the Schengen Area before your days start
        replenishing. That&apos;s where the{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          timeline
        </Link>{" "}
        makes all the difference. You can see precisely when each day &ldquo;rolls off&rdquo; and plan your return
        accordingly.
      </p>

      <h2 id="getting-started">Getting Started</h2>
      <p>
        If you&apos;re a digital nomad spending time in Europe, or even just planning to, start by adding your past
        Schengen stays to the{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          calculator
        </Link>
        . It takes a few minutes and immediately gives you a clear picture of where you stand. From there, use the
        proposed trips feature to plan ahead with confidence.
      </p>
      <p>
        No more spreadsheets. No more guesswork. Just a clear, visual answer to the question that matters most:
        &ldquo;How many days do I have left?&rdquo;
      </p>
    </>
  )
}
