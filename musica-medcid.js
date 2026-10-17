
/* MEDCID — música de fundo via player oficial do YouTube.
   O áudio só é carregado após interação do usuário para respeitar bloqueios de autoplay. */
(function(){
  var VIDEO_ID='g_-JKOWs6y4';
  var dock,panel,frame,loaded=false;

  function mount(){
    if(document.getElementById('medcidMusicDock')) return;

    dock=document.createElement('div');
    dock.id='medcidMusicDock';
    dock.innerHTML=
      '<button id="medcidMusicToggle" type="button" aria-label="Abrir música de foco" title="Música de foco">♫</button>'+
      '<section id="medcidMusicPanel" aria-label="Player de música de foco">'+
        '<div id="medcidMusicHead"><div><strong>Trilha de foco</strong><small>YouTube • MEDCID</small></div>'+
        '<button id="medcidMusicClose" type="button" aria-label="Fechar player">×</button></div>'+
        '<div id="medcidMusicFrameWrap"></div>'+
        '<p id="medcidMusicHint">A música começa apenas depois do seu clique. Use os controles do YouTube para pausar ou ajustar o volume.</p>'+
      '</section>';
    document.body.appendChild(dock);

    panel=document.getElementById('medcidMusicPanel');

    document.getElementById('medcidMusicToggle').addEventListener('click',function(){
      openPanel();
    });
    document.getElementById('medcidMusicClose').addEventListener('click',function(){
      panel.classList.remove('open');
    });

    document.addEventListener('keydown',function(ev){
      if(ev.key==='Escape' && panel.classList.contains('open')) panel.classList.remove('open');
    });
  }

  function openPanel(){
    panel.classList.add('open');
    if(loaded) return;
    loaded=true;
    frame=document.createElement('iframe');
    frame.id='medcidMusicFrame';
    frame.title='Trilha de foco MEDCID';
    frame.allow='autoplay; encrypted-media; picture-in-picture';
    frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.allowFullscreen=true;
    frame.src='https://www.youtube-nocookie.com/embed/'+VIDEO_ID+
      '?autoplay=1&loop=1&playlist='+VIDEO_ID+'&controls=1&rel=0&playsinline=1';
    document.getElementById('medcidMusicFrameWrap').appendChild(frame);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount);
  else mount();
})();
