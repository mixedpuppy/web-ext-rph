chrome.protocol.registerHandler("web-ext", chrome.extension.getURL("index.html?val=%s"), "test protocol api");