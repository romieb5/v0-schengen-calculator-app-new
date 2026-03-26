import { Resend } from "resend"

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

const FROM_EMAIL = "Schengen Monitor <noreply@mail.schengenmonitor.com>"

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function validateUrl(url: string): string {
  const parsed = new URL(url)
  if (process.env.NODE_ENV === "production" && parsed.protocol !== "https:") {
    throw new Error("Email links must use HTTPS in production")
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("Email links must use HTTP(S)")
  }
  return parsed.toString()
}

export async function sendVerificationEmail(email: string, verificationUrl: string) {
  const safeUrl = validateUrl(verificationUrl)
  const result = await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your email — Schengen Monitor",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Verify your email</h2>
        <p>Thanks for signing up for Schengen Monitor. Click the button below to verify your email address.</p>
        <a href="${escapeHtml(safeUrl)}" style="display: inline-block; background: #000000; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Verify Email
        </a>
        <p style="margin-top: 24px; color: #666; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  })
  if (result.error) {
    console.error("[email] Verification email failed:", JSON.stringify(result.error))
    throw new Error(`Failed to send verification email: ${result.error.message}`)
  }
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const safeUrl = validateUrl(resetUrl)
  const result = await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Reset your password — Schengen Monitor",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>Click the button below to reset your Schengen Monitor password.</p>
        <a href="${escapeHtml(safeUrl)}" style="display: inline-block; background: #000000; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Reset Password
        </a>
        <p style="margin-top: 24px; color: #666; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  })
  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`)
  }
}

export async function sendPaymentReceiptEmail(email: string, amount: string) {
  const safeAmount = escapeHtml(amount)
  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Payment receipt — Schengen Monitor",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Payment confirmed</h2>
        <p>Thanks for your purchase! Your Timeline Visualization is now unlocked.</p>
        <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="margin: 0; font-size: 14px; color: #666;">Amount paid</p>
          <p style="margin: 4px 0 0; font-size: 24px; font-weight: 600;">${safeAmount}</p>
          <p style="margin: 8px 0 0; font-size: 14px; color: #666;">One-time payment — Timeline Visualization</p>
        </div>
        <a href="https://www.schengenmonitor.com" style="display: inline-block; background: #000000; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Go to Schengen Monitor
        </a>
        <p style="margin-top: 24px; color: #666; font-size: 14px;">If you have any questions, reply to this email.</p>
      </div>
    `,
  })
}
