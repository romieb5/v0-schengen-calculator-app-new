import Link from "next/link"

export function Content() {
  return (
    <>
      <p>
        If you&apos;ve been researching a trip to Europe in the last few months, you&apos;ve probably run into
        three different acronyms being thrown around, often in the same sentence: the Schengen visa, EES, and
        ETIAS. It&apos;s easy to assume they&apos;re all different names for the same thing. They aren&apos;t.
      </p>
      <p>
        These three systems do different jobs, apply to different travelers, and kick in at different points
        in your trip. Confusing one for another is how people end up arriving at a border without the right
        paperwork, paying for things they didn&apos;t need, or missing something they actually did need.
      </p>
      <p>
        Let&apos;s walk through each one, what it actually is, and who needs it.
      </p>

      <h2 id="the-short-version">The Short Version</h2>
      <p>
        Before we get into the details, here&apos;s the one-line summary for each:
      </p>
      <ul>
        <li>
          <strong>Schengen visa</strong>: permission to enter the Schengen Area, for travelers whose
          nationality requires one.
        </li>
        <li>
          <strong>EES (Entry/Exit System)</strong>: the digital system that records every non-EU entry and
          exit at the border. It applies automatically.
        </li>
        <li>
          <strong>ETIAS (European Travel Information and Authorisation System)</strong>: a pre-travel
          authorization for visa-exempt travelers. You apply online before your trip.
        </li>
      </ul>
      <p>
        Think of them as three separate layers. Not all three apply to every traveler, and none of them
        cancel each other out.
      </p>

      <h2 id="what-is-a-schengen-visa">What Is a Schengen Visa?</h2>
      <p>
        A Schengen visa is a short-stay permit for people whose nationality requires permission to enter the
        Schengen Area. It&apos;s issued by a consulate in advance and lets you stay up to 90 days within any
        rolling 180-day window.
      </p>
      <p>
        Who needs one: citizens of around 100 countries, including India, China, Nigeria, the Philippines,
        South Africa, and Russia, among many others. The full list is maintained by the EU and changes
        occasionally.
      </p>
      <p>
        Who doesn&apos;t: citizens of visa-exempt countries (more on that in the ETIAS section), along with
        EU, EEA, and Swiss citizens, who have free movement rights and don&apos;t need a visa at all.
      </p>
      <p>
        You apply at the consulate of the country you&apos;ll be entering first, or the country where
        you&apos;ll spend the most time. Approval isn&apos;t guaranteed, processing can take several weeks,
        and there&apos;s a non-refundable fee (currently &euro;90 for adults). The visa itself is a sticker
        placed in your passport, with specific dates and a set number of permitted entries.
      </p>
      <p>
        One important note: a Schengen visa doesn&apos;t override the 90/180 rule. You still can&apos;t stay
        more than 90 days within a rolling 180-day window, even with a valid visa. The visa is permission to
        enter. The 90/180 rule is the time limit once you&apos;re in.
      </p>

      <h2 id="what-is-ees">What Is EES?</h2>
      <p>
        EES is the EU&apos;s new digital border system. It replaces the old paper-stamp method with
        electronic records of every entry and exit. The first time you cross a Schengen border, your
        biometric data (four fingerprints and a facial photo) gets captured and stored in a central database
        for three years. Every subsequent crossing gets logged automatically.
      </p>
      <p>
        Who it applies to: every non-EU short-stay traveler. If you&apos;re not an EU, EEA, or Swiss citizen
        and you&apos;re entering Schengen for a visit, EES applies to you. It doesn&apos;t matter whether
        you need a visa or are visa-exempt.
      </p>
      <p>
        When it started: April 10, 2026. It&apos;s been live across all 29 Schengen countries since then.
      </p>
      <p>
        What EES actually does: it automates the count. Under the old stamp system, enforcement of the 90/180
        rule was patchy. Border officers had to flip through your passport, find all the relevant stamps, and
        do the math by hand. At busy airports, they often didn&apos;t bother. EES removes that gap. The
        moment you step up to a booth, the system knows exactly how many days you&apos;ve spent in the zone
        over the last 180, how many you have left, and whether your planned stay fits.
      </p>
      <p>
        One thing EES is not: it&apos;s not an authorization. You don&apos;t apply for it, pay for it, or
        receive any document. It runs in the background. If you&apos;d like a fuller breakdown of how it
        works at the border, we covered it in detail in{" "}
        <Link
          href="/blog/ees-entry-exit-system"
          className="text-primary underline underline-offset-4 hover:opacity-80"
        >
          our EES explainer
        </Link>
        .
      </p>

      <h2 id="what-is-etias">What Is ETIAS?</h2>
      <p>
        ETIAS is a pre-travel authorization that visa-exempt travelers need before entering the Schengen
        Area. It&apos;s conceptually similar to the US ESTA or Canada&apos;s eTA. You apply online, answer a
        few questions about your background and travel plans, and pay a small fee. Most applications are
        approved within minutes.
      </p>
      <p>
        Who it applies to: citizens of roughly 60 visa-exempt countries. This includes American, Canadian,
        British, Australian, Japanese, South Korean, and New Zealand passport holders, along with citizens
        of many other countries that currently don&apos;t need a Schengen visa.
      </p>
      <p>
        Who it doesn&apos;t apply to: people who already need a Schengen visa (you&apos;ll continue using
        the visa instead), and EU, EEA, and Swiss citizens.
      </p>
      <p>
        How it works: the application is online, the fee is &euro;7 for most adults (free for travelers
        under 18 or over 70), and approved authorizations are valid for three years or until your passport
        expires, whichever comes first. ETIAS is linked to the specific passport you apply with, so if you
        renew, you&apos;ll need to reapply.
      </p>
      <p>
        When it starts: ETIAS is expected to go live later in 2026, a few months after EES fully rolled out.
        The EU has indicated there will be a transition period at the start where missing ETIAS won&apos;t
        block travel, but once enforcement kicks in, you&apos;ll need an approved authorization before
        boarding your flight.
      </p>
      <p>
        What ETIAS is not: it&apos;s not a visa. It doesn&apos;t guarantee entry. A border officer can still
        deny you at the gate if they have concerns about your documents, purpose of travel, or compliance
        history. And like a Schengen visa, it doesn&apos;t override the 90/180 rule.
      </p>

      <h2 id="who-needs-which">Who Actually Needs Which?</h2>
      <p>
        Here&apos;s the part most people want answered. The answer depends almost entirely on what passport
        you hold.
      </p>
      <p>
        <strong>If your nationality requires a Schengen visa</strong> (India, China, Nigeria, Philippines,
        South Africa, Pakistan, Egypt, and many others): you need a Schengen visa to enter. You do not need
        ETIAS. EES still applies to you at the border, but automatically, with nothing for you to do in
        advance.
      </p>
      <p>
        <strong>If your nationality is visa-exempt</strong> (US, Canada, UK, Australia, Japan, South Korea,
        and around 55 others): once ETIAS is enforced, you&apos;ll need an approved ETIAS before your trip.
        You do not need a Schengen visa. EES also applies at the border.
      </p>
      <p>
        <strong>If you hold an EU, EEA, or Swiss passport</strong>: none of this applies to you. Free
        movement rights cover your travel within Schengen, and you don&apos;t go through the EES process.
      </p>
      <p>
        <strong>If you have a long-stay national visa</strong> (a D-type visa from France, Germany, Spain,
        Portugal, and so on) or a residence permit: you&apos;re in a different category. Those permits
        operate under national rules and aren&apos;t governed by Schengen short-stay limits in your country
        of residence. Travel to other Schengen countries gets more nuanced, so check the rules for your
        specific permit.
      </p>

      <h2 id="common-mix-ups">The Three Most Common Mix-Ups</h2>
      <p>
        We see the same confusions come up repeatedly, so they&apos;re worth calling out directly.
      </p>
      <p>
        <strong>ETIAS is not a visa.</strong> If your nationality requires a Schengen visa, ETIAS does not
        replace it. You&apos;ll still apply for the visa through a consulate the way you always have.
        ETIAS only covers visa-exempt travelers, giving the EU a chance to screen them before they arrive.
      </p>
      <p>
        <strong>EES is not something you apply for.</strong> It&apos;s the database that records your
        crossings. You&apos;ll notice it at the border (biometric scan on your first entry, quick confirmation
        thereafter), but there&apos;s no form to fill out ahead of time and no fee.
      </p>
      <p>
        <strong>None of these change the 90/180 rule.</strong> Whether you enter with a Schengen visa, with
        an approved ETIAS, or as a visa-exempt traveler in the transition period, you&apos;re still limited
        to 90 days in any rolling 180-day window. The rule itself hasn&apos;t budged. EES just makes breaking
        it much harder to get away with.
      </p>

      <h2 id="where-the-rule-fits">Where the 90/180 Rule Fits In</h2>
      <p>
        All three systems operate around the same underlying rule: non-EU short-stay visitors can spend up to
        90 days in any rolling 180-day window inside the Schengen Area.
      </p>
      <ul>
        <li>A Schengen visa specifies this limit directly in its terms.</li>
        <li>An ETIAS authorization assumes the same limit applies.</li>
        <li>EES is what enforces it, now with precision.</li>
      </ul>
      <p>
        If you&apos;ve spent 89 days in Schengen over the last 180 and you show up at the Frankfurt border
        with a valid ETIAS, EES will flag you the moment your passport is scanned. The border officer can
        refuse entry right there, or allow a very short stay and note the constraint on your record. This
        kind of precise, automated enforcement is new. Under the old system, many travelers got away with
        overstays simply because nobody did the count.
      </p>
      <p>
        This is why tracking your days has become more important than ever. Our free{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          Schengen calculator
        </Link>{" "}
        handles the rolling window math for you, shows you exactly how many days you have remaining, and
        lets you test future trips before you book them.
      </p>

      <h2 id="bottom-line">The Bottom Line</h2>
      <p>
        Three systems, three jobs, three different sets of travelers they apply to:
      </p>
      <ul>
        <li>
          <strong>Schengen visa</strong>: permission to enter, for nationalities that require it. Applied
          for at a consulate, placed in your passport.
        </li>
        <li>
          <strong>EES</strong>: the automated record of your crossings, for every non-EU visitor, running in
          the background at the border.
        </li>
        <li>
          <strong>ETIAS</strong>: pre-travel authorization, for visa-exempt travelers, applied for online
          before your trip.
        </li>
      </ul>
      <p>
        If you&apos;re not sure which applies to you, start with your passport. Whether your nationality
        requires a visa or not is the first question that determines everything else.
      </p>
      <p>
        And regardless of which pre-travel paperwork you end up needing, the underlying 90/180 rule still
        governs how long you can actually stay. If you&apos;re planning meaningful time in Europe, add your
        past stays to the{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          calculator
        </Link>{" "}
        and keep an eye on your timeline. The border system now knows exactly where you stand. You should too.
      </p>
    </>
  )
}
