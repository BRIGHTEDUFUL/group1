# Apotica Secure Vault (Static)

A fully client-side demo of a credential vault with login → MFA → dashboard flow. Built with plain HTML, CSS, and JavaScript—ready for GitHub Pages.

## Pages
- index.html: Redirects to login (entry point).
- login.html: Collects username/password and sets a mock user.
- mfa.html: Simple 6-digit MFA step; marks the session verified.
- dashboard.html: Lists mock credentials with modal reveal and clipboard copy.
- admin.html: Add/edit/delete credentials (stored in localStorage).
- audit.html: View audit events (stored in localStorage).

## Flow
1) Visit index → redirects to login.
2) After login, MFA is required.
3) After MFA, dashboard (and admin/audit) become accessible.

## Hosting on GitHub Pages
1) Create a repo named `group1` on GitHub (public is fine).
2) Push this folder as the main branch.
3) In Settings → Pages, set Source to `Deploy from a branch`, Branch `main`, Folder `/root`.
4) Your site will be at `https://<your-username>.github.io/group1/`.

## Local dev
Open index.html (or login.html) in a browser. All data persists in localStorage; clear storage to reset.
