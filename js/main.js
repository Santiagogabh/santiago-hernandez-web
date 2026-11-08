function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function val(v){return v?'<p class="text-lg font-semibold text-white">'+esc(v)+'</p>':'<p class="text-lg font-semibold text-slate-500">—</p>'}
document.getElementById("casos").innerHTML=CASOS.map(function(c,i){
  var media=c.video?'<video class="mb-4 aspect-video w-full rounded-lg object-cover" src="'+esc(c.video)+'" controls playsinline preload="metadata"></video>'
   :c.imagen?'<img class="mb-4 aspect-video w-full rounded-lg object-cover" src="'+esc(c.imagen)+'" alt="Resultado del caso '+(i+2)+'" loading="lazy">'
   :'<div class="mb-4 flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/50 text-center text-xs text-slate-500"><span>Imagen o video<br>del resultado</span></div>';
  return '<div class="rv group relative flex flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02]">'
  +'<div class="absolute inset-0 rounded-xl bg-brand opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"></div>'
  +'<div class="absolute inset-px rounded-[11px] bg-slate-950"></div><div class="relative">'
  +'<div class="mb-4 flex items-center gap-2"><div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand"><svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div>'
  +'<h3 class="text-sm font-semibold text-white">'+esc(c.cliente||'Caso '+(i+2)+' · Cliente por definir')+'</h3></div>'
  +media
  +'<div class="mb-4 grid grid-cols-3 gap-2"><div class="rounded-lg bg-slate-900/50 p-3"><p class="text-xs font-medium text-slate-400">Visualizaciones</p>'+val(c.vistas)+'</div>'
  +'<div class="rounded-lg bg-slate-900/50 p-3"><p class="text-xs font-medium text-slate-400">Alcance</p>'+val(c.alcance)+'</div>'
  +'<div class="rounded-lg bg-slate-900/50 p-3"><p class="text-xs font-medium text-slate-400">Leads</p>'+val(c.leads)+'</div></div>'
  +'<p class="mb-4 text-sm leading-relaxed text-slate-400">'+esc(c.desc||'Descripción breve del trabajo realizado.')+'</p>'
  +'<div class="flex justify-end"><a data-wa="Hola Santiago, vi sus resultados y quiero información." href="#" class="flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brandd">Quiero esto <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></div>'
  +'</div></div>';
}).join("");
document.querySelectorAll("[data-wa]").forEach(function(a){
  a.href="https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(a.getAttribute("data-wa"));
  a.target="_blank";a.rel="noopener";
});
document.getElementById("ig").href=INSTAGRAM_URL;
var els=document.querySelectorAll(".rv");
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(el){io.observe(el)});
}else{els.forEach(function(el){el.classList.add("in")})}
