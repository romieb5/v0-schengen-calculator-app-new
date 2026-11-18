import Image from "next/image"
import Link from "next/link"

const linkClass = "text-primary underline underline-offset-4 hover:opacity-80"

export function Content() {
  return (
    <>
      <p>
        In October, at the end of a five-day trip to France, the British novelist Jojo Moyes was stopped at
        Marseille airport and told by border officers that she was an overstayer. She had spent 23 days in the Schengen Area in the previous six months.
        The problem was a trip to Portugal back in May: the Entry/Exit System had logged her arrival but never
        logged her departure. As far as the database was concerned, she had been in Europe ever since.
      </p>
      <p>
        She was warned not to come back until the record was fixed, or risk a two-year ban and a fine of up to
        €10,000. Two weeks of emails to border officials later, she had made little progress and hired an
        immigration lawyer.
      </p>
      <p>
        Hers is not the only case. The UK consumer group Which? says it has heard from dozens of travelers with
        the same problem, and in September a British holidaymaker was refused entry to Italy and sent home the
        same day after her record showed an overstay, despite earlier trips totalling 22 days.
      </p>

      <div className="my-6 rounded-xl border border-border bg-muted/50 p-5">
        <p className="!mt-0 !mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          How common is this?
        </p>
        <p className="!mb-0 text-sm">
          Not very. EES records millions of crossings, and the vast majority close exactly as they should. Nobody
          has published an error rate, and the reported cases number in the dozens, not the thousands. But when it
          does happen, the traveler is usually the last to know, and fixing it takes weeks. A two-minute check
          after each trip is cheap insurance, and if you ever need a correction, the steps below are all it takes.
        </p>
      </div>

      <p>
        This guide covers why it happens, how to check your own record in a couple of minutes, and exactly how to
        get it corrected if something is wrong.
      </p>

      <h2 id="how-it-happens">How a Missing Exit Becomes an Overstay</h2>
      <p>
        The{" "}
        <Link href="/blog/ees-entry-exit-system" className={linkClass}>
          Entry/Exit System
        </Link>{" "}
        works in pairs. Every time a non-EU traveler enters the Schengen Area, an entry is recorded against their
        passport, fingerprints, and face. When they leave, an exit is recorded and the stay is closed. The system
        then counts the days between the two against the{" "}
        <Link href="/blog/how-to-reset-schengen-days" className={linkClass}>
          rolling 90/180 window
        </Link>
        .
      </p>
      <p>
        If the exit never arrives, the stay never closes. The system does not guess that you probably went home.
        It assumes you are still inside, and adds a day to your total every day you are away. A two-week holiday
        in May becomes, by the autumn, a stay of several months. Once that total passes 90, you are automatically
        flagged as an overstayer.
      </p>
      <p>
        The catch is that nobody tells you. There is no email and no letter. Most people find out the way
        Moyes did, at a passport desk, on the next trip.
      </p>

      <h3>Why exits go missing</h3>
      <p>Reported cases point to a handful of causes:</p>
      <ul>
        <li>
          <strong>Checks suspended to clear queues.</strong> Some crossings have switched EES off at busy moments
          to keep lines moving. If yours was one of them, your exit may simply not have been captured.
        </li>
        <li>
          <strong>Outbound controls outside the Schengen Area.</strong> On the Channel Tunnel, French checks
          happen at Folkestone in England, and Eurostar and Dover have been running only partial checks. Which?
          has reported a Channel Tunnel departure that was never logged.
        </li>
        <li>
          <strong>System failures.</strong> When EES is down, the rules allow officers to store data locally or by
          hand and stamp your passport instead, with the record uploaded later. If that upload goes wrong, the exit
          can be lost.
        </li>
        <li>
          <strong>Entering and leaving on different passports.</strong> Dual citizens who enter on one document
          and leave on another create an entry with no matching exit. Our{" "}
          <Link href="/blog/dual-citizens-schengen-which-passport" className={linkClass}>
            guide for dual citizens
          </Link>{" "}
          covers this one in detail.
        </li>
        <li>
          <strong>People who should not be in EES at all.</strong> Holders of residence permits and long-stay
          visas are exempt, but some have been registered anyway and then built up a false count.
        </li>
      </ul>

      <h2 id="check-your-record">How to Check Whether It Has Happened to You</h2>
      <p>
        The EU&apos;s free{" "}
        <Link href="/blog/check-remaining-schengen-days-after-ees" className={linkClass}>
          &ldquo;check how long you can stay&rdquo; tool
        </Link>{" "}
        on travel-europe.europa.eu is the closest thing you have to the screen a border officer sees. Enter your
        passport type, number, and three-letter issuing country code, and it returns your remaining days.
      </p>
      <p>
        On its own, one result can be hard to read. A missing exit shows up best as a number that moves when it
        should not. Here is the test:
      </p>
      <ol>
        <li>
          <strong>Run the checker a few days after you get home</strong> and note the number of days remaining.
        </li>
        <li>
          <strong>Run it again a week or two later.</strong> If you were outside the Schengen Area the whole time,
          your remaining days should be the same or higher, because old days roll off the back of the window and
          no new ones are being added.
        </li>
        <li>
          <strong>If the number has gone down</strong>, the system thinks you are still inside. Your exit is
          missing.
        </li>
      </ol>
      <p>
        Two other results are red flags. A remaining total far lower than your own count suggests a stay that
        never closed, and a notice saying your stay cannot be calculated because of incomplete data means the
        system knows something is wrong with your file.
      </p>
      <p>
        To compare, you need your own count. If you have been{" "}
        <Link href="/" className={linkClass}>
          recording your stays
        </Link>{" "}
        as you go, set the reference date to today and you can see in seconds whether the official figure matches
        yours.
      </p>

      <h2 id="evidence">Gather Your Proof of Exit</h2>
      <p>
        A correction is only as strong as the evidence behind it. What you are proving is a date: the day you left
        the Schengen Area. Useful documents include:
      </p>
      <ul>
        <li>Boarding passes, or the airline&apos;s booking confirmation and check-in email</li>
        <li>Train, coach, ferry, or Eurotunnel tickets</li>
        <li>Any passport stamp from the exit, or an entry stamp from the country you went to next</li>
        <li>Your home country&apos;s own arrival record, if it keeps one</li>
        <li>Hotel bookings and card statements from where you were afterwards</li>
      </ul>
      <p>
        Collect these for every recent trip, not just the one you suspect. And from now on, keep them for a long
        time. EES holds entry and exit records for three years, and a record of an overstay for five, so a lost
        exit from this summer can still follow you in 2031.
      </p>

      <h2 id="request-correction">How to Request a Correction</h2>
      <p>
        EES data counts as personal data, and the regulation that set up the system gives you the right to have
        inaccurate or incomplete records corrected. It also says that if someone is on the overstayer list
        because of an error, they must be taken off it without delay. In practice, that means writing to the
        right national authority with your evidence.
      </p>

      <h3>Who to write to</h3>
      <p>
        You can send your request to the authorities of any Schengen country, and they either fix the record
        themselves or pass it to the country responsible. Your request will move fastest if it goes to one of
        these:
      </p>
      <ul>
        <li>
          <strong>The country where the exit went missing.</strong> In Moyes&apos;s case, that was Portugal.
        </li>
        <li>
          <strong>The country you last entered or left through</strong>, or the one you plan to visit next.
        </li>
      </ul>
      <p>
        The EU keeps a list of national data protection contacts for EES on its travel-europe.europa.eu site, under
        &ldquo;contact details for data protection matters.&rdquo; For France, requests go to the Direction
        générale des étrangers en France at the Ministry of the Interior, by email at
        donnees-personnelles-dgef@interieur.gouv.fr.
      </p>

      <h3>What to include</h3>
      <ul>
        <li>A clear statement that you are requesting rectification of your EES record</li>
        <li>A scan of your passport photo page</li>
        <li>The crossing in question: the date, the place, and what the record should show</li>
        <li>Your proof of exit for that date</li>
        <li>If you hold one, a scan of your residence permit or long-stay visa</li>
      </ul>
      <p>A short request is fine. Something like this covers it:</p>

      <div className="my-6 rounded-xl border border-border bg-muted/50 p-5 text-sm">
        <p className="!mt-0">
          Subject: Request for rectification of Entry/Exit System (EES) record
        </p>
        <p>
          I am writing to request rectification of my EES record under Article 52 of Regulation (EU) 2017/2226.
        </p>
        <p>
          My details: [full name], [nationality], passport number [number], issued by [country code].
        </p>
        <p>
          On [date] I left the Schengen Area from [airport, port, or crossing], but my exit appears not to have been
          recorded. As a result, my record shows me as still present in the Schengen Area and I have been flagged as
          an overstayer.
        </p>
        <p>
          Please add the missing exit record dated [date] and remove any overstay flag resulting from the error. I
          attach a copy of my passport and [boarding pass, ticket, or other proof of departure].
        </p>
        <p className="!mb-0">Kind regards, [name]</p>
      </div>

      <h3>How long it takes</h3>
      <p>
        The regulation gives authorities 45 days to respond. If your request lands with a country that is not
        responsible for the record, it has seven days to contact the country that is, which then has 30 days to
        check the data. The Dutch border authority has warned that, because of the volume of requests, it may use
        the full 45 days, and that some EES functions are not yet fully available, so a correction may not happen
        right away.
      </p>
      <p>
        If you have a trip coming up, send your request now rather than the week before you fly.
      </p>

      <h3>If you get no answer, or a refusal</h3>
      <p>
        If the deadline passes with no reply, or your request is turned down, you can complain to the data
        protection authority of the country that handled it. In France that is the CNIL. You also have the right
        to take the matter to that country&apos;s courts. This is also the point where some travelers, Moyes
        among them, bring in an immigration lawyer.
      </p>

      <h2 id="at-the-border">If You Are Stopped at the Border</h2>
      <p>
        If you are flagged before your record is fixed, the conversation goes much better with paper in your hand.
      </p>
      <ul>
        <li>
          <strong>Carry your proof of exit on every trip</strong> until the correction is confirmed, printed or
          saved offline on your phone.
        </li>
        <li>
          <strong>Explain the missing exit, not just the total.</strong> &ldquo;I left from Lisbon on 18 May, and
          here is my boarding pass&rdquo; is far easier for an officer to act on than &ldquo;I have not been here
          that long.&rdquo;
        </li>
        <li>
          <strong>Ask the officer to correct the record or log a correction request.</strong> The UK
          government&apos;s own travel advice tells travelers who think their time has been recorded wrongly to
          raise it with border officials.
        </li>
        <li>
          <strong>Carry proof of any exemption.</strong> If you hold a residence permit or long-stay visa, show it
          at a staffed desk rather than using an automated gate.
        </li>
      </ul>
      <p>
        Be aware that a correction request does not give you any extra days. If your real total is close to 90, the
        rules still apply, and the{" "}
        <Link href="/blog/schengen-overstay-consequences" className={linkClass}>
          penalties for a genuine overstay
        </Link>{" "}
        are no lighter for being caught by a computer.
      </p>

      <h2 id="prevention">How to Stop It Happening Next Time</h2>
      <ul>
        <li>
          <strong>Make sure your exit is actually captured.</strong> If you leave without your passport or face
          being scanned, ask the officer to record your exit before you walk through.
        </li>
        <li>
          <strong>Photograph any stamp.</strong> A stamp at exit often means the system was down and your record
          is being entered by hand. A photo of it is excellent evidence if the upload goes wrong.
        </li>
        <li>
          <strong>Use the same passport in and out.</strong> Every time.
        </li>
        <li>
          <strong>Check the official tool after each trip.</strong> Run it once when you get home and once a week or
          two later. Catching a missing exit in June is much easier than discovering it at the desk in October.
        </li>
        <li>
          <strong>Keep your own record.</strong> The official tool shows you one number. Your own record is the
          thing that proves that number is wrong.
        </li>
      </ul>

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
        EES was sold as the end of smudged stamps and miscounted days, and for most crossings it is. But when it
        does make a mistake, you have to spot it and prove it yourself. Log every entry and exit in the free{" "}
        <Link href="/" className={linkClass}>
          Schengen calculator
        </Link>{" "}
        as you travel, keep the tickets that back them up, and compare your count with the official one after
        every trip. If the two ever disagree, you will have the dates and the evidence ready.
      </p>
    </>
  )
}
