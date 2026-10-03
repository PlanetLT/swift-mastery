# Swift Mastery

A study guide for building Apple apps with Swift, from a first Xcode project to a professional release. The language is taught once. Then the same ideas are shaped for three surfaces:

1. **iPhone** apps with SwiftUI
2. **Mac** apps, documents, and distribution
3. **Apple Watch** apps, complications, and the five-second test

Practice happens in Xcode on a Mac. This site is the reading room: the idea, a short original sample, the mistake people hit, an exercise, and a ranked list of sources.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:47291](http://127.0.0.1:47291).

```bash
npm run build
npm run lint
```

`npm run build` writes a static site to `out/`. This project does not use `next start`.

Progress (lessons read, exercises done) is stored in the browser only. There is no account and no server database.

## Vercel

Publishing is a manual GitHub Action, [Deploy to Vercel](.github/workflows/deploy-vercel.yml). It builds the static site in GitHub Actions and uploads that build to Vercel production. It does not run on every push.

1. Create a [Vercel](https://vercel.com) project for this repository. Leave Git deployments off, or disconnect the Git integration afterward, so a push does not publish on its own.
2. Link the project once from this folder (`npx vercel link`). Copy `orgId` and `projectId` from `.vercel/project.json`. That folder stays out of git.
3. Create a token at [Vercel account tokens](https://vercel.com/account/tokens).
4. In the GitHub repository, open **Settings → Secrets and variables → Actions** and add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
5. Open **Actions → Deploy to Vercel → Run workflow**.

The site is served from the Vercel domain root, such as `https://<project>.vercel.app`. If GitHub Pages was enabled before, turn it off under **Settings → Pages** so the old URL is no longer the published site.

## How the guide is organized

- **Foundation** — Swift, SwiftUI state, and a list that persists with SwiftData.
- **iPhone** — layout through TestFlight, privacy, and a testable module.
- **Mac** — windows, menus, tables, the sandbox, notarization, and the menu bar.
- **Transfer map** — what carries to the next device, and what you learn again.
- **Source library** — Apple pathways, documentation, WWDC sessions, the Swift book, the Human Interface Guidelines, and the courses and forums the lessons cite.

Each lesson's reading list is ordered: official material first, then one session or course. The guide does not reprint those works.

## What you need for the exercises

- A Mac that can run the current Xcode
- Xcode from the Mac App Store
- An Apple Account (a paid developer membership only when a lesson ships to TestFlight or notarization)

Simulators are enough until a lesson says otherwise.
# swift-mastery
