/* Tarjetas de casos + pop up "Saber más". Carga DESPUÉS de data/casos.js y js/main.js */
(function(){
  var WA="https://wa.link/142eok";
  var host=document.getElementById("casos");
  if(!host||typeof CASOS==="undefined")return;

  var ICON='<svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>';
  var CHEV='<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
  var PLAY='<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function url(u){u=String(u||"");return esc(/%[0-9A-Fa-f]{2}/.test(u)?u:encodeURI(u));}
  function list(v){return v?[].concat(v).filter(Boolean):[];}
  function val(v){return v?esc(v):"—";}
  function yt(u){var m=String(u).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);return m?m[1]:null;}

  // Lista dinámica de medios de un caso: imágenes + videos
  function medios(c){
    var out=[],seen={};
    list(c.imagenes).forEach(function(s){if(!seen[s]){seen[s]=1;out.push({t:"img",s:s});}});
    if(c.imagen&&!seen[c.imagen])out.unshift({t:"img",s:c.imagen});
    list(c.video).forEach(function(s){out.push({t:"vid",s:s});});
    return out;
  }

  function cover(c){
    var m=medios(c)[0];
    if(!m)return '<span>Imagen o video<br>del resultado</span>';
    if(m.t==="img")return '<img src="'+url(m.s)+'" alt="Resultado de '+esc(c.cliente)+'" class="h-full w-full object-cover" loading="lazy">';
    var id=yt(m.s);
    if(id)return '<img src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg" alt="" class="h-full w-full object-cover">';
    return '<video src="'+url(m.s)+'#t=0.5" class="h-full w-full object-cover" muted playsinline preload="metadata"></video>';
  }

  function logo(c,size){
    return c.logo
      ? '<div class="flex '+size+' shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white"><img src="'+url(c.logo)+'" alt="Logo de '+esc(c.cliente)+'" class="h-full w-full object-contain p-1"></div>'
      : '<div class="flex '+size+' shrink-0 items-center justify-center rounded-lg bg-brand">'+ICON+'</div>';
  }

  function card(c,i){
    var has=medios(c).length>0;
    return '<div class="rv group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02]">'+
      '<div class="absolute inset-0 rounded-xl bg-brand opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"></div>'+
      '<div class="absolute inset-px rounded-[11px] bg-slate-950"></div>'+
      '<div class="relative">'+
        '<div class="mb-4 flex items-center justify-between">'+
          '<div class="flex min-w-0 items-center gap-2">'+logo(c,"h-8 w-8")+'<h3 class="truncate text-sm font-semibold text-white">'+esc(c.cliente)+'</h3></div>'+
          (c.live?'<span class="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Live</span>':'')+
        '</div>'+
        '<div data-open="'+i+'" '+(has?'role="button" tabindex="-1"':'')+' class="mb-4 flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg '+(has?'bg-slate-900':'border border-dashed border-slate-700 bg-slate-900/50')+' text-center text-xs text-slate-500">'+cover(c)+'</div>'+
        '<div class="mb-4 grid grid-cols-3 gap-2">'+
          stat("Visualizaciones",c.vistas)+stat("Alcance",c.alcance)+stat("Leads",c.leads)+
        '</div>'+
        '<p class="mb-4 text-sm leading-relaxed text-slate-400">'+esc(c.desc||"Descripción breve del trabajo realizado.")+'</p>'+
        '<div class="flex items-center '+(c.periodo?'justify-between':'justify-end')+'">'+
          (c.periodo?'<span class="text-xs font-medium text-slate-400">'+esc(c.periodo)+'</span>':'')+
          '<button type="button" data-open="'+i+'" class="flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brandd">Saber más '+CHEV+'</button>'+
        '</div>'+
      '</div></div>';
  }
  function stat(l,v){
    return '<div class="rounded-lg bg-slate-900/50 p-3"><p class="text-xs font-medium text-slate-400">'+l+'</p><p class="text-lg font-semibold '+(v?'text-white':'text-slate-500')+'">'+val(v)+'</p></div>';
  }

  host.innerHTML=CASOS.map(card).join("");

  /* ---------- POP UP ---------- */
  var modal=document.createElement("div");
  modal.className="fixed inset-0 z-[60] hidden items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6";
  modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-labelledby","cm-title");
  modal.style.paddingTop="max(0.75rem, env(safe-area-inset-top, 0px))";
  modal.style.paddingBottom="max(0.75rem, env(safe-area-inset-bottom, 0px))";
  modal.innerHTML='<div class="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-2xl">'+
    '<div class="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">'+
      '<div id="cm-head" class="flex min-w-0 items-center gap-3"></div>'+
      '<button type="button" id="cm-close" aria-label="Cerrar" class="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'+
    '</div>'+
    '<div class="overflow-y-auto p-5">'+
      '<div id="cm-stats" class="mb-5 grid grid-cols-3 gap-2 sm:gap-3"></div>'+
      '<p id="cm-desc" class="mb-5 text-sm leading-relaxed text-slate-400"></p>'+
      '<div id="cm-gallery"></div>'+
    '</div>'+
    '<div class="flex items-center justify-between gap-3 border-t border-slate-800 px-5 py-4">'+
      '<span id="cm-periodo" class="text-xs font-medium text-slate-400"></span>'+
      '<a id="cm-cta" target="_blank" rel="noopener" class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brandd">Quiero esto</a>'+
    '</div></div>';
  document.body.appendChild(modal);

  var $=function(id){return modal.querySelector("#"+id);};
  var cur=null,items=[],idx=0,lastFocus=null;

  function bigStat(l,v){
    return '<div class="rounded-xl bg-slate-900/60 p-3 sm:p-4"><p class="text-xs font-medium text-slate-400">'+l+'</p><p class="mt-1 text-xl font-bold sm:text-2xl '+(v?'text-white':'text-slate-500')+'">'+val(v)+'</p></div>';
  }

  function stage(){
    var m=items[idx],s=$("cm-stage");
    if(!m){s.innerHTML='<span class="text-xs text-slate-500">Aún no hay imágenes ni videos para este caso.</span>';return;}
    if(m.t==="img"){s.innerHTML='<img src="'+url(m.s)+'" alt="Imagen '+(idx+1)+' de '+esc(cur.cliente)+'" class="h-full w-full object-contain">';}
    else{
      var id=yt(m.s);
      s.innerHTML=id
        ?'<iframe src="https://www.youtube.com/embed/'+id+'?rel=0" class="h-full w-full" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Video de '+esc(cur.cliente)+'"></iframe>'
        :'<video src="'+url(m.s)+'" class="h-full w-full" controls playsinline preload="metadata"></video>';
    }
    var cnt=$("cm-count");if(cnt)cnt.textContent=(idx+1)+" / "+items.length;
    Array.prototype.forEach.call(modal.querySelectorAll("[data-thumb]"),function(b){
      var on=+b.getAttribute("data-thumb")===idx;
      b.className=b.className.replace(/ ?ring-2 ring-brand/g,"")+(on?" ring-2 ring-brand":"");
      b.style.opacity=on?"1":".6";
      b.setAttribute("aria-current",on?"true":"false");
    });
  }

  function gallery(){
    var g=$("cm-gallery");
    if(!items.length){
      g.innerHTML='<div id="cm-stage" class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-center"></div>';
      return stage();
    }
    var multi=items.length>1;
    g.innerHTML=
      '<div class="relative">'+
        '<div id="cm-stage" class="flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-black"></div>'+
        (multi?'<button type="button" data-nav="-1" aria-label="Anterior" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-brand"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>'+
        '<button type="button" data-nav="1" aria-label="Siguiente" class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-brand"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>'+
        '<span id="cm-count" class="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white"></span>':'')+
      '</div>'+
      (multi?'<div class="mt-3 flex gap-2 overflow-x-auto pb-1">'+items.map(function(m,i){
        var inner=m.t==="img"
          ?'<img src="'+url(m.s)+'" alt="" class="h-full w-full object-cover">'
          :'<span class="flex h-full w-full items-center justify-center bg-slate-800 text-white">'+PLAY+'</span>';
        return '<button type="button" data-thumb="'+i+'" aria-label="Ver '+(m.t==="img"?"imagen":"video")+' '+(i+1)+'" class="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-900 transition sm:h-16 sm:w-24">'+inner+'</button>';
      }).join("")+'</div>':'');
    stage();
  }

  function open(i){
    cur=CASOS[i];if(!cur)return;
    items=medios(cur);idx=0;lastFocus=document.activeElement;
    $("cm-head").innerHTML=logo(cur,"h-10 w-10")+'<h3 id="cm-title" class="truncate text-lg font-bold">'+esc(cur.cliente)+'</h3>'+(cur.live?'<span class="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Live</span>':'');
    $("cm-stats").innerHTML=bigStat("Visitas",cur.vistas)+bigStat("Alcance",cur.alcance)+bigStat("Clientes potenciales",cur.leads);
    $("cm-desc").textContent=cur.desc||"Descripción breve del trabajo realizado.";
    $("cm-periodo").textContent=cur.periodo||"";
    $("cm-cta").setAttribute("href",WA);
    gallery();
    modal.classList.remove("hidden");modal.classList.add("flex");
    document.documentElement.style.overflow="hidden";
    $("cm-close").focus();
  }
  function close(){
    modal.classList.add("hidden");modal.classList.remove("flex");
    $("cm-gallery").innerHTML=""; // detiene cualquier video en reproducción
    document.documentElement.style.overflow="";
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  function go(d){if(items.length<2)return;idx=(idx+d+items.length)%items.length;stage();}

  host.addEventListener("click",function(e){
    var t=e.target.closest("[data-open]");
    if(t)open(+t.getAttribute("data-open"));
  });
  modal.addEventListener("click",function(e){
    if(e.target===modal||e.target.closest("#cm-close"))return close();
    var n=e.target.closest("[data-nav]");if(n)return go(+n.getAttribute("data-nav"));
    var th=e.target.closest("[data-thumb]");if(th){idx=+th.getAttribute("data-thumb");stage();}
  });
  document.addEventListener("keydown",function(e){
    if(modal.classList.contains("hidden"))return;
    if(e.key==="Escape")close();
    else if(e.key==="ArrowRight")go(1);
    else if(e.key==="ArrowLeft")go(-1);
    else if(e.key==="Tab"){ // mantiene el foco dentro del pop up
      var f=modal.querySelectorAll("button,a[href],iframe,video[controls]");if(!f.length)return;
      var a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}
      else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}
    }
  });
})();
