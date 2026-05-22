import Image from "next/image"
import Link from "next/link"

export function Content() {
  return (
    <>
      <p>
        It is one of the most common questions Schengen travelers ask: &ldquo;How do I reset my 90 days?&rdquo;
        People picture a clock that flips back to zero, or a magic date after which they get a clean slate. The
        reality is less dramatic and, once you understand it, much easier to plan around.
      </p>
      <p>
        There is no reset button. Your Schengen days come back gradually, one at a time, on a fixed schedule that
        started the moment you used each one. This guide explains exactly how that works, how long you actually
        need to stay outside the Schengen Area, and how to plan a return trip without guessing.
      </p>

      <h2 id="no-reset-button">There Is No Reset Button</h2>
      <p>
        The 90/180 rule does not work on a calendar cycle. It does not reset on January 1, it does not reset on
        the anniversary of your first trip, and it does not reset after you leave for a set number of weeks. Anyone
        who tells you &ldquo;just leave for 90 days and you are fresh again&rdquo; is repeating a myth that has
        caused a lot of accidental overstays.
      </p>
      <p>
        Instead, the rule uses a rolling 180-day window. Every single day, that window recalculates. The only thing
        that ever gives you days back is time: each day you spent in the Schengen Area eventually ages out of the
        window on its own. Understanding that mechanism is the whole game.
      </p>

      <h2 id="how-the-window-works">How the 180-Day Window Actually Works</h2>
      <p>
        Pick any date. Call it your reference date, usually today or the date of a trip you are planning. The rule
        looks back exactly 180 days from that date and counts how many days you spent inside the Schengen Area
        during that stretch. If the total is 90 or fewer, you are compliant. If it is more, you have overstayed.
      </p>
      <p>
        Because the window is always 180 days long and always ends on your reference date, it slides forward by one
        day, every day. A day you spent in Schengen sits inside that window for a while, and then, once it is more
        than 180 days in the past, it falls out the back of the window and stops counting.
      </p>
      <p>
        Two details trip people up. First, both your entry and exit days count as full days, so a Monday-to-Friday
        trip uses five days, not four. Second, the window does not care about trips as units. It counts individual
        days. That is exactly why your allowance comes back the way it does.
      </p>

      <h2 id="when-days-roll-off">When Your Days Come Back</h2>
      <p>
        Here is the rule that replaces the idea of a reset: <strong>each day you spend in the Schengen Area becomes
        available again exactly 180 days after you used it.</strong>
      </p>
      <p>
        Spend a day in Spain on a given date, and that day counts against your 90 for the next 180 days. On day 181,
        it drops out of the window and you have it back. Nothing else needs to happen. You do not need to file
        anything, cross a particular border, or wait for a calendar month to turn over. The day simply ages out.
      </p>
      <p>
        This means your allowance does not return all at once. It trickles back, one day at a time, in the same
        order you spent it. The first day of your trip is the first day to return. Your most recent day is the last
        to return. If your trips were scattered across several months, your days will come back scattered across
        several months too.
      </p>

      <h2 id="a-worked-example">A Worked Example</h2>
      <p>
        Say you entered the Schengen Area on January 5, 2026 and left on April 4, 2026. That is a continuous stay
        of 90 days, so on the day you leave you have used your entire allowance and have zero days remaining.
      </p>
      <p>
        When does your allowance start coming back?
      </p>
      <ul>
        <li>
          <strong>Your first day, January 5, returns on July 4, 2026.</strong> That is 180 days later. From that
          date you have one day available again.
        </li>
        <li>
          <strong>From July 4 onward, you regain one day for every day that passes.</strong> July 6 gives back
          January 7, and so on, because each day is following the same 180-day schedule.
        </li>
        <li>
          <strong>Your last day, April 4, returns on October 1, 2026.</strong> On that date the window is finally
          empty and you have a complete, fresh 90 days available.
        </li>
      </ul>
      <p>
        Notice the pattern. The window is fully clear exactly 180 days after the <em>last</em> day you spent inside
        the Schengen Area. That is the single most useful number to remember.
      </p>

      <h2 id="how-long-to-stay-out">How Long Do You Need to Stay Out?</h2>
      <p>
        It depends on whether you want a partial allowance or a completely clean slate.
      </p>
      <p>
        <strong>For a full, fresh 90 days:</strong> count 180 days forward from the last day you were inside the
        Schengen Area. On that date, every previous day has aged out of the window and you start from zero again.
        This is the only way to be certain you have the entire allowance available.
      </p>
      <p>
        <strong>For a partial return:</strong> you do not have to wait for a full clear. Once your earliest days
        start aging out, you can re-enter and use whatever has become available. The catch is that you have to
        calculate it. If half your days have returned, you have roughly 45 days to work with, and any new days you
        spend immediately start their own 180-day countdown.
      </p>
      <p>
        This is also why the popular &ldquo;90 days in, 90 days out&rdquo; shorthand is misleading. Ninety days
        outside the Schengen Area is not enough to earn back a full allowance. After a continuous 90-day stay, you
        would need to wait the full 180 days from your last day in before the window is genuinely empty. Ninety
        days out leaves you with only a sliver of your allowance, not a fresh start.
      </p>

      <h2 id="where-to-spend-time-out">Where to Spend Your Time Outside Schengen</h2>
      <p>
        Time only counts toward a reset if you are genuinely outside the Schengen Area. A few places are easy to
        get wrong:
      </p>
      <ul>
        <li>
          <strong>Ireland and Cyprus are in the EU but not in Schengen.</strong> Days spent there do not count
          against your 90, so they are valid places to wait out your window.
        </li>
        <li>
          <strong>Bulgaria and Romania joined Schengen in 2024 and 2025.</strong> They now count toward your days,
          so they are no longer the workaround they once were.
        </li>
        <li>
          <strong>Norway, Switzerland, Iceland, and Liechtenstein are not in the EU but are in Schengen.</strong>
          {" "}Time there counts. Leaving the EU is not the same as leaving Schengen.
        </li>
        <li>
          <strong>Popular reset destinations</strong> include the United Kingdom, the Balkans outside Schengen,
          Turkey, Georgia, Morocco, and Ireland. Each has its own entry rules, so check your own passport before
          you commit.
        </li>
      </ul>
      <p>
        If you want a full breakdown of which countries count and which do not, our{" "}
        <Link href="/how-it-works" className="text-primary underline underline-offset-4 hover:opacity-80">
          how it works
        </Link>{" "}
        guide covers the full Schengen map.
      </p>

      <h2 id="common-mistakes">Common Mistakes When Planning a Reset</h2>
      <ul>
        <li>
          <strong>Assuming a short hop resets the clock.</strong> Leaving for a weekend and coming back does
          nothing. Only the passage of 180 days per day clears your allowance.
        </li>
        <li>
          <strong>Counting from your entry date instead of your exit date.</strong> The window is fully clear 180
          days after your <em>last</em> day inside, not 180 days after you first arrived.
        </li>
        <li>
          <strong>Forgetting that new days start their own countdown.</strong> The moment you re-enter, each new
          day begins its own 180-day cycle. A partial return uses up your recovered allowance quickly.
        </li>
        <li>
          <strong>Ignoring the Entry/Exit System.</strong> With the EU&apos;s{" "}
          <Link
            href="/blog/ees-entry-exit-system"
            className="text-primary underline underline-offset-4 hover:opacity-80"
          >
            digital border system
          </Link>{" "}
          now live, every entry and exit is recorded automatically. There is no longer any room for a miscalculated
          reset to slip through unnoticed.
        </li>
      </ul>

      <h2 id="plan-your-reset">Plan Your Reset Before You Book</h2>
      <p>
        Once you accept that there is no reset button, planning becomes straightforward. You are not waiting for an
        event. You are waiting for specific days to age out, and you can see those dates in advance.
      </p>
      <p>
        The simplest way to do this is to record your past stays in a{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          Schengen calculator
        </Link>
        , then move the reference date forward to the day you want to return. The calculator shows exactly how many
        days will have rolled off by then and how many you would have available.
      </p>
      <p>
        A visual timeline makes it even clearer. Instead of doing arithmetic, you can see each stay, watch where it
        sits in the 180-day window, and spot the exact date an old trip drops off and frees up your allowance.
      </p>

      <div className="my-8">
        <Image
          src="/blog/timeline-screenshot.webp"
          alt="Schengen Monitor timeline showing stays inside a rolling 180-day window and when days roll off"
          width={1200}
          height={400}
          className="rounded-xl border border-border"
        />
      </div>

      <p>
        Before you book a return flight, add the trip as a proposed trip and check it against your window. If you
        are close to the limit, this is also how you avoid the opposite problem. For a reminder of what is at stake
        when a reset goes wrong, see our guide on{" "}
        <Link
          href="/blog/schengen-overstay-consequences"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          what happens if you overstay
        </Link>
        .
      </p>
      <p>
        There is no shortcut and no reset button, but there is a clear schedule. Every day you used comes back 180
        days later, on a date you can look up today. Record your stays, find the date your window clears, and book
        your return with confidence instead of guesswork.
      </p>
    </>
  )
}
