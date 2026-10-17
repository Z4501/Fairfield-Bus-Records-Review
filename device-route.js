// Route phone-sized screens to the matching mobile reader. Explicit choices win.
(()=>{
 const url=new URL(location.href);
 try{
  if(url.searchParams.get('desktop')==='1'){
   sessionStorage.setItem('bus-report-layout','desktop');return;
  }
  if(url.searchParams.get('mobile')==='1')sessionStorage.removeItem('bus-report-layout');
  else if(sessionStorage.getItem('bus-report-layout')==='desktop')return;
 }catch(_){if(url.searchParams.get('desktop')==='1')return;}
 if(url.searchParams.get('mobile')!=='1'&&!matchMedia('(max-width: 700px)').matches)return;
 const file=url.pathname.split('/').pop()||'index.html';
 const allowed=['index.html','buses.html','repairs.html','library.html','photos.html','memo.html','story.html'];
 if(!allowed.includes(file))return;
 const base=url.pathname.endsWith('/')?url.pathname:url.pathname.slice(0,url.pathname.lastIndexOf('/')+1);
 url.pathname=base+'mobile/'+file;
 url.searchParams.delete('mobile');
 location.replace(url.href);
})();
