# Repository Maintenance Checklist

This project is maintained continuously with small, safe daily improvements.

## Daily Workflow

1. Pull latest changes from `main`.
2. Pick 2-3 tiny improvements that are low risk and easy to review.
3. Keep each change in a separate commit when possible.
4. Run targeted checks for changed files.
5. Push commits the same day.

## Improvement Ideas

- Fix typos and stale docs.
- Remove dead code and unused imports.
- Add or tighten null checks and guards.
- Improve log messages and error handling clarity.
- Add missing test coverage for recently changed logic.

## Commit Guidelines

- Use short, clear messages (for example: `fix: guard missing user id in customer endpoint`).
- Keep one logical change per commit.
- Avoid broad refactors during daily maintenance unless planned.
