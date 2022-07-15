import React, { useState } from "react";

// The editor core
import type { Value } from "@react-page/editor";
import Editor from "@react-page/editor";

// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
import "@react-page/editor/lib/index.css";

// The rich text area plugin
import slate from "@react-page/plugins-slate";
// image
import image from "@react-page/plugins-image";

// Stylesheets for the rich text area plugin
// uncomment this
import "@react-page/plugins-slate/lib/index.css";

// Stylesheets for the imagea plugin
import "@react-page/plugins-image/lib/index.css";

import { toHTML } from "./utils";
import { renderToString } from "react-dom/server";
import { ServerStyleSheets } from "@material-ui/styles";

// Define which plugins we want to use.
const cellPlugins = [slate(), image];
const sheets = new ServerStyleSheets();

export default function SimpleExample() {
  const [value, setValue] = useState<Value | null>(null);

  const saveValue = () => {
    const html = renderToString(
      sheets.collect(
        <div className="layout-lc">
          <Editor
            cellPlugins={cellPlugins}
            value={value}
            onChange={setValue}
            readOnly
          />
        </div>
      )
    );
    console.log(html);
    const css = sheets.toString();
    console.log(css);
  };

  return (
    <div className="layout-lc">
      <button onClick={saveValue}>Save</button>
      <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
    </div>
  );
}
