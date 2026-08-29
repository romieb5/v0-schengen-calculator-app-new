import Image from "next/image"
import Link from "next/link"

export function Content() {
  return (
    <>
      <div className="my-6 rounded-xl border border-border bg-muted/50 p-5">
        <p className="!mt-0 !mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Status update, 29 August 2026
        </p>
        <p className="!mb-0 text-sm">
          ETIAS has no confirmed launch date. The &ldquo;last quarter of 2026&rdquo; target was quietly removed from
          the official EU page in mid July 2026, and reporting since then points to 2027 as the realistic outcome. The
          EU says it will announce the start date several months before the system goes live. Nothing to apply for
          yet, and nothing about your 90/180 day allowance changes when it does arrive. This guide is kept current as
          the timeline moves.
        </p>
      </div>

      <p>
        ETIAS, the European Travel Information and Authorisation System, is the last piece of Europe&apos;s new
        digital border, and it is also the piece that keeps slipping. When it finally arrives, millions of travellers
        who have always breezed into Europe visa-free, Americans, Britons, Canadians, Australians, and many others,
        will need to apply online and get approved before they leave home.
      </p>
      <p>
        The good news is that it is quick, cheap, and valid for years. The part that trips people up is what ETIAS is
        not. It is not a visa, and it does not give you a single extra day inside the Schengen Area. This guide
        explains exactly what ETIAS is, who needs one, where the launch date really stands, what the transitional
        period means, and why the 90/180-day rule still governs every trip.
      </p>

      <h2 id="the-short-answer">The Short Answer</h2>
      <p>
        Once ETIAS starts, if you hold a passport that currently lets you visit Europe without a visa, you will need
        an approved authorisation to cross the border into around 30 European countries. You apply online, pay a{" "}
        <strong>&euro;20 fee</strong>, and in most cases get approved within minutes. The authorisation is valid for{" "}
        <strong>up to three years</strong>, or until your passport expires, whichever comes first, and it covers as
        many trips as you like during that time.
      </p>
      <p>
        Crucially, ETIAS does not change how long you can stay. The{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          90 days in any 180-day limit
        </Link>{" "}
        still applies to every visit, no matter how long your ETIAS is valid.
      </p>

      <h2 id="the-timeline">Where the Launch Date Actually Stands</h2>
      <p>
        ETIAS has been delayed repeatedly since it was first announced, and it has been delayed again. Here is the
        honest state of play.
      </p>
      <p>
        In March 2025, the European Council said ETIAS was likely to launch in the <strong>last quarter of 2026</strong>.
        That target held for roughly sixteen months. In <strong>mid July 2026</strong>, the Q4 2026 date was removed
        from the official EU ETIAS page, following reporting in the <em>Financial Times</em> that eu-LISA, the EU
        agency building the system, had concluded a 2026 launch was no longer feasible. The official position is now
        simply that the EU will announce a start date several months before the system goes live. Independent
        reporting points to <strong>2027</strong> as the realistic outcome, and the eu-LISA management board is due to
        meet in <strong>September 2026</strong> to consider a revised timeline.
      </p>
      <p>
        The context for the slip is the system ETIAS depends on. The{" "}
        <Link
          href="/blog/ees-entry-exit-system"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          Entry/Exit System (EES)
        </Link>{" "}
        began its phased rollout on 12 October 2025 and became mandatory at every external Schengen border on{" "}
        <strong>10 April 2026</strong>. That rollout has been difficult. Border queues have run to several hours at
        peak times at major hubs, and some countries have leaned on a temporary mechanism allowing border posts to
        pause biometric checks during surges. Layering a second new system on top of that, in the middle of a
        difficult first year, is a fight the Commission has chosen not to pick yet.
      </p>
      <p>
        The practical takeaway: <strong>do not plan around a specific ETIAS date</strong>, and do not let anyone sell
        you one. Applications are not open, no legitimate service can take your details today, and any site claiming
        otherwise is not one you want holding your passport number.
      </p>

      <h2 id="what-is-etias">What ETIAS Actually Is</h2>
      <p>
        ETIAS is a pre-travel screening system, not a visa. Before you travel, you fill in an online form with your
        passport details, background, and trip information. The system runs your details against European security and
        migration databases and, in the vast majority of cases, returns an approval automatically. That approval is
        linked electronically to your passport, so there is no sticker or document to carry.
      </p>
      <p>
        It is the companion to EES, the biometric border system that replaced passport stamps in April 2026. EES
        records who crosses the border and when. ETIAS decides, before you even set off, whether you should be allowed
        to travel in the first place. Together they are meant to form Europe&apos;s new digital border, which is
        exactly why one running badly delays the other. If you are still untangling the acronyms, our guide on the{" "}
        <Link
          href="/blog/etias-ees-schengen-visa-difference"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          difference between ETIAS, EES, and a Schengen visa
        </Link>{" "}
        breaks each one down.
      </p>

      <h2 id="who-needs-it">Who Needs One</h2>
      <p>
        ETIAS is aimed at people who can currently visit Europe without a visa. If you already need a full Schengen
        visa to travel, ETIAS does not apply to you, your visa still does. Everyone else in the visa-free category
        will need an authorisation, including passport holders from:
      </p>
      <ul>
        <li>The United States, Canada, and Mexico</li>
        <li>The United Kingdom (a change many Britons are still catching up on after Brexit)</li>
        <li>Australia and New Zealand</li>
        <li>Dozens of other visa-exempt countries across Asia, Latin America, and the Gulf</li>
      </ul>
      <p>
        Travellers under 18 and over 70 still need an ETIAS, but they do not pay the &euro;20 fee. Everyone in a
        family or group needs their own individual authorisation, including children.
      </p>

      <h2 id="transition-grace">The Transition and Grace Periods</h2>
      <p>
        Whenever ETIAS does start, it will not switch from optional to strictly mandatory overnight. There are two
        phases first, and this is where most of the confusion lives.
      </p>
      <p>
        For at least the first six months after launch, ETIAS is in a <strong>transitional period</strong>. You are
        expected to apply and travel with an authorisation, but you will not be turned away at the border simply for
        not having one, provided you meet all the other entry conditions.
      </p>
      <p>
        After that comes a <strong>grace period</strong>, and this is the part that catches people out. During the
        grace period, only first-time travellers to Europe are allowed in without an ETIAS. If you have entered the
        Schengen Area before, you are expected to hold a valid authorisation, and you can be refused without one. In
        other words, do not assume the grace period is a free pass. If you travel to Europe with any regularity, you
        should plan to have your ETIAS from launch day. Once both phases end, an approved ETIAS becomes mandatory for
        every visa-exempt traveller.
      </p>

      <h2 id="cost-and-applying">Cost, Validity, and How to Apply</h2>
      <p>
        The fee is <strong>&euro;20 per application</strong>, confirmed by the European Commission in 2025 after an
        earlier plan for a &euro;7 fee. Applicants under 18 or over 70 pay nothing but still need to apply. Once
        approved, your authorisation lasts <strong>up to three years or until your passport expires</strong>,
        whichever is sooner, so if you renew your passport you will need a fresh ETIAS linked to the new document.
      </p>
      <p>
        The application itself takes a few minutes. You will need a valid passport, a payment method, and an email
        address. Most applications are approved almost immediately, but the EU advises applying at least a few days
        ahead, because a small number of cases are flagged for extra checks and can take up to 30 days to resolve.
        The simple rule: apply well before you book non-refundable travel, not the night before your flight.
      </p>

      <h2 id="not-a-visa">Why It Will Not Give You More Days</h2>
      <p>
        This is the single most important thing to understand, and it is the most common misconception. A three-year
        ETIAS does not mean you can spend three years in Europe. It means you are cleared to <em>show up</em> at the
        border for the next three years. How long you can actually stay on each trip is still governed entirely by the{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          90/180-day rule
        </Link>
        : a maximum of 90 days inside the Schengen Area within any rolling 180-day window.
      </p>
      <p>
        It also means the ETIAS delay buys you nothing. The limit that actually constrains your trips is already
        being enforced, and enforced better than it ever was. EES has been live at every external border since April
        2026, so every entry and exit is recorded digitally and an{" "}
        <Link
          href="/blog/schengen-overstay-consequences"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          overstay is detected automatically
        </Link>
        , with no reliance on a border officer spotting a stamp. If you need longer than 90 days, ETIAS was never the
        answer. A national long-stay visa or one of the{" "}
        <Link
          href="/blog/digital-nomad-visas-europe-2026"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          digital nomad visas now offered across Europe
        </Link>{" "}
        is what actually adds time to your stay.
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

      <h2 id="how-to-prepare">How to Prepare</h2>
      <p>
        There is nothing to do about ETIAS itself until applications open, and with the launch now likely a year or
        more away, that gap is exactly the window in which fake application sites do best. Ignore any service asking
        for your passport details or a fee today. When the official EU portal goes live, apply early, budget the
        &euro;20, and keep the confirmation email. If you travel to Europe more than once in a while, treat the
        authorisation as something to sort out before your first trip after launch rather than counting on the grace
        period.
      </p>
      <p>
        The habit worth building now is tracking your actual days, because that is the rule already being enforced at
        the border. Record your past stays in a{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          Schengen calculator
        </Link>
        , add any trip you are considering as a proposed trip before you book, and move the reference date forward to
        your planned arrival to see exactly how many days you would have left. Get that part right, and ETIAS becomes
        what it is meant to be whenever it lands: a two-minute formality, not a source of stress at the airport.
      </p>
    </>
  )
}
