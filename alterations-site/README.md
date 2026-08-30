# Alterations website

A one-page static site for a wedding gown and alterations business in Tyler, Texas.
No framework, no build step, no dependencies — `index.html` is the entire site.

**Status: draft.** Prices, hours, years of experience and every photograph are placeholders
waiting on answers from the owner. There is a banner at the top of the page saying so.
Delete that block before launch.

---

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site |
| `thanks.html` | Where the contact form lands after submitting |
| `vercel.json` | Config if you deploy to Vercel |
| `netlify.toml` | Config if you deploy to Netlify |
| `check-widths.js` | Catches sideways-scroll bugs at 11 screen widths |
| `CLAUDE.md` | Design system and content rules. Read before editing |

The site works on any static host. Both config files can sit in the repo together —
each host ignores the other's.

---

## Seeing it locally

Open `index.html` in a browser. That's it.

For a proper local server:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

---

## Picking a host — read this before you deploy

**Vercel's free Hobby plan does not permit commercial use.** Their docs state it plainly:
"the Hobby plan restricts users to non-commercial, personal use only." A website for a
real business that takes customer enquiries is commercial. Projects have been paused over
this. Vercel Pro is $20/month, which is almost certainly more than this business wants to
spend on hosting.

| Host | Free tier allows commercial use | Built-in forms | Notes |
|---|---|---|---|
| **Netlify** | Yes | Yes | Easiest all-in-one. Recommended. |
| **Cloudflare Pages** | Yes | No | Unlimited bandwidth, fastest network |
| **GitHub Pages** | Yes | No | Simplest, but no redirects or headers |
| **Vercel Hobby** | **No** | No | Fine for the draft, not for the live site |

Using Vercel to show your aunt the draft is fine — it's not commercial yet. Just don't
build the live business site on it without paying for Pro.

The contact form in this repo posts to Web3Forms, which works identically on all four
hosts, so switching later costs you nothing.

---

## Deploy

### Step 1 — push to GitHub (same for every host)

```bash
git init
git add .
git commit -m "Initial draft of the alterations site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/alterations-site.git
git push -u origin main
```

Keep the repo **private** while it's a draft.

### Step 2a — Netlify (recommended for the real site)

1. netlify.com → sign in with GitHub
2. **Add new site → Import an existing project → GitHub** → pick the repo
3. Leave the build command empty, publish directory `.`
4. Deploy
5. **Site configuration → Change site name** so the URL is presentable

### Step 2b — Vercel (fine for the draft)

1. vercel.com → sign in with GitHub
2. **Add New → Project** → import the repo
3. Framework preset: **Other**. Leave build and output settings empty
4. Deploy

Or from the terminal, without GitHub at all:

```bash
npx vercel        # preview URL
npx vercel --prod # production URL
```

Either way, every `git push` redeploys automatically.

### Step 3 — make the form actually send

The form is wired but inert until you add a key.

1. Go to web3forms.com, enter her email address, and they email you an access key
2. In `index.html`, replace `YOUR-ACCESS-KEY-HERE` with that key
3. In the same block, change the `redirect` value to `https://YOUR-REAL-DOMAIN/thanks.html`
4. Push, then submit the form yourself to confirm the email arrives

Free tier is 250 submissions a month. No account, no server, no cost.

*If you land on Netlify and would rather use their built-in forms:* replace the
`<form action="...">` tag with
`<form name="fitting" method="POST" data-netlify="true" action="/thanks.html">`,
add `<input type="hidden" name="form-name" value="fitting">`, and delete the Web3Forms
hidden fields. Submissions then appear in the Netlify dashboard.

### Step 4 — a custom domain, once the name is settled

Buy the domain (roughly $12/year at Namecheap, Porkbun or Cloudflare), then add it in your
host's domain settings and follow the DNS instructions. HTTPS is automatic and free
everywhere.

Don't do this until the business-name question in `CLAUDE.md` is answered.

---

## Making changes

Everything is in `index.html`. The CSS sits in one `<style>` block at the top, organised by
section. Colours are CSS variables in `:root` — change one there and it updates everywhere.

Read `CLAUDE.md` first. It has the palette, the type rules, and the list of placeholders.

### After any layout change, check it doesn't scroll sideways

This is the bug that keeps coming back, because the script wordmark in the header is wide.

```bash
npm install -D playwright
npx playwright install chromium
node check-widths.js
```

It tests 11 widths from 320px to 1920px and names the offending element when one overflows.

---

## Before launch

- [ ] Settle the business name — everything else depends on it
- [ ] Get the logo as a transparent PNG and an SVG, replace the CSS stand-in
- [ ] Replace every price with her real price list
- [ ] Replace the hours
- [ ] Replace the About section with her actual story
- [ ] Shoot and drop in real photographs — the dashed boxes name each shot needed
- [ ] Add the Web3Forms access key and test that the email arrives
- [ ] Set up her Google Business Profile, then embed that map in the contact section
- [ ] Set the real domain in the `canonical` and `og:url` tags
- [ ] Add `og-image.jpg` (1200×630) so shared links look right on Facebook
- [ ] Delete the draft banner block at the top of `index.html`
- [ ] Point the Facebook and Instagram links in the footer at her real profiles
- [ ] Move off Vercel Hobby if that's where the draft lived
