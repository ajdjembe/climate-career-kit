"""Build the static website (open edition at /, IE edition at /ie/) from web-template.html.
Usage: python3 src/build_web.py [site url]"""
import re, sys, pathlib, html

d = pathlib.Path(__file__).resolve().parent
SITE = (sys.argv[1] if len(sys.argv) > 1 else "https://climate-career-kit.netlify.app").rstrip("/")
P = d / "parts"
src = (d / "kit-template.html").read_text()

def between(s, start, end):
    i = s.index(start); j = s.index(end, i)
    return i, j

# --- splice new AI lab / suggestion / script parts into the artifact template ---
i, j = between(src, "/* AI lab */", "/* library */")
src = src[:i] + (P / "ai.css").read_text() + src[j:]
i, j = between(src, "<!-- AI LAB -->", "<!-- LIBRARY -->")
src = src[:i] + (P / "ai.html").read_text() + "\n" + src[j:]
i, j = between(src, "<!-- SUGGEST -->", "</main>")
src = src[:i] + (P / "suggest.html").read_text() + src[j:]
i = src.index("/* ---------- prompt library ---------- */")
src = src[:i] + (P / "ai.js").read_text()

# --- split head material from body ---
head_part, rest = src.split("<style>", 1)
style, body = rest.split("</style>", 1)
head_part = re.sub(r"<title>.*?</title>\s*", "", head_part, flags=re.S)

META = {
 "open": dict(title="Climate Career Transition Kit",
   desc="A free, practical kit for moving into a climate or sustainability career: map your sectors, learn the space, build your network and apply, with 140+ checked resources and AI prompts. By Arjun Srihari.",
   path="/", robots="index,follow"),
 "ie": dict(title="Climate Career Transition Kit · IE MSBT",
   desc="The climate career kit for IE University MSBT students and alumni: the four-step method from our 1:1s, checked resources and AI prompts.",
   path="/ie/", robots="noindex,nofollow"),
}

def build(ed):
    other = "open" if ed == "ie" else "ie"
    b = re.sub(r"<!--%s-->.*?<!--/%s-->" % (other, other), "", body, flags=re.S)
    b = b.replace("<!--%s-->" % ed, "").replace("<!--/%s-->" % ed, "")
    b = b.replace("__EDITION__", ed).replace("__THANKS__", "/thanks/")
    assert "<!--ie-->" not in b and "<!--open-->" not in b and "__" + "EDITION" not in b
    assert "window.claude" not in b and "claude.use" not in b
    m = META[ed]; url = SITE + m["path"]
    t, desc = html.escape(m["title"]), html.escape(m["desc"])
    head = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{t}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="{m['robots']}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:title" content="{t}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/social-card.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
{head_part.strip()}
<style>
html,body{{margin:0}}[hidden]{{display:none!important}}img{{max-width:100%}}
{style}</style>
</head>
<body>
{b.strip()}
</body>
</html>
"""
    return head

site = d.parent / "site"
(site / "ie").mkdir(parents=True, exist_ok=True)
(site / "thanks").mkdir(parents=True, exist_ok=True)
(site / "index.html").write_text(build("open"))
(site / "ie" / "index.html").write_text(build("ie"))
print("built", SITE)
