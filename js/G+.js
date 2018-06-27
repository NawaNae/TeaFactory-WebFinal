var Load=Load||{};
Load.js=Load.js||{};
function commentBox(appendQueryString, width) {
    var commentBox = document.createElement('div');
    commentBox.className = 'g-comments';
    commentBox.dataset.href = location.href;
    commentBox.dataset.first_party_property = "BLOGGER";
    commentBox.dataset.width = typeof width == 'undefined' ? '600' : width;
    commentBox.dataset.view_type = "FILTERED_POSTMOD";
    var cont = document.querySelector(appendQueryString);
    cont.appendChild(commentBox);
    Load.js.reload('https://apis.google.com/js/plusone.js');
}
export {commentBox};
Load.js.load = function (url, location)
{
    location = location || document.head;
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = url;
    location.appendChild(scriptTag);
};
Load.js.reload=function reloadJS(url)
{
    var oldJS = document.querySelector("script[src='" + url + "']");
    if (oldJS != null)
        oldJS.remove();
    Load.js.load(url);
}