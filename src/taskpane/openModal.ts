export function openModal() {
  Office.context.ui.displayDialogAsync(
    window.location.origin + "/src/taskpane/modal",
    { height: 50, width: 50, displayInIframe: true },
    function (asyncResult) {
      // Aquí puedes manejar el resultado si lo necesitas
      if (asyncResult.status !== Office.AsyncResultStatus.Succeeded) {
        console.error("No se pudo abrir el modal", asyncResult.error);
      }
    }
  );
} 