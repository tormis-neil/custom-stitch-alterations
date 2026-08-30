# Project notes

Static one-page marketing site for an alterations and tailoring business in Tyler, Texas.
No build step, no framework, no dependencies. `index.html` is the whole site.

## Unresolved — ask before changing

- **The business name is not settled.** The Facebook page says "Ana's Alterations LLC"
  (214 area code, Dallas); the logo, business card and this site say "CustomStitchStudio LLC"
  (903 area code, Tyler). Do not standardise on one without asking first.
- `customstitchstudio.com` is already owned by an unrelated alterations business in Virginia.
  The domain for this site has not been chosen.
- **Hosting:** Vercel's free Hobby plan forbids commercial use, so it is fine for the draft
  but not for the live business site. Netlify and Cloudflare Pages both allow commercial
  use on their free tiers. The contact form posts to Web3Forms so the host stays swappable.

## Design system

Colours are sampled from the owner's actual logo artwork and business card. Do not invent
new hues; use the tokens in the `:root` block of `index.html`.

| Token | Value | Use |
|---|---|---|
| `--ground` | `#FAF7F5` | page background |
| `--surface` | `#FFFFFF` | cards |
| `--linen` | `#F2EDE9` | alternating section bands |
| `--ink` | `#2A1B33` | body text (deep aubergine, never pure black) |
| `--ink-soft` | `#5C4A66` | secondary text |
| `--line` | `#E4DAD9` | borders |
| `--violet` | `#8B26CD` | primary action — from the wordmark gradient |
| `--plum` | `#5B1A86` | headings, hover, button shadow |
| `--rose` | `#C74B88` | accent only, large text or small marks |
| `--slate` | `#5F7FAD` | focus rings |
| `--dusty` | `#A4B7C9` | dividers and decoration only — fails text contrast |

**Do not use `#7117EA`.** That was the original template's purple. It appears nowhere in
her branding and was deliberately replaced.

**Colour proportion:** roughly 60% ground, 25% linen, 10% violet, 5% rose. There is exactly
one full-bleed violet band on the page (the CTA). Adding a second weakens both.

## Type

- Display: **Cormorant Garamond** — headings at 24px and above only. Its hairlines break
  below that.
- Body: **Karla** — everything else, including all form fields and prices.
- Script: **Yellowtail** — the logo wordmark and the signature only. Never body text.

Loaded from Google Fonts in one `<link>`. Do not add a fourth family.

## Content rules

- Written in **first person**. She is one seamstress, not a team. Never reintroduce
  "our expert tailors" or "our skilled team" — that was template copy and it contradicts
  the rest of the site.
- Bridal is the lead service everywhere. It is the highest-value work.
- The city name belongs in the first line of the hero for local search.
- Full name, address, phone and hours must stay in the footer as plain text.

## Placeholders still to replace

Everything below is invented and marked in the page. Replace once the owner answers the
intake questionnaire.

- All prices (`From $250` / `$60` / `$15`)
- Opening hours
- "25 years" and the whole About section
- Every photograph — the dashed boxes name the exact shot needed
- The seasonal wording in the CTA band
- The draft banner at the very top of `index.html`: delete that whole block before launch

**Never use stock photos of tape measures or sewing machines.** The previous draft of this
site shipped with a stock photo of a Stanley construction tape measure. Placeholder boxes
are better than a wrong photo.

## Accessibility

Every text/background pair in the token table clears WCAG AA at the size it is used.
If you change a colour, re-check the contrast. `--dusty` and `--rose` are the two that
cannot carry small text.

## Verify after any layout change

The page must not scroll sideways at any width from 320px to 1920px. The header is the
part that breaks first — the script wordmark is wide, so it is sized with `clamp()` and
the nav collapses at 1000px, well before the content columns do.
