# Birthday app

Vite + React + TypeScript. One screen per task.

```
npm install
npm run dev      # local + LAN (phone testing)
npm run build    # type-check + production build
```

Password: set `VITE_BIRTHDAY_PASSWORD` (DD-MM-YYYY) in `.env` (see `.env.example`).
Default is a demo value in `src/config.ts`. Frontend-only check, not secure authentication.

The app loads its game photos and letter photos from `public/assets/photos/`.
The game currently uses `photo-01.png` through `photo-06.png`; the letter uses
`letter-01.png` through `letter-04.png`. `photo-07.png` and `photo-08.png` are
present but not currently referenced.

## Vercel deployment

Use the Vite framework preset, `npm run build` as the build command, and `dist` as the output directory. Vercel can use the existing `package-lock.json` to install dependencies; no custom install command or `vercel.json` is needed.

The files in `public/assets/photos/` are excluded from Git but are still required at build time. Supply all 12 files in that directory in the deployment workspace before building; the current app reads them from `/assets/photos/...`, and Vite copies them into `dist`. A Git-connected Vercel build will not receive Git-ignored files, so GitHub integration alone is not sufficient to deploy these images.

This keeps the photo files out of the GitHub repository only. Vercel serves the copied static images at public URLs, so visitors can view and download them. This setup does not provide access-controlled image delivery. The photos must be present in the deployment workspace for every build.
