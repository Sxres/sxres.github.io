const AR='<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" class="f-r"/></marker></defs>';
const T=(x,y,s,c='',a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}" class="lb ${c}">${s}</text>`;
const B=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"/>`;
const A=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="s-r" stroke-width="3" marker-end="url(#ah)"/>`;

const homeDiagram=()=>{
  const S=158,cx=210,cy=317,TY=.55,H=95,K=.28,N=34,f=n=>n.toFixed(1),
  Z=(x,y)=>.55*(1-y)+.25*(1-x)+.1*Math.sin(3*x+1.3*y)-.95*Math.exp(-((x+.5)**2/.03+(y-.72)**2/.04))-.45*Math.exp(-((x-.5)**2/.1+(y-.25)**2/.07))+.28*Math.exp(-((x-.05)**2/.04+(y-.5)**2/.12))+.3*Math.exp(-((x-1)**2/.05+y*y/.1)),
  Q=(x,y)=>[cx+S*(x+K*y),cy+S*TY*y-H*Z(x,y)],
  G=[...Array(N+1)].map((_,j)=>[...Array(N+1)].map((_,i)=>{const x=-1+2*i/N,y=-1+2*j/N;return[...Q(x,y),Z(x,y)]}));
  let g=T(210,36,'the way down is rarely a straight line','lr');
  for(let j=0;j<N;j++){let q='',s=[[],[],[],[],[],[]];
    for(let i=0;i<N;i++){const a=G[j][i],b=G[j][i+1],c=G[j+1][i+1],e=G[j+1][i],
      p=`M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}L${f(c[0])} ${f(c[1])}L${f(e[0])} ${f(e[1])}Z`;
      q+=p;const z=(a[2]+b[2]+c[2]+e[2])/4;s[Math.round(Math.min(.55,Math.max(0,(.5-z)*.7))/.11)].push(p)}
    g+=`<path d="${q}" class="f-p"/>`+s.map((v,k)=>k&&v.length?`<path d="${v.join('')}" class="f-r" fill-opacity="${(k*.11).toFixed(2)}"/>`:'').join('')+`<path d="${q}" fill="none" class="s-r" stroke-width=".9" stroke-linejoin="round"/>`}
  const V=[[.78,-.75],[.65,-.45],[.4,-.25],[.2,.05],[.05,.4],[-.1,.5],[-.5,.72]],
  cr=(p0,p1,p2,p3,t)=>p1.map((_,i)=>.5*(2*p1[i]+(p2[i]-p0[i])*t+(2*p0[i]-5*p1[i]+4*p2[i]-p3[i])*t*t+(3*p1[i]-p0[i]-3*p2[i]+p3[i])*t**3)),
  W=[...Array(11)].map((_,k)=>{const u=k/10*(V.length-1),i=Math.min(V.length-2,Math.floor(u));return cr(V[Math.max(0,i-1)],V[i],V[i+1],V[Math.min(V.length-1,i+2)],u-i)}),pl=[];
  for(let k=0;k<10;k++)for(let s=0;s<8;s++){const t=s/8;pl.push(Q(W[k][0]+(W[k+1][0]-W[k][0])*t,W[k][1]+(W[k+1][1]-W[k][1])*t))}
  pl.push(Q(...W[10]));
  const sp=(Pt,n)=>[...Array(n+1)].map((_,k)=>{const u=k/n*(Pt.length-1),i=Math.min(Pt.length-2,Math.floor(u));return Q(...cr(Pt[Math.max(0,i-1)],Pt[i],Pt[i+1],Pt[Math.min(Pt.length-1,i+2)],u-i))});
  const gh=Pt=>{const n=10,Wp=[...Array(n+1)].map((_,k)=>{const u=k/n*(Pt.length-1),i=Math.min(Pt.length-2,Math.floor(u));return cr(Pt[Math.max(0,i-1)],Pt[i],Pt[i+1],Pt[Math.min(Pt.length-1,i+2)],u-i)}),dt=Wp.map(w=>Q(...w));let lp=dt[0];
    return `<g opacity=".3"><polyline points="${sp(Pt,80).map(p=>p.map(f).join(',')).join(' ')}" fill="none" class="s-i" stroke-width="2.4" stroke-linejoin="round"/>`+dt.map(([x,y],k)=>{if(k&&k<n&&(Math.hypot(x-lp[0],y-lp[1])<12||Math.hypot(x-dt[n][0],y-dt[n][1])<12))return'';lp=[x,y];return`<circle cx="${f(x)}" cy="${f(y)}" r="${k?4:6}" class="f-i"/>`}).join('')+'</g>'};
  [[[.85,-.5],[.95,-.1],[.8,.3],[.95,.6],[.9,.9]],[[-.85,-.85],[-.6,-.65],[-.35,-.55],[-.05,-.5],[.15,-.35],[.38,-.05],[.55,.15],[.5,.27]]].forEach(Pt=>g+=gh(Pt));
  g+=`<polyline points="${pl.map(p=>p.map(f).join(',')).join(' ')}" fill="none" class="s-i" stroke-width="2.4" stroke-linejoin="round"/>`;
  const D=W.map(w=>Q(...w));
  let lp=D[0];D.forEach(([x,y],k)=>{if(k&&k<10&&(Math.hypot(x-lp[0],y-lp[1])<12||Math.hypot(x-D[10][0],y-D[10][1])<12))return;lp=[x,y];g+=`<circle cx="${f(x)}" cy="${f(y)}" r="${k==10?3.5:k?4:6}" class="${k==10?'f-r s-i':'f-i'}" stroke-width="2"/>`});
  return `<svg viewBox="0 14 420 430" role="img" aria-label="3D loss surface with a path of gradient descent steps">${g}</svg>`;
};

const sc=(cx,by,w,h,n,r)=>{let g=B(cx-w/2,by-h,w,h,'f-i')+`<polygon points="${cx-w/2-5},${by-h} ${cx},${by-h-r} ${cx+w/2+5},${by-h}" class="f-r"/>`+B(cx-6,by-16,12,16,'f-p');for(let i=1;i<=n;i++)g+=B(cx-w/2+i*w/(n+1)-5,by-h+10,10,12,'f-p');return g};
const slab=(y,s,c)=>B(60,y,300,60,c)+T(210,y+36,s,'lw');
const P=[
{t:'About me',m:'Oshawa, Ontario',
 x:['I started my B.Sc. at Durham College in 2023, and what keeps me hooked is how fast the field is evolving and just how exciting everything in AI is right now. I’m also super interested in frontend design, low-level systems, and how modelling can be applied to physical hardware.',
    'Outside of work, I’m happiest outdoors. I love rock climbing and snowboarding, and I’ll happily say yes to just about any outdoor adventure, whether that’s a new route, a fresh trail or a powder day.',
    'I’m fortunate enough at the moment to be able to work as a research assistant at Durham College’s AI Hub, building applied AI projects with real clients across healthcare, nuclear, and physical AI. I’m always happy to talk about AI, so feel free to reach out.'],
 d:()=>{
    const hd=(t,x,y,r,s,rt)=>{
      const c=rt?'f-r':'f-p',bc='fill="rgba(0,0,0,0.55)"',ic='fill="rgba(0,0,0,0.28)"',sc='stroke="rgba(0,0,0,0.35)"';
      let b='';
      if(t===0)b=`<path d="M-15,1C-15,-9 15,-9 15,1C16,11 9,14 0,14C-9,14 -16,11 -15,1Z" class="${c}"/><path d="M-11,-1C-11,-6 11,-6 11,-1C9,3 -9,3 -11,-1Z" ${ic}/><circle cx="0" cy="6" r="2.2" ${bc}/>`;
      else if(t===1)b=`<path d="M-14,-2C-14,-6 14,-6 14,-2C15,4 10,6 0,6C-10,6 -15,4 -14,-2Z" class="${c}"/><path d="M-11,-2L11,-2" stroke-width="1.8" fill="none" ${sc}/><circle cx="0" cy="2" r="1.8" ${bc}/>`;
      else if(t===2)b=`<path d="M-17,2C-18,-11 18,-11 17,2C15,13 -15,13 -17,2Z" class="${c}"/><path d="M-11,-4C-7,-8 7,-8 11,-4" stroke-width="1.6" fill="none" ${sc}/><circle cx="0" cy="3.5" r="2.2" ${bc}/>`;
      else if(t===3)b=`<path d="M-6,-14C2,-14 7,-10 6,-3C5,2 7,8 4,14C-3,14 -6,10 -5,2C-5,-4 -8,-10 -6,-14Z" class="${c}"/><path d="M-2,-8C1,-4 1,4 -1,8" stroke-width="1.6" fill="none" ${sc}/><circle cx="0" cy="0" r="2" ${bc}/>`;
      else if(t===4)b=`<path d="M-14,1C-14,-8 14,-8 14,2C13,11 -13,11 -14,1Z" class="${c}"/><circle cx="-4.5" cy="-0.5" r="3.2" ${bc}/><circle cx="4.5" cy="-0.5" r="3.2" ${bc}/><circle cx="0" cy="6" r="1.8" ${bc}/>`;
      else if(t===5)b=`<path d="M-8,-1L0,-6L8,-1L6,4L-6,4Z" class="${c}"/><path d="M-5,-1L5,-1" stroke-width="1.4" fill="none" ${sc}/><circle cx="0" cy="1" r="1.5" ${bc}/>`;
      else b=`<path d="M-22,0C-22,-11 22,-11 22,0C23,13 14,16 0,16C-14,16 -23,13 -22,0Z" class="${c}"/><path d="M-17,-2C-17,-8 17,-8 17,-2C13,4 -13,4 -17,-2Z" ${ic}/><circle cx="-7" cy="7" r="2.2" ${bc}/><circle cx="7" cy="7" r="2.2" ${bc}/>`;
      return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"${rt?'':' opacity=".55"'}>${b}</g>`;
    };
    const R=[[170,470,5,5,1.1],[240,470,5,-8,1.1],[180,375,1,12,1.2],[240,330,3,-20,1.25],[200,280,4,8,1.2],[265,235,1,-25,1.25],[215,190,2,-5,1.3],[230,122,6,0,1.25]];
    const H=[[115,430,0,10,0.9],[300,455,1,-15,1.0],[120,350,3,25,1.1],[305,380,2,-10,1.1],[290,290,4,15,1.0],[125,240,1,-10,1.0],[150,150,2,10,1.2],[310,190,0,-20,1.1],[300,125,1,5,1.0],[160,320,5,-5,0.9]];
    return T(210,36,'every route is solved one hold at a time','lr')+
      `<polygon points="70,500 60,420 80,330 62,250 90,170 76,110 150,90 260,100 340,84 352,170 336,260 356,350 340,430 352,500" class="f-i"/>`+
      `<rect x="30" y="500" width="360" height="20" class="f-i" fill-opacity=".5"/>`+
      H.map(([x,y,t,r,s])=>hd(t,x,y,r,s,false)).join('')+
      R.map(([x,y,t,r,s])=>hd(t,x,y,r,s,true)).join('');
  }},
{t:'Experience',m:'Research Assistant, Durham College AI Hub · May 2026 to present',
 x:['Working at the AI Hub has been an awesome hands-on experience. I built the agentic core of an AI assistant that switches between several personas, powered by AWS Lambda and Amazon Bedrock. It remembers context across turns and stays under 1.8 seconds at the 95th percentile in load tests.',
    'To make sure the assistant actually knows what it’s talking about, I set up retrieval from the client’s own documents using Bedrock Knowledge Bases and Titan embeddings.',
    'I also tracked down and fixed a sneaky routing bug where rejected requests were still reaching the LLM. Catching that saved about 1.4K tokens per request and prevented unnecessary cloud costs from running up.',
    'The coolest part was redesigning our intent routing: instead of running three classifiers in a slow sequence, I rebuilt it with <a href="https://typesafe.ai" target="_blank" rel="noopener">TypeSafe’s Jev decision model</a> in one parallel call. Median latency crashed from 3.8 s to 0.14 s (about 29x faster!) while holding recall at 93.9% across six intents.'],
 d:()=>{const bar=(y,l,w,c)=>T(40,y,l,'','start')+B(40,y+12,w,30,c);
  return T(210,36,'one parallel call replaces three in a row','lr')+bar(120,'median latency, before: 3.8 s',340,'f-i')+B(150,132,4,30,'f-p')+B(262,132,4,30,'f-p')+['97','210','323'].map(x=>T(x,152,'classifier','lw')).join('')+bar(210,'after: 0.14 s',13,'f-r')+bar(310,'worst case, before: 7.9 s',340,'f-i')+bar(400,'after: 0.32 s',14,'f-r')+T(210,488,'about 29x faster at the median,')+T(210,512,'with 93.9% recall kept across 6 intents')}},
{t:'Education',m:'Durham College · Oshawa, Ontario',
 x:['<b>B.Sc. in Artificial Intelligence</b>, September 2023 to present. My focus is applied machine learning and reliable AI systems.',
    'Honour Roll in Fall 2025 and Winter 2026.',
    'Coursework includes machine learning, computer vision, natural language processing, statistics, linear algebra, systems analysis and design, and computer architecture.'],
 d:()=>{let g=T(210,36,'every stop was a lesson','lr')+`<path d="M95 508C190 530 340 490 310 358C250 400 40 370 50 290S120 235 130 205" fill="none" class="s-r" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 10"/>`;
  g+=sc(95,500,72,42,2,22)+`<line x1="95" y1="436" x2="95" y2="418" class="s-i" stroke-width="2"/><polygon points="95,418 109,423 95,428" class="f-i"/>`+T(95,404,'elementary school');
  g+=sc(310,350,110,62,4,10)+`<circle cx="310" cy="263" r="11" class="f-p s-i" stroke-width="3"/><path d="M310 257V263H315" class="s-i" fill="none" stroke-width="2"/>`+T(310,240,'high school');
  g+=sc(130,185,140,66,0,30)+B(52,185,156,5,'f-i')+B(46,190,168,5,'f-i')+T(130,76,'college');
  [1,2,3,4].forEach(i=>g+=B(60+i*28-4,129,8,48,'f-p'));
  g+=`<polygon points="276,208 310,140 326,153 352,75 388,136 402,123 414,208" class="f-i"/><polygon points="352,75 365,96 358,92 353,100 346,93 344,96" class="f-p"/>`;
  g+=`<g opacity=".6"><path d="M130 207C150 235 250 238 282 206L398 186L312 161L380 138L352 107L352 80" fill="none" class="s-r" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 10"/></g><line x1="352" y1="75" x2="352" y2="51" class="s-i" stroke-width="2"/><polygon points="352,51 368,57 352,63" class="f-r"/>`;
  return g+`<circle cx="130" cy="207" r="6" class="f-r"/>`+T(172,211,'you are here','lr','start')}},
{t:'Technologies',m:'What I work with',
 x:['<b>Languages and tools:</b> Python, C++, SQL, TypeScript, Git, Linux, Docker.',
    '<b>ML and data:</b> PyTorch, TensorFlow, Scikit-learn, XGBoost, OpenCV, Pandas, NumPy, Matplotlib, Seaborn.',
    '<b>LLMs and testing:</b> Claude API, Amazon Bedrock (Knowledge Bases), LangChain, Ragas, Pytest, Locust.',
    '<b>Web and cloud:</b> FastAPI, SvelteKit, Supabase, Streamlit, AWS (EC2, S3, Lambda, API Gateway), GCP (Cloud Run).'],
 d:()=>T(210,36,'a stack, built from the ground up','lr')+[['web & cloud','f-i'],['llms & testing','f-r'],['ml & data','f-i'],['languages & tools','f-r']].map(([s,c],i)=>slab(90+i*84,s,c)).join('')},
{t:'Financial News Agent',m:'Python, TypeScript, FastAPI, Claude API, Supabase, SvelteKit',
 x:['I wanted to see how far I could push Claude’s tool-calling capabilities to build a real-time financial analyst. The agent breaks down complex user queries, autonomously decides which tools to trigger (fetching live stock quotes, market news, company financials, or insider trades), and synthesizes everything into a clear, cited answer.',
    'To make it feel super responsive, I built a SvelteKit frontend that streams the response live and visualizes tool-call progress as it happens. The FastAPI backend handles the heavy lifting, locked down with Supabase JWT auth, row-level security, per-IP rate limits, and input sanitization.',
    '<a href="https://github.com/Sxres/FunnyMarketNewsLetter" target="_blank" rel="noopener">View the code on GitHub</a>'],
 d:()=>{let g=T(210,36,'a question is converted into a researched answer','lr')+B(110,70,200,48,'f-i')+T(210,100,'your question','lw')+A(210,120,210,168)+B(110,172,200,56,'f-r')+T(210,205,'claude agent','lw');
  [['price',42],['news',134],['financials',226],['insiders',318]].forEach(([s,x],i)=>{g+=B(x,300,84,44,'f-i')+T(x+42,327,s,'lw')+A(210,230,x+42,296)+A(x+42,346,[160,190,230,260][i],396)});
  return g+B(110,400,200,48,'f-i')+T(210,430,'live answer, streamed','lw')+T(210,496,'locked down with JWT auth and rate limits')}},
{t:'Vision Transformer Research',m:'Python, PyTorch, Scikit-learn, Pandas',
 x:['Medical imaging has always fascinated me because getting it right actually matters. This project was also me and my classmate <a href="https://www.linkedin.com/in/reynardlin/" target="_blank" rel="noopener">Rey</a>’s first real dive into research. We teamed up to evaluate over eight vision architectures, including DINOv2, ViT, SwinV2, ResNet, and YOLO, on binary skin cancer classification using stratified 5-fold cross-validation.',
    'Garbage in means garbage out, so we curated and cleaned the noisy MRA-MIDAS dataset from 3,000 cases down to 906 quality-controlled samples, building reproducible preprocessing and augmentation pipelines from scratch.',
    'Through ablation studies, targeted layer-freezing, and building ensembles, we pushed the top configuration to ~92% sensitivity at a clinically relevant threshold.',
    '<a href="https://github.com/Sxres/SkinCancerImageClassificationResearch" target="_blank" rel="noopener">View the code on GitHub</a>'],
 d:()=>{let g=T(210,36,'models are tested until one can be trusted','lr')+T(40,96,'stratified 5-fold cross-validation','','start');
  for(let i=0;i<5;i++)g+=B(40+i*70,108,64,34,i==2?'f-r':'f-i')+T(72+i*70,130,i==2?'test':'train','lw');
  ['DINOv2','ViT','SwinV2','ResNet','YOLO'].forEach((s,i)=>{const y=190+i*42;g+=B(40,y,150,30,'f-i')+T(115,y+20,s,'lw')+A(192,y+15,264,y+15)});
  return g+B(268,190,112,198,'f-r')+T(324,296,'ensemble','lw')+T(210,440,'about 92% sensitivity','lr')+T(210,462,'at a clinically relevant threshold')+T(210,490,'906 quality-controlled cases')}},
{t:'Temperature Modelling',m:'Python, XGBoost, FastAPI, Streamlit, GCP, Docker',
 x:['I built this to take tabular machine learning all the way from raw weather history into a deployed, production-ready microservice. Using XGBoost with regularization and 10-fold randomized search tuning to keep it from overfitting, the model hit an R² of 0.991 and MAE of 0.71.',
    'To turn it into something anyone could easily query, I wrapped the inference pipeline in a Dockerized FastAPI service on Google Cloud Run and built a clean Streamlit interface for on-demand predictions.',
    '<a href="https://github.com/Sxres/temperature_predictor_app" target="_blank" rel="noopener">View the code on GitHub</a>'],
 d:()=>{let g=T(210,36,'history is converted into a prediction','lr');
  [['historical weather data','f-i'],['xgboost, tuned with 10-fold search','f-r'],['fastapi in docker','f-i'],['google cloud run','f-i'],['streamlit app','f-r']].forEach(([s,c],i)=>{const y=80+i*76;g+=B(70,y,280,44,c)+T(210,y+27,s,'lw')+(i<4?A(210,y+46,210,y+74):'')});
  return g+T(210,490,'R² 0.991  ·  MAE 0.71')}},
{t:'LotWatch',m:'Python, OpenCV, NumPy, Jupyter',
 x:['LotWatch is a real-time computer vision system that monitors parking lot footage to figure out which spaces are taken versus empty, frame by frame. It renders an annotated video stream complete with live green/red overlays and an occupancy counter.',
    'Instead of throwing a heavy deep net at the problem, I wanted an efficient classical CV approach: each space is a hand-drawn polygon combining MOG2 background subtraction with Laplacian edge-texture filtering, leveraging the fact that cars pack far more high-frequency edges than asphalt. Adjustable thresholds keep it accurate even with solid-color cars or shifting daylight.',
    '<a href="https://github.com/Sxres/LotWatch" target="_blank" rel="noopener">View the code on GitHub</a>'],
 d:()=>{let g=T(210,36,'every spot is converted into a yes or no','lr');
  [[100,[1,0,1,1,0,1]],[300,[0,1,1,0,1,0]]].forEach(([y,o])=>o.forEach((v,i)=>{const x=40+i*56;g+=`<rect x="${x}" y="${y}" width="56" height="84" fill="none" class="s-i" stroke-width="2"/>`+(v?B(x+8,y+10,40,64,'f-r')+B(x+14,y+(y<200?44:20),28,18,'f-p'):'')}));
  return g+`<line x1="40" y1="240" x2="380" y2="240" class="s-i" stroke-width="3" stroke-dasharray="14 12" stroke-opacity=".5"/>`+B(100,430,220,46,'f-i')+T(210,459,'occupied: 7 of 12','lw')}}
];

