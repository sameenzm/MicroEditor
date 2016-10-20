/**
 * @file ajax
 * @author Sameen
 * @date 2016-10-14
 */

function isPlainObject(test) {
    return Object.prototype.toString.call(test) === '[object Object]';
}

const ajax = function (config) {
    var url = config.url;
    var type = config.type || 'POST';
    var data = isPlainObject(config.data) ? config.data : {};
    var success = config.success || function () {};
    var error = config.error || function () {};
    var strData = JSON.stringify(data).replace(/{/, '')
        .replace(/}/, '').replace(/'/g, '')
        .replace(/:/g, '=').replace(/,/g, '&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(type, url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(strData);
    xhr.onreadystatechange = function () {
        if (xhr.readyState ===  4) {
            var isError = xhr.status !== 200;
            var responseText = xhr.responseText;
            isError ? error(responseText) : success(responseText);
        }
    };
};
export default ajax;
