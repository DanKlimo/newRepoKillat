;(function () {
$(document).on('focusout', function () {
const keyValue = document.cookie.match('(^|;) ?SharedNavigation=([^;]*)(;|$)');
if (keyValue && typeof window.atob === "function") {
try {
const value = keyValue ? keyValue[2] : null;
const decoded = window.atob(value.replace(/\"/g,'').replace(/_/g, '/').replace(/-/g, '+'));
const result = JSON.parse(decoded);
const keepaliveUrl = result.keepaliveUrl;
if (keepaliveUrl) {
$.ajax({
url: keepaliveUrl,
xhrFields: {
withCredentials: true
},
cache:false 
});
}
} catch (exception) {
}
}
});
})();
