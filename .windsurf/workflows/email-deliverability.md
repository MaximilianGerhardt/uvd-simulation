---
description: Use when setting up transactional or newsletter emails, configuring email sending services (Resend, SendGrid, SES), troubleshooting spam/deliverability issues, designing branded HTML emails, or implementing multilingual email templates. Also use when configuring DNS records (SPF, DKIM, DMARC) for email authentication.
---

# Email Deliverability & Design Best Practices

Complete protocol for sending emails that reach the inbox — not spam. Covers DNS authentication, anti-spam optimization, branded HTML email design, multilingual templates, and Resend integration.

---

## 1. DNS Authentication (SPF, DKIM, DMARC)

Without proper DNS authentication, emails will land in spam. All three are required.

### SPF (Sender Policy Framework)
Tells receiving servers which mail servers are authorized to send for your domain.

```
Type:  TXT
Host:  send.mail          (or whatever your sending subdomain is)
Value: v=spf1 include:amazonses.com ~all
```
- `include:amazonses.com` — Resend uses Amazon SES
- `~all` — soft fail for unauthorized senders (recommended)
- `-all` — hard fail (stricter, use after testing)

### DKIM (DomainKeys Identified Mail)
Cryptographic signature proving the email wasn't tampered with in transit.
- Resend generates the DKIM key — add it as a TXT record
- Host: `resend._domainkey.mail` (Resend provides the exact host)
- Value: The public key Resend gives you

### DMARC (Domain-based Message Authentication)
Policy telling receivers what to do when SPF/DKIM fail.

```
Type:  TXT
Host:  _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:your@email.com
```

**DMARC Policy Levels:**

| Policy | Meaning | When to Use |
|--------|---------|-------------|
| `p=none` | Do nothing, only monitor | Never in production — hurts reputation |
| `p=quarantine` | Send to spam on failure | Recommended default |
| `p=reject` | Reject entirely on failure | After months of clean sending |

**CRITICAL:** `p=none` signals to Gmail/Outlook that you don't care about email security. This actively HURTS deliverability. Always use at least `p=quarantine`.

### MX Record (for bounce handling)
```
Type:  MX
Host:  send.mail
Value: feedback-smtp.eu-west-1.amazonses.com
Priority: 10
```
(Region may vary — check Resend dashboard)

