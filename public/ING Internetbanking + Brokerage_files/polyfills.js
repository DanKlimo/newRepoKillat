//promise polyfill
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(){}function n(e){if(!(this instanceof n))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],f(e,this)}function t(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,n._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var i;try{i=n(e._value)}catch(f){return void r(t.promise,f)}o(t.promise,i)}else(1===e._state?o:r)(t.promise,e._value)})):e._deferreds.push(t)}function o(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var o=t.then;if(t instanceof n)return e._state=3,e._value=t,void i(e);if("function"==typeof o)return void f(function(e,n){return function(){e.apply(n,arguments)}}(o,t),e)}e._state=1,e._value=t,i(e)}catch(u){r(e,u)}}function r(e,n){e._state=2,e._value=n,i(e)}function i(e){2===e._state&&0===e._deferreds.length&&n._immediateFn(function(){e._handled||n._unhandledRejectionFn(e._value)});for(var o=0,r=e._deferreds.length;r>o;o++)t(e,e._deferreds[o]);e._deferreds=null}function f(e,n){var t=!1;try{e(function(e){t||(t=!0,o(n,e))},function(e){t||(t=!0,r(n,e))})}catch(i){if(t)return;t=!0,r(n,i)}}var u=function(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})},c=setTimeout;n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(n,o){var r=new this.constructor(e);return t(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(n,o,r)),r},n.prototype["finally"]=u,n.all=function(e){return new n(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},n.resolve=function(e){return e&&"object"==typeof e&&e.constructor===n?e:new n(function(n){n(e)})},n.reject=function(e){return new n(function(n,t){t(e)})},n.race=function(e){return new n(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},n._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){c(e,0)},n._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();l.Promise?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=u):l.Promise=n});

//webcomponents-platform
!function(e){"use strict";var t;if(!((t=document.createEvent("Event")).initEvent("foo",!0,!0),t.preventDefault(),t.defaultPrevented)){var n=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(n.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))}}var o=/Trident/.test(navigator.userAgent);if((!window.CustomEvent||o&&"function"!=typeof window.CustomEvent)&&(window.CustomEvent=function(e,t){t=t||{};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,Boolean(t.bubbles),Boolean(t.cancelable),t.detail),n},window.CustomEvent.prototype=window.Event.prototype),!window.Event||o&&"function"!=typeof window.Event){var r=window.Event;if(window.Event=function(e,t){t=t||{};var n=document.createEvent("Event");return n.initEvent(e,Boolean(t.bubbles),Boolean(t.cancelable)),n},r)for(var i in r)window.Event[i]=r[i];window.Event.prototype=r.prototype}if(!window.MouseEvent||o&&"function"!=typeof window.MouseEvent){var a=window.MouseEvent;if(window.MouseEvent=function(e,t){t=t||{};var n=document.createEvent("MouseEvent");return n.initMouseEvent(e,Boolean(t.bubbles),Boolean(t.cancelable),t.view||window,t.detail,t.screenX,t.screenY,t.clientX,t.clientY,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,t.button,t.relatedTarget),n},a)for(var i in a)window.MouseEvent[i]=a[i];window.MouseEvent.prototype=a.prototype}if(Array.from||(Array.from=function(e){return[].slice.call(e)}),!Object.assign){var v=function(e,t){for(var n,o=Object.getOwnPropertyNames(t),r=0;r<o.length;r++)e[n=o[r]]=t[n]};Object.assign=function(e,t){for(var n,o=[].slice.call(arguments,1),r=0;r<o.length;r++)(n=o[r])&&v(e,n);return e}}}(window.WebComponents);

