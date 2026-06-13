/* Akshobya Rao — dark/bold/animated portfolio */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia("(hover:none)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  var hasLenis = typeof window.Lenis !== "undefined";
  var doc = document;

  /* ---------- Mobile menu ---------- */
  var nav = doc.getElementById("nav");
  var menu = doc.getElementById("menu");
  var burger = doc.getElementById("burger");
  function closeMenu(){ nav.classList.remove("open"); menu.classList.remove("open"); doc.body.style.overflow=""; }
  if (burger) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      nav.classList.toggle("open", open);
      doc.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", closeMenu); });
  }
  addEventListener("keydown", function(e){ if(e.key==="Escape") closeMenu(); });

  /* ---------- Clock ---------- */
  (function(){
    var el = doc.getElementById("clock"); if(!el) return;
    function t(){ try{ el.textContent = new Date().toLocaleTimeString("en-US",{hour12:false,timeZone:"America/Chicago"})+" CT"; }catch(e){} }
    t(); setInterval(t,1000);
  })();

  /* ---------- Cursor ---------- */
  (function(){
    if (touch) return;
    var c = doc.getElementById("cursor"); if(!c) return;
    var x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;
    addEventListener("pointermove",function(e){x=e.clientX;y=e.clientY;},{passive:true});
    (function loop(){ cx+=(x-cx)*.3; cy+=(y-cy)*.3; c.style.transform="translate("+cx+"px,"+cy+"px) translate(-50%,-50%)"; requestAnimationFrame(loop); })();
    doc.querySelectorAll("a,button,[data-cursor]").forEach(function(el){
      el.addEventListener("pointerenter",function(){c.classList.add("big");});
      el.addEventListener("pointerleave",function(){c.classList.remove("big");});
    });
  })();

  /* ---------- Hero signal canvas ---------- */
  (function(){
    var cv = doc.getElementById("signal"); if(!cv || reduce) return;
    var ctx = cv.getContext("2d"); var w,h,dpr;
    function size(){ dpr=Math.min(devicePixelRatio||1,2); var r=cv.getBoundingClientRect(); w=r.width; h=r.height; cv.width=w*dpr; cv.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
    size(); addEventListener("resize", size);
    var waves = [
      {amp:.16, freq:1.4, speed:.6, off:0, col:"rgba(255,67,38,0.55)", lw:2},
      {amp:.10, freq:2.2, speed:-.9, off:2, col:"rgba(255,67,38,0.18)", lw:1.4},
      {amp:.22, freq:.9, speed:.4, off:4, col:"rgba(255,255,255,0.07)", lw:1.2}
    ];
    var t=0;
    function rnd(x){ return Math.sin(x*12.9898)*43758.5453 % 1; }
    function draw(){
      ctx.clearRect(0,0,w,h); t+=0.016;
      var mid=h*0.62;
      waves.forEach(function(wv){
        ctx.beginPath(); ctx.lineWidth=wv.lw; ctx.strokeStyle=wv.col;
        for(var px=0; px<=w; px+=6){
          var nx=px/w;
          var beat = Math.abs(((nx*4 + t*wv.speed*0.2)%1)-0.5)<0.02 ? (wv.amp*0.8) : 0;
          var yy = mid + Math.sin(nx*Math.PI*2*wv.freq + t*wv.speed + wv.off)*h*wv.amp*0.5
                       + Math.sin(nx*Math.PI*2*wv.freq*2.3 + t*wv.speed*1.5)*h*wv.amp*0.18
                       - beat*h*Math.sin(nx*Math.PI*40);
          if(px===0) ctx.moveTo(px,yy); else ctx.lineTo(px,yy);
        }
        ctx.stroke();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ---------- No-animation fallback ---------- */
  function finishBoot(){ doc.body.classList.remove("boot"); }
  if (reduce || !hasGSAP) {
    doc.body.classList.add("no-anim");
    var ld = doc.getElementById("loader"); if(ld) ld.style.display="none";
    finishBoot();
    initMarqueeVelocity();
    return;
  }

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- Lenis smooth scroll ---------- */
  var lenis = null;
  if (hasLenis && !touch) {
    lenis = new window.Lenis({ lerp:0.1, smoothWheel:true });
    lenis.on("scroll", window.ScrollTrigger.update);
    gsap.ticker.add(function(time){ lenis.raf(time*1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Pre-set hidden states ---------- */
  gsap.set(".hero__title .line>span", {yPercent:115});
  gsap.set(".contact__big .line>span", {yPercent:115});
  gsap.set("[data-word]", {yPercent:120, opacity:0});

  /* ---------- Loader, then hero in ---------- */
  var loader = doc.getElementById("loader");
  var bar = doc.getElementById("loaderBar");
  var num = doc.getElementById("loaderNum");
  var counter = {v:0};
  var tl = gsap.timeline();
  tl.to(bar, {width:"100%", duration:1.1, ease:"power2.inOut"}, 0)
    .to(counter, {v:100, duration:1.1, ease:"power2.inOut", onUpdate:function(){ num.textContent = String(Math.round(counter.v)).padStart(2,"0"); }}, 0)
    .add(function(){ loader.classList.add("loader--done"); finishBoot(); }, "+=0.15")
    .from(".hero__eyebrow", {y:20, opacity:0, duration:.6, ease:"power2.out"}, "+=0.2")
    .to(".hero__title .line>span", {yPercent:0, duration:1.1, ease:"expo.out", stagger:.1}, "<")
    .from(".hero__tag, .hero__foot .btn", {y:24, opacity:0, duration:.7, ease:"power2.out", stagger:.1}, "<0.3");

  /* ---------- Section reveals ---------- */
  gsap.utils.toArray("[data-anim]").forEach(function(el){
    gsap.to(el, {opacity:1, y:0, duration:.9, ease:"power3.out",
      scrollTrigger:{ trigger:el, start:"top 86%" }});
  });

  /* ---------- Statement words ---------- */
  gsap.to("[data-word]", {
    yPercent:0, opacity:1, duration:.9, ease:"expo.out", stagger:.04,
    scrollTrigger:{ trigger:".statement", start:"top 75%" }
  });

  /* ---------- Contact big ---------- */
  gsap.to(".contact__big .line>span", {
    yPercent:0, duration:1.1, ease:"expo.out", stagger:.1,
    scrollTrigger:{ trigger:".contact", start:"top 70%" }
  });

  /* ---------- Section title parallax ---------- */
  gsap.utils.toArray(".sec__title, .statement__text").forEach(function(el){
    gsap.to(el, { yPercent:-8, ease:"none",
      scrollTrigger:{ trigger:el, start:"top bottom", end:"bottom top", scrub:true }});
  });

  /* ---------- Magnetic ---------- */
  if (!touch) {
    doc.querySelectorAll("[data-magnet]").forEach(function(el){
      el.addEventListener("pointermove",function(e){
        var r=el.getBoundingClientRect();
        gsap.to(el,{x:(e.clientX-(r.left+r.width/2))*.3, y:(e.clientY-(r.top+r.height/2))*.4, duration:.4, ease:"power3.out"});
      });
      el.addEventListener("pointerleave",function(){ gsap.to(el,{x:0,y:0,duration:.5,ease:"elastic.out(1,.4)"}); });
    });
  }

  initMarqueeVelocity();

  /* ---------- Marquee speed reacts to scroll ---------- */
  function initMarqueeVelocity(){
    var track = doc.getElementById("marquee"); if(!track) return;
    var base=1, cur=1, target=1, last=scrollY;
    addEventListener("scroll", function(){
      var v=Math.abs(scrollY-last); last=scrollY;
      target=base+Math.min(v/12,5);
    }, {passive:true});
    (function loop(){
      cur+=(target-cur)*.08; target+=(base-target)*.05;
      track.style.animationDuration=(28/cur)+"s";
      requestAnimationFrame(loop);
    })();
  }
})();
