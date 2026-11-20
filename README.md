# dc-detailing

Single-page website for DC Detailing Services (Moncton, NB): packages, gallery, reviews and a booking / free quote form.

Status: in development.

```bash
npm install
npm run dev        # local dev server
npm run test       # unit tests
npm run test:e2e   # end-to-end tests (port 5179)
```

Set `VITE_BOOKING_ENDPOINT` at build time to the form service URL that should receive booking requests. Without it the form runs in demo mode and **nothing is delivered**. See `CLAUDE.md` for details.
