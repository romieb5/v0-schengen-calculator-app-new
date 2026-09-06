import Image from "next/image"
import Link from "next/link"

export function Content() {
  return (
    <>
      <div className="my-6 rounded-xl border border-border bg-muted/50 p-5">
        <p className="!mt-0 !mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          The short version
        </p>
        <p className="!mb-0 text-sm">
          The EU runs a free checker at travel-europe.europa.eu/ees/check-how-long-you-can-stay. Enter your
          passport number and it tells you how many days you have left. The catch is that it only knows about
          crossings the Entry/Exit System actually recorded, and the system did not reach full coverage until
          10 April 2026. Until 6 October 2026, part of your rolling window sits in a blind spot the tool cannot
          see, so you still need your own record of what you did before then.
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

      <h2 id="the-blind-spot">The Gap the Official Tool Cannot See</h2>
      <p>
        This is the part worth understanding properly, because it is the difference between a number you can
        trust and a number that quietly understates your usage.
      </p>
      <p>
        EES did not switch on everywhere at once. Recording began on 12 October 2025 and rolled out gradually
        across borders and crossing points until the system reached full operation on 10 April 2026. Crossings
        before that are not reliably in the database. Some are missing entirely.
      </p>
      <p>
        Those days still count. The 90/180 rule does not care whether a computer noticed. If a day sits inside
        your current 180-day window, it counts against you, and a border officer working from a fuller picture
        may reach a different total than the website did.
      </p>
      <p>
        Here is what that means in practice, today. A 180-day window ending on 6 September 2026 reaches back to
        11 March 2026. That is a month before EES was fully operational. So right now, the first month of your
        window is exactly the stretch the tool is least sure about.
      </p>
      <p>
        The arithmetic gives you a date to look forward to. A window that begins on or after 10 April 2026 ends
        on or after <strong>6 October 2026</strong>. From that day onward, your entire rolling window sits inside
        the fully operational period, and the official checker finally has everything it needs. This is not a
        coincidence, and it is why the EU has flagged that answers before that date may be unreliable for some
        travelers, particularly holders of single-entry and double-entry visas whose visa use during the rollout
        may not have been recorded.
      </p>
      <p>
        A few other limits are worth knowing. The tool covers non-EU nationals making short stays. It does not
        apply to people covered by EU free movement rules, including certain family members of EU citizens and
        holders of particular residence documents. And it gives you a snapshot of today, not a history you can
        review or a plan you can build several trips on.
      </p>

      <h2 id="filling-the-gap">Filling In the Missing Months</h2>
      <p>
        For any travel before 10 April 2026 that still falls inside your window, you are back to counting by
        hand. The European Commission publishes a short-stay calculator for exactly this, where you enter each
        stay yourself and it applies the rolling window. It has been around for years and it is accurate, but it
        does not remember anything. Close the tab and your entries are gone.
      </p>
      <p>
        So the honest current answer is that you combine two sources: whatever the EES checker knows, plus your
        own record of the earlier days it does not. Add them together and you have your real position.
      </p>
      <p>
        If you no longer have the stamps to work from, reconstruct the dates from boarding passes, card
        statements, photo timestamps, and calendar entries. It is tedious, and it is worth doing once, properly,
        rather than guessing at a border.
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
        Even after 6 October 2026, when the official checker covers your whole window, it answers exactly one
        question: where do I stand right now. That is useful, and it is not planning.
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
          <strong>Treat it as a floor, not a total, until 6 October 2026.</strong> Anything before 10 April 2026
          may be missing from it, and those days still count.
        </li>
        <li>
          <strong>Reconstruct your pre-EES trips once.</strong> Boarding passes, statements, photos. Write the
          dates down somewhere permanent.
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
