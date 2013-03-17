function xhrGet(reqUri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", reqUri, true);
    xhr.onload = callback;

    xhr.send();
}

function inherit(sub, parent) {
    sub.prototype = new parent();
    sub.prototype.constructor = sub;
    sub.prototype._super = parent.prototype;
}
