import Image from "next/image"
import Link from "next/link"

export function Content() {
  return (
    <>
      <p>
        Nobody plans to overstay their Schengen visa. It usually happens gradually: you extend a trip by a few days,
        lose track of a weekend border hop, or simply miscalculate how the rolling window works. But the consequences
        can follow you for years, and in some cases, they can end your ability to travel freely in Europe altogether.
      </p>
      <p>
        It&apos;s also no longer a gamble on whether anyone notices. Since the EU&apos;s Entry/Exit System (EES)
        went fully live in April 2026, every non-EU traveler&apos;s entries and exits are logged digitally, and the
        system has already flagged thousands of overstayers.
      </p>
      <p>
        Here&apos;s what actually happens if you overstay, what the penalties look like in practice, and most
        importantly, how to make sure it never happens to you.
      </p>

      <h2 id="what-counts-as-overstaying">What Counts as Overstaying?</h2>
      <p>
        You&apos;re considered to have overstayed if you spend more than 90 days within any 180-day rolling window
        inside the Schengen Area. The key word is &ldquo;rolling.&rdquo; This isn&apos;t a fixed six-month period that
        resets on a calendar date. Every single day, the window recalculates by looking back 180 days from that moment.
      </p>
      <p>
        This means you can&apos;t simply leave for a week and &ldquo;reset the clock.&rdquo; Your previous days in
        the Schengen Area only stop counting once they fall outside the current 180-day window. It&apos;s this rolling
        nature that catches most people off guard.
      </p>
      <p>
        And remember: both your entry and exit dates count as full days. A trip from Monday to Friday is five days
        used, not four.
      </p>

      <h2 id="the-real-consequences">The Real Consequences</h2>
      <p>
        The penalties for overstaying vary by country, but they&apos;re universally unpleasant. Here&apos;s what
        you could be facing:
      </p>

      <h3>Fines</h3>
      <p>
        Most Schengen countries will issue a fine when they detect an overstay, typically at the airport when
        you&apos;re trying to leave. These fines range from a few hundred to several thousand euros depending on the
        country and how long you overstayed. Germany, for example, can fine up to &euro;5,000. Spain and Italy have
        similar ranges.
      </p>

      <h3>Entry Bans</h3>
      <p>
        This is the one that really hurts. An overstay can result in an entry ban to the entire Schengen Area,
        not just the country where you were caught. Bans typically range from one to five years, though serious or
        repeated violations can result in longer bans. During this time, you won&apos;t be able to enter any of
        the 29 Schengen countries.
      </p>

      <h3>Deportation</h3>
      <p>
        If your overstay is discovered while you&apos;re still in the country, you can be detained and deported.
        This goes on your record and makes future visa applications to any country significantly harder. Some
        countries will also require you to pay for the cost of your own deportation.
      </p>

      <h3>Future Visa Problems</h3>
      <p>
        Even if you avoid fines and bans, an overstay on your record makes future visa applications much more
        difficult. Consulates share information through the Visa Information System (VIS), so an overstay in
        Portugal will show up when you apply for a visa to France. Many travelers have had subsequent applications
        rejected entirely because of a past overstay.
      </p>
      <p>
        If you travel visa-free, the EES record does the same job. It&apos;s shared across all 29 Schengen
        countries, so the next border officer you meet, anywhere in the zone, sees the overstay on screen. EES keeps
        your records for three years after your last exit, and if no exit is ever recorded, for five years from the
        end of your authorized stay.
      </p>

      <h2 id="how-overstays-get-detected">How Overstays Get Detected</h2>
      <p>
        Some travelers assume overstays go unnoticed. That used to be partly true, when it came down to a tired
        border officer counting smudged passport stamps. It isn&apos;t anymore. Here&apos;s how they catch you:
      </p>
      <ul>
        <li>
          <strong>Entry/Exit System (EES)</strong>: Since 10 April 2026, EES has replaced passport stamps at every
          Schengen external border. Your fingerprints, face scan, and every entry and exit date are stored
          digitally, and the system calculates your remaining days automatically. There&apos;s no stamp to argue
          about and no counting error to hope for.
        </li>
        <li>
          <strong>Exit passport control</strong>: When you leave, the officer (or kiosk) closes your stay in EES.
          If you&apos;re past 90 days, the overstay is recorded at that moment, even if nobody says a word to you
          at the desk.
        </li>
        <li>
          <strong>Your next entry</strong>: This is where many travelers now get caught. EES shows the officer your
          full history, so an overstay from a previous trip can get you refused entry on the next one.
        </li>
        <li>
          <strong>Random checks</strong>: Police in some countries can ask to see your passport and check your
          legal status. This is more common in certain countries than others, but it does happen.
        </li>
        <li>
          <strong>Future visa applications</strong>: Even if nobody catches it at the border, an overstay will
          surface when you apply for your next Schengen visa. Consulates can see your travel history.
        </li>
      </ul>

      <h2 id="what-ees-has-caught-so-far">What EES Has Caught So Far</h2>
      <p>
        The numbers show the system is working exactly as designed. In a February 2026 briefing to the European
        Parliament, the European Commission said EES had flagged more than 4,000 overstayers in its first four
        months, while it was still being phased in.
      </p>
      <p>
        By the Commission&apos;s 2026 State of Schengen report, published in May and covering the rollout from
        October 2025 to 20 April 2026, those figures had grown to:
      </p>
      <ul>
        <li>
          <strong>Over 60 million</strong> entries and exits recorded
        </li>
        <li>
          <strong>Over 30,000</strong> refusals of entry for failing to meet entry conditions
        </li>
        <li>
          <strong>Almost 7,000</strong> travelers denied entry because they had overstayed on a previous visit
        </li>
      </ul>
      <p>
        That last figure is the one to pay attention to. Those weren&apos;t people caught on the way out. They were
        people who had overstayed, left, and then flown back expecting to be waved through, only to be turned away
        at the border. And those numbers cover a period when EES was only partly rolled out. Now that it runs at
        every external border, detection is close to certain.
      </p>

      <h2 id="common-mistakes">Common Mistakes That Lead to Overstays</h2>
      <p>
        Most overstays aren&apos;t intentional. They come from genuine confusion about how the rules work:
      </p>
      <ul>
        <li>
          <strong>Thinking it resets after 90 days out</strong>: The 180-day window is continuous. Leaving for a
          short period doesn&apos;t give you a fresh 90 days.
        </li>
        <li>
          <strong>Not counting entry and exit days</strong>: Both count. A &ldquo;day trip&rdquo; across a border
          still uses a day from your allowance.
        </li>
        <li>
          <strong>Losing track across multiple trips</strong>: Three separate two-week trips feel short, but
          that&apos;s already 42 days gone. Add a longer stay and you&apos;re suddenly cutting it close.
        </li>
        <li>
          <strong>Confusing Schengen with EU</strong>: Not all EU countries are in Schengen, and not all Schengen
          countries are in the EU. Time in the UK, Ireland, or Cyprus doesn&apos;t count toward your Schengen days,
          but time in non-EU Schengen members like Norway and Switzerland does.
        </li>
        <li>
          <strong>Relying on mental math</strong>: The rolling window calculation is surprisingly complex. What
          feels like &ldquo;plenty of days left&rdquo; in your head might not hold up when you actually run the
          numbers.
        </li>
      </ul>

      <h2 id="how-to-stay-compliant">How to Make Sure You Never Overstay</h2>
      <p>
        The good news is that overstaying is completely avoidable if you track your days properly. Here&apos;s how:
      </p>
      <p>
        <strong>Record every stay.</strong> Every trip into the Schengen Area needs to be logged, no matter how short.
        A weekend in Paris or a layover in Amsterdam where you pass through passport control all count. Get in the
        habit of recording your entry and exit dates as soon as each trip happens.
      </p>
      <p>
        <strong>Use a proper calculator.</strong> The rolling window math is not something you should be doing in your
        head or in a spreadsheet. A purpose-built{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          Schengen calculator
        </Link>{" "}
        will handle the calculation correctly every time and show you exactly how many days you have remaining.
      </p>
      <p>
        <strong>Check before you book.</strong> Before committing to any trip, add it as a proposed trip in the
        calculator to verify it won&apos;t push you over. This takes seconds and can save you from a very expensive
        mistake.
      </p>
      <p>
        <strong>Visualize your timeline.</strong> Numbers in a table are easy to gloss over. A{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          visual timeline
        </Link>{" "}
        of your stays makes your situation immediately clear. You can see at a glance how your days are distributed,
        when old days will roll off, and exactly when you need to leave if you&apos;re running low.
      </p>

      <div className="my-8">
        <Image
          src="/blog/timeline-screenshot.webp"
          alt="Schengen Monitor timeline visualization showing stays across a 180-day rolling window"
          width={1200}
          height={400}
          className="rounded-xl border border-border"
        />
      </div>

      <p>
        <strong>Plan your exits early.</strong> If you know you&apos;ll need to leave the Schengen Area, don&apos;t
        wait until the last minute. Book your departure at least a couple of weeks before your days run out. This
        gives you a buffer for unexpected delays and usually means cheaper flights too.
      </p>

      <h2 id="what-to-do-if-youve-overstayed">What to Do If You&apos;ve Already Overstayed</h2>
      <p>
        If you realize you&apos;ve overstayed, don&apos;t panic, but do act quickly. Leaving voluntarily is always
        better than being discovered. The longer you stay past your limit, the worse the consequences.
      </p>
      <p>
        Be honest at passport control. EES will record the overstay when you exit either way, so there&apos;s
        nothing to gain from hoping it goes unnoticed. Trying to avoid exit checks or using alternative routes to
        dodge detection will only make things worse, since a stay with no recorded exit stays on file even longer. Some border officers are more lenient with travelers who
        are upfront about a short, accidental overstay.
      </p>
      <p>
        If you believe you have grounds for an extension (serious illness, force majeure, humanitarian reasons),
        contact the immigration authority in the country you&apos;re in before your days run out, not after.
        Extensions are rarely granted, but applying proactively looks far better than being caught after the fact.
      </p>

      <h2 id="stay-on-the-right-side">Stay on the Right Side</h2>
      <p>
        The Schengen 90/180 rule exists to regulate short-term visits, not to trap well-meaning travelers. But
        its rolling-window design makes it genuinely easy to miscalculate, especially if you travel frequently
        or stay for extended periods.
      </p>
      <p>
        The simplest way to protect yourself is to track every stay, check every trip before you book, and keep a
        visual eye on your timeline. A few minutes of tracking can save you from fines, bans, and the stress of
        wondering whether you&apos;re still legal.
      </p>
      <p>
        Start by adding your past stays to the{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          calculator
        </Link>
        . It only takes a few minutes, and you&apos;ll know exactly where you stand.
      </p>
    </>
  )
}
