;(function($) {
'use strict';
function RwcBusySupportPlugin(element) {
this.element = element;
this.findPageReloadingElement = findPageReloadingElement;
}
function findPageReloadingElement() {
var result = undefined;
var tagName = this.element.prop('tagName');
if (tagName) {
var upperCaseTagName = tagName.toUpperCase();
if (upperCaseTagName === 'A' || upperCaseTagName === 'BUTTON') {
result = this.element;
} else {
var parents = this.element.parents('a');
if (parents && parents.length > 0) {
result = parents;
}
}
}
return result;
}
RwcBusySupportPlugin.prototype.isPageReloadingElement = function () {
var result = false;
var reloadingElement = this.findPageReloadingElement();
if (reloadingElement) {
var tagName = reloadingElement.prop('tagName');
var upperCaseTagName = (tagName) ? tagName.toUpperCase() : null;
if (upperCaseTagName === 'A') {
var href = reloadingElement.attr('href');
var targetUndefined = reloadingElement.attr('target') === undefined;
var onClickScriptUndefined = reloadingElement.attr('onclick') === undefined && reloadingElement.attr('onClick') === undefined;
var callInApplication = (href !== undefined) && (href.indexOf('./') === 0 || href.indexOf('../') === 0 );
result = (targetUndefined && onClickScriptUndefined && callInApplication);
} else if (upperCaseTagName === 'BUTTON' || upperCaseTagName === 'INPUT') {
var isSubmit = reloadingElement.attr('type') === 'submit';
var	onSubmitHandlerUndefined = reloadingElement.attr('onsubmit') === undefined && reloadingElement.attr('onSubmit') === undefined;
var	form = reloadingElement.parents('form');
if (form !== null) {
var action = form.attr('action');
var callInApplication = (action !== undefined && (action.indexOf('./') === 0 || action.indexOf('../') === 0 ));
result = isSubmit && onSubmitHandlerUndefined && callInApplication;
}
}
}
return result;
};
$.fn.rwcBusySupport = function(options) {
var result = this.data('plugin_rwcBusySupport');
if (!result) {
result = new RwcBusySupportPlugin(this);
this.data('plugin_rwcBusySupport', result);
}
return result;
}
})(jQuery);
var RequestBlocker = {
checkEvent: function(event, timeout) {
var result = true;
if (event) {
if (event.requestBlockerResult) {
result = event.requestBlockerResult;
} else {
var target = event.target;
if (target) {
if ($(target).rwcBusySupport().isPageReloadingElement()) {
if ($(document).data("requestBlockerBlocked")) {
result = false;
} else {
$(document).data("requestBlockerBlocked", true);
window.setTimeout(function() {
$(document).data("requestBlockerBlocked", null);
}, timeout);
result = true;
}
}
}
event.requestBlockerResult = result;
}
}
return result;
}
};
$(document).ready(function () {
(function ($, Wicket) {
'use strict';
var dataAttributes = {
ignoreIndicator: 'no-busy-indicator',
indicatorShown: 'showing',
module: 'busyindicator',
delayMs: 'delay',
delayRef: 'delay-timeout-id', 
timeOutMs: 'timeout',
timeoutRef: 'cancel-timeout-id',
timeOutDialogId: 'timeout-dialog'
};
var	_$indicatorElement;
function getIndicatorElement() {
var el;
if (_$indicatorElement) {
el = _$indicatorElement;
} else {
el = _$indicatorElement = $('[data-' + dataAttributes.module + ']');
}
return el;
}
function isIndicatorToBeDisplayed(attributes) {
if (attributes.event) {
var el = attributes.event.target;
return $(el).data(dataAttributes.ignoreIndicator) === undefined;
} else if (attributes.attributes) {
return $(attributes).data(dataAttributes.ignoreIndicator) === undefined;
} else {
return true;
}
}
function handleConnectionTimeout() {
hide();
}
function isChangeOrClickEvent(attributes) {
var result = false,
eventnames,
eventname,
eventparameter,
i;
if (attributes !== null) {
eventnames = attributes.e || [];
eventparameter = attributes.ep ? attributes.ep.reduce(function(a, b) {return a.concat(b.value)}, []):[];
eventnames = eventnames.concat(eventparameter);
if (eventnames !== null) {
for (i = 0; i < eventnames.length; i += 1) {
eventname = eventnames[i];
if (eventname.indexOf('change') !== -1 || eventname.indexOf('click') !== -1) {
result = true;
}
}
}
}
return result;
}
function isSimpleLeftClick(event) {
return !(
event.which !== 1 || 
event.metaKey || 
event.ctrlKey || 
event.shiftKey || 
event.altKey 
);
}
function getiOSversion() {
if (/iP(hone|od|ad)/.test(navigator.platform)) {
var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
return parseInt(v[1], 10);
}
}
function setCenter() {
var busyIndicator = getIndicatorElement();
var modalContent = $('.modal-content', busyIndicator);
var posLeft = $(window).width()/2 - modalContent.width()/2 - 18;
var posTop = $(window).height()/2 - modalContent.height()/2 - 28;
if (busyIndicator.data(dataAttributes.indicatorShown)) {
modalContent.css({
left: posLeft,
top: posTop
});
}
}
function displayHandler() {
var busyIndicator = getIndicatorElement(),
cancelTimeoutId;
$(window).bind("resize scroll touchend", setCenter);
setCenter();
busyIndicator.attr('aria-hidden', 'false');
var timeout = getIndicatorElement().data(dataAttributes.timeOutMs);
cancelTimeoutId = window.setTimeout(handleConnectionTimeout, timeout);
busyIndicator.data(dataAttributes.timeoutRef, cancelTimeoutId);
}
function show() {
var busyIndicator = getIndicatorElement();
var delayTimeoutId;
if (busyIndicator.data(dataAttributes.indicatorShown)) {
return;
}
busyIndicator.data(dataAttributes.indicatorShown, true);
var delay = getIndicatorElement().data(dataAttributes.delayMs);
if (delay > 0 && getiOSversion() !== 8) {
delayTimeoutId = window.setTimeout(displayHandler, delay);
busyIndicator.data(dataAttributes.delayRef, delayTimeoutId);
} else {
displayHandler();
}
}
function hide() {
var busyIndicator = getIndicatorElement(),
delayTimeoutId,
cancelTimeoutId;
if (busyIndicator.data(dataAttributes.indicatorShown)) {
busyIndicator.data(dataAttributes.indicatorShown, false);
delayTimeoutId = busyIndicator.data(dataAttributes.delayRef);
if (delayTimeoutId !== null) {
window.clearTimeout(delayTimeoutId);
}
busyIndicator.data(dataAttributes.delayRef, null);
cancelTimeoutId = busyIndicator.data(dataAttributes.timeoutRef);
if (cancelTimeoutId !== null) {
window.clearTimeout(cancelTimeoutId);
}
busyIndicator.data(dataAttributes.timeoutRef, null);
busyIndicator.attr('aria-hidden', 'true');
$(window).unbind("resize scroll", setCenter);
}
}
(function init() {
Wicket.Event.subscribe('/ajax/call/beforeSend', function (jqEvent, attributes, jqXHR, errorThrown, textStatus) {
if (isChangeOrClickEvent(attributes) && isIndicatorToBeDisplayed(attributes)) {
show();
}
});
Wicket.Event.subscribe('/ajax/call/complete', function (jqEvent, attributes, jqXHR, errorThrown, textStatus) {
if (isChangeOrClickEvent(attributes)) {
hide();
}
});
$(document).delegate('a, button, input', 'click', function (event) {
var target = (event) ? event.target : undefined;
if (target) {
var pageReloading = $(target).rwcBusySupport().isPageReloadingElement();
if (pageReloading && isSimpleLeftClick(event) && isIndicatorToBeDisplayed(target)) {
show();
}
}
});
})();
}($, Wicket));
});
