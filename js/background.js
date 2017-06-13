/*
 * script.js
 * Copyright (C) 2017 sboynton <sboynton@C02SG09NG8WQ-sboynton>
 *
 * Distributed under terms of the MIT license.
 */
function copyCommentWithoutContext(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "getHash", function(response) {
            if (response.value != null) {
                // Copy URL to clipboard
                base_url = tabs[0].url.match(/https:\/\/www.reddit.com\/r\/[\w]*\/comments\/[\w]*\/[\w]*\//g);
                comment_url = base_url + response.value + "/";
                copyToClipboard(comment_url);
             } else {
                chrome.notifications.create({type: "basic", title: "Reddit Comment Copy", message: "Failed to copy comment URL", iconUrl: "img/Reddit-icon.png"});
             }
        });
    });
}

function copyCommentWithContext(info, tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "getHash", function(response) {
            console.log(response.value);
            if (response.value != null) {
                // Copy URL to clipboard
                base_url = tabs[0].url.match(/https:\/\/www.reddit.com\/r\/[\w]*\/comments\/[\w]*\/[\w]*\//g);
                context = "?context=10000";
                comment_url = base_url + response.value + "/" + context;
                copyToClipboard(comment_url);
             } else {
                chrome.notifications.create({type: "basic", title: "Reddit Comment Copy", message: "Failed to copy comment URL", iconUrl: "img/Reddit-icon.png"});
             }
        });
    });
}

function copyToClipboard(url) {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);

    chrome.notifications.create({type: "basic", title: "Reddit Comment Copy", message: "Comment URL successfully copied to clipboard:\n" + url, iconUrl: "img/Reddit-icon.png"});
};

chrome.contextMenus.create({
    title: "Copy comment",
    contexts: ["page", "selection"],
    onclick: copyCommentWithoutContext,
});

chrome.contextMenus.create({
    title: "Copy comment with context",
    contexts: ["page", "selection"],
    onclick: copyCommentWithContext,
});
