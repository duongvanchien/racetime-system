const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('coreApi', {
  getDemoValue: () => {
    return 'Sample API Call';
  },
});

window.require = require;
