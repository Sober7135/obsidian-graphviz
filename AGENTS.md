# obsidian-graphviz

- TypeScript source lives in `src/`.
- Entry point is `src/main.ts`, bundled to `main.js` with esbuild.
- Required plugin files in the vault: `main.js`, `manifest.json`, `styles.css`.

## Development

- Install dependencies: `npm install`
- Dev build (watch): `npm run dev`
- Production build: `npm run build`
- Lint: `eslint ./src`

## Notes

- Keep `main.ts` focused on plugin lifecycle; put feature logic in separate modules.
- Do not commit `node_modules/` or generated `main.js`.
- Follow Obsidian plugin policies for privacy and offline-first behavior.
