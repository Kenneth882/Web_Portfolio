# Kenneth Romero Linares — Portfolio

A Pokémon-inspired portfolio frontend using the included Departure Mono font. Built with HTML, CSS, and JavaScript, with no package dependencies.

## Run locally

```sh
npm run dev
```

Open http://localhost:5173. Requires Node.js 20.11 or later.

## Build

```sh
npm run check
npm run build
```

Deploy the generated `dist/` folder to a static host. Nothing is published automatically.

## Customize

- Edit the `projects` array in `app.js` to replace the clearly labeled placeholder entries.
- Edit `openAbout()` for the bio, résumé, and contact details.
- Edit `styles.css` for colors, layout, and the Pokédex and Poké Ball components.
- The local font and its SIL Open Font License are in `public/fonts/`.

Drag the Pokédex to swing it; click or press Enter for the profile. Each ball opens a project entry. Dialogs support Escape, focus return, and previous/next navigation. The footer pauses motion, and reduced-motion preferences are respected.
