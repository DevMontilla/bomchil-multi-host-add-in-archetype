import * as React from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

root?.render(
  <FluentProvider theme={webLightTheme}>
    <MemoryRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Routes>
    </MemoryRouter>
  </FluentProvider>
); 