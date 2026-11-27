import React from "react";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import pages from "./pages/eager.js";

export default function StaticApp({ location }) {
  return <StaticRouter location={location}><App pages={pages} /></StaticRouter>;
}
