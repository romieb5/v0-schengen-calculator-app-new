import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Common questions about the Schengen 90/180 day rule and how to use this calculator.
          </p>
        </div>

        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Legal Disclaimer</AlertTitle>
          <AlertDescription>
            This calculator is for informational purposes only and should not be considered legal advice. Always verify
            your visa requirements and compliance status with official sources and immigration authorities.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About the Schengen 90/180 Rule</CardTitle>
              <CardDescription>Understanding the basics</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is the Schengen 90/180 day rule?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      The 90/180 day rule allows non-EU citizens to stay in the Schengen Area for up to 90 days within
                      any 180-day period without a visa (for visa-exempt nationals) or with a short-stay Schengen visa.
                    </p>
                    <p>
                      The 180-day period is a rolling window that moves forward each day. On any given day, you look
                      back 180 days and count the days you've spent in the Schengen Area. If the total is 90 days or
                      less, you're compliant.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Which countries are in the Schengen Area?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">The Schengen Area currently includes 29 European countries:</p>
                    <p className="text-sm mb-3">
                      <strong>EU Member States:</strong> Austria, Belgium, Croatia, Czech Republic, Denmark, Estonia,
                      Finland, France, Germany, Greece, Hungary, Italy, Latvia, Lithuania, Luxembourg, Malta,
                      Netherlands, Poland, Portugal, Slovakia, Slovenia, Spain, Sweden
                    </p>
                    <p className="text-sm">
                      <strong>Non-EU Members:</strong> Iceland, Liechtenstein, Norway, Switzerland, Bulgaria (air and
                      sea only), Romania (air and sea only)
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Do entry and exit days both count?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Yes, both the day you enter and the day you exit the Schengen Area count as days used.
                    </p>
                    <p className="text-sm">
                      <strong>Example:</strong> If you enter on Monday and exit on Friday, that's 5 days total (Monday,
                      Tuesday, Wednesday, Thursday, Friday).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What happens if I overstay?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">Overstaying can result in serious consequences:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Fines and penalties</li>
                      <li>Entry bans (can range from months to years)</li>
                      <li>Deportation</li>
                      <li>Difficulty obtaining future visas</li>
                      <li>Criminal charges in serious cases</li>
                    </ul>
                    <p className="mt-3 text-sm">
                      Always ensure you leave before exceeding 90 days in any 180-day period.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I reset the 180-day period by leaving for a day?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      <strong>No.</strong> This is a common misconception. The 180-day window is rolling and continuous
                      - it doesn't reset when you leave the Schengen Area.
                    </p>
                    <p className="text-sm">
                      You must wait outside the Schengen Area long enough for old days to "roll off" the 180-day window
                      before you have more days available. The calculator's timeline visualization helps you see when
                      this happens.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Using the Calculator</CardTitle>
              <CardDescription>How to get accurate results</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-6">
                  <AccordionTrigger>How accurate is this calculator?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      The calculator uses the same methodology as official European Commission tools. It correctly
                      implements the rolling 180-day window and counts both entry and exit days.
                    </p>
                    <p className="text-sm">
                      However, accuracy depends on you entering correct dates for all your stays. Always double-check
                      your entries against passport stamps or travel records.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>Do I need to enter every short trip?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      <strong>Yes.</strong> You must enter all stays in the Schengen Area, regardless of duration. Even
                      a single day counts toward your 90-day limit.
                    </p>
                    <p className="text-sm">
                      This includes layovers if you pass through passport control in a Schengen airport.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>Why change the reference date?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      The reference date sets the "today" point for calculations. Changing it lets you:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>See what your status will be on a future date</li>
                      <li>Check when old stays will roll off the window</li>
                      <li>Plan optimal dates for future trips</li>
                      <li>Verify your status on a past date</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>How do I plan multiple future trips?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Use the "Check Proposed Trip" section to test different trip dates, then save compliant trips. The
                      calculator considers all saved proposed trips when checking new ones.
                    </p>
                    <p className="text-sm">
                      This helps you plan an entire year of travel and ensure all trips remain compliant together.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Situations</CardTitle>
              <CardDescription>Uncommon scenarios and edge cases</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-11">
                  <AccordionTrigger>Do I need a visa to enter the Schengen Area?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      It depends on your nationality. Citizens of certain countries can enter visa-free for up to 90
                      days. Others need a Schengen visa before traveling.
                    </p>
                    <p className="text-sm">
                      Check with the embassy or consulate of the Schengen country you plan to visit first to determine
                      your requirements.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger>
                    I have a residence permit in one Schengen country. What are my limits?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      If you have a valid residence permit or long-stay visa (D visa) from a Schengen country:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                      <li>Days in your country of residence don't count toward the 90/180 limit</li>
                      <li>You can travel to other Schengen countries for up to 90 days in 180 days</li>
                      <li>Track your stays in other Schengen countries using this calculator</li>
                    </ul>
                    <p className="text-sm">Always carry your residence permit when traveling within Schengen.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-13">
                  <AccordionTrigger>Does time in non-Schengen EU countries count?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      <strong>No.</strong> Time spent in EU countries that are not in the Schengen Area does not count:
                    </p>
                    <p className="text-sm mb-3">
                      Cyprus and Ireland are EU members but not in Schengen. Days there don't count toward your 90-day
                      limit.
                    </p>
                    <p className="text-sm">
                      However, you must have separate entry permission for these countries and re-enter Schengen
                      properly.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger>What if I need to stay longer than 90 days?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">To stay longer than 90 days in a 180-day period, you need:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                      <li>A national long-stay visa (D visa) from a specific country</li>
                      <li>A residence permit for work, study, family reunion, etc.</li>
                      <li>Special permission for specific circumstances</li>
                    </ul>
                    <p className="text-sm">
                      Apply through the embassy or consulate of the Schengen country where you'll spend most time.
                      Requirements vary by country and purpose of stay.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-15">
                  <AccordionTrigger>Can I extend my stay if I'm already in Schengen?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Extensions are rarely granted and only in exceptional circumstances (serious illness, force
                      majeure, humanitarian reasons).
                    </p>
                    <p className="text-sm">
                      You cannot extend a visa-free stay or regular tourist visa simply because you want to stay longer.
                      Plan your trips carefully to avoid needing an extension.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
