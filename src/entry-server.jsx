import { MemoryRouter } from "react-router";
import App from "./App.jsx";

export default function ServerApp({ location }) {
  return (
    <MemoryRouter initialEntries={[location]}>
      <App />
    </MemoryRouter>
  );
}
