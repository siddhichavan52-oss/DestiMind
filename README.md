# DestiMind frontend — Landing + Auth

Plain React (Create React App), no Tailwind, no Vite.

## Run it

```
npm install
npm start
```

Opens at http://localhost:3000

- `/` — Landing page (hero, how it works, trending destinations)
- `/login` — Login page
- `/signup` — Signup page

## Structure

```
src/
  index.js          entry point + router
  index.css          global tokens (colors, fonts) used everywhere
  App.js              routes
  pages/
    Landing.js / Landing.css
    Login.js
    Signup.js
    Auth.css          shared styling for Login + Signup
```

## Notes

- Icons are from `lucide-react` (already in package.json).
- Colors and fonts are defined as CSS variables at the top of `src/index.css` — reuse
  `var(--midnight)`, `var(--dawn)`, `var(--coral)`, `var(--teal)`, `var(--paper)`, `var(--ink)`, `var(--mute)`
  so the other pages (Preference form, Results, Detail) match this look.
- Login/Signup currently just validate and show a success message — swap the `// TODO`
  in `handleSubmit` for a real call to the Express backend once it's ready.
