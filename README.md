# NASAR Registration CRUD

A pre-built static React registration form with CRUD functionality. The deployable app lives in `index.html` and the bundled assets in `assets/`.

## Local preview

```bash
npm run preview
```

Then open <http://localhost:4173>.

## Build for deployment

```bash
npm run build
```

The build command copies all required static files into `dist/`, which is the publish directory configured for Netlify and Vercel.

## Deployment options

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- The included `netlify.toml` already sets these values and adds a single-page app fallback.

### Vercel

- Build command: `npm run build`
- Output directory: `dist`
- The included `vercel.json` already sets these values and adds a single-page app fallback.

### GitHub Pages or any static host

This repository can also be served directly from the repository root. Asset links are relative, so the app works from a root domain or a subpath. The included `.nojekyll` file prevents GitHub Pages from applying Jekyll processing.