const rom=n=>['','i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii','xiv','xv','xvi','xvii','xviii','xix','xx'][n];
const ORD=[0,1,2,3,4,5,6,7],pn=i=>4+ORD.indexOf(i)*2;
const row=i=>`<li><button data-i="${i+1}"><span>${P[i].t}</span><i></i><b>${rom(pn(i))}</b></button></li>`;
const home=`<h2>Dragos Sorescu</h2><p class="sub">AI Researcher</p>
<p>Hello, thanks so much for visiting and welcome to my portfolio site! As you can tell, I’m Dragos, an undergrad student in Ontario, Canada studying machine learning and deep learning. Every day I’m trying to further my knowledge, explore new ideas, and build practical systems. This book collects my experience, education, and projects.</p>
<h3>Background</h3><ol class="toc">${[0,1,2,3].map(row).join('')}</ol>
<h3>Projects</h3><ol class="toc">${[4,5,6,7].map(row).join('')}</ol>
<p class="links"><a href="mailto:sorescudragos847@gmail.com">Email</a> · <a href="https://www.linkedin.com/in/dragos-sorescu" target="_blank" rel="noopener">LinkedIn</a> · <a href="https://github.com/Sxres" target="_blank" rel="noopener">GitHub</a> · <a href="Dragos_Sorescu_Resume.pdf" target="_blank" rel="noopener">Resume</a></p>`;

