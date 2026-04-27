import { inFormater } from "./utils";

interface GenerateHtmlTemplateProps  {
  userName: string;
  userEmail: string;
  userPhone: string;
  userCompany: string;
  origin: string;
  destination: string;
  transitInfo: string;
  total: number;
  containerType: string;
  carrier: string;
  tag: string;
  detailPageUrl:string
};

export function generateHtmlTemplate(infor: GenerateHtmlTemplateProps): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Selected Offer - Zere Freights</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #ffffff; margin: 0; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
      <tr>
        <td align="center">
          <table width="600" cellpadding="20" cellspacing="0" border="0" style="border: 1px solid #e5e7eb; border-radius: 8px;">
            <tr>
              <td style="text-align: left;">
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size: 24px; font-weight: bold; color: #111827;">
                      Zero Freights Confirmed Quote
                    </td>
                    <td style="text-align: right;">
                      <span style="background-color: #d1fae5; color: #065f46; font-size: 12px; padding: 4px 10px; border-radius: 20px;">
                        ${infor.tag}
                      </span>
                    </td>
                  </tr>
                </table>

                <hr style="margin: 20px 0;" />

                <!-- Customer Information -->
                <table width="100%" cellpadding="5" cellspacing="0" border="0">
                  <tr><td colspan="2" style="font-weight: bold; font-size: 16px;">Customer Information</td></tr>
                  <tr><td width="30%"><strong>Name:</strong></td><td>${infor.userName}</td></tr>
                  <tr><td><strong>Email:</strong></td><td>${infor.userEmail}</td></tr>
                  <tr><td><strong>Phone:</strong></td><td>${infor.userPhone}</td></tr>
                  <tr><td><strong>Company:</strong></td><td>${infor.userCompany}</td></tr>
                </table>

                <br />

                <!-- Shipping Details -->
                <table width="100%" cellpadding="5" cellspacing="0" border="0">
                  <tr><td colspan="2" style="font-weight: bold; font-size: 16px;">Shipping Details</td></tr>
                  <tr><td width="30%"><strong>Line:</strong></td><td>${infor.carrier}</td></tr>
                  <tr><td><strong>Service Type:</strong></td><td>${infor.containerType}</td></tr>
                  <tr><td><strong>Transit Time:</strong></td><td>${infor.transitInfo}</td></tr>
                </table>

                <br />

                <!-- Pricing -->
                <table width="100%" cellpadding="5" cellspacing="0" border="0">
                  <tr><td colspan="2" style="font-weight: bold; font-size: 16px;">Pricing</td></tr>
                  <tr>
                    <td colspan="2" style="font-size: 24px; color: #2563eb; font-weight: bold;">
                      ${inFormater.format(infor.total)}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="font-size: 12px; color: #6b7280;">
                      Final pricing may vary based on additional requirements
                    </td>
                  </tr>
                </table>

                <br />

                <!-- Route Info -->
                <table width="100%" cellpadding="5" cellspacing="0" border="0">
                  <tr><td colspan="2" style="font-weight: bold; font-size: 16px;">Route Information</td></tr>
                  <tr><td width="30%"><strong>From:</strong></td><td>${infor.origin}</td></tr>
                  <tr><td><strong>To:</strong></td><td>${infor.destination}</td></tr>
                </table>

                <br />

                <!-- Link Button -->
                <table width="100%" cellpadding="10" cellspacing="0" border="0">
                  <tr>
                    <td align="center">
                      <a href="${infor.detailPageUrl}" style="background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; font-size: 14px;">
                        View Full Details
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
