import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">About</h1>
          <p className="text-lg text-muted-foreground">
            Why I built Schengen Monitor, and who it&apos;s for.
          </p>
        </div>

        <div className="space-y-6 text-base leading-relaxed">
          <p>
            If you&apos;ve ever spent a chunk of time in Europe without actually living there, you know the feeling:
          </p>

          <div className="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground">
            &ldquo;Wait&hellip; do I still have Schengen days left, or am I about to get myself deported?&rdquo;
          </div>

          <p>
            I thought I had a decent grip on the 90/180 rule&hellip; until I didn&apos;t.
          </p>

          <p>
            I was trying to plan another trip, and despite all the calculators online, I still couldn&apos;t{" "}
            <em>see</em> how my previous stays were affecting my current window. Everything felt like guesswork,
            and I kept finding myself manually counting days.
          </p>

          <p>So I built something that would actually make sense to my brain.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Why build another calculator?</h2>

          <p>
            There are plenty of Schengen calculators out there. And they&apos;re fine&hellip; but they weren&apos;t
            doing it for me.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">None of them gave me a proper visual timeline.</h3>
          <p>
            I wanted clarity and something that literally showed my trips, the rolling 180-day window,
            and which stay was about to &ldquo;fall off.&rdquo;
          </p>

          <div className="my-6 rounded-xl border overflow-hidden">
            <img
              src="/timeline-preview.png"
              alt="Timeline Visualization showing stays within a rolling 180-day window"
              className="w-full"
            />
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">My timing really matters right now.</h3>
          <p>
            I&apos;m preparing for residency in Luxembourg, which means I&apos;ve been tiptoeing right up to the
            limit without realising it. A trip I took <em>months</em> ago was quietly blocking me from flying
            back sooner. Not ideal.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">I learn best by building things.</h3>
          <p>
            I&apos;ve been experimenting with AI development tools lately, especially Vercel&apos;s{" "}
            <strong>v0</strong>, and this felt like the perfect little project to test what&apos;s possible.
          </p>

          <p>
            I just wanted a tool that made Schengen compliance feel less like a math exam and more
            like&hellip; a calendar.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Who this is actually useful for</h2>

          <p>After building it, I realised it&apos;s not just for me:</p>

          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>Digital nomads</strong> bouncing between Lisbon, Berlin, Barcelona
            </li>
            <li>
              <strong>Retirees</strong> planning those long, dreamy motorcycle trips across Europe
            </li>
            <li>
              <strong>People in long-distance relationships</strong> trying to maximise time together
              without accidentally overstaying
            </li>
            <li>
              <strong>Remote workers</strong> who do month-long stints in Rome, not realising those days
              haunt them months later
            </li>
            <li>
              <strong>Anyone timing an EU residency application</strong> and needing to avoid missteps
            </li>
          </ul>

          <p>Basically: anyone who wants a clear picture instead of a headache.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">What it does</h2>

          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Shows your stays on a clean, visual timeline</li>
            <li>Updates your remaining days instantly</li>
            <li>Shows which trip will fall out of your 180-day window next</li>
            <li>Helps you plan future travel without guessing</li>
            <li>Reduces that low-level &ldquo;am I allowed back in?&rdquo; anxiety</li>
          </ul>

          <p>
            It&apos;s fast and honestly fun to play with. If you try it and have ideas, I&apos;d love to hear
            them. This is one of those little projects born out of curiosity and mild panic, but if it helps
            anyone else avoid surprises at passport control, then amazing.
          </p>

          <p className="text-muted-foreground mt-8">
            &mdash; Romie Bajwa
          </p>

          <p className="text-sm text-muted-foreground">
            Adapted from my{" "}
            <Link
              href="https://medium.com/@romieb/i-built-a-schengen-90-180-calculator-because-i-couldnt-visualise-when-my-days-would-fall-off-ed28391b5d0b"
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Medium article
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