### Verification
After setting DNS records:
1. Check Resend Dashboard → Domains → all records should be green/verified
2. DNS propagation takes 10-60 minutes
3. Test with [mail-tester.com](https://www.mail-tester.com/) — aim for 9/10 or higher

---

## 2. Anti-Spam Content Rules

### Sender Name
- **Title Case**: `UVD Trading` — professional, trustworthy
- **NO ALL CAPS**: `UVD.TRADING` — triggers spam filters, looks aggressive
- **No special characters**: Dots, exclamation marks, brackets = spam signals
- **Consistent**: Same sender name on every email
- **No "noreply"**: Use a real-looking address like `news@mail.domain.com`

### Subject Line
- **No ALL CAPS** in subject
- **No excessive punctuation**: `!!!` or `???` = spam trigger
- **No spam trigger words**: "FREE", "ACT NOW", "LIMITED TIME", "CLICK HERE"
- **Keep under 60 characters**
- **Personalize if possible**: Include subscriber name or locale-specific content

### HTML Email Body
- **Text-to-HTML ratio**: Keep above 60% text. Heavy HTML with little text = spam signal
- **Always include plain text version**: `text` field alongside `html`
- **No emojis in body text**: Some filters flag emoji-heavy emails
- **No JavaScript**: Will be stripped and may trigger filters
- **No external images if possible**: Inline or data URIs preferred
- **Use hex colors, not rgba()**: `rgba()` is poorly supported in email clients and increases HTML complexity
- **Minimize inline styles**: Keep HTML lean — every extra byte hurts
- **No URL shorteners**: bit.ly, tinyurl = instant spam flag
- **All links must use HTTPS**

### Required Headers
```typescript
headers: {
  "List-Unsubscribe": "<https://domain.com/api/newsletter/unsubscribe?token=...>",
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
}
```
- **Gmail requirement since Feb 2024** for bulk senders
- Must point to a real, functional unsubscribe endpoint
- Enables the "Unsubscribe" button in Gmail/Yahoo

---

## 3. Branded HTML Email Template

### Design Principles
- **Match your website branding** — same colors, fonts, logo treatment
- **Max width: 520px** — optimal for all email clients
- **Light background**: `#f8f8f8` body, `#ffffff` card
- **Single-column layout** — no complex grids (email clients break them)
- **Pill buttons**: `border-radius: 100px` matching website style
- **System font stack**: Email clients don't load web fonts reliably

### Font Stack for Email
```
Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif
```

### Template Structure
```
┌─────────────────────────┐
│ Header (Logo/Brand)     │  border-bottom
├─────────────────────────┤
│ Body                    │
│  - Heading              │
│  - Description text     │
│  - CTA Button           │
│  - Privacy note box     │
│  - Fine print           │
├─────────────────────────┤
│ Language Selector Strip  │  bg: #f8f8f8
├─────────────────────────┤
│ Footer                  │
│  - Brand logo (small)   │
│  - Settings link        │
│  - Unsubscribe link     │
└─────────────────────────┘
```

### Color Reference (hex only, no rgba)
| Element | Color |
|---------|-------|
| Heading text | `#1b1b1b` |
| Body text | `#8a8a8a` |
| Muted text | `#999` |
| Fine print | `#bbb` |
| Very muted | `#ccc` |
| Accent/Links | `#FF6B00` |
| Borders | `#D0D0D0` |
| Alt background | `#f8f8f8` |
| Button bg | `#1b1b1b` |
| Button text | `#ffffff` |

---

## 4. Multilingual Email Support

### In-Email Language Selector
Include a language strip in every email so users can change their preference:

```html
<div style="padding:14px 28px;background:#f8f8f8;border-top:1px solid #D0D0D0;text-align:center">
  <span style="font-size:11px;color:#999">Change language:</span>
  <a href="...?lang=en" style="...;background:#FF6B00;color:#fff">EN</a>
  <a href="...?lang=de" style="...;background:#f0f0f0;color:#1b1b1b">DE</a>
  <!-- more locales -->
</div>
```

- Current locale highlighted with accent color (`#FF6B00`)
- Other locales in neutral gray (`#f0f0f0`)
- Links point to newsletter settings page with `?lang=xx` parameter

### Locale-Aware Content
- Subject line translated per locale
- Body text translated per locale
- Button text translated per locale
- Privacy note translated per locale
- Unsubscribe/Settings link text translated
- `<html dir="rtl" lang="ar">` for RTL languages
- `text-align: right` for RTL content sections

### Settings Page
- Accessible via unique token (no login required)
- Shows current language preference
- Allows changing language at any time
- Email shown masked for privacy (`ma***@gmail.com`)
- URL pattern: `/newsletter/settings?token=<confirm_or_unsub_token>`

---

## 5. Resend Integration

### Setup
1. Create account at [resend.com](https://resend.com)
2. Add your sending domain (e.g., `mail.yourdomain.com`)
3. Add the DNS records Resend provides (SPF, DKIM, MX, bounce CNAME)
4. Wait for verification (all records green)
5. Store API key as `RESEND_API_KEY` in env (server-only, never `NEXT_PUBLIC_`)

### Sending Pattern
```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "Brand Name <news@mail.domain.com>",
  to: recipientEmail,
  subject: localizedSubject,
  html: htmlContent,
  text: plainTextContent,       // ALWAYS include
  headers: {
    "List-Unsubscribe": `<${unsubUrl}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  },
});
```

### Environment Variables
```
RESEND_API_KEY=re_xxxxxxxxxxxx
NEWSLETTER_FROM_EMAIL=Brand Name <news@mail.domain.com>
```

### From Email Rules
- Sender name: Title Case, no ALL CAPS, no special chars
- Use a subdomain: `mail.domain.com` not `domain.com` (protects root domain reputation)
- Consistent across all emails

---

## 6. Double Opt-In (DOI) — GDPR Requirement

### Why DOI is Mandatory (EU/Germany)
- **Art. 7 Abs. 1 DSGVO**: Must be able to prove consent
- **UWG §7 Abs. 2 Nr. 3**: Commercial emails without explicit consent = competition law violation
- **German courts (OLG München, BGH)**: Accept DOI as the only valid proof

### Implementation Flow
```
1. User enters email → stored as unconfirmed
2. Confirmation email sent with unique token link
3. User clicks link → marked as confirmed
4. Only confirmed subscribers receive future emails
5. Token cleared after confirmation (single-use)
```

### Unconfirmed Subscriber Cleanup
- GDPR data minimization: delete unconfirmed subscribers after 7 days
- Implement via Supabase cron job or Edge Function
- Log deletion for audit trail

---

## 7. Reading DMARC Aggregate Reports

Google, Yahoo, and other providers send XML aggregate reports to the `rua` email address in your DMARC record. These arrive as `.xml.gz` or `.zip` attachments.

### Report Structure
```xml
<feedback>
  <report_metadata>      <!-- Who sent the report, date range -->
  <policy_published>     <!-- Your DMARC policy as seen by the receiver -->
  <record>               <!-- One per source IP group -->
    <row>
      <source_ip>        <!-- IP that sent the email -->
      <count>            <!-- Number of emails from this IP -->
      <policy_evaluated>
        <disposition>    <!-- none | quarantine | reject -->
        <dkim>           <!-- pass | fail -->
        <spf>            <!-- pass | fail -->
      </policy_evaluated>
    </row>
    <auth_results>       <!-- Detailed auth check results -->
      <dkim domain="..." result="pass|fail" selector="..." />
      <spf domain="..." result="pass|fail" />
    </auth_results>
  </record>
