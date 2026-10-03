# Font usage

The site uses the Source family so long lessons stay easy to read. Faces are loaded in `src/app/layout.tsx` with `next/font/google` and assigned in `src/app/globals.css`.

## Faces

| Role | Font | CSS variable | Tailwind utility | Weight |
| --- | --- | --- | --- | --- |
| Body, navigation, buttons, labels | Source Sans 3 | `--font-sans` | `font-sans` | 400 for text, 500–600 for labels |
| Headings | Source Serif 4 | `--font-heading` | `font-heading` | 600 |
| Code samples | Source Code Pro | `--font-mono` | `font-mono` | 400 and 500 |

## Where each face is used

- **Source Sans 3** is the default on `html`. It covers paragraphs, navigation, buttons, eyebrows, and the “Swift Mastery” name in the header.
- **Source Serif 4** is used for `h1`–`h4`, including page titles, section titles, and card titles that use `font-heading`.
- **Source Code Pro** is used for Swift samples, inline code, and any element with `font-mono`.

## Reading settings

- Body line height is `1.65`.
- Headings use weight `600` and letter spacing `-0.015em`.
- Lesson paragraphs use `leading-8`.

## Fallbacks

If a Source file does not load, the browser uses the next family in the stack:

- Source Sans 3, then `ui-sans-serif`, `system-ui`, `sans-serif`
- Source Serif 4, then `Georgia`, `Times New Roman`, `serif`
- Source Code Pro, then `ui-monospace`, `monospace`
