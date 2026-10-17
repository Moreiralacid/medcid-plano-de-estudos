/* MEDCID — trilha original generativa: "Pulso Noturno"
   Sem YouTube, sem arquivo externo e sem melodia de terceiros.
   A música é sintetizada no navegador com Web Audio API.
   Inicia somente após interação do usuário, por regra dos navegadores. */
(function(){
  var dock,panel,ctx,master,compressor,reverb,nextStart=0,chordIndex=0,timer=null;
  var running=false,volume=0.30;
  var BPM=58,BEAT=60/BPM,BLOCK=8*BEAT;
  var chords=[
    {root:38,notes:[50,57,60,64,65]}, // Dm(add9)
    {root:34,notes:[46,53,57,62,65]}, // Bbmaj7(add9)
    {root:41,notes:[53,57,60,64,67]}, // Fmaj9
    {root:36,notes:[48,55,57,62,64]}  // C6/9 sus
  ];

  function hz(m){return 440*Math.pow(2,(m-69)/12)}
  function makeImpulse(){
    var len=Math.floor(ctx.sampleRate*2.7),buf=ctx.createBuffer(2,len,ctx.sampleRate);
    for(var c=0;c<2;c++){
      var d=buf.getChannelData(c);
      for(var i=0;i<len;i++){
        var t=i/len;
        d[i]=(Math.random()*2-1)*Math.pow(1-t,3.2)*0.34;
      }
    }
    return buf;
  }
  function route(node,send){
    node.connect(master);
    if(send && reverb){
      var s=ctx.createGain();s.gain.value=send;node.connect(s);s.connect(reverb);
    }
  }
  function pad(note,start,dur,level,pan,detune){
    var g=ctx.createGain(),f=ctx.createBiquadFilter(),p=ctx.createStereoPanner();
    f.type='lowpass';f.frequency.setValueAtTime(850,start);f.Q.value=.35;
    p.pan.value=pan||0;
    g.gain.setValueAtTime(.0001,start);
    g.gain.exponentialRampToValueAtTime(level,start+1.5);
    g.gain.setValueAtTime(level,start+Math.max(1.6,dur-2.1));
    g.gain.exponentialRampToValueAtTime(.0001,start+dur);
    f.connect(g);g.connect(p);route(p,.42);
    ['sine','triangle'].forEach(function(type,k){
      var o=ctx.createOscillator();o.type=type;o.frequency.value=hz(note);
      o.detune.value=(detune||0)+(k?5:-5);
      var og=ctx.createGain();og.gain.value=k?.28:.72;
      o.connect(og);og.connect(f);o.start(start);o.stop(start+dur+.05);
    });
  }
  function bell(note,start,level,pan){
    var o=ctx.createOscillator(),g=ctx.createGain(),p=ctx.createStereoPanner(),f=ctx.createBiquadFilter();
    o.type='sine';o.frequency.value=hz(note+12);
    f.type='lowpass';f.frequency.value=2600;
    p.pan.value=pan||0;
    g.gain.setValueAtTime(.0001,start);
    g.gain.exponentialRampToValueAtTime(level,start+.025);
    g.gain.exponentialRampToValueAtTime(.0001,start+2.5);
    o.connect(f);f.connect(g);g.connect(p);route(p,.65);o.start(start);o.stop(start+2.6);
  }
  function bass(note,start){
    var o=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter();
    o.type='sine';o.frequency.value=hz(note);
    f.type='lowpass';f.frequency.value=180;
    g.gain.setValueAtTime(.0001,start);
    g.gain.exponentialRampToValueAtTime(.055,start+.18);
    g.gain.exponentialRampToValueAtTime(.0001,start+3.2);
    o.connect(f);f.connect(g);route(g,.08);o.start(start);o.stop(start+3.3);
  }
  function scheduleBlock(start,index){
    var c=chords[index%chords.length];
    c.notes.forEach(function(n,i){
      var pans=[-.55,-.28,0,.28,.55];
      pad(n,start,BLOCK+1.8,.0105,pans[i]||0,(i%2?3:-3));
    });
    bass(c.root,start+.05);bass(c.root,start+4*BEAT+.05);
    var seq=[c.notes[1],c.notes[3],c.notes[2],c.notes[4]];
    seq.forEach(function(n,i){bell(n,start+(1+i*2)*BEAT,.0095,i%2?0.38:-0.38)});
  }
  function pump(){
    if(!ctx||!running)return;
    while(nextStart<ctx.currentTime+12){
      scheduleBlock(nextStart,chordIndex++);
      nextStart+=BLOCK;
    }
  }
  function setupAudio(){
    if(ctx)return;
    var AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)throw new Error('Web Audio API não suportada');
    ctx=new AC();
    master=ctx.createGain();master.gain.value=volume*.34;
    compressor=ctx.createDynamicsCompressor();
    compressor.threshold.value=-22;compressor.knee.value=18;compressor.ratio.value=2.2;compressor.attack.value=.06;compressor.release.value=.45;
    reverb=ctx.createConvolver();reverb.buffer=makeImpulse();
    var wet=ctx.createGain();wet.gain.value=.24;reverb.connect(wet);wet.connect(compressor);
    master.connect(compressor);compressor.connect(ctx.destination);
    nextStart=ctx.currentTime+.08;
  }
  async function start(){
    setupAudio();
    if(ctx.state==='suspended')await ctx.resume();
    if(!running){
      running=true;
      if(nextStart<ctx.currentTime+.04)nextStart=ctx.currentTime+.08;
      pump();timer=setInterval(pump,1800);
    }
    syncUI();
  }
  async function pause(){
    running=false;
    if(timer){clearInterval(timer);timer=null}
    if(ctx&&ctx.state==='running')await ctx.suspend();
    syncUI();
  }
  function syncUI(){
    var b=document.getElementById('medcidMusicPlay');
    var st=document.getElementById('medcidMusicStatus');
    if(b)b.textContent=running?'⏸ Pausar':'▶ Iniciar';
    if(st)st.textContent=running?'tocando • 58 BPM • D menor':'pausada • pronta para foco';
  }
  function mount(){
    if(document.getElementById('medcidMusicDock'))return;
    dock=document.createElement('div');dock.id='medcidMusicDock';
    dock.innerHTML=
      '<button id="medcidMusicToggle" type="button" aria-label="Abrir trilha de foco" title="Trilha de foco">♫</button>'+
      '<section id="medcidMusicPanel" aria-label="Trilha de foco MEDCID">'+
        '<div id="medcidMusicHead"><div><strong>Pulso Noturno</strong><small>trilha original generativa • MEDCID</small></div>'+
        '<button id="medcidMusicClose" type="button" aria-label="Fechar painel">×</button></div>'+
        '<div id="medcidMusicOrb" aria-hidden="true"><span></span><span></span><span></span></div>'+
        '<div id="medcidMusicControls">'+
          '<button id="medcidMusicPlay" type="button">▶ Iniciar</button>'+
          '<label>Volume <input id="medcidMusicVolume" type="range" min="0" max="100" value="30"></label>'+
        '</div>'+
        '<div id="medcidMusicStatus">pausada • pronta para foco</div>'+
        '<p id="medcidMusicHint">Ambient minimalista em 58 BPM, com pads, pulsos graves e tons suaves. Gerada no próprio navegador, sem YouTube.</p>'+
      '</section>';
    document.body.appendChild(dock);
    panel=document.getElementById('medcidMusicPanel');
    document.getElementById('medcidMusicToggle').onclick=function(){panel.classList.toggle('open')};
    document.getElementById('medcidMusicClose').onclick=function(){panel.classList.remove('open')};
    document.getElementById('medcidMusicPlay').onclick=function(){running?pause():start()};
    document.getElementById('medcidMusicVolume').oninput=function(e){
      volume=Number(e.target.value)/100;
      if(master&&ctx)master.gain.setTargetAtTime(volume*.34,ctx.currentTime,.05);
    };
    document.addEventListener('keydown',function(e){if(e.key==='Escape')panel.classList.remove('open')});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();