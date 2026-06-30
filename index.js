import{a as p,S as u,i}from"./assets/vendor-CFFvTae-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();async function f(a){const r="56484901-001e7e85bfee9cf80da113fbf",n="https://pixabay.com/api/";try{return(await p.get(n,{params:{key:r,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true"}})).data.hits}catch(o){throw o}}const l=document.querySelector(".loader"),c=document.querySelector(".gallery");let m=new u(".gallery a",{captionsData:"alt",captionDelay:250});function d({webformatURL:a,largeImageURL:r,tags:n,likes:o,views:e,comments:t,downloads:s}){return`
<li class="gallery-item">
<a class="gallery-link" href="${r}">
<img class="gallery-image" src="${a}" alt="${n}" loading="lazy" />
</a>
<div class="info">
<p class="info-item"><b>Likes</b><span>${o}</span></p>
<p class="info-item"><b>Views</b><span>${e}</span></p>
<p class="info-item"><b>Comments</b><span>${t}</span></p>
<p class="info-item"><b>Downloads</b><span>${s}</span></p>
</div>
</li>
`}function y(a){const r=a.map(d).join("");c.insertAdjacentHTML("beforeend",r),m.refresh()}function g(){c.innerHTML=""}function h(){l.style.display="block"}function b(){l.style.display="none"}const L=document.querySelector(".form");L.addEventListener("submit",w);function w(a){a.preventDefault();const r=a.currentTarget,n=r.elements["search-text"].value.trim();if(n===""){i.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}g(),h(),f(n).then(o=>{if(o.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:5e3});return}y(o),r.reset()}).catch(o=>{i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{b()})}
//# sourceMappingURL=index.js.map
