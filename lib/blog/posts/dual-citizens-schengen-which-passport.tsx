import Image from "next/image"
import Link from "next/link"

const linkClass = "text-primary underline underline-offset-4 hover:opacity-80"

export function Content() {
  return (
    <>
      <p>
        For years, holding two passports at a Schengen border was mostly a question of which queue looked shorter.
        An officer stamped whichever document you handed over, nobody joined the dots between your two
        nationalities, and a mix-up rarely followed you anywhere.
      </p>
      <p>
        That is no longer true. Since the{" "}
        <Link href="/blog/ees-entry-exit-system" className={linkClass}>
          Entry/Exit System
        </Link>{" "}
        went fully live on 10 April 2026, every entry and exit made on a non-EU passport is logged digitally against
        your fingerprints and face. The passport you choose now decides whether you are counted at all, and handing
        over the wrong one at the wrong moment can leave a record that says you overstayed when you did nothing of
        the sort.
      </p>
      <p>
        This guide covers the two situations dual citizens actually face: holding one EU and one non-EU passport,
        and holding two non-EU passports. They work very differently.
      </p>

      <h2 id="the-short-answer">The Short Answer</h2>
      <ul>
        <li>
          <strong>If one of your passports is from an EU country</strong>, use it to both enter and leave the
          Schengen Area. EU citizens are not subject to the 90/180 rule and are not registered in EES.
        </li>
        <li>
          <strong>Whatever you enter on, leave on the same passport.</strong> Mixing documents within one trip is the
          most common way dual citizens end up with a false overstay on their record.
        </li>
        <li>
          <strong>If both passports are non-EU</strong>, you get one 90-day allowance, not two. EES ties your
          biometrics to both documents, so switching passports does not reset anything.
        </li>
      </ul>

      <h2 id="eu-plus-non-eu">One EU Passport, One Non-EU Passport</h2>
      <p>
        This is the lucky combination: American and Italian, Canadian and Irish, British and French, Australian and
        Greek. As long as you travel on your EU passport, you are an EU citizen exercising free movement. There is no
        90-day limit, no rolling window to track, no fingerprint registration at the kiosk, and no{" "}
        <Link href="/blog/etias-2026-launch-guide" className={linkClass}>
          ETIAS
        </Link>{" "}
        to apply for once that system eventually launches. You also get the faster EU lane on arrival.
      </p>
      <p>
        Hand over your non-EU passport instead and the border treats you as exactly what that document says: a
        third-country visitor. EES creates a file, takes your biometrics, and starts counting your days. The officer
        is not obliged to ask whether you hold another nationality, and in a busy hall they usually will not.
        Nothing about holding an EU passport protects you if it stays in your bag.
      </p>
      <p>
        There is no penalty for having registered in EES on your non-EU passport by mistake. You simply end up with a
        record you did not need, and from then on that record has to be kept consistent.
      </p>
      <p>
        One thing EU citizenship does not remove is the paperwork for longer stays. If you plan to live in another
        EU country for more than three months, that country can ask you to register and show that you are working,
        studying, or able to support yourself. That is a residence formality, not a day count, and it never turns
        into an overstay.
      </p>

      <h2 id="the-mismatch-trap">The Mismatch Trap: In on One, Out on the Other</h2>
      <p>
        This is the mistake that EES turned from harmless to dangerous. Picture an American-Italian traveler who
        lands in Rome, hands over the US passport because it was already in their hand from check-in, and spends a
        month in Italy. On the way home they remember the Italian passport and breeze through the EU lane.
      </p>
      <p>
        From the traveler&apos;s point of view, they visited for a month and left. From EES&apos;s point of view, a
        US passport holder entered on a known date and has never exited. The system does not know the Italian
        passport belongs to the same person, because EU passports are not checked against EES at all. Once that open
        entry passes 90 days, the US passport is automatically flagged as an overstayer, and that flag is waiting for
        the next officer who scans it, possibly years later.
      </p>
      <p>
        The reverse also causes trouble. Enter on the EU passport, leave on the non-EU one, and EES records an exit
        with no matching entry. That is less serious, but it still invites questions you would rather not answer at a
        booth.
      </p>
      <p>
        The rule is simple: <strong>the passport that comes out of your pocket at the entry booth is the one that
        comes out at the exit booth.</strong> Ideally that is your EU passport both times.
      </p>

      <h2 id="two-non-eu-passports">Two Non-EU Passports: One Allowance, Not Two</h2>
      <p>
        Dual citizens of two visa-free countries, say the United States and Canada or Australia and the United
        Kingdom, sometimes assume they have two separate 90-day budgets. They never did. The 90/180 rule applies to
        the person, not the document, and using a second passport to start a fresh count has always been treated as
        an overstay disguised as a new arrival.
      </p>
      <p>
        Under stamps, it was at least physically possible to get away with. Under EES it is not. The regulation
        that set up the system requires every travel document a person legitimately uses to be added to that
        person&apos;s single file. When you present your second passport, your face and fingerprints match the
        biometrics already stored from the first, and the two documents end up in one record with one day count.
        The EU&apos;s wider interoperability systems also run checks specifically designed to catch one person
        appearing under more than one identity.
      </p>
      <p>
        So holding two non-EU passports gives you flexibility in other ways, such as a choice of which nationality
        to apply for a long-stay visa under, but it does not give you a single extra day as a visitor. Count all of
        your Schengen days together, whichever passport they were made on.
      </p>
      <p>
        One genuine difference between nationalities is worth knowing about. A handful of Schengen countries have
        old bilateral agreements with specific nations that allow extra time in that one country, outside the
        normal count. Those agreements attach to nationality, so the passport you enter on can matter. They are
        narrow and fiddly, and you should confirm the current position with the relevant embassy before relying on
        one.
      </p>

      <h2 id="ireland-and-cyprus">Ireland and Cyprus: EU, but Not Schengen</h2>
      <p>
        Two EU countries sit outside the Schengen Area and outside EES: Ireland and Cyprus. This matters to dual
        citizens in two ways.
      </p>
      <p>
        First, an Irish passport is an EU passport. The large number of British citizens who hold Irish citizenship
        can travel through Schengen on it with no 90-day limit at all, exactly like a French or German citizen.
        Brexit changed the rules for British passports, as our{" "}
        <Link href="/blog/schengen-90-180-rule-uk-citizens" className={linkClass}>
          guide for UK citizens
        </Link>{" "}
        explains, but it did not touch Irish ones.
      </p>
      <p>
        Second, if you are travelling on a non-EU passport, days spent in Ireland or Cyprus do not count toward your
        Schengen 90. Both countries run their own entry rules, so check them for your passport, but time there is
        time outside the rolling window.
      </p>

      <h2 id="at-check-in">At Check-In and at Home</h2>
      <p>
        Airlines collect passport details before departure and pass them to border authorities. Give the airline
        the details of the passport you will show on arrival. If you are flying into Paris and plan to use your
        French passport there, that is the one the airline should have on file.
      </p>
      <p>
        Your other country&apos;s rules still apply when you go home. US law requires American citizens to enter and
        leave the United States on a US passport. Canada expects its citizens to fly home on a Canadian passport, the
        UK expects British citizens to use a UK or Irish passport, and Australia requires its citizens to arrive and
        depart on an Australian one. In practice that means carrying both and switching between them at the right
        moment: your home passport for your home border, your EU passport for the Schengen one.
      </p>
      <p>
        Keep both passports valid. The most common reason an EU dual citizen ends up registered in EES is not
        confusion at the booth. It is an expired EU passport that they did not get around to renewing, so they
        travelled on the other one &ldquo;just this once.&rdquo; If you hold an EU national ID card, it is a valid
        travel document within the EU and Schengen Area, but airlines flying in from outside Europe will usually want
        to see a passport.
      </p>

      <h2 id="family-members">Non-EU Family Members</h2>
      <p>
        Being married to an EU citizen does not make your own passport an EU one. A non-EU spouse travelling on their
        own passport is normally counted under the 90/180 rule like any other visitor. The exception is people
        covered by EU free movement rules, typically family members who hold a residence card issued under those
        rules or who are travelling with or joining their EU family member in a country other than the EU
        citizen&apos;s own. Their position is different, and it is worth confirming with the relevant country before
        a long stay rather than assuming either way.
      </p>

      <h2 id="if-it-already-happened">If You Already Mixed Them Up</h2>
      <p>
        If you entered on your non-EU passport and left on your EU one, do not wait until the next trip to find out
        what the system thinks. A few practical steps:
      </p>
      <ul>
        <li>
          <strong>Check your record.</strong> The EU&apos;s official{" "}
          <Link href="/blog/check-remaining-schengen-days-after-ees" className={linkClass}>
            remaining-days checker
          </Link>{" "}
          takes your passport number and shows where you stand. If it shows you as still inside the Schengen Area,
          the missing exit is on file.
        </li>
        <li>
          <strong>Gather proof you left.</strong> Boarding passes, flight confirmations, your home country&apos;s
          entry record, and receipts from where you were afterwards all show when you actually departed.
        </li>
        <li>
          <strong>Ask for a correction.</strong> EES gives you the right to access your data and have inaccurate
          records corrected. Contact the border authority of the country where you entered, explain what happened,
          and send your evidence.
        </li>
        <li>
          <strong>Travel on the EU passport from now on.</strong> And until the record is fixed, carry your proof of
          departure on any trip that uses the non-EU passport.
        </li>
      </ul>

      <h2 id="checklist">A Simple Checklist</h2>
      <ul>
        <li>Travel into and out of Schengen on your EU passport whenever you have one.</li>
        <li>Never enter on one passport and leave on the other within the same trip.</li>
        <li>Give the airline the details of the passport you will use on arrival.</li>
        <li>Use your home passport for your home country&apos;s border, as its laws require.</li>
        <li>Renew an expiring EU passport before it forces you onto the other one.</li>
        <li>With two non-EU passports, keep a single count of days across both documents.</li>
      </ul>
      <p>
        If you do travel on a non-EU passport, EES knows your exact position in the rolling window and you, by
        default, do not. Record each trip in a{" "}
        <Link href="/" className={linkClass}>
          Schengen calculator
        </Link>{" "}
        as you go, whichever passport you used, and test any new trip as a proposed stay before you book it.
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
        Two passports used to be a convenience at the border. Under EES they are a responsibility as well. Pick the
        right one, stick with it for the whole trip, and a second nationality stays the advantage it is supposed to
        be.
      </p>
    </>
  )
}
