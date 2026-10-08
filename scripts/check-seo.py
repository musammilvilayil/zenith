#!/usr/bin/env python3
"""Validate SEO essentials across Zenith static pages without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
EXCLUDE = {"node_modules", ".git"}
class Meta(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = False
        self.title_text = ""
        self.meta = []
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title": self.title = True
        if tag == "meta": self.meta.append(attrs)
        if tag == "link": self.links.append(attrs)
    def handle_endtag(self, tag):
        if tag == "title": self.title = False
    def handle_data(self, data):
        if self.title: self.title_text += data

errors = []
pages = sorted(p for p in ROOT.rglob("index.html") if not any(part in EXCLUDE for part in p.parts))
for page in pages:
    p = Meta()
    p.feed(page.read_text(encoding="utf-8"))
    rel = "/" + str(page.parent.relative_to(ROOT)).replace("\\", "/").strip("/")
    url = "https://zenithsoftworks.in" + (rel if rel != "/" else "") + "/"
    canonical = [x.get("href") for x in p.links if x.get("rel") == "canonical"]
    desc = [x.get("content") for x in p.meta if x.get("name") == "description"]
    if not p.title_text.strip(): errors.append(f"{page}: missing title")
    if not desc or not desc[0]: errors.append(f"{page}: missing description")
    if canonical != [url]: errors.append(f"{page}: canonical {canonical!r} expected {url}")
    if not any(x.get("property") == "og:title" for x in p.meta): errors.append(f"{page}: missing og:title")
print(f"Checked {len(pages)} HTML pages")
for e in errors: print("ERROR:", e)
sys.exit(1 if errors else 0)
