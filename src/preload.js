// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// في preload.js
const { contextBridge, ipcRenderer } = require("electron");

// تعريف الوظائف الخاصة بالـ API التي ترغب في توفيرها لعملية الجانب العميل (Renderer Process)
contextBridge.exposeInMainWorld("electronApi", {
  showAlert: (message) => {
    ipcRenderer.send("show-alert", message);
  },
});
