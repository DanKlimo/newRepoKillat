;(function($) {
var isDef = function (target) {
return (target !== null && typeof(target) !== 'undefined');
};
var evaluateScript = function(scriptnode, _this) {
var script = Wicket.DOM.text(scriptnode);
return function() {
try {
var evaluationFunction = eval("(function(jqObject) {" + script + "})");
evaluationFunction(_this);
} catch (exception) {
Wicket.Log.error("Exception evaluating javascript: " + exception + ", script: " + script);
}
}
};
var replaceHtml = function(htmlNode) {
var compId = htmlNode.getAttribute("id");
var html = Wicket.DOM.text(htmlNode);
return function() {
try {
var element = Wicket.$(compId);
if (isDef(element)) {
Wicket.DOM.replace(element, html);
} else {
Wicket.Log.error("replaceHtml: Component with id [[" + compId + "]] was not found");
}
} catch (exception) {
Wicket.Log.error("Exception replacing HTML: " + exception + ", component: " + compId + ", html: " + html);
}
}
};
var replaceInnerHtml = function(htmlNode) {
var compId = htmlNode.getAttribute("id");
var html = Wicket.DOM.text(htmlNode);
return function() {
try {
var element = Wicket.$(compId);
if (isDef(element)) {
$(element).html(html);
} else {
Wicket.Log.error("replaceInnerHtml: Component with id [[" + compId + "]] was not found");
}
} catch (exception) {
Wicket.Log.error("Exception replacing innerHTML: " + exception + ", component: " + compId + ", html: " + html);
}
}
};
var headerContribution = function(headerContributionNode) {
var attrs = {};
attrs.ch = '0|s';
attrs.wr = true;
attrs.dt = 'xml';
attrs.m = 'GET';
attrs.async = true;
attrs.rt = 0;
attrs.pd = false;
attrs.sp = "bubble";
attrs.sr = false;
var context = {
attrs: attrs,
steps: []
};
try {
var contributor = Wicket.Head.Contributor;
contributor.processContribution(context, headerContributionNode);
} catch (exception) {
Wicket.Log.error("Exception during contribution-evaluation: " + exception);
}
return context.steps;
};
var executeScripts = function(scripts) {
for (var i = 0; i < scripts.length; i++) {
try {
(scripts[i])();
} catch (exception) {
Wicket.Log.error("Exception executing script: " + exception);
}
}
};
var AsyncScriptsExecutor = function(functions) {
this.DONE = 1;
this.FAIL = 2;
this.ASYNC = 3;
this.DEPTH_LIMIT = 1000;
this.functions = functions;
this.current = 0;
this.depth = 0; 

this.processNext = function () {
if (this.current < this.functions.length) {
var f, run;
f = this.functions[this.current];
run = function () {
try {
var n = $.proxy(this.notify, this);
return f(n);
}
catch (e) {
Wicket.Log.error("AsyncScriptsExecutor.processNext: " + e);
return FunctionsExecuter.FAIL;
}
};
run = $.proxy(run, this);
this.current++;
if (this.depth > this.DEPTH_LIMIT) {

 this.depth = 0;
window.setTimeout(run, 1);
} else {
var retValue = run();
if (typeof(retValue) === 'undefined'|| retValue === null || retValue === this.ASYNC) {
this.depth++;
}
return retValue;
}
}
};
this.start = function () {
var retValue = this.DONE;
while (retValue === this.DONE) {
retValue = this.processNext();
}
};
this.notify = function () {
this.start();
};
};
$.fn.lazyload = function(url) {
var _this = this;
$.ajax(url, {
success : function(data, textStatus, jqXHR) {
if (jqXHR.readyState === 4) {
var asyncScripts = [];
var prependScripts = [];
var appendScripts = [];
var replaceHtmlScripts = [];
var retryIn = undefined;
try {
var root = data.getElementsByTagName("lazy-response")[0];
if (isDef(root)) {
for (var c = 0; c < root.childNodes.length; ++c) {
var node = root.childNodes[c];
if (node.tagName === "evaluate-priority") {
prependScripts.push(evaluateScript(node, _this));
} else if (node.tagName === "markup") {
replaceHtmlScripts.push(replaceHtml(node));
} else if (node.tagName === "innermarkup") {
replaceHtmlScripts.push(replaceInnerHtml(node));
} else if (node.tagName === "evaluate") {
appendScripts.push(evaluateScript(node, _this));
} else if (node.tagName === "components") {
for (var ci = 0; ci < node.childNodes.length; ++ci) {
var componentsChildNode = node.childNodes[ci];
if (componentsChildNode.tagName === "header-contribution") {
var headerContributionScripts = headerContribution(componentsChildNode);
for (var hcs = 0; hcs < headerContributionScripts.length; hcs++) {
asyncScripts.push(headerContributionScripts[hcs]);
}
} else if (componentsChildNode.tagName === "priority-evaluate") {
prependScripts.push(evaluateScript(componentsChildNode, _this));
} else if (componentsChildNode.tagName === "component") {
replaceHtmlScripts.push(replaceHtml(componentsChildNode));
} else if (componentsChildNode.tagName === "evaluate") {
appendScripts.push(evaluateScript(componentsChildNode, _this));
}
}
} else if (node.tagName === "retryIn") {
try {
retryIn = parseInt(Wicket.DOM.text(node));
} catch (ex) {
retryIn = undefined;
Wicket.Log.error("Exception processing retryIn: " + ex);
}
}
}
}
var executeSync = function(notify) {
executeScripts(prependScripts);
executeScripts(replaceHtmlScripts);
executeScripts(appendScripts);
notify();
};
if (asyncScripts.length == 0) {
var noop = function() {};
executeSync(noop);
} else {
asyncScripts.push(executeSync);
var executor = new AsyncScriptsExecutor(asyncScripts);
executor.start();
}
} catch (exception) {
Wicket.Log.error("Exception processing Response: " + exception);
}
if (retryIn && (retryIn >= 0)) {
setTimeout(function() {
_this.lazyload(url);
}, retryIn);
}
}
}
});
}
})(jQuery);