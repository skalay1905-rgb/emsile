var C='emsile-e77dea64b1';
self.addEventListener('install',function(e){
 e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./']);}).then(function(){return self.skipWaiting?null:null;}));
});
self.addEventListener('activate',function(e){
 e.waitUntil(caches.keys().then(function(ks){
  return Promise.all(ks.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));
 }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
 if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){
  return r||fetch(e.request).then(function(nr){
   var cp=nr.clone();caches.open(C).then(function(c){c.put(e.request,cp);});
   return nr;
  });
 }));
});
self.addEventListener('message',function(e){
 if(e.data==='SKIP')self.skipWaiting();
});