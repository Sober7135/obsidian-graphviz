# obsidian-graphviz

Render Graphviz diagrams in Obsidian using viz.js.

## Usage

- Add a code block with language `graphviz` or `dot`:

  ```markdown
  ```graphviz
  digraph G {
    a -> b;
    b -> c;
  }
  ```
  ```

- Switch to reading view to see the rendered SVG.
- Layout engine can be set in the plugin settings (default: `dot`).

## Installation

1. Build the plugin:
   - `npm install`
   - `npm run build`
2. Copy `main.js`, `manifest.json`, and `styles.css` into:
   - `<Vault>/.obsidian/plugins/obsidian-graphviz/`
3. In Obsidian, enable **obsidian-graphviz** under **Settings → Community plugins**.

## Development

- Source code: `src/`
- Dev (watch): `npm run dev`
- Production build: `npm run build`
- Lint: `eslint ./src`
