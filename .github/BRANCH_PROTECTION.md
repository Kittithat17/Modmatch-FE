# Branch protection setup (repo owner, one time)

The workflow file makes CI *run*. It cannot make CI *required* before a merge. That part is a GitHub setting you have to click through yourself.

## First, push the branches

GitHub cannot create a rule for a branch that does not exist yet.

```bash
git push origin main
git push -u origin dev
```

Then go to Settings ▸ Branches ▸ Add branch ruleset.

## Ruleset for `main`

Set target branches to `main` and enforcement status to Active.

Enable:

- Restrict deletions
- Block force pushes
- Require a pull request before merging
  - Required approvals: 1
  - Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass
  - Require branches to be up to date before merging
  - Search for and select the check named **CI OK**

Select only `CI OK`. Do not add Lint, Typecheck and Build individually. The `ci-ok` job in `ci.yml` already waits on all three and reports a single result. When you add a new job later, just add it to that job's `needs` list; you never have to come back and change this setting.

> If `CI OK` does not show up in the search box, the workflow has never run. Push something first, then come back and set the rule.

## Ruleset for `dev`

Same as `main` works fine. If the team is small and you want to move faster, this is enough:

- Block force pushes
- Require a pull request before merging (0 or 1 required approvals, your call)
- Require status checks to pass ▸ **CI OK**

## Make `dev` the default branch

Settings ▸ General ▸ Default branch ▸ change it to `dev`.

With that set, cloning and opening a PR on the web both target `dev` automatically, which makes it much harder to open a PR against `main` by accident.
