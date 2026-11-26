import React from "react";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

export default function StaticApp({ location }) {
  return <StaticRouter location={location}><App /></StaticRouter>;
}
