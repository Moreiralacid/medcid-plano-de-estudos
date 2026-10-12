/* MEDCID — alternador do tema Batcomputador.
   Preferência salva separada dos dados de estudo (chave "medcid-tema").
   ?tema=bat liga o tema; ?embed=1 compacta o cabeçalho (uso dentro do MEDCID COMPUTER). */
(function(){
  var KEY='medcid-tema', root=document.documentElement, params=new URLSearchParams(location.search);
  function read(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function write(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  if(params.get('tema')==='bat')write('bat');
  if(params.get('tema')==='padrao')write('padrao');
  if(params.get('embed')==='1')root.classList.add('embed');
  function apply(on){
    root.classList.toggle('bat',on);
    var meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',on?'#020912':'#6d28d9');
    var b=document.getElementById('batToggle');
    if(b){b.setAttribute('aria-pressed',String(on));b.innerHTML=on?'<span aria-hidden="true">◇</span> Tema padrão':'<span aria-hidden="true">◆</span> Batcomputador';}
  }
  apply(read()==='bat');
  function mount(){
    if(document.getElementById('batToggle'))return;
    var anchor=document.getElementById('darkToggle');
    if(!anchor||!anchor.parentNode)return;
    var b=document.createElement('button');
    b.id='batToggle';b.type='button';b.className='btn secondary';
    b.title='Alternar o visual Batcomputador (MEDCID COMPUTER)';
    b.addEventListener('click',function(){var on=!root.classList.contains('bat');write(on?'bat':'padrao');apply(on);});
    anchor.parentNode.insertBefore(b,anchor);
    apply(root.classList.contains('bat'));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
