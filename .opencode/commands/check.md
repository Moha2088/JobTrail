---
description: Runs all pre-commit checks (lint + typecheck) across frontend and backend
agent: build
---

Run the following checks in order. Stop and report errors if any fail — do not proceed to the next step.

1. **Frontend lint** — `cd jobtrail-frontend && npm run lint`
2. **Frontend typecheck** — `cd jobtrail-frontend && npx tsc --noEmit`
3. **Backend lint** — `cd jobtrail-backend && bun run lint`

If all pass, confirm that everything is clean.
