import { Resend } from 'resend'
import { inFormater } from './utils'
import { generateHtmlTemplate } from './html-template'

const domain = process.env.NEXT_PUBLIC_APP_URL

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confimationLink = `${domain}/auth/new-password?token=${token}`
  await resend.emails.send({
    from: 'noreply@bloksupplychain.com',
    to: email,
    subject: 'Reset your password',
    html: `<p>Reset your password,<a href=${confimationLink}>click here</a> </p> `,
  })
}
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}  `
  await resend.emails.send({
    from: 'noreply@bloksupplychain.com',
    to: email,
    subject: 'Verify Your Email Address',
    html: `<div>
  <p>Welcome to Bloksupplychain! We are thrilled to have you on board and excited to embark on this journey together. Your decision to join us marks the beginning of a mutually beneficial partnership, and we can't wait to provide you with top-notch services and support.</p>
  <a href=${confirmLink} style="cursor: pointer; text-align: center; text-decoration: underline;"> Click here to confirm</a>

<p>As a new member of our platform, we want to ensure that your experience with Bloksupplychain is seamless and productive right from the start. </p><p>To kick things off, we kindly ask you to verify your email address to confirm your registration with us. Verifying your email will not only help secure your account but also enable us to keep you updated on the latest developments, offers, and important notifications.</p>

  <p>Please follow the simple steps below to verify your email address:</p>
<ul>
  <li>Open your email inbox.</li>
  <li>Locate the email from Bloksupplychain with the subject line "Verify Your Email Address".</li>
  <li> Click on the verification link provided in the email.</li>
  </ul>
Once you've completed the verification process, you'll gain full access to your Bloksupplychain account, where you can explore our services, manage your shipments, and take advantage of various features tailored to meet your business needs.

<p>Should you have any questions or require assistance at any point, our dedicated support team is here to help. Feel free to reach out to us via email at <a href="mailto:support@bloksupplychain.com">support@bloksupplychain.com</a>, and we'll be more than happy to assist you.Thank you once again for choosing Bloksupplychain. We look forward to serving you and building a successful partnership together.</p>
</div>

 `,
  })
}
export const sendQuoteInfoToTeam = async (params: {
  subject: string
  user_name: string
  company_name: string
  email: string
  total: number
  quoteLink: string
  phone_number: string
}) => {
  await resend.emails.send({
    from: 'noreply@bloksupplychain.com',
    to: process.env.BLOK_NOTIFICATION_EMAIL ?? '',
    subject: params.subject,
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 550px;
            margin-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            color: #007BFF;
            font-size:1.6rem;
          }
          .content {
            margin-top: 20px;
            font-size:1.2rem
          }
          .footer {
            margin-top: 15px;
            text-align: left;
            font-size: 1.2rem;
            color: #666;
          }
        
          ul {
            padding-left: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://static.wixstatic.com/media/0c81ff_395a9eeffcfd4e9ea08142d1dac51739~mv2.png/v1/fill/w_354,h_85,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/BSC%20Identity%20FC.png" alt="Bloksupplychain Logo" />
            <h1>New Quote Notification</h1>
          </div>
          <div class="content">
            <p>Hi Team,</p>
            <p>A new quote has been submitted by the client. Here are the details:</p>
            <ul>
              <li><strong>Client Name:</strong> ${params.user_name}</li>
              <li><strong>Company Name:</strong> ${params.company_name}</li>
              <li><strong>Email:</strong> ${params.email}</li>
              <li><strong>Phone:</strong> ${params.phone_number}</li>
              <li><strong>Quote Subject:</strong> ${params.subject}</li>
              <li><strong>Total Cost (INR):</strong> ${inFormater.format(params.total)}</li>
            </ul>
            <p>For more details , click the button below:</p>
            <a href="${params.quoteLink}" >View Quote Details</a>
          </div>
          <div class="footer">
            <p>Regards,</p>
            <p>Amith A G</p>
          </div>
        </div>
      </body>
    </html>
  `,
  })
}

export const sendQuoteInfoToZeroFreight = async (params: {
  userName: string;
  userEmail: string;
  userPhone: string;
  userCompany: string;
  subject:string;
  origin: string;
  destination: string;
  transitInfo: string;
  total: number;
  containerType: string;
  carrier: string;
  tag: string;
  detailPageUrl:string
}) => {
  const html=generateHtmlTemplate({
  userName:params.userName,
  userEmail:params.userEmail,
  userPhone:params.userPhone,
  userCompany:params.userCompany,
  origin:params.origin,
  destination:params.destination,
  transitInfo:params.transitInfo,
  total:params.total,
  containerType:params.containerType,
  carrier:params.carrier,
  tag:params.tag,
  detailPageUrl:params.detailPageUrl,
  })
  await resend.emails.send({
    from: 'noreply@bloksupplychain.com',
    to: process.env.BLOK_NOTIFICATION_EMAIL ?? '',
    subject: params.subject,
    html,
  })
}