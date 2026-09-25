(function(){
  "use strict";
  var doc=document;
  /* iOS: Safari's collapsing address bar fires scroll events that would make an
     auto-hiding header flicker, so flag iOS and keep the top bar static there. */
  var isIOS=/iP(ad|hone|od)/.test(navigator.platform)
    ||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)
    ||/iPad|iPhone|iPod/.test(navigator.userAgent);
  if(isIOS)doc.documentElement.classList.add('is-ios');
  /* Always open at the top on load so the hero is visible (ignore any restored scroll position).
     Real in-page links like #carta still work — only plain loads/reloads are reset. */
  if(!location.hash){
    var _sb=doc.documentElement.style.scrollBehavior;
    doc.documentElement.style.scrollBehavior='auto';
    window.scrollTo(0,0);
    window.addEventListener('load',function(){if(!location.hash)window.scrollTo(0,0);});
    doc.documentElement.style.scrollBehavior=_sb;
  }
  /* Hero slideshow backgrounds hydrate just-in-time — one slide ahead of the
     rotation — instead of all 13 at once on load. Each image gets a full
     rotation interval to download before it's ever shown. Phones read the
     data-bg-m / data-video-m variants (smaller files, same photos). */
  var heroSmall=window.matchMedia('(max-width:720px)').matches;
  function ensureBg(s){
    if(s && s.hasAttribute('data-bg')){
      var bg=(heroSmall && s.getAttribute('data-bg-m')) || s.getAttribute('data-bg');
      s.style.backgroundImage="url('"+bg+"')";
      s.removeAttribute('data-bg');s.removeAttribute('data-bg-m');
    }
    /* Video slides: attach the source one rotation ahead so it's buffered by the
       time it fades in (keeps the clip off the initial-load path). */
    if(s && s.hasAttribute('data-video')){
      var vv=s.querySelector('video');
      if(vv && !vv.getAttribute('data-loaded')){
        var src=doc.createElement('source');
        src.src=(heroSmall && s.getAttribute('data-video-m')) || s.getAttribute('data-video');
        src.type='video/mp4';
        vv.appendChild(src);vv.load();vv.setAttribute('data-loaded','1');
      }
    }
  }
  function playSlideVideo(s){var v=s&&s.querySelector&&s.querySelector('video');if(!v)return;
    try{v.currentTime=0;}catch(e){}var p=v.play();if(p&&p.catch)p.catch(function(){});}
  function pauseSlideVideo(s){var v=s&&s.querySelector&&s.querySelector('video');if(v)v.pause();}

  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Auto-advancing hero slideshow — incoming photo fades in ON TOP of the current
     one so the background never dips between slides (smooth cross-fade). */
  var slides=Array.prototype.slice.call(doc.querySelectorAll('.hero-slide'));
  /* Device-specific sets: phones drop data-skip-mobile (horizontals),
     larger screens drop data-mobile-only (verticals) */
  var heroMobile=window.matchMedia('(max-width:720px)').matches;
  slides=slides.filter(function(s){
    return heroMobile ? !s.hasAttribute('data-skip-mobile') : !s.hasAttribute('data-mobile-only');
  });
  if(slides.length>1 && !reduce){
    var si=0, FADE=1800, HOLD=3000, heroTimer;
    slides[si].style.zIndex=1;
    /* Prep slide 2 after load (protects slide 1's LCP) */
    if(document.readyState==='complete')ensureBg(slides[1]);
    else window.addEventListener('load',function(){ensureBg(slides[1]);});
    /* Cross-fade to a target slide index (wraps around). Drives both the auto-
       advance timer and the manual prev/next taps. Manual steps pass a
       direction so the incoming photo slides in from that side (next → from
       the right, prev → from the left) instead of fading. */
    var fadeTimer,slideTimer,SLIDE_MS=380;
    function clearManual(){
      clearTimeout(fadeTimer);clearTimeout(slideTimer);
      slides.forEach(function(s){s.style.transition='';s.style.transform='';s.classList.remove('no-fade');});
    }
    function goToSlide(target,dir){
      var n=((target%slides.length)+slides.length)%slides.length;
      if(n===si)return;
      var prev=slides[si];
      si=n;
      var cur=slides[si];
      ensureBg(cur); /* manual jumps can outrun the prefetch — hydrate now */
      ensureBg(slides[(si+1)%slides.length]);
      if(dir){
        clearManual(); /* cancel any in-flight fade or slide cleanup */
        slides.forEach(function(s){
          if(s===cur||s===prev)return;
          s.classList.remove('is-active');
          s.style.zIndex=0;
          pauseSlideVideo(s);
        });
        prev.style.zIndex=1;
        cur.classList.add('no-fade'); /* full opacity immediately — motion only */
        cur.classList.add('is-active');
        cur.style.zIndex=2;
        cur.style.transform='translateX('+(dir*100)+'%)';
        playSlideVideo(cur);
        void cur.offsetWidth; /* commit the start position before animating */
        cur.style.transition='transform '+SLIDE_MS+'ms ease-out';
        prev.style.transition='transform '+SLIDE_MS+'ms ease-out';
        cur.style.transform='translateX(0)';
        prev.style.transform='translateX('+(-dir*100)+'%)';
        slideTimer=setTimeout(function(){
          prev.classList.remove('is-active');
          prev.style.zIndex=0;
          prev.style.transition='';prev.style.transform='';
          cur.style.transition='';cur.style.transform='';
          cur.style.zIndex=1;
          cur.classList.remove('no-fade');
          pauseSlideVideo(prev);
        },SLIDE_MS+20);
        return;
      }
      /* Guarantee a real cross-fade: clear any leftover swipe state (no-fade /
         inline transform+transition) that would otherwise cut instantly. */
      cur.classList.remove('no-fade');
      cur.style.transition='';cur.style.transform='';
      cur.style.zIndex=2;
      cur.classList.add('is-active');
      playSlideVideo(cur);
      fadeTimer=setTimeout(function(){
        prev.classList.remove('is-active');
        prev.style.zIndex=0;
        cur.style.zIndex=1;
        pauseSlideVideo(prev);
      },FADE);
    }
    /* The hero cycles on its own every HOLD ms, but the moment the visitor takes
       over — a prev/next tap or a swipe — the timer stops for good and the photo
       they landed on stays put. Every manual step routes through stepHero, so
       stopping it here covers both the buttons and the swipe handler. */
    function stopHeroTimer(){clearInterval(heroTimer);heroTimer=null;}
    function stepHero(dir){stopHeroTimer();goToSlide(si+dir,dir);}
    heroTimer=setInterval(function(){goToSlide(si+1);},HOLD);
    /* Tap/click prev-next controls so visitors can page through every hero photo
       on both desktop and touch devices. */
    var heroSection=doc.querySelector('.video-hero');
    if(heroSection){
      /* Swipe left/right on touch screens to page through photos. Only fires
         when the gesture is clearly horizontal so vertical scrolling stays
         untouched. */
      var swipeX=0,swipeY=0;
      heroSection.addEventListener('touchstart',function(e){
        swipeX=e.touches[0].clientX;
        swipeY=e.touches[0].clientY;
      },{passive:true});
      heroSection.addEventListener('touchend',function(e){
        var dx=e.changedTouches[0].clientX-swipeX;
        var dy=e.changedTouches[0].clientY-swipeY;
        if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)*1.5)stepHero(dx<0?1:-1);
      },{passive:true});
      /* Prev/next arrow buttons page through the photos on click. */
      var hnPrev=heroSection.querySelector('.hero-nav--prev'),hnNext=heroSection.querySelector('.hero-nav--next');
      if(hnPrev)hnPrev.addEventListener('click',function(){stepHero(-1);});
      if(hnNext)hnNext.addEventListener('click',function(){stepHero(1);});
    }
  }

  /* Header + full-screen video hero */
  var header=doc.getElementById('header');
  var videoHero=doc.querySelector('.video-hero');
  var vid=doc.getElementById('vhVideo');

  if(vid){
    if(reduce){vid.removeAttribute('autoplay');vid.pause();}
    else{var pl=vid.play();if(pl&&pl.catch)pl.catch(function(){});}
  }

  function headerState(y){
    if(videoHero){
      /* Homepage: keep the top bar static & solid over the hero — no white-text
         "over-media" state. It always looks like the scrolled state. */
      header.classList.remove('over-media');
      header.classList.add('scrolled');
    }else{
      header.classList.toggle('scrolled',y>40);
    }
    /* Drop-down header: on the HOMEPAGE only, the bar is hidden at the very top so
       the page loads with a clean hero, then slides down into view once the visitor
       starts scrolling. Every other page keeps the bar always visible. Always shown
       while the mobile drawer is open. On iOS the bar stays put (see isIOS above). */
    if(!videoHero||isIOS||(nav&&nav.classList.contains('open'))){
      header.classList.remove('is-hidden');
    }else{
      header.classList.toggle('is-hidden',y<=80);
    }
  }
  var ticking=false;
  function onScroll(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(function(){headerState(window.scrollY);ticking=false;});
  }
  /* Apply the initial top-of-page state without animating the bar up on load */
  header.style.transition='none';
  headerState(window.scrollY);
  void header.offsetWidth;
  header.style.transition='';
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});

  /* Mobile nav */
  var toggle=doc.getElementById('navToggle'),nav=doc.getElementById('nav'),scrim=doc.getElementById('scrim');
  function setNav(open){
    nav.classList.toggle('open',open);toggle.classList.toggle('open',open);
    scrim.classList.toggle('show',open);toggle.setAttribute('aria-expanded',open);
    header.classList.toggle('nav-open',open);
    doc.body.style.overflow=open?'hidden':'';
  }
  toggle.addEventListener('click',function(){setNav(!nav.classList.contains('open'));});
  scrim.addEventListener('click',function(){setNav(false);});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setNav(false);});});

  /* Rewards dropdown (click toggle for touch + keyboard; hover handled by CSS) */
  var dd=doc.querySelector('.nav-dd');
  if(dd){
    var ddt=dd.querySelector('.nav-dd__toggle');
    ddt.addEventListener('click',function(e){
      e.stopPropagation();
      var open=dd.classList.toggle('open');
      ddt.setAttribute('aria-expanded',open?'true':'false');
    });
    doc.addEventListener('click',function(e){
      if(!dd.contains(e.target)){dd.classList.remove('open');ddt.setAttribute('aria-expanded','false');}
    });
  }

  /* Menu tabs */
  var tabs=Array.prototype.slice.call(doc.querySelectorAll('.carta-tabs button'));
  tabs.forEach(function(btn){
    btn.addEventListener('click',function(){
      tabs.forEach(function(b){b.setAttribute('aria-selected','false');});
      btn.setAttribute('aria-selected','true');
      doc.querySelectorAll('.panel').forEach(function(p){p.classList.remove('active');});
      doc.getElementById(btn.dataset.panel).classList.add('active');
    });
  });

  /* Reservation demo */
  var form=doc.getElementById('resvForm'),confirm=doc.getElementById('confirm');
  var dateEl=doc.getElementById('rdate');
  if(dateEl){var t=new Date();t.setDate(t.getDate()+1);dateEl.min=new Date().toISOString().split('T')[0];dateEl.value=t.toISOString().split('T')[0];}
  if(form)form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return;}
    var d=new Date(doc.getElementById('rdate').value+'T12:00:00');
    var nice=isNaN(d)?doc.getElementById('rdate').value:d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
    var name=(doc.getElementById('rname').value||'').trim().split(' ')[0]||'there';
    confirm.innerHTML='<strong>Thank you, '+name+'!</strong><br>We\'ve noted your request for '+doc.getElementById('rparty').value+' on '+nice+' at '+doc.getElementById('rtime').value+'. Our host will call to confirm shortly. <em>(Demo — no reservation is actually booked.)</em>';
    confirm.classList.add('show');
    confirm.scrollIntoView({behavior:'smooth',block:'center'});
  });

  /* Reveal on scroll */
  var els=doc.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target);}});
    },{threshold:0.01,rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('is-in');});}

  /* Lightbox: tap/click any content photo to view it full-size.
     Applies to every <img> inside <main> (menu galleries, page photos) —
     the hero slideshow uses CSS backgrounds, so it's naturally excluded,
     as are linked images (logos) and videos. */
  var lb,lbImg;
  function closeLb(){
    if(lb){lb.classList.remove('show');doc.body.style.overflow='';}
  }
  function openLb(src,alt){
    if(!lb){
      lb=doc.createElement('div');
      lb.className='lightbox';
      lb.setAttribute('role','dialog');
      lb.setAttribute('aria-label','Photo viewer');
      var x=doc.createElement('button');
      x.className='lightbox-close';
      x.setAttribute('aria-label','Close photo');
      x.innerHTML='&times;';
      lbImg=doc.createElement('img');
      lbImg.alt='';
      lb.appendChild(lbImg);lb.appendChild(x);
      lb.addEventListener('click',closeLb);
      doc.body.appendChild(lb);
    }
    lbImg.src=src;lbImg.alt=alt||'';
    lb.classList.add('show');
    doc.body.style.overflow='hidden';
  }
  doc.addEventListener('keydown',function(e){if(e.key==='Escape')closeLb();});
  doc.addEventListener('click',function(e){
    if(!e.target.closest)return;
    var img=e.target.closest('main img');
    /* skip the Plan-a-Party space cards & their gallery — they run their own viewer */
    if(!img||img.closest('a')||img.closest('.dish[data-space]')||img.closest('.space-lb'))return;
    openLb(img.currentSrc||img.src,img.alt);
  });

  /* Auto-scrolling food marquee (homepage): duplicate the strip so it can loop
     seamlessly, then start the CSS animation. On iOS (and reduced-motion) there's
     no auto-scroll — the marquee is unwrapped back to the plain native-scroll strip. */
  var marquee=doc.querySelector('.panel-photos--marquee');
  if(marquee){
    var mtrack=marquee.querySelector('.marquee-track');
    if(mtrack){
      if(isIOS||reduce){
        /* Fall back to the plain horizontally-scrollable photo strip: lift the
           figures out of the track and drop the marquee treatment. */
        marquee.classList.remove('panel-photos--marquee');
        while(mtrack.firstChild)marquee.insertBefore(mtrack.firstChild,mtrack);
        marquee.removeChild(mtrack);
      }else{
        Array.prototype.slice.call(mtrack.children).forEach(function(node){
          var clone=node.cloneNode(true);
          clone.setAttribute('aria-hidden','true');
          mtrack.appendChild(clone);
        });
        marquee.classList.add('is-running');
      }
    }
  }

  /* Photo gallery masonry: size each tile's grid-row span from its image aspect
     so tiles pack tightly, while letting .span-2 take two columns and .feature
     take the full width. Heights come from the width/height attributes, so this
     runs correctly even before the lazy-loaded images arrive. */
  function layoutGallery(){
    var grids=doc.querySelectorAll('.gallery-masonry');
    if(!grids.length)return;
    var vw=window.innerWidth,vh=window.innerHeight;
    Array.prototype.forEach.call(grids,function(grid){
      var cs=getComputedStyle(grid);
      var rowUnit=parseFloat(cs.gridAutoRows)||8;
      var gap=parseFloat(cs.rowGap)||parseFloat(cs.gap)||12;
      var cols=cs.gridTemplateColumns.split(' ').length;
      var colW=(grid.clientWidth-(cols-1)*gap)/cols;
      Array.prototype.forEach.call(grid.children,function(fig){
        var img=fig.querySelector('img');
        if(!img)return;
        var iw=parseFloat(img.getAttribute('width'))||img.naturalWidth||4;
        var ih=parseFloat(img.getAttribute('height'))||img.naturalHeight||3;
        /* span-2-wide only widens at 4 columns (see the masonry CSS) */
        var wide=fig.classList.contains('span-2')||(cols===4&&fig.classList.contains('span-2-wide'));
        var span=fig.classList.contains('feature')?cols:(wide?Math.min(2,cols):1);
        var itemW=span*colW+(span-1)*gap;
        var h=itemW*(ih/iw);
        if(fig.classList.contains('feature')){h=Math.min(h,Math.min(0.70*vh,560));}
        else if(fig.classList.contains('compact')){h=Math.min(h,Math.max(210,Math.min(0.26*vw,300)));}
        /* Cap portrait tiles at 1.4x their width: uncapped, a 3:4-and-taller photo
           renders nearly twice the height of its landscape neighbours, the columns
           grow at very different rates, and the grid bottom ends ragged with a
           block of dead space. The cap keeps column heights comparable; object-fit
           cover crops the tile, not the photo. */
        else{h=Math.min(h,itemW*1.4);}
        var rowSpan=Math.max(1,Math.round((h+gap)/(rowUnit+gap)));
        fig.style.gridRowEnd='span '+rowSpan;
      });
      closeGaps(grid,rowUnit,gap);
    });
  }

  /* Tiles sized from a dozen different photo aspects almost never tile evenly:
     wherever a column's next photo can only start a row or two further down,
     the grid is left holding a hole, and the columns run out at different
     depths so the bottom ends ragged. Close both by measuring the grid as
     rendered and growing whichever tile sits directly above each hole until it
     fills it — a few percent of extra crop on one photo, which object-fit cover
     absorbs invisibly. Measuring beats simulating: the browser has already done
     the dense packing, so there is nothing to reimplement here.

     Repeat while anything moved (capped, since growing a tile reflows the
     packing beneath it and can expose a smaller hole further down). Each pass
     only ever grows a tile, and only by a whole row, so this always settles. */
  function closeGaps(grid,rowUnit,gap){
    var step=rowUnit+gap;
    for(var pass=0;pass<4;pass++){
      var cs=getComputedStyle(grid);
      var cd=cs.gridTemplateColumns.split(' ');
      var cols=cd.length,colW=parseFloat(cd[0]);
      var gr=grid.getBoundingClientRect();
      var boxes=[];
      Array.prototype.forEach.call(grid.children,function(fig){
        if(!fig.querySelector('img'))return;
        var r=fig.getBoundingClientRect();
        boxes.push({fig:fig,
          c0:Math.round((r.left-gr.left)/(colW+gap)),
          cspan:Math.max(1,Math.round((r.width+gap)/(colW+gap))),
          top:r.top-gr.top,bot:r.top-gr.top+r.height});
      });
      if(!boxes.length)return;
      var bottom=Math.max.apply(null,boxes.map(function(b){return b.bot;}));
      var grew=false;
      for(var c=0;c<cols;c++){
        var col=boxes.filter(function(b){return c>=b.c0&&c<b.c0+b.cspan;})
                     .sort(function(a,b){return a.top-b.top;});
        var reach=0,prev=null;
        for(var i=0;i<col.length;i++){
          /* a hole between the tile above and this one */
          if(prev&&col[i].top-reach>gap)grew=fill(prev,col[i].top-reach-gap)||grew;
          reach=Math.max(reach,col[i].bot);
          prev=col[i];
        }
        /* and the ragged tail, where this column stops short of the deepest one */
        if(prev&&bottom-reach>0)grew=fill(prev,bottom-reach,true)||grew;
      }
      if(!grew)return;
    }
    /* Growing the tile above an interior hole is always safe, however wide it is:
       everything below shifts down with it, so the columns it shares stay flush.
       The tail is the dangerous one. Stretching a wide tile to deepen one short
       column deepens its neighbours by the same amount, so the grid floor drops
       out of reach as fast as the column climbs — unguarded, that feeds back on
       itself and inflates the tile on every pass. Level the tail with
       single-column tiles only, and leave the rare tail we can't reach. */
    function fill(box,px,tail){
      if(tail&&box.cspan>1)return false;
      var rows=Math.ceil(px/step-0.02); /* tolerate sub-pixel rounding */
      if(rows<1)return false;
      var m=/span\s+(\d+)/.exec(box.fig.style.gridRowEnd||'');
      box.fig.style.gridRowEnd='span '+((m?parseInt(m[1],10):1)+rows);
      return true;
    }
  }
  if(doc.querySelector('.gallery-masonry')){
    layoutGallery();
    window.addEventListener('load',layoutGallery);
    var glTimer;
    window.addEventListener('resize',function(){clearTimeout(glTimer);glTimer=setTimeout(layoutGallery,120);},{passive:true});
  }

  /* Horizontal rails hide their scrollbars, so there is no sign that more is
     waiting to the right. Wrap each one and park a chevron at its right edge:
     visible only while the rail can still scroll, and clicking it pages forward.
     The marquee strip animates itself and is not user-scrollable, so it opts out. */
  function initRails(){
    var rails=doc.querySelectorAll('.panel-photos:not(.panel-photos--marquee),.reviews-track');
    Array.prototype.forEach.call(rails,function(rail){
      var wrap=doc.createElement('div');
      wrap.className='rail-wrap';
      rail.parentNode.insertBefore(wrap,rail);
      wrap.appendChild(rail);
      var btn=doc.createElement('button');
      btn.type='button';
      btn.className='rail-next';
      btn.setAttribute('aria-label','Scroll for more');
      btn.innerHTML='<span aria-hidden="true">→</span>';
      wrap.appendChild(btn);
      function update(){
        var max=rail.scrollWidth-rail.clientWidth;
        /* a couple of px of slack: sub-pixel widths never settle exactly on max */
        var more=max>8&&rail.scrollLeft<max-8;
        wrap.classList.toggle('has-more',more);
        if(!more)return;
        /* anchor to the rail's own right edge — the rail is often narrower than
           the wrapper (max-width, centred) so the wrapper edge is the wrong mark */
        btn.style.right=(wrap.clientWidth-(rail.offsetLeft+rail.offsetWidth)+10)+'px';
        btn.style.top=(rail.offsetTop+rail.clientHeight/2)+'px';
      }
      btn.addEventListener('click',function(){
        rail.scrollBy({left:Math.round(rail.clientWidth*.8),behavior:'smooth'});
      });
      rail.addEventListener('scroll',update,{passive:true});
      var rlTimer;
      window.addEventListener('resize',function(){clearTimeout(rlTimer);rlTimer=setTimeout(update,120);},{passive:true});
      window.addEventListener('load',update);
      /* Menu rails start inside closed tab panels, where they measure zero and no
         resize event fires when their panel opens. Watch the box itself instead. */
      if(window.ResizeObserver)new ResizeObserver(update).observe(rail);
      update();
    });
  }
  initRails();

  /* Year */
  var yr=doc.getElementById('yr');
  if(yr)yr.textContent=new Date().getFullYear();

  /* ------------------------------------------------------------------
     Background music toggle — off by default.
     Browsers block autoplay-with-sound until a user gesture, so the
     button is the gesture. State + playback position persist across
     page loads via sessionStorage, so the ambiance continues (and
     resumes at the same spot) as visitors move between pages within
     the same tab session. If the browser refuses to resume after a
     navigation (stricter engagement policies), the button simply
     shows the paused state and the next click restarts it.
     ------------------------------------------------------------------ */
  (function(){
    /* Single salsa track, looped. Kept as an array so the sequencing below
       (and the saved playlist index) keeps working if more are added back. */
    var TRACKS=[
      'assets/audio/manuels-salsa-3.mp3'
    ];
    var KEY_ON='manuels-music-on';
    var KEY_AT='manuels-music-at';
    var KEY_IX='manuels-music-ix';   /* which track in the playlist */
    var store;
    try{store=window.sessionStorage;}catch(e){store=null;}

    var track=0;
    var savedIx=store?parseInt(store.getItem(KEY_IX)||'0',10):0;
    if(savedIx>=0&&savedIx<TRACKS.length)track=savedIx;

    var audio=new Audio(TRACKS[track]);
    /* 'none': the multi-MB track must never download on page load — music is
       off by default, and play() triggers the fetch the moment it's wanted. */
    audio.preload='none';
    audio.volume=0.55;   /* gentle ambiance, not a foreground track */

    /* "intent" = does the visitor want music on. The button reflects intent,
       NOT the raw result of audio.play(): a play() promise can reject with an
       "interrupted" error whenever a seek or track-change overlaps it, even
       though audio keeps playing — so intent is the single source of truth and
       the UI never desyncs from what the visitor asked for. */
    var intent=false;

    /* Advance to the next track when one ends; wrap around to loop the set. */
    audio.addEventListener('ended',function(){
      track=(track+1)%TRACKS.length;
      if(store){try{store.setItem(KEY_IX,String(track));store.setItem(KEY_AT,'0');}catch(e){}}
      audio.src=TRACKS[track];
      if(intent)audio.play().catch(function(){});
    });

    var btn=doc.createElement('button');
    btn.type='button';
    btn.className='music-toggle';
    btn.setAttribute('aria-pressed','false');
    btn.setAttribute('aria-label','Play background music');
    btn.title='Play music';
    btn.innerHTML=
      '<svg class="music-toggle__off" viewBox="0 0 24 24" aria-hidden="true">'+
        '<path d="M11 5 6 9H3v6h3l5 4V5z"/>'+
        '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/>'+
      '</svg>'+
      '<svg class="music-toggle__on" viewBox="0 0 24 24" aria-hidden="true">'+
        '<path d="M11 5 6 9H3v6h3l5 4V5z"/>'+
        '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 6a8 8 0 0 1 0 12"/>'+
      '</svg>';
    if(doc.body)doc.body.appendChild(btn);

    function setUI(on){
      btn.classList.toggle('is-on',on);
      btn.setAttribute('aria-pressed',on?'true':'false');
      btn.setAttribute('aria-label',on?'Pause background music':'Play background music');
      btn.title=on?'Pause music':'Play music';
    }

    function remember(){ if(store){try{store.setItem(KEY_AT,String(audio.currentTime||0));}catch(e){}} }
    audio.addEventListener('timeupdate',function(){ /* throttle writes to ~every 2s */
      if(!audio.paused && Math.floor(audio.currentTime)%2===0) remember();
    });
    window.addEventListener('pagehide',remember);
    window.addEventListener('beforeunload',remember);

    function setIntent(on){
      intent=on;
      setUI(on);
      if(store){try{store.setItem(KEY_ON,on?'1':'0');}catch(e){}}
      if(on)audio.play().catch(function(){});else{audio.pause();remember();}
    }

    btn.addEventListener('click',function(){ setIntent(!intent); });

    /* Resume across navigation: if music was on in this session, restore the
       playlist position and keep playing. Browsers that decline to auto-resume
       just leave the button ready for the next click. */
    var at=store?parseFloat(store.getItem(KEY_AT)||'0'):0;
    if(at>0){
      var seek=function(){ try{audio.currentTime=at;}catch(e){} };
      if(audio.readyState>=1)seek();else audio.addEventListener('loadedmetadata',seek,{once:true});
    }
    if(store&&store.getItem(KEY_ON)==='1')setIntent(true);
  })();
})();
