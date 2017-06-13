/*
 * content_script.js
 * Copyright (C) 2017 sboynton <sboynton@C02SG09NG8WQ-sboynton>
 *
 * Distributed under terms of the MIT license.
 */
var commentHash = null;

$(document).contextmenu(function(e) {
    var idFromContent = $(e.target).closest("form").find("input").val();
    if (idFromContent.substring(0,3) == "t1_") {
        commentHash = idFromContent.split("_")[1];
    } else {
        commentHash = null;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Listen for a message from the context menu buttons
    // If it receives the message, send back the currently selected element
    // From here we can traverse the DOM and find the closest input, which
    // contains the comment hash
    if(request == "getClickedEl") {
        sendResponse({value: commentHash});
    }
});
