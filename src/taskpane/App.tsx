import * as React from "react";
import { useEffect, useState } from "react";
import { DependencyManager } from "./dependencyManager";
import { httpClientModuleInitialize } from "./modules/httpClient/httpClientModule";
import { Spinner } from "@fluentui/react-components";
import { openModal } from "./openModal";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

const App: React.FC = () => {
  const [dependencyManager] = useState<DependencyManager>(
    new DependencyManager()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeApp = async () => {
      await Promise.all([httpClientModuleInitialize(dependencyManager)]);
      setIsLoading(false);
    };
    setIsLoading(true);
    initializeApp();
  }, []);

  const MODAL_URL = window.location.origin + "/modal.html";
  useEffect(() => {
    Office.context.ui.displayDialogAsync(
      MODAL_URL,
      { height: 50, width: 50, displayInIframe: true },
      function (asyncResult) {
        if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
          // Opcional: cerrar el sidebar después de abrir el modal
          if (Office.context.ui.closeContainer) {
            Office.context.ui.closeContainer();
          }
        } else {
          // Si falla, mostrar un mensaje simple
          alert("No se pudo abrir el modal principal del add-in.");
        }
      }
    );
  }, []);

  if (isLoading) {
    return <Spinner size="large" />;
  }
  return (
    <MemoryRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Routes>
    </MemoryRouter>

  );
};

export default App;
