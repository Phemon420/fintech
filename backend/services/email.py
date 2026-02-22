import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from backend.settings import settings


def _build_welcome_html(username: str) -> str:
    return f"""\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to FinVault</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F6FA;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F6FA;padding:40px 0;">
<tr><td align="center">

<!-- Container -->
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#7C3AED 0%,#5B21B6 50%,#4C1D95 100%);padding:48px 40px;text-align:center;">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td style="background:rgba(255,255,255,0.15);border-radius:14px;padding:14px;text-align:center;">
            <span style="font-size:28px;color:#FFFFFF;">📈</span>
          </td>
          <td style="padding-left:14px;">
            <span style="font-size:28px;font-weight:700;color:#FFFFFF;letter-spacing:-0.5px;">FinVault</span>
          </td>
        </tr>
      </table>
      <h1 style="color:#FFFFFF;font-size:26px;font-weight:700;margin:24px 0 8px;letter-spacing:-0.3px;">
        Welcome aboard, {username}! 🎉
      </h1>
      <p style="color:rgba(255,255,255,0.7);font-size:16px;margin:0;line-height:1.5;">
        You're now part of the future of personal finance.
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:40px;">
      <p style="font-size:16px;color:#111827;line-height:1.6;margin:0 0 24px;">
        We're thrilled to have you on board. FinVault is your all-in-one financial dashboard — designed to help you track your net worth, monitor investments, and take control of your money with confidence.
      </p>

      <!-- Feature cards -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        <tr>
          <td style="background:#EDE9FE;border-radius:12px;padding:20px;margin-bottom:12px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="vertical-align:top;padding-right:12px;font-size:24px;">🔗</td>
              <td>
                <strong style="color:#111827;font-size:15px;">Connect Your Banks</strong>
                <p style="color:#6B7280;font-size:14px;margin:4px 0 0;line-height:1.4;">Link all your accounts in one place for a complete financial picture.</p>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr><td style="height:12px;"></td></tr>
        <tr>
          <td style="background:#FFF7ED;border-radius:12px;padding:20px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="vertical-align:top;padding-right:12px;font-size:24px;">📊</td>
              <td>
                <strong style="color:#111827;font-size:15px;">Track Investments</strong>
                <p style="color:#6B7280;font-size:14px;margin:4px 0 0;line-height:1.4;">Real-time portfolio tracking with beautiful charts and insights.</p>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr><td style="height:12px;"></td></tr>
        <tr>
          <td style="background:#ECFDF5;border-radius:12px;padding:20px;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="vertical-align:top;padding-right:12px;font-size:24px;">🛡️</td>
              <td>
                <strong style="color:#111827;font-size:15px;">Bank-Grade Security</strong>
                <p style="color:#6B7280;font-size:14px;margin:4px 0 0;line-height:1.4;">256-bit encryption keeps your data safe. Always.</p>
              </td>
            </tr></table>
          </td>
        </tr>
      </table>

      <!-- CTA button -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <a href="#" style="display:inline-block;background:linear-gradient(135deg,#7C3AED,#6D28D9);color:#FFFFFF;text-decoration:none;font-size:16px;font-weight:600;padding:16px 48px;border-radius:12px;letter-spacing:0.2px;">
              Open Your Dashboard →
            </a>
          </td>
        </tr>
      </table>

      <p style="font-size:14px;color:#6B7280;line-height:1.6;margin:32px 0 0;text-align:center;">
        Got questions? Just reply to this email — we're always happy to help.
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#F9FAFB;padding:24px 40px;border-top:1px solid #E5E7EB;text-align:center;">
      <p style="font-size:13px;color:#9CA3AF;margin:0;line-height:1.5;">
        © 2026 FinVault · Your finances, simplified.<br/>
        <span style="color:#D1D5DB;">You received this because you signed up at FinVault.</span>
      </p>
    </td>
  </tr>

</table>
</td></tr></table>
</body>
</html>"""


def send_welcome_email(to_email: str, username: str) :
    msg = MIMEMultipart("alternative")
    msg["From"] = f"FinVault <{settings.SMTP_USER}>"
    msg["To"] = to_email
    msg["Subject"] = "Welcome to FinVault — Let's build your financial future 🚀"

    plain = f"Welcome to FinVault, {username}! Your account is ready. Log in to explore your dashboard."
    html = _build_welcome_html(username)

    msg.attach(MIMEText(plain, "plain"))
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASS)
        server.sendmail(settings.SMTP_USER, to_email, msg.as_string())
