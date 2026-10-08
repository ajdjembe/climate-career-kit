# Climate Career Transition Kit

A practical guide for moving into climate and sustainability careers, by Arjun Srihari.

- `/` is the open edition, for anyone.
- `/ie/` is the edition for IE University MSBT students and alumni (not indexed by search engines).

## How it is built

- `src/kit-template.html` holds the page, the resource list and the sector map. Edit resources there.
- `src/parts/` holds the AI Lab and suggestion form used on the website.
- `python3 src/build_web.py` regenerates both editions into `site/`.
- Netlify publishes the `site/` folder on every push. Suggestions arrive through Netlify Forms.

The AI Lab never calls an AI service from this site. Its buttons open the prompt in the visitor's own Claude or ChatGPT account.
