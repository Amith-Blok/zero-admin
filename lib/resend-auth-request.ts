import type { NodemailerConfig } from '@auth/core/providers/nodemailer'

type SendVerificationRequestProps = {
  email: string
  provider: {
    server: NodemailerConfig['server']
    from: string | undefined
    apiKey: string | undefined
  }
  url: string
}
export async function sendCustomVerificationLink({
  email: to,
  provider,
  url,
}: SendVerificationRequestProps) {
  const { host } = new URL(url)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url, host }),
      text: text({ url, host }),
    }),
  })

  if (!res.ok)
    throw new Error('Resend error: ' + JSON.stringify(await res.json()))
}

function html(params: { url: string; host: string }) {
  const { url, host } = params

  const escapedHost = host.replace(/\./g, '&#8203;.')

  const brandColor = '#000000'

  const logoUrl = 'https://www.zerofreights.com/logo_zf.png'
  const color = {
    background: '#f9f9f9',
    text: '#333333',
    mainBackground: '#ffffff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: '#ffffff',
  }

  return `
<body style="background: ${color.background}; margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <img src="${logoUrl}" alt="Optidan AI Logo" style="width: 250px; height: auto;"/>
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size: 24px; font-weight: bold; padding-bottom: 10px;">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 12px 24px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                Sign In
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size: 16px; line-height: 22px; padding-bottom: 10px;">
        If the button doesn't work, click or copy and paste this link into your browser:<br/>
        <a href="${url}" style="color: ${color.buttonBackground};">${url}</a>
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size: 14px; color: #888888; padding-top: 20px; border-top: 1px solid #dddddd;">
        If you didn't request this email, you can safely ignore it.
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size: 12px; color: #888888; padding-top: 10px;">
        &copy; ${new Date().getFullYear()} Optidan AI. All rights reserved.
      </td>
    </tr>
  </table>
</body>
`
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