//custom elements polyfill
!function(){if(!window["force-no-ce-shim"]){var supportsV1="customElements"in window,nativeShimBase64="ZnVuY3Rpb24gbmF0aXZlU2hpbSgpeygoKT0+eyd1c2Ugc3RyaWN0JztpZighd2luZG93LmN1c3RvbUVsZW1lbnRzKXJldHVybjtjb25zdCBhPXdpbmRvdy5IVE1MRWxlbWVudCxiPXdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUsYz13aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0LGQ9bmV3IE1hcCxlPW5ldyBNYXA7bGV0IGY9ITEsZz0hMTt3aW5kb3cuSFRNTEVsZW1lbnQ9ZnVuY3Rpb24oKXtpZighZil7Y29uc3Qgaj1kLmdldCh0aGlzLmNvbnN0cnVjdG9yKSxrPWMuY2FsbCh3aW5kb3cuY3VzdG9tRWxlbWVudHMsaik7Zz0hMDtjb25zdCBsPW5ldyBrO3JldHVybiBsfWY9ITE7fSx3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlPWEucHJvdG90eXBlO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csJ2N1c3RvbUVsZW1lbnRzJyx7dmFsdWU6d2luZG93LmN1c3RvbUVsZW1lbnRzLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuY3VzdG9tRWxlbWVudHMsJ2RlZmluZScse3ZhbHVlOihqLGspPT57Y29uc3QgbD1rLnByb3RvdHlwZSxtPWNsYXNzIGV4dGVuZHMgYXtjb25zdHJ1Y3Rvcigpe3N1cGVyKCksT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsbCksZ3x8KGY9ITAsay5jYWxsKHRoaXMpKSxnPSExO319LG49bS5wcm90b3R5cGU7bS5vYnNlcnZlZEF0dHJpYnV0ZXM9ay5vYnNlcnZlZEF0dHJpYnV0ZXMsbi5jb25uZWN0ZWRDYWxsYmFjaz1sLmNvbm5lY3RlZENhbGxiYWNrLG4uZGlzY29ubmVjdGVkQ2FsbGJhY2s9bC5kaXNjb25uZWN0ZWRDYWxsYmFjayxuLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaz1sLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayxuLmFkb3B0ZWRDYWxsYmFjaz1sLmFkb3B0ZWRDYWxsYmFjayxkLnNldChrLGopLGUuc2V0KGosayksYi5jYWxsKHdpbmRvdy5jdXN0b21FbGVtZW50cyxqLG0pO30sY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5jdXN0b21FbGVtZW50cywnZ2V0Jyx7dmFsdWU6KGopPT5lLmdldChqKSxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTt9KSgpO30=";if(supportsV1&&!window["force-ce-shim"]){var noNativeShim="undefined"!=typeof NO_NATIVE_SHIM?NO_NATIVE_SHIM:window["no-native-shim"];noNativeShim||(eval(window.atob(nativeShimBase64)),nativeShim())}else customElements()}function customElements(){(function(){"use strict";var t=new function(){},e=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function n(t){var n=e.has(t);return t=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(t),!n&&t}function o(t){var e=t.isConnected;if(void 0!==e)return e;for(;t&&!(t.__CE_isImportDocument||t instanceof Document);)t=t.parentNode||(window.ShadowRoot&&t instanceof ShadowRoot?t.host:void 0);return!(!t||!(t.__CE_isImportDocument||t instanceof Document))}function i(t,e){for(;e&&e!==t&&!e.nextSibling;)e=e.parentNode;return e&&e!==t?e.nextSibling:null}function r(t,e,n){n=n||new Set;for(var o=t;o;){if(o.nodeType===Node.ELEMENT_NODE){var a=o;e(a);var l=a.localName;if("link"===l&&"import"===a.getAttribute("rel")){if((o=a.import)instanceof Node&&!n.has(o))for(n.add(o),o=o.firstChild;o;o=o.nextSibling)r(o,e,n);o=i(t,a);continue}if("template"===l){o=i(t,a);continue}if(a=a.__CE_shadowRoot)for(a=a.firstChild;a;a=a.nextSibling)r(a,e,n)}o=o.firstChild?o.firstChild:i(t,o)}}function a(t,e,n){t[e]=n}function l(){this.a=new Map,this.f=new Map,this.c=[],this.b=!1}function c(t,e){t.b=!0,t.c.push(e)}function s(t,e){t.b&&r(e,function(e){return d(t,e)})}function d(t,e){if(t.b&&!e.__CE_patched){e.__CE_patched=!0;for(var n=0;n<t.c.length;n++)t.c[n](e)}}function h(t,e){var n=[];for(r(e,function(t){return n.push(t)}),e=0;e<n.length;e++){var o=n[e];1===o.__CE_state?t.connectedCallback(o):f(t,o)}}function u(t,e){var n=[];for(r(e,function(t){return n.push(t)}),e=0;e<n.length;e++){var o=n[e];1===o.__CE_state&&t.disconnectedCallback(o)}}function p(t,e,n){var o=[];if(r(e,function(e){if("link"===e.localName&&"import"===e.getAttribute("rel")){var i=e.import;i instanceof Node&&"complete"===i.readyState?(i.__CE_isImportDocument=!0,i.__CE_hasRegistry=!0):e.addEventListener("load",function(){var o=e.import;o.__CE_documentLoadHandled||(o.__CE_documentLoadHandled=!0,o.__CE_isImportDocument=!0,o.__CE_hasRegistry=!0,new Set(n),n.delete(o),p(t,o,n))})}else o.push(e)},n=n||new Set),t.b)for(e=0;e<o.length;e++)d(t,o[e]);for(e=0;e<o.length;e++)f(t,o[e])}function f(t,e){if(void 0===e.__CE_state){var n=t.a.get(e.localName);if(n){n.constructionStack.push(e);var i=n.constructor;try{try{if(new i!==e)throw Error("The custom element constructor did not produce the element being upgraded.")}finally{n.constructionStack.pop()}}catch(t){throw e.__CE_state=2,t}if(e.__CE_state=1,e.__CE_definition=n,n.attributeChangedCallback)for(n=n.observedAttributes,i=0;i<n.length;i++){var r=n[i],a=e.getAttribute(r);null!==a&&t.attributeChangedCallback(e,r,null,a,null)}o(e)&&t.connectedCallback(e)}}}function m(t,e){this.c=t,this.a=e,this.b=void 0,p(this.c,this.a),"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function b(t){t.b&&t.b.disconnect()}function y(t){if(t.a)throw Error("Already resolved.");t.a=void 0,t.b&&t.b(void 0)}function w(t){this.f=!1,this.a=t,this.h=new Map,this.g=function(t){return t()},this.b=!1,this.c=[],this.j=new m(t,document)}l.prototype.connectedCallback=function(t){var e=t.__CE_definition;e.connectedCallback&&e.connectedCallback.call(t)},l.prototype.disconnectedCallback=function(t){var e=t.__CE_definition;e.disconnectedCallback&&e.disconnectedCallback.call(t)},l.prototype.attributeChangedCallback=function(t,e,n,o,i){var r=t.__CE_definition;r.attributeChangedCallback&&-1<r.observedAttributes.indexOf(e)&&r.attributeChangedCallback.call(t,e,n,o,i)},m.prototype.f=function(t){var e=this.a.readyState;for("interactive"!==e&&"complete"!==e||b(this),e=0;e<t.length;e++)for(var n=t[e].addedNodes,o=0;o<n.length;o++)p(this.c,n[o])},w.prototype.l=function(t,e){var o,i,r,a,l,c,s,d,h=this;if(!(e instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!n(t))throw new SyntaxError("The element name '"+t+"' is not valid.");if(this.a.a.get(t))throw Error("A custom element with name '"+t+"' has already been defined.");if(this.f)throw Error("A custom element is already being defined.");this.f=!0;try{var u=function(t){var e=f[t];if(void 0!==e&&!(e instanceof Function))throw Error("The '"+t+"' callback must be a function.");return e},f=e.prototype;if(!(f instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");o=u("connectedCallback"),i=u("disconnectedCallback"),r=u("adoptedCallback"),a=u("attributeChangedCallback"),l=e.observedAttributes||[]}catch(t){return}finally{this.f=!1}c=this.a,s=t,d={localName:t,constructor:e,connectedCallback:o,disconnectedCallback:i,adoptedCallback:r,attributeChangedCallback:a,observedAttributes:l,constructionStack:[]},c.a.set(s,d),c.f.set(d.constructor,d),this.c.push(t),this.b||(this.b=!0,this.g(function(){if(!1!==h.b)for(h.b=!1,p(h.a,document);0<h.c.length;){var t=h.c.shift();(t=h.h.get(t))&&y(t)}}))},w.prototype.get=function(t){if(t=this.a.a.get(t))return t.constructor},w.prototype.o=function(t){if(!n(t))return Promise.reject(new SyntaxError("'"+t+"' is not a valid custom element name."));var e=this.h.get(t);return e?e.c:(e=new function(){var t=this;this.b=this.a=void 0,this.c=new Promise(function(e){t.b=e,t.a&&e(t.a)})},this.h.set(t,e),this.a.a.get(t)&&-1===this.c.indexOf(t)&&y(e),e.c)},w.prototype.m=function(t){b(this.j);var e=this.g;this.g=function(n){return t(function(){return e(n)})}},window.CustomElementRegistry=w,w.prototype.define=w.prototype.l,w.prototype.get=w.prototype.get,w.prototype.whenDefined=w.prototype.o,w.prototype.polyfillWrapFlushCallback=w.prototype.m;var v=window.Document.prototype.createElement,g=window.Document.prototype.createElementNS,E=window.Document.prototype.importNode,_=window.Document.prototype.prepend,C=window.Document.prototype.append,N=window.Node.prototype.cloneNode,Z=window.Node.prototype.appendChild,W=window.Node.prototype.insertBefore,k=window.Node.prototype.removeChild,S=window.Node.prototype.replaceChild,R=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),Y=window.Element.prototype.attachShadow,V=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),x=window.Element.prototype.getAttribute,T=window.Element.prototype.setAttribute,j=window.Element.prototype.removeAttribute,L=window.Element.prototype.getAttributeNS,H=window.Element.prototype.setAttributeNS,G=window.Element.prototype.removeAttributeNS,D=window.Element.prototype.insertAdjacentElement,A=window.Element.prototype.prepend,M=window.Element.prototype.append,F=window.Element.prototype.before,O=window.Element.prototype.after,J=window.Element.prototype.replaceWith,X=window.Element.prototype.remove,z=window.HTMLElement,P=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),B=window.HTMLElement.prototype.insertAdjacentElement;function I(t,e,n){e.prepend=function(e){for(var i=[],r=0;r<arguments.length;++r)i[r-0]=arguments[r];r=i.filter(function(t){return t instanceof Node&&o(t)}),n.i.apply(this,i);for(var a=0;a<r.length;a++)u(t,r[a]);if(o(this))for(r=0;r<i.length;r++)a=i[r],a instanceof Element&&h(t,a)},e.append=function(e){for(var i=[],r=0;r<arguments.length;++r)i[r-0]=arguments[r];r=i.filter(function(t){return t instanceof Node&&o(t)}),n.append.apply(this,i);for(var a=0;a<r.length;a++)u(t,r[a]);if(o(this))for(r=0;r<i.length;r++)a=i[r],a instanceof Element&&h(t,a)}}var K,U,Q=window.customElements;if(!Q||Q.forcePolyfill||"function"!=typeof Q.define||"function"!=typeof Q.get){var q=new l;U=q,window.HTMLElement=function(){function e(){var e=this.constructor;if(!(o=U.f.get(e)))throw Error("The custom element being constructed was not registered with `customElements`.");var n=o.constructionStack;if(!n.length)return n=v.call(document,o.localName),Object.setPrototypeOf(n,e.prototype),n.__CE_state=1,n.__CE_definition=o,d(U,n),n;var o,i=n[o=n.length-1];if(i===t)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");return n[o]=t,Object.setPrototypeOf(i,e.prototype),d(U,i),i}return e.prototype=z.prototype,e}(),K=q,a(Document.prototype,"createElement",function(t){if(this.__CE_hasRegistry){var e=K.a.get(t);if(e)return new e.constructor}return t=v.call(this,t),d(K,t),t}),a(Document.prototype,"importNode",function(t,e){return t=E.call(this,t,e),this.__CE_hasRegistry?p(K,t):s(K,t),t}),a(Document.prototype,"createElementNS",function(t,e){if(this.__CE_hasRegistry&&(null===t||"http://www.w3.org/1999/xhtml"===t)){var n=K.a.get(e);if(n)return new n.constructor}return t=g.call(this,t,e),d(K,t),t}),I(K,Document.prototype,{i:_,append:C}),function(){var t=q;function e(e,n){Object.defineProperty(e,"textContent",{enumerable:n.enumerable,configurable:!0,get:n.get,set:function(e){if(this.nodeType===Node.TEXT_NODE)n.set.call(this,e);else{var i=void 0;if(this.firstChild){var r=this.childNodes,a=r.length;if(0<a&&o(this)){i=Array(a);for(var l=0;l<a;l++)i[l]=r[l]}}if(n.set.call(this,e),i)for(e=0;e<i.length;e++)u(t,i[e])}}})}a(Node.prototype,"insertBefore",function(e,n){if(e instanceof DocumentFragment){var i=Array.prototype.slice.apply(e.childNodes);if(e=W.call(this,e,n),o(this))for(n=0;n<i.length;n++)h(t,i[n]);return e}return i=o(e),n=W.call(this,e,n),i&&u(t,e),o(this)&&h(t,e),n}),a(Node.prototype,"appendChild",function(e){if(e instanceof DocumentFragment){var n=Array.prototype.slice.apply(e.childNodes);if(e=Z.call(this,e),o(this))for(var i=0;i<n.length;i++)h(t,n[i]);return e}return n=o(e),i=Z.call(this,e),n&&u(t,e),o(this)&&h(t,e),i}),a(Node.prototype,"cloneNode",function(e){return e=N.call(this,e),this.ownerDocument.__CE_hasRegistry?p(t,e):s(t,e),e}),a(Node.prototype,"removeChild",function(e){var n=o(e),i=k.call(this,e);return n&&u(t,e),i}),a(Node.prototype,"replaceChild",function(e,n){if(e instanceof DocumentFragment){var i=Array.prototype.slice.apply(e.childNodes);if(e=S.call(this,e,n),o(this))for(u(t,n),n=0;n<i.length;n++)h(t,i[n]);return e}i=o(e);var r=S.call(this,e,n),a=o(this);return a&&u(t,n),i&&u(t,e),a&&h(t,e),r}),R&&R.get?e(Node.prototype,R):c(t,function(t){e(t,{enumerable:!0,configurable:!0,get:function(){for(var t=[],e=0;e<this.childNodes.length;e++)t.push(this.childNodes[e].textContent);return t.join("")},set:function(t){for(;this.firstChild;)k.call(this,this.firstChild);Z.call(this,document.createTextNode(t))}})})}(),function(){var t,e,n=q;function i(t,e){Object.defineProperty(t,"innerHTML",{enumerable:e.enumerable,configurable:!0,get:e.get,set:function(t){var i=this,a=void 0;if(o(this)&&(a=[],r(this,function(t){t!==i&&a.push(t)})),e.set.call(this,t),a)for(var l=0;l<a.length;l++){var c=a[l];1===c.__CE_state&&n.disconnectedCallback(c)}return this.ownerDocument.__CE_hasRegistry?p(n,this):s(n,this),t}})}function l(t,e){a(t,"insertAdjacentElement",function(t,i){var r=o(i);return t=e.call(this,t,i),r&&u(n,i),o(t)&&h(n,i),t})}if(Y&&a(Element.prototype,"attachShadow",function(t){return this.__CE_shadowRoot=Y.call(this,t)}),V&&V.get)i(Element.prototype,V);else if(P&&P.get)i(HTMLElement.prototype,P);else{var d=v.call(document,"div");c(n,function(t){i(t,{enumerable:!0,configurable:!0,get:function(){return N.call(this,!0).innerHTML},set:function(t){var e="template"===this.localName?this.content:this;for(d.innerHTML=t;0<e.childNodes.length;)k.call(e,e.childNodes[0]);for(;0<d.childNodes.length;)Z.call(e,d.childNodes[0])}})})}a(Element.prototype,"setAttribute",function(t,e){if(1!==this.__CE_state)return T.call(this,t,e);var o=x.call(this,t);T.call(this,t,e),o!==(e=x.call(this,t))&&n.attributeChangedCallback(this,t,o,e,null)}),a(Element.prototype,"setAttributeNS",function(t,e,o){if(1!==this.__CE_state)return H.call(this,t,e,o);var i=L.call(this,t,e);H.call(this,t,e,o),i!==(o=L.call(this,t,e))&&n.attributeChangedCallback(this,e,i,o,t)}),a(Element.prototype,"removeAttribute",function(t){if(1!==this.__CE_state)return j.call(this,t);var e=x.call(this,t);j.call(this,t),null!==e&&n.attributeChangedCallback(this,t,e,null,null)}),a(Element.prototype,"removeAttributeNS",function(t,e){if(1!==this.__CE_state)return G.call(this,t,e);var o=L.call(this,t,e);G.call(this,t,e);var i=L.call(this,t,e);o!==i&&n.attributeChangedCallback(this,e,o,i,t)}),B?l(HTMLElement.prototype,B):D?l(Element.prototype,D):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched."),I(n,Element.prototype,{i:A,append:M}),t=n,(e=Element.prototype).before=function(e){for(var n=[],i=0;i<arguments.length;++i)n[i-0]=arguments[i];i=n.filter(function(t){return t instanceof Node&&o(t)}),F.apply(this,n);for(var r=0;r<i.length;r++)u(t,i[r]);if(o(this))for(i=0;i<n.length;i++)r=n[i],r instanceof Element&&h(t,r)},e.after=function(e){for(var n=[],i=0;i<arguments.length;++i)n[i-0]=arguments[i];i=n.filter(function(t){return t instanceof Node&&o(t)}),O.apply(this,n);for(var r=0;r<i.length;r++)u(t,i[r]);if(o(this))for(i=0;i<n.length;i++)r=n[i],r instanceof Element&&h(t,r)},e.replaceWith=function(e){for(var n=[],i=0;i<arguments.length;++i)n[i-0]=arguments[i];i=n.filter(function(t){return t instanceof Node&&o(t)});var r=o(this);J.apply(this,n);for(var a=0;a<i.length;a++)u(t,i[a]);if(r)for(u(t,this),i=0;i<n.length;i++)r=n[i],r instanceof Element&&h(t,r)},e.remove=function(){var e=o(this);X.call(this),e&&u(t,this)}}(),document.__CE_hasRegistry=!0;var $=new w(q);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:$})}}).call(self)}}();

// nodelist polyfill
"NodeList"in window&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(o,t){for(var i=t||window,e=0;e<this.length;e+=1)o.call(i,this[e],e,this)});

// array.find polyfill
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(r){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],i=0;i<t;){var o=e[i];if(r.call(n,o,i,e))return o;i++}},configurable:!0,writable:!0});

// READY!
window.dispatchEvent(new CustomEvent("PolyfillsLoaded",{detail:{payload:!0}})),window.polyfillsLoaded=!0;