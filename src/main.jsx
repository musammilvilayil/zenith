import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import pages from "./pages/lazy.js";
import "./styles/global.css";
import "./styles/zenith-redesign.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App pages={pages} />
    </BrowserRouter>
  </React.StrictMode>
);

// Static HTML is prerendered per route: hydrate it so the first paint (and LCP) is kept.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
