import "./app.imports";

const MODAL_URL = window.location.origin + "/modal.html";

Office.onReady(() => {
  Office.context.ui.displayDialogAsync(
    MODAL_URL,
    { height: 50, width: 50, displayInIframe: true },
    function (asyncResult) {
      if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
        if (Office.context.ui.closeContainer) {
          Office.context.ui.closeContainer();
        }
      } else {
        alert("No se pudo abrir el modal principal del add-in.");
      }
    }
  );
});
