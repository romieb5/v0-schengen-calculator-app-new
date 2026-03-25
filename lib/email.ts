import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = "Schengen Monitor <noreply@schengenmonitor.com>"

export async function sendVerificationEmail(email: string, verificationUrl: string) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Verify your email — Schengen Monitor",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Verify your email</h2>
        <p>Thanks for signing up for Schengen Monitor. Click the button below to verify your email address.</p>
        <a href="${verificationUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Verify Email
        </a>
        <p style="margin-top: 24px; color: #666; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Reset your password — Schengen Monitor",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>Click the button below to reset your Schengen Monitor password.</p>
        <a href="${resetUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Reset Password
        </a>
        <p style="margin-top: 24px; color: #666; font-size: 14px;">If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  })
}
