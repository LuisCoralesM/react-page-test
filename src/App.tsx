import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  createGenerateClassName,
  ServerStyleSheets,
} from "@material-ui/styles";
import { StylesProvider } from "@material-ui/styles";
import SimpleExample from "./SimpleExample";
import { renderToString } from "react-dom/server";
const sheets = new ServerStyleSheets();

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: "mui-jss",
});

function App() {
  const html = renderToString(sheets.collect(<SimpleExample></SimpleExample>));
  console.log(html);
  const css = sheets.toString();
  console.log(css);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <div>
        <SimpleExample></SimpleExample>
      </div>
    </StylesProvider>
  );
}

export default App;
