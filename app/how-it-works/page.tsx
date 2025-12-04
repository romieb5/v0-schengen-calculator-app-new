import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">How the Calculator Works</h1>
          <p className="text-lg text-muted-foreground">
            Understand how each section helps you track your Schengen compliance and plan your trips.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>The 90/180 Day Rule</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Schengen Area allows non-EU visitors to stay for up to{" "}
                <strong>90 days within any 180-day period</strong>. This is a rolling window, not a fixed period.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium mb-2">How the rolling window works:</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>For any given day, look back 180 days from that date</li>
                  <li>Count all days spent in the Schengen Area during those 180 days</li>
                  <li>If the total is 90 days or less, you are compliant</li>
                  <li>The window "rolls" forward each day, dropping old days and adding new ones</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <CardTitle>Reference Date</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The <strong>Reference Date</strong> is the anchor point for calculating your 180-day window. By default,
                it's set to today's date, but you can change it to any date.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="font-medium">Why adjust the reference date?</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Check your compliance status on a future date</li>
                  <li>See when past stays will "roll off" the 180-day window</li>
                  <li>Plan when you'll have more days available</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Shows your compliance status based on the reference date you've selected. The 180-day window is
                calculated backward from the reference date.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Compliant</p>
                    <p className="text-sm text-muted-foreground">
                      You have 90 days or fewer used in the window and can continue your stay or plan trips.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Nearing Limit</p>
                    <p className="text-sm text-muted-foreground">
                      You're approaching the 90-day limit. Plan carefully to avoid overstaying.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Over Limit</p>
                    <p className="text-sm text-muted-foreground">
                      You have exceeded 90 days in the 180-day window. You should not be in the Schengen Area.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recorded Stays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Track all your past and current stays in the Schengen Area. Each stay records your entry and exit dates.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Both entry and exit days count as days used. If you enter on January 1 and exit
                on January 3, that's 3 days used.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Check Proposed Trip</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Plan future trips and see if they comply with the 90/180 rule before you book. The calculator checks
                every day of your proposed trip against the rolling 180-day window.
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="font-medium">What it checks:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Days already used from recorded stays</li>
                  <li>Days from other saved proposed trips</li>
                  <li>Days from the trip you're checking</li>
                  <li>Whether any day during the trip would exceed 90 days</li>
                </ul>
              </div>
              <p className="text-sm">
                If a trip would exceed the limit, the calculator shows the <strong>last eligible exit date</strong>- the
                latest date you could leave while remaining compliant.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline Visualization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>A visual representation of your stays and the 180-day compliance window. The timeline shows:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Recorded stays as colored bars</li>
                <li>Proposed trips as dashed bars</li>
                <li>The rolling 180-day window as a blue border</li>
                <li>Current compliance status (days used / days remaining)</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                When a trip would be non-compliant, the window adjusts to show the last legal date, with excess days
                appearing outside the window on the right.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
