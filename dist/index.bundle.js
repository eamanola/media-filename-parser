var e={247:()=>{}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={exports:{}};return e[n](i,i.exports,t),i.exports}t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r);var n={};t.d(n,{DW:()=>b,HV:()=>u,es:()=>j,py:()=>O,Ay:()=>S,E8:()=>y,q8:()=>s,DD:()=>P,Ok:()=>h});var o=t(247);const i=function(e){var r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).replacement,t=void 0===r?"":r,n=function(e,r){return e.replace(/\.(?:mkv|mp4|avi|m4v|srt|ass)$/,r)}(e,t),o=function(e,r){return e.replace(/\[[^\]]+\]/gi,r)}(n,t),i=function(e,r){return e.replace(/\([^)]+\)/gi,r)}(o,t),u=function(e,r){return e.replace(/(?:720|1080)p/gi,r)}(i,t),c=function(e,r){return e.replace(/(?:hd|web|bd)rip/gi,r).replace(/web-dl/gi,r).replace(/bluray/gi,r)}(u,t),a=function(e,r){return e.replace(/\d+mb/gi,r)}(c,t),s=function(e,r){return e.replace(/x264|x265|hevc|xvid|aac5.1|aac|ac3\.evo|ac3|flac/gi,r)}(a,t);return s};var u=-1,c=/(?:^|[\s([.])(?:season|s)\s*(\d+)/i,a=function(e){return e.match(c)};const s=function(e){for(var r=e.split(o.sep).reverse(),t=null,n=0,i=r.length;n<i;n+=1)if(t=a(r[n]))return Number(t[1]);return u};function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function f(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?f(Object(t),!0).forEach((function(r){v(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function v(e,r,t){return(r=function(e){var r=function(e,r){if("object"!=p(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,r||"default");if("object"!=p(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string");return"symbol"==p(r)?r:r+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var b=-1,m=function(e,r){return e.match(r)},d=function(e){var r,t,n,o,i=function(e){return m(e,/(?:^|[^a-zA-Z])(e|ep|episode|ncop|nced|extra|oad)(?:\.|\s*)(\d+)(?:\s*v\s*(\d+))?/i)}(e);if(i)r=i,t=/^(?:e|ep|episode)$/i.test(i[1])?"episode":i[1].toLowerCase(),n=Number(i[2]),o=Number(i[3]);else{var u=function(e){return m(function(e,r){return e.replace(/part \d+/gi,r)}(e,""),/(?:^|\s)(\d{1,4})(?:\s*v\s*(\d+))?(?:[^\dA-Za-z]|$)/i)}(e);u&&Number(u[1])<1900&&(r=u,t="wildGuess",n=Number(u[1]),o=Number(u[2]))}if(r){var c=v({},t,n);return o&&(c=l(l({},c),{},{version:o})),{episodeInfo:c,match:r}}return{episodeInfo:null,match:null}};const y=function(e){for(var r=i(e).split(o.sep).reverse(),t=0,n=r.length;t<n;t+=1){var u=d(r[t]).episodeInfo;if(u)return u}return{episode:b}};var O=-1,g=/(?:^|[\s([.])(\d{4})(?:[\s)\].]|$)/i,N=function(e){return e.match(g)};const h=function(e){var r=N(e);if(r){var t=Number(r[1]);if(t>1900)return t}return O};var j=null,w=" ";const P=function(e){var r=function(e,r){return e.replace(/^[^a-zA-Z0-9]*/,r).replace(/[^a-zA-Z0-9]*$/,r)}(function(e){return e.replace(/\./g,w)}(function(e){var r=N(e);return r?e.replace(r[0],w):e}(function(e){var r=d(e),t=r.match,n=r.episodeInfo;return t&&!n.wildGuess?e.replace(t[0],w):e}(function(e){var r=a(e);return r?e.replace(r[0],w):e}(i(e.split(o.sep)[0],{replacement:w}))))),w).trim();return r.split("".concat(w).concat(w))[0]||j},S=null;var D=n.DW,E=n.HV,x=n.es,A=n.py,I=n.Ay,W=n.E8,$=n.q8,k=n.DD,z=n.Ok;export{D as EPISODE_UNKNOWN,E as SEASON_UNKNOWN,x as TITLE_UNKNOWN,A as YEAR_UNKNOWN,I as default,W as episode,$ as season,k as title,z as year};