const $=id=>document.getElementById(id);
let cur=0,busy=false;
function render(i){
  cur=i;const L=$('L');$('bk').classList.toggle('inner',!!i);
  L.className='body'+(i?'':' big');
  if(i){const p=P[i-1];
    L.innerHTML=`<h2>${p.t}</h2><p class="sub">${p.m}</p>${p.x.map(t=>`<p>${t}</p>`).join('')}<button class="back" data-i="0">Back to contents</button>`;
    $('Rt').innerHTML=`<svg viewBox="0 0 420 560" role="img" aria-label="Diagram: ${p.t}">${AR}${p.d()}</svg>`;
    $('ln').textContent=rom(pn(i-1));$('rn').textContent=rom(pn(i-1)+1);
  }else{
    L.innerHTML=home;$('Rt').innerHTML=homeDiagram();
    $('ln').textContent='ii';$('rn').textContent='iii';
  }
}
function go(i){
  if(busy||i===cur)return;busy=true;
  $('bk').classList.add('out');
  setTimeout(()=>{
    render(i);
    $('bk').classList.remove('out');
    setTimeout(()=>{busy=false},380);
  },380);
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b)go(+b.dataset.i)});
document.addEventListener('keydown',e=>{
  if(e.repeat)return;
  if(e.key==='Escape')go(0);
  else if(e.key==='ArrowRight'&&cur<P.length)go(cur+1);
  else if(e.key==='ArrowLeft'&&cur>0)go(cur-1);
});
render(0);
