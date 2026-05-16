import{a as u,S as d,i as a}from"./assets/vendor-GgwdjDaY.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const m="55762105-53f0d60783cc05dbb5c3cf186",p="https://pixabay.com/api/";function h(s){const o={key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return u.get(p,{params:o}).then(e=>e.data)}const c=document.querySelector(".gallery"),f=document.querySelector(".loader");let g=new d(".gallery a",{captionsData:"alt",captionDelay:250});function y(s){const o=s.map(e=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b>${e.likes}</p>
        <p class="info-item"><b>Views</b>${e.views}</p>
        <p class="info-item"><b>Comments</b>${e.comments}</p>
        <p class="info-item"><b>Downloads</b>${e.downloads}</p>
      </div>
    </li>`).join("");c.insertAdjacentHTML("beforeend",o),g.refresh()}function b(){c.innerHTML=""}function L(){f.classList.remove("is-hidden")}function w(){f.classList.add("is-hidden")}const l=document.querySelector("#search-form");l.addEventListener("submit",s=>{s.preventDefault();const o=s.currentTarget.elements.search-text.value.trim();if(o===""){a.warning({message:"Please fill in the search field",position:"topRight"});return}b(),L(),h(o).then(e=>{e.hits.length===0?a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):y(e.hits)}).catch(e=>{console.error(e),a.error({message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{w(),l.reset()})});
//# sourceMappingURL=index.js.map
