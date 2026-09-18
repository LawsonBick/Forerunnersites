#!/usr/bin/env python3
"""Save script-free, non-indexable presentation copies of verified client pages.
Requires beautifulsoup4. Refresh with: PYTHONPATH=/tmp/forerunner-preview-tools python3 scripts/capture-preview-pages.py
Styles and fonts are frozen locally; images keep their original public URLs. No client scripts,
trackers, forms, or third-party embeds execute inside the sandboxed walkthrough.
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import urlopen
import re
import hashlib
from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parent.parent / 'public/work/tours'
PAGES = {
 'manuels-home': 'https://www.manuels.com/',
 'trz-home': 'https://trzdetail.com/',
 'trz-detail': 'https://trzdetail.com/services/full-detail/',
 'trz-results': 'https://trzdetail.com/results/',
 'cleanz-home': 'https://www.cleanzatx.com/',
 'cleanz-pollen': 'https://www.cleanzatx.com/pollen',
 'cleanz-gallery': 'https://www.cleanzatx.com/gallery',
 'apex-home': 'https://www.apexwindowcleaningatx.com/',
 'apex-windows': 'https://www.apexwindowcleaningatx.com/services/window-cleaning',
 'apex-gallery': 'https://www.apexwindowcleaningatx.com/gallery',
}

def absolute(value, base):
 if value.startswith(('#', 'data:', 'mailto:', 'tel:', 'sms:', '/work/tours/')): return value
 if value.lower().startswith('javascript:'): return '#'
 return urljoin(base, value)

def font_or_url(value, base):
 url = absolute(value, base)
 extension = url.split('?')[0].rsplit('.',1)[-1].lower()
 if extension not in ('woff','woff2','ttf','otf'): return url
 filename = hashlib.sha256(url.encode()).hexdigest()[:16]+'.'+extension
 target = ROOT/'assets'/filename
 target.parent.mkdir(parents=True,exist_ok=True)
 if not target.exists(): target.write_bytes(urlopen(url).read())
 return '/work/tours/assets/'+filename

def css_urls(css, base):
 return re.sub(r'url\(\s*([\"\']?)([^)\"\']+)\1\s*\)', lambda m: 'url("'+font_or_url(m[2].strip(),base)+'")', css)

def capture(item):
 name, url = item
 with urlopen(url) as response:
  html = response.read().decode(); url = response.url
 soup = BeautifulSoup(html, 'html.parser')
 for tag in list(soup.select('script, iframe, object, embed, base, noscript, template')): tag.decompose()
 for comment in soup.find_all(string=lambda s:isinstance(s,Comment)): comment.extract()
 for meta in list(soup.select('meta')): meta.decompose()
 for link in list(soup.select('link')):
  if 'stylesheet' not in link.get('rel',[]): link.decompose()
  else:
   stylesheet_url = urljoin(url,link['href']).replace(' ', '%20')
   css = css_urls(urlopen(stylesheet_url).read().decode(),stylesheet_url)
   filename = hashlib.sha256(stylesheet_url.encode()).hexdigest()[:16]+'.css'
   target=ROOT/'assets'/filename;target.parent.mkdir(parents=True,exist_ok=True);target.write_text(css)
   link['href']='/work/tours/assets/'+filename
 for tag in soup.find_all(True):
  for attr in list(tag.attrs):
   if attr.lower().startswith('on') or attr in ('integrity','nonce','autofocus','contenteditable','ping'): del tag[attr]
  for attr in ('src','href','poster','action','data-bg','data-bg-m'):
   if tag.get(attr): tag[attr]=absolute(tag[attr],url)
  if tag.get('srcset'):
   tag['srcset']=', '.join(' '.join([absolute(part.strip().split()[0],url),*part.strip().split()[1:]]) for part in tag['srcset'].split(',') if part.strip())
  if tag.get('style'): tag['style']=css_urls(tag['style'],url)
  if tag.name=='style' and tag.string: tag.string=css_urls(tag.string,url)
  if tag.name in ('a','button','input','select','textarea'): tag['tabindex']='-1'
  if tag.name in ('input','select','textarea','button'): tag['disabled']=''
  if tag.name=='form': tag['action']='#'; tag['method']='get'
  if tag.name in ('video','audio'):
   for attr in ('src','autoplay'): tag.attrs.pop(attr,None)
   tag['preload']='none'
   for source in tag.select('source'): source.decompose()
  if tag.name=='img': tag['decoding']='async'
 soup.html['class']=[c for c in soup.html.get('class',[]) if c!='js']
 meta=soup.new_tag('meta',charset='utf-8');soup.head.insert(0,meta)
 meta=soup.new_tag('meta',attrs={'name':'robots','content':'noindex,nofollow,noarchive'});soup.head.append(meta)
 meta=soup.new_tag('meta',attrs={'name':'viewport','content':'width=device-width, initial-scale=1'});soup.head.append(meta)
 style=soup.new_tag('style');style.string='''
 html {scroll-behavior:auto!important;scrollbar-width:none!important;}
 html::-webkit-scrollbar,body::-webkit-scrollbar {display:none!important;}
 body {pointer-events:none!important;}
 .reveal,[data-reveal],.aos-animate,[data-aos] {opacity:1!important;transform:none!important;}
 *,*::before,*::after {animation:none!important;}
 .hero-slide {transition:opacity 1.2s ease!important;}
 html[data-motion="reduced"] .hero-slide {transition:none!important;}
 @media(prefers-reduced-motion:reduce){.hero-slide{transition:none!important;}}
 ''';soup.head.append(style)
 if name=='manuels-home':
  for slide in list(soup.select('.hero-slide--video, .hero-slide[data-mobile-only]')): slide.decompose()
  # Keep only the homepage stage; other projects tour whole pages.
  for section in list(soup.select('.page-body, footer')): section.decompose()
  style.string+='\nhtml,body{height:100%;overflow:hidden!important;}'
 ROOT.mkdir(parents=True,exist_ok=True)
 output=ROOT/(name+'.html');output.write_text(str(soup))
 assert not soup.select('script,iframe,object,embed')
 print(name, len(str(soup)), 'bytes')

if __name__=='__main__':
 with ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(capture,PAGES.items()))