</feedback>
```

### What to Check
| Field | Good | Bad |
|-------|------|-----|
| `disposition` | `none` (email delivered normally) | `quarantine` or `reject` |
| `dkim result` | `pass` | `fail` — check DKIM DNS record |
| `spf result` | `pass` | `fail` — check SPF DNS record |
| `source_ip` | Known IPs (Amazon SES: `54.240.x.x`) | Unknown IPs = possible spoofing |

### Verified Working Configuration (UVD Trading / Resend)
Based on a real Google DMARC report with 100% pass rate:
```
DMARC:  _dmarc.uvd.trading → v=DMARC1; p=quarantine; rua=mailto:info@p-a.llc
SPF:    send.mail.uvd.trading → v=spf1 include:amazonses.com ~all
DKIM:   resend._domainkey.mail.uvd.trading → [Resend public key]
MX:     send.mail.uvd.trading → feedback-smtp.eu-west-1.amazonses.com (priority 10)
```
- All 11 emails passed DKIM + SPF
- All source IPs were Amazon SES (`54.240.x.x`)
- Disposition: `none` on all records (no emails quarantined or rejected)

### Automated Report Monitoring
For high-volume senders, use a DMARC report aggregator:
- [Postmark DMARC](https://dmarc.postmarkapp.com/) — free
- [dmarcian](https://dmarcian.com/) — free tier
- [DMARC Analyzer](https://www.dmarcanalyzer.com/) — paid

---

## 8. Deliverability Checklist

### Before First Send
- [ ] SPF record added and verified in Resend
- [ ] DKIM record added and verified in Resend
- [ ] DMARC set to `p=quarantine` (not `p=none`)
- [ ] MX record for bounce handling
- [ ] Sender name is Title Case, no ALL CAPS
- [ ] From address uses sending subdomain (not root domain)
- [ ] Plain text version included alongside HTML
- [ ] List-Unsubscribe header present
- [ ] HTML uses hex colors only (no rgba)
- [ ] No emojis in email body HTML
- [ ] No URL shorteners in links
- [ ] All links are HTTPS
- [ ] Email passes [mail-tester.com](https://www.mail-tester.com/) with 9+/10

### After Sending
- [ ] Check Resend dashboard for bounce/complaint rates
- [ ] Monitor DMARC reports (if `rua` configured)
- [ ] Track confirmation rates (low rate = spam folder issue)
- [ ] Check spam folder manually with test accounts (Gmail, Outlook, Yahoo)

### Ongoing
- [ ] Keep bounce rate below 2%
- [ ] Keep complaint rate below 0.1%
- [ ] Clean inactive subscribers regularly
- [ ] Don't send to unconfirmed addresses
- [ ] Gradually increase sending volume (warm up domain)
