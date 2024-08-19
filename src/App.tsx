import { MantineProvider } from "@mantine/core";
import { Main } from "./components/Main";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MantineProvider>
        <Main />
      </MantineProvider>
    </div>
  );
}

export default App;
