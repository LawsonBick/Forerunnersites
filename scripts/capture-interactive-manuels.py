#!/usr/bin/env python3
"""Refresh Manuel's interactive portfolio copy (the live site blocks embedding).
Public sitemap pages and presentation JS/CSS only; forms open the real site.
Requires beautifulsoup4. Run with PYTHONPATH=/tmp/forerunner-preview-tools python3 scripts/capture-interactive-manuels.py
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin, urlsplit
from urllib.request import urlopen
import re
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ORIGIN = 'https://www.manuels.com'
PREFIX = '/work/interactive/manuels/'
ROOT = Path(__file__).resolve().parent.parent / 'public/work/interactive/manuels'
ROOT.mkdir(parents=True, exist_ok=True)

def read(url):
    with urlopen(url, timeout=30) as response:
        return response.read().decode()

pages = [node.text for node in ET.fromstring(read(ORIGIN + '/sitemap.xml')).iter() if node.tag.endswith('}loc')]
paths = {urlsplit(url).path.rstrip('/') or '/' for url in pages}

def filename(path):
    return (path.strip('/').replace('/', '-') or 'index') + '.html'

def css_urls(css, base):
    return re.sub(r'url\(\s*([\"\']?)([^)\"\']+)\1\s*\)', lambda m: 'url("' + urljoin(base, m[2]) + '")', css)

# Freeze only the reviewed UI script, not analytics or submission handlers.
(ROOT / 'site.js').write_text(read(ORIGIN + '/assets/site.js'))

def capture(url):
    soup = BeautifulSoup(read(url), 'html.parser')
    for tag in list(soup.select('script, base, noscript, meta[http-equiv], meta[name="robots"], link[rel="canonical"]')):
        tag.decompose()
    for link in list(soup.select('link')):
        if 'stylesheet' in link.get('rel', []):
            css_url = urljoin(url, link['href'])
            style = soup.new_tag('style')
            style.string = css_urls(read(css_url), css_url)
            link.replace_with(style)
        elif link.get('href'):
            link['href'] = urljoin(url, link['href'])
    for tag in soup.find_all(True):
        for attr in list(tag.attrs):
            if attr.lower().startswith('on'):
                del tag[attr]
        for attr in ('src', 'poster', 'data-bg', 'data-bg-m', 'data-video', 'data-video-m'):
            if tag.get(attr):
                tag[attr] = urljoin(url, tag[attr])
        if tag.get('srcset'):
            tag['srcset'] = ', '.join(' '.join([urljoin(url, part.strip().split()[0]), *part.strip().split()[1:]]) for part in tag['srcset'].split(',') if part.strip())
        if tag.get('style'):
            tag['style'] = css_urls(tag['style'], url)
        if tag.name == 'style' and tag.string:
            tag.string = css_urls(tag.string, url)
        if tag.name == 'a' and tag.get('href') and not tag['href'].startswith('#'):
            dest = urlsplit(urljoin(url, tag['href']))
            path = dest.path.rstrip('/') or '/'
            if dest.hostname in ('www.manuels.com', 'manuels.com') and path in paths:
                tag['href'] = PREFIX + filename(path) + ('#' + dest.fragment if dest.fragment else '')
                tag.attrs.pop('target', None)
            else:
                tag['href'] = urljoin(url, tag['href'])
                tag['target'] = '_blank'
                tag['rel'] = 'noopener noreferrer'
    for form in list(soup.select('form')):
        notice = soup.new_tag('p')
        link = soup.new_tag('a', href=url, target='_blank', rel='noopener noreferrer', attrs={'class': 'btn btn-primary'})
        link.string = "Continue on Manuel’s website"
        notice.append(link)
        form.replace_with(notice)
    for iframe in soup.select('iframe'):
        # Third-party embedded forms/maps should be opened on the live site.
        link = soup.new_tag('a', href=url, target='_blank', rel='noopener noreferrer', attrs={'class': 'btn btn-ghost'})
        link.string = 'View on the live site'
        iframe.replace_with(link)
    meta = soup.new_tag('meta', attrs={'name': 'robots', 'content': 'noindex,nofollow,noarchive'})
    soup.head.append(meta)
    style = soup.new_tag('style')
    style.string = 'html,body{overscroll-behavior-y:contain} html{scrollbar-width:thin} .site-header.is-hidden{transform:none}'
    soup.head.append(style)
    script = soup.new_tag('script', src=PREFIX + 'site.js', defer=True)
    soup.body.append(script)
    (ROOT / filename(urlsplit(url).path)).write_text(str(soup))
    return url

with ThreadPoolExecutor(max_workers=5) as pool:
    for url in pool.map(capture, pages):
        print(url)
