const {classes: Cc, interfaces: Ci, results: Cr, utils: Cu} = Components;

class API extends ExtensionAPI {
  getAPI(context) {
    return {
      protocol: {
        registerHandler(protocol, uri, name) {
          // from WebContentConverter.js
          let handler = Cc["@mozilla.org/uriloader/web-handler-app;1"].
                        createInstance(Ci.nsIWebHandlerApp);
          handler.name = name;
          handler.uriTemplate = uri;

          let eps = Cc["@mozilla.org/uriloader/external-protocol-service;1"].
                    getService(Ci.nsIExternalProtocolService);
          let handlerInfo = eps.getProtocolHandlerInfo(protocol);
          handlerInfo.possibleApplicationHandlers.appendElement(handler, false);

          let hs = Cc["@mozilla.org/uriloader/handler-service;1"].
                   getService(Ci.nsIHandlerService);
          hs.store(handlerInfo);
        },
      },
    };
  }
}
