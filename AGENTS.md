<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Slides architecture
- Slides are React components registered in `src/slides/deck.ts`; add new slides there so the viewer, grid and `/print` PDF pick them up automatically.
- Every slide wraps `SlideLayout` (the master: tone, footer credit, page number) — never hand-roll a footer on a slide.
- Slides render at 1920x1080 via `ScaledSlide`; thumbnails and `/print` use static mode (`.slide-static`) so animations never freeze mid-state in previews or PDF.
- Fade half-bleed photos with mask utilities or `--slide-bg`-based edge gradients so fades always match the slide's tone.
- Audience voting: options, percentage math and DB calls live in `src/lib/poll.ts`; votes go to `poll_votes` (anon insert only) and results are read via the `get_poll_results` security-definer function, so voter rows are never publicly readable.
- The vote QR encodes the published site URL (`PUBLIC_SITE_URL` in `src/lib/poll.ts`), never `window.location`, because preview links require sign-in; update it if the domain changes.
- The title slide's talking presenter is a CDN video (`presenter-intro.mp4.asset.json`) with its first frame as the poster; static mode shows only the poster.
