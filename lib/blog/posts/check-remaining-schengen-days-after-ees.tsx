import Image from "next/image"
import Link from "next/link"

export function Content() {
  return (
    <>
      <div className="my-6 rounded-xl border border-border bg-muted/50 p-5">
        <p className="!mt-0 !mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Updated, 6 October 2026
        </p>
        <p className="!mb-0 text-sm">
          The EU runs a free checker at travel-europe.europa.eu/ees/check-how-long-you-can-stay. Enter your
          passport number and it tells you how many days you have left. As of today its number finally covers
          your whole rolling 180-day window, because every day in that window now falls inside the period when
          the Entry/Exit System was fully operational. The reasons to keep your own record are no longer about
          missing data. They are that the tool is a snapshot rather than a planner, and that it still leaves out
          specific cases, including a visit that began before 10 April 2026.
        </p>
      </div>

      <p>
        For twenty years the answer to &ldquo;how many Schengen days do I have left?&rdquo; was to flip through
        your passport, find the stamps, squint at the smudged ones, and do the arithmetic yourself. It was
        miserable, but at least the evidence was in your pocket.
      </p>
      <p>
        Then the{" "}
        <Link
          href="/blog/ees-entry-exit-system"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          Entry/Exit System
        </Link>{" "}
        went fully live on 10 April 2026 and the stamps stopped. Your travel history moved into a database you
        cannot open. A lot of travelers have quietly realised they no longer have any idea where they stand.
      </p>
      <p>
        Here is how to find out, what the official tools can and cannot tell you, and why you still need to keep
        your own count.
      </p>

      <h2 id="why-this-got-harder">Losing the Stamps Made Counting Harder, Not Easier</h2>
      <p>
        This is the part nobody expected. EES was supposed to make the 90/180 rule effortless, and at the border
        it does. The officer sees your exact position in the window before you reach the booth. Enforcement is
        now essentially perfect.
      </p>
      <p>
        The problem is that the accuracy runs in one direction. The border knows your number. You do not. Under
        the stamp system the data was scattered and hard to read, but it was yours and you could check it on a
        train. Now the authoritative record lives with the authorities, and you get to see it only when you go
        looking.
      </p>
      <p>
        Which matters, because the consequences of being wrong did not get gentler. If anything they got
        sharper, since{" "}
        <Link
          href="/blog/schengen-overstay-consequences"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          an overstay
        </Link>{" "}
        is now caught automatically rather than occasionally.
      </p>

      <h2 id="the-official-checker">The EU&apos;s Official Checker</h2>
      <p>
        The EU does provide a self-service tool, and most travelers have never heard of it. It lives on the
        official travel-europe.europa.eu site, under the EES section, on a page called &ldquo;check how long you
        can stay.&rdquo;
      </p>
      <p>You need three things, all of them on the front page of your passport:</p>
      <ul>
        <li>
          <strong>Your travel document type.</strong> Ordinary passport, for almost everyone reading this.
        </li>
        <li>
          <strong>Your document number.</strong> Exactly as printed, including any letters.
        </li>
        <li>
          <strong>The three-letter issuing country code.</strong> GBR for the UK, USA for the United States, CAN
          for Canada, AUS for Australia, NZL for New Zealand, ZAF for South Africa.
        </li>
      </ul>
      <p>
        It returns a simple verdict, an OK or a not OK, together with the number of days you have remaining. You
        can also enter the arrival and departure dates of a trip you are thinking about, and it will tell you
        whether that trip would push you past 90.
      </p>
      <p>
        There is no account, no registration, and no fee. If you land on a site charging you to check your EES
        days, close the tab. Several of them exist and they are all reselling a free government lookup.
      </p>

      <h2 id="the-blind-spot">The Gap That Just Closed</h2>
      <p>
        Until today this was the part worth understanding properly, because it was the difference between a
        number you could trust and a number that quietly understated your usage.
      </p>
      <p>
        EES did not switch on everywhere at once. Recording began on 12 October 2025 and rolled out gradually
        across borders and crossing points until the system reached full operation on 10 April 2026. Crossings
        before that are not reliably in the database. Some are missing entirely.
      </p>
      <p>
        Those days still counted. The 90/180 rule does not care whether a computer noticed. If a day sat inside
        your current 180-day window it counted against you, and a border officer working from a fuller picture
        could reach a different total than the website did.
      </p>
      <p>
        The arithmetic is what settles it, so here is the working. The window runs 180 days counted inclusively,
        both endpoints included. A window that begins on 10 April 2026 therefore ends on{" "}
        <strong>6 October 2026</strong>. Run it the other way and you get the same date from the other side: the
        last window able to reach back to 9 April 2026, the final day before full operation, ended on 5 October
        2026. That window has now rolled off.
      </p>
      <p>
        So as of today, your entire rolling window sits inside the fully operational period, and the official
        checker finally has everything it needs. This is not a coincidence, and it is why the EU flagged that
        its answers up to this point might be unreliable for some travelers, particularly holders of
        single-entry and double-entry visas whose visa use during the rollout may not have been recorded. Read
        that warning closely if it applies to you: the EU&apos;s own wording runs through 6 October inclusive,
        so if you hold one of those visas and used an entry during the rollout, give it another day before you
        treat the verdict as firm.
      </p>
      <p>
        One narrow gap outlives the rest. The checker does not count time from a visit that began before
        10 April 2026, even where that visit carried on past it. If you were mid-stay on the day EES became
        fully operational, those overlapping days are real, they count against you, and the tool leaves them out
        until the whole visit drops out of your window.
      </p>
      <p>
        A few other limits are worth knowing. The tool covers non-EU nationals making short stays. It does not
        apply to people covered by EU free movement rules, including certain family members of EU citizens and
        holders of particular residence documents. And it gives you a snapshot of today, not a history you can
        review or a plan you can build several trips on.
      </p>

      <h2 id="filling-the-gap">Filling In the Missing Months</h2>
      <p>
        Travel from before 10 April 2026 no longer falls inside anyone&apos;s current window, so reconstructing
        it is no longer part of working out where you stand. It is still worth the effort in one situation:
        you are rebuilding your history for some other reason, such as checking a record you think is wrong.
      </p>
      <p>
        The European Commission publishes a short-stay calculator for exactly this, where you enter each stay
        yourself and it applies the rolling window. It is accurate, but it does not remember anything. Close the
        tab and your entries are gone. Reconstruct the dates from boarding passes, card statements, photo
        timestamps, and calendar entries, and write them down somewhere that keeps them.
      </p>

      <h2 id="request-your-record">You Can Also Ask for Your Own EES Record</h2>
      <p>
        Beyond the quick checker, you have a legal right to see what the system holds on you. EES records are
        personal data, so the usual data protection rights apply: you can ask whether you are registered, ask
        what is recorded, and ask for anything inaccurate to be corrected or unlawfully held data to be erased.
      </p>
      <p>
        Requests go through national authorities rather than a single EU form, which is the frustrating part.
        In practice you approach the border authority or the data protection authority of a country you entered,
        with proof of identity and your passport details. Say clearly that you are exercising your right of
        access, and give the period or the specific crossing you care about. Authorities generally have around a
        month to respond, though the deadline varies by country.
      </p>
      <p>
        This is not something to do casually before a holiday. It is genuinely useful in one situation: your
        record is wrong. A missing exit is the classic case, where the system thinks you never left and your
        next arrival looks like a long overstay. If that happens, gather the evidence that you departed, a
        boarding pass, a hotel booking elsewhere, an onward entry stamp, and ask for the record to be rectified
        rather than arguing it at the desk on your next trip.
      </p>

      <h2 id="keep-your-own-record">Why You Still Need Your Own Count</h2>
      <p>
        Even now that the official checker covers your whole window, it answers exactly one question: where do
        I stand right now. That is useful, and it is not planning.
      </p>
      <p>
        Planning means asking different questions. If I fly out on the 14th, how many days will I have left? When
        does that trip from April finally roll off? Can I fit ten days in December, or do I need to move it into
        January? The EES tool checks one proposed trip at a time against a total it will not show you the
        workings for.
      </p>
      <p>
        A calculator you control answers all of it, because it holds your stays and lets you move the reference
        date to any day you like. Add a{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          proposed trip
        </Link>{" "}
        and you can see the effect before you book, not after.
      </p>
      <p>
        A timeline makes it more obvious still. Rather than reading a number, you see each stay sitting inside
        the rolling window and you can watch the exact date an old trip drops off and gives your days back.
      </p>

      <div className="my-8">
        <Image
          src="/blog/timeline-screenshot.webp"
          alt="Schengen Monitor timeline showing recorded stays inside a rolling 180-day window"
          width={1200}
          height={400}
          className="rounded-xl border border-border"
        />
      </div>

      <p>
        There is also the boring practical reason. Passports expire and get replaced, and the EES checker looks
        you up by document number. Your own record does not care what number is on the cover.
      </p>

      <h2 id="what-to-do">What to Actually Do</h2>
      <ul>
        <li>
          <strong>Check the official tool first.</strong> It is free, it takes a minute, and it is the closest
          thing to the number a border officer will see.
        </li>
        <li>
          <strong>Read it as today&apos;s position, not a plan.</strong> The number now covers your whole
          window, but it answers only where you stand right now, and it does not apply to people travelling
          under EU free movement rules.
        </li>
        <li>
          <strong>Reconstruct older trips only if you need to.</strong> Days before 10 April 2026 have rolled
          out of your window, so dig out the boarding passes, statements, and photos to check a record you think
          is wrong, not to work out your current total.
        </li>
        <li>
          <strong>Keep your own running record from here on.</strong> Log each entry and exit as it happens
          rather than reconstructing it in a panic later.
        </li>
        <li>
          <strong>Ask for your record if something looks wrong.</strong> A missing exit is worth fixing before
          your next trip, not during it.
        </li>
      </ul>
      <p>
        The stamps were a bad system, but they made you the keeper of your own history. Now the definitive copy
        sits somewhere you cannot reach, and the only way to walk up to a border knowing what the screen will say
        is to keep a copy of your own. Record your stays in the free{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          Schengen calculator
        </Link>
        , check them against the official tool, and if you are waiting on old days to come back, our guide on{" "}
        <Link
          href="/blog/how-to-reset-schengen-days"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          how the reset actually works
        </Link>{" "}
        shows you the date your window clears.
      </p>
    </>
  )
}
