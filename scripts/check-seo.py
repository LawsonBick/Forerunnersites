"""Crawl a running production build. Standard library only; no emails submitted."""
from html.parser import HTMLParser
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.parse import urlparse, urljoin, unquote, parse_qs
from pathlib import Path
import json, re, sys, xml.etree.ElementTree as ET
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:3100'
ORIGIN='https://www.forerunnersites.com'
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.tags=[];self.title='';self.h1=0;self.in_title=False;self.ld=False;self.buf='';self.schemas=[];self.ids=set();self.links=[];self.assets=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.tags.append((tag,a))
  if a.get('id'):self.ids.add(a['id'])
  if tag=='title':self.in_title=True
  if tag=='h1':self.h1+=1
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='script' and a.get('type')=='application/ld+json':self.ld=True;self.buf=''
  if tag in ['img','video']:
   if tag=='img':assert 'alt' in a,'image missing alt';assert (a.get('width') and a.get('height')) or a.get('data-nimg')=='fill','image dimensions missing'
   if a.get('src'):self.assets.append(a['src'])
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.ld:self.buf+=data
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='script' and self.ld:self.schemas.append(json.loads(self.buf));self.ld=False
 def meta(self,key):return next((a.get('content') for t,a in self.tags if t=='meta' and (a.get('name')==key or a.get('property')==key)),None)
 def canonical(self):return next((a.get('href') for t,a in self.tags if t=='link' and a.get('rel')=='canonical'),None)
def get(path):
 try:
  with urlopen(BASE+path,timeout=30) as r:return r.status,r.read().decode(),r.headers
 except HTTPError as e:return e.code,e.read().decode(),e.headers
status,xml,_=get('/sitemap.xml');assert status==200
urls=[node.text for node in ET.fromstring(xml).iter() if node.tag.endswith('loc')]
assert len(urls)==27,(len(urls),urls)
pages={};titles=set();descs=set();assets=set();errors=[]
for url in urls:
 path=urlparse(url).path or '/';status,html,headers=get(path);assert status==200,(path,status)
 p=Page();p.feed(html);pages[path]=p
 assert p.h1==1,(path,p.h1)
 assert p.title and p.title not in titles,(path,'duplicate title');titles.add(p.title)
 assert p.meta('description') and p.meta('description') not in descs,(path,'duplicate description');descs.add(p.meta('description'))
 assert p.canonical()==url,(path,p.canonical(),url)
 assert p.meta('og:url')==url,(path,'OG URL')
 for key in ['og:title','og:description','og:image','twitter:card','twitter:title','twitter:description','twitter:image']:assert p.meta(key),(path,key)
 assert 'noindex' not in (p.meta('robots') or ''),(path,'noindex')
 assert p.schemas,(path,'no schema')
 for schema in p.schemas:assert schema.get('@context')=='https://schema.org',(path,'missing context')
 if path.startswith('/resources/'):
  graph=[node for s in p.schemas for node in s.get('@graph',[s])];a=next(n for n in graph if n.get('@type')=='Article');assert a['datePublished'] and a['dateModified'] and a['author']['name']
 for src in p.assets:
  u=urlparse(src)
  if u.path=='/_next/image':assets.add(parse_qs(u.query)['url'][0])
  elif src.startswith('/'):assets.add(u.path)
for path,p in pages.items():
 for href in p.links:
  u=urlparse(urljoin(ORIGIN+path,href))
  if u.netloc!=urlparse(ORIGIN).netloc:continue
  route=u.path or '/'
  if route not in pages:errors.append((path,href,'route absent from sitemap'));continue
  if u.fragment and unquote(u.fragment) not in pages[route].ids:errors.append((path,href,'missing anchor'))
assert not errors,errors
for asset in assets:assert Path('public'+asset).exists(),asset
status,robots,_=get('/robots.txt');assert status==200 and 'Sitemap: '+ORIGIN+'/sitemap.xml' in robots and 'Disallow: /\n' not in robots
for route in ['/missing-example','/resources/missing-example','/work/missing-example']:
 status,html,_=get(route);assert status==404,(route,status);p=Page();p.feed(html);assert 'noindex' in (p.meta('robots') or ''),(route,'404 indexability')
result={'pages':len(pages),'unique_titles':len(titles),'unique_descriptions':len(descs),'local_media_sources':len(assets),'internal_links_and_anchors':'pass','metadata_and_schema':'pass','robots_and_404':'pass','routes':list(pages)}
Path('docs/seo-qa-results.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
