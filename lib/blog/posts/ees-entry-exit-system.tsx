import Link from "next/link"

export function Content() {
  return (
    <>
      <p>
        After years of delays and false starts, the EU&apos;s Entry/Exit System (EES) finally went fully
        operational on April 10, 2026. If you&apos;re a non-EU citizen who travels to Europe, this is the
        biggest change to border control in decades. And it directly affects how the 90/180-day rule gets
        enforced.
      </p>
      <p>
        Let&apos;s break down what&apos;s actually changed, what to expect at the border, and what this means
        for how you plan your trips going forward.
      </p>

      <h2 id="what-is-ees">So What Exactly Is EES?</h2>
      <p>
        EES is a digital system that automatically records every time a non-EU traveler enters or leaves the
        Schengen Area. It replaces the old method of a border agent physically stamping your passport. Instead,
        your entry and exit are logged electronically, along with your biometric data.
      </p>
      <p>
        Think of it like a digital attendance sheet for the Schengen zone. Every time you cross a border, the
        system notes the date, the location, and your identity. And unlike a passport stamp that can be
        smudged, missed, or misread, the digital record is precise.
      </p>

      <h2 id="what-happens-at-the-border">What Happens at the Border Now?</h2>
      <p>
        If this is your first time entering the Schengen Area since EES went live, expect the process to
        take a bit longer than usual. Here&apos;s what happens:
      </p>
      <ul>
        <li>
          <strong>Fingerprints.</strong> You&apos;ll have four fingerprints scanned. This only needs to happen
          once, and then your prints are stored in the system for three years.
        </li>
        <li>
          <strong>Facial image.</strong> A photo is taken and linked to your record. Some airports handle
          this at a self-service kiosk, others do it at the booth.
        </li>
        <li>
          <strong>Passport scan.</strong> Your travel document details are logged electronically.
        </li>
      </ul>
      <p>
        On future visits, things speed up since your biometrics are already on file. You scan your passport,
        confirm your face, and you&apos;re through.
      </p>
      <p>
        When you leave, your departure is recorded the same way. No more wondering whether the exit agent
        remembered to stamp you out.
      </p>

      <h2 id="no-more-passport-stamps">What Happened to Passport Stamps?</h2>
      <p>
        For travelers registered in EES, Schengen entry and exit stamps are no longer required. Your travel
        history now lives in the system, not in your passport.
      </p>
      <p>
        This is honestly an upgrade. No more running out of passport pages on a long trip. No more squinting
        at a faded stamp trying to figure out if it says &ldquo;MAR&rdquo; or &ldquo;MAY.&rdquo; And no more
        situations where a border agent forgot to stamp you and now your exit looks like an overstay.
      </p>

      <h2 id="why-this-matters">Why This Matters for You</h2>
      <p>
        Here&apos;s the thing: the 90/180-day rule itself hasn&apos;t changed at all. You still get 90 days
        within any rolling 180-day window. What has changed, dramatically, is how that rule gets enforced.
      </p>
      <p>
        Under the old system, enforcement was inconsistent at best. A border agent had to flip through your
        passport, find all the relevant stamps, and do the math manually. At busy airports, sometimes they
        didn&apos;t check at all. Some travelers got away with overstays simply because nobody did the count.
      </p>
      <p>
        That&apos;s over now. EES knows exactly how many days you&apos;ve spent in the Schengen Area. The
        system calculates your remaining days automatically and flags any issues in real time. When you show
        up at a Schengen border, the agent can see at a glance whether you&apos;re compliant or not.
      </p>
      <p>
        This means a few things in practice:
      </p>
      <ul>
        <li>
          <strong>Overstays will get caught.</strong> The system flags them automatically, even short ones
          that might have slipped through before.
        </li>
        <li>
          <strong>Entry can be refused.</strong> If EES calculates that your planned stay would exceed your
          remaining days, you might not be allowed in. This could happen right at the gate.
        </li>
        <li>
          <strong>The consequences are real.</strong> Fines, entry bans to the entire Schengen Area, and
          problems with future visa applications. None of that has changed, but now the detection is
          automated.
        </li>
      </ul>

      <h2 id="the-rocky-start">It Hasn&apos;t Been Totally Smooth</h2>
      <p>
        To be fair, the first few days haven&apos;t been perfect. Reports from airports across Europe suggest
        longer wait times as staff and travelers adjust to the new process. Some kiosks have had technical
        issues. Border agents are still getting comfortable with the new workflow.
      </p>
      <p>
        This is pretty normal for a system rollout of this scale. It covers all 29 Schengen countries
        simultaneously, and that&apos;s a lot of moving parts. Things will settle down, but if you&apos;re
        traveling in the next few weeks, give yourself a little extra time at passport control.
      </p>

      <h2 id="what-about-etias">What About ETIAS?</h2>
      <p>
        You may have also heard about ETIAS, which stands for European Travel Information and Authorisation
        System. It&apos;s a separate thing. ETIAS is a pre-travel authorization that visa-exempt travelers
        (Americans, Canadians, Australians, and others) will need to apply for before their trip. Think of
        it like the US ESTA or Canada&apos;s eTA.
      </p>
      <p>
        ETIAS hasn&apos;t launched yet, but now that EES is up and running, it&apos;s expected to follow. We&apos;ll
        cover it in a future post when there&apos;s a firm launch date.
      </p>

      <h2 id="how-to-prepare">The Bottom Line</h2>
      <p>
        EES is a big modernization of how Europe handles border control. For most travelers, the day-to-day
        experience won&apos;t change much beyond the initial biometric registration. Your trips still work the
        same way, and the 90/180-day rule is exactly as it was before.
      </p>
      <p>
        The main difference is that everything is now tracked digitally instead of with ink stamps. If
        you&apos;re curious about how your past travel fits into the rolling 180-day window, our free{" "}
        <Link href="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          Schengen calculator
        </Link>{" "}
        can show you. You can also add future trips to see how they&apos;d look alongside your existing stays.
      </p>
      <p>
        We&apos;ll keep covering EES developments as the system matures, and we&apos;ll have a full breakdown
        of ETIAS once that gets a launch date too.
      </p>
    </>
  )
}
