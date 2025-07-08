import * as React from "react";
import HomeView from "../modules/home/views";
import ExampleModal from "../components/ExampleModal";
import { ExampleView } from "../modules/exampleView/views";

export const routes = [
  {
    id: "home",
    path: "/",
    element: <HomeView />,
  },
  {
    id: "modal-ejemplo",
    path: "/modal/ejemplo",
    element: <ExampleModal />,
  },
  {
    id: "view",
    path: "/view",
    element: <ExampleView />,
  },
];
