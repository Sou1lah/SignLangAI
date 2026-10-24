# SignLangAI

SignLangAI is a monorepo foundation for a gamified sign-language learning app, with future plans for sign-to-text, text-to-sign, chat, and video calling. This scaffold intentionally contains only Hello World app/API output; no learning features have been implemented.

## Status

| Component | URL | Status |
|---|---|---|
| Website | [http://localhost:3000](http://localhost:3000) | Hello World |
| Mobile (Expo web preview) | [http://localhost:8081](http://localhost:8081) | Hello World |
| AI API | [http://localhost:8000](http://localhost:8000) (`/docs`) | Hello World; `/health` returns `{"status":"ok"}` |
| LiveKit reference | http://localhost:4006 | Docker dev mode verified; stopped after check |

## Quick start

```sh
make setup
make dev
```

## Ports

| Service | Port |
|---|---:|
| Website | 3000 |
| AI API | 8000 |
| Expo dev server / web preview | 8081 |
| Third-party references | 4000–4008; assignments and status in [thirdparty/MANIFEST.md](thirdparty/MANIFEST.md) |

## Folder map

- [`mobile/`](mobile/) — Expo Router and TypeScript app.
- [`website/`](website/) — Next.js and TypeScript app.
- [`ai/`](ai/) — FastAPI service, managed and locked with uv.
- [`ui-library/`](ui-library/) — empty shared-component placeholder.
- [`UML/`](UML/) — draw.io source and exports.
- [`UML/usecase/`](UML/usecase/) — use-case diagrams.
- [`UML/class/`](UML/class/) — class diagrams.
- [`UML/sequence/`](UML/sequence/) — sequence diagrams.
- [`UML/activity/`](UML/activity/) — activity diagrams.
- [`UML/architecture/`](UML/architecture/) — architecture diagrams.
- [`UML/exports/`](UML/exports/) — rendered diagrams.
- [`Memoire/`](Memoire/) — thesis and research workspace.
- [`Memoire/01-problematique/`](Memoire/01-problematique/) — problem statement.
- [`Memoire/02-recherche/`](Memoire/02-recherche/) — research materials.
- [`Memoire/02-recherche/papers/`](Memoire/02-recherche/papers/) — papers to read.
- [`Memoire/02-recherche/notes/`](Memoire/02-recherche/notes/) — reading notes.
- [`Memoire/02-recherche/datasets/`](Memoire/02-recherche/datasets/) — dataset links and licenses only.
- [`Memoire/03-memo/`](Memoire/03-memo/) — memos.
- [`Memoire/04-redaction/`](Memoire/04-redaction/) — thesis chapters and drafts.
- [`Memoire/05-references/`](Memoire/05-references/) — bibliography and Zotero exports.
- [`Memoire/templates/`](Memoire/templates/) — memo, research-note, and ADR templates.
- [`thirdparty/`](thirdparty/) — ignored shallow clones for study.
- [`thirdparty/MANIFEST.md`](thirdparty/MANIFEST.md) — licenses, ports, commands, and statuses.
- [`resources/`](resources/) — project resource inventories.
- [`resources/ui-libraries.md`](resources/ui-libraries.md) — UI library references.
- [`resources/resources.csv`](resources/resources.csv) — workbook export.
- [`scripts/`](scripts/) — setup, development, port, and third-party helpers.

## How to add a document, diagram, or decision

- Add a document to its relevant `Memoire/` folder; use the templates for research notes, memos, and decisions.
- Add a diagram as `NN-type-subject.drawio` in its matching `UML/` folder; put exports in `UML/exports/`.
- Record a decision with `Memoire/templates/adr.md` and link it from the relevant project documentation.

## Known limitations and blocked items

- All first-party app output is Hello World only; tests and services are scaffolding, not product functionality.
- The gamified UI clone requires Clerk authentication keys, a Neon/PostgreSQL connection, Stripe API and webhook secrets, and Clerk admin user IDs; it remains blocked until configured.
- LibreLingo's upstream repository says it is archived. sign.mt is reference-only and has a non-commercial license tier; WLASL is an index only and its videos must not be downloaded. See the [third-party manifest](thirdparty/MANIFEST.md).
- Android Studio and Xcode are not installed here, so native device builds were not checked. Expo web preview was verified.
- The source resource workbook is deleted from this worktree by a pre-existing change; `resources.csv` was exported from the committed workbook without restoring the deleted file.
- Verify third-party licenses before adoption. Duolingo's mascot, fonts, and sounds are proprietary and are for study only.

See [Memoire](Memoire/), [UML](UML/), [resources](resources/), and the [third-party manifest](thirdparty/MANIFEST.md) for project research and references.
