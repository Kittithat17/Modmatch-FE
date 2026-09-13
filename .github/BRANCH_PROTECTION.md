# Branch protection setup (repo owner, one time)

The workflow file makes CI *run*. It cannot make CI *required* before a merge, and it cannot force a review. Those are GitHub settings you have to click through yourself.

## The repository has to be public

Rulesets are only enforced on public repositories, or on private ones under a GitHub Team or Enterprise plan. On a private repository owned by a personal account, GitHub still lets you save a ruleset and shows a warning that it will not be enforced. Every rule below is silently ignored: anyone can push straight to `main` and merge their own work.

So keep this repository public, or the whole setup below is decoration.

Before flipping a repository to public, check that no credential ever reached the history, because making it public exposes every past commit, not just the current files:

```bash
git log --all --pretty=format: --name-only --diff-filter=A | sort -u
```

Read that list and confirm no `.env`, `.pem`, key or credential file was ever added. If one was, deleting it in a new commit is not enough; it stays in the history and has to be scrubbed or the secret rotated.

## First, push the branches

GitHub cannot create a rule for a branch that does not exist yet.

```bash
git push origin main
git push -u origin dev
```

## Protect `main` and `dev` with one ruleset

Both branches need the same protection. `dev` matters more day to day: every pull request the team opens goes there, while `main` only sees a pull request at release time. Protecting `main` alone guards the door nobody walks through.

One ruleset can cover both, so there is only one place to edit when the rules change.

Go to Settings ▸ Branches ▸ Add branch ruleset.

1. Name it something like `protected-branches`.
2. Set enforcement status to Active.
3. Under Target branches, select **Add a target** twice: once for `main`, once for `dev`.
4. Enable the rules below.

### Rules to enable

- Restrict deletions
- Block force pushes
- Require a pull request before merging
  - Required approvals: 1
  - Require approval of the most recent reviewable push
  - Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass
  - Require branches to be up to date before merging
  - Search for and select the check named **CI OK**

### Why those review options

GitHub does not let the author of a pull request approve it, so "Required approvals: 1" on its own already means somebody else has to review before anything can merge. Nobody can wave their own work through.

"Require approval of the most recent reviewable push" closes the gap where an author gets an approval on clean code and then pushes more commits behind it. Without this, the stale approval still counts and unreviewed code lands.

### Leave the bypass list empty

The bypass list at the top of the ruleset page is the setting people get wrong. Adding Repository admin there turns every rule below into a suggestion for admins, who can then merge straight past required reviews and a red CI run. Add nobody.

### Only pick `CI OK`

Do not add Lint, Typecheck and Build individually. The `ci-ok` job in `ci.yml` already waits on all three and reports a single result. When you add a new job later, add it to that job's `needs` list; you never have to come back and change this setting.

> If `CI OK` does not show up in the search box, the workflow has never run. Push something first, then come back and set the rule.

## Default branch stays `main`

No change needed in Settings ▸ General. It also means Vercel picks `main` as the production branch on its own when you connect the repo, which is what you want.

The tradeoff: opening a pull request on the web defaults to `main`, so a feature branch can get pointed at production by accident. The ruleset above blocks the merge, but change the base to `dev` when you notice it.

## Requiring a specific reviewer

If you want every pull request to need *your* approval specifically rather than any teammate's, uncomment the owner line in `.github/CODEOWNERS` and add "Require review from Code Owners" to the ruleset.

Think twice on a small team. It makes you a bottleneck: everyone waits on one person instead of reviewing each other's work.
