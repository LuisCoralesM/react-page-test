import React, { useState } from "react";

// The editor core
import type { Value } from "@react-page/editor";
import Editor from "@react-page/editor";

import "@react-page/editor/lib/index.css";

// other plugins
import slate from "@react-page/plugins-slate";
import image from "@react-page/plugins-image";
import spacer from "@react-page/plugins-spacer";

import "@react-page/plugins-slate/lib/index.css";

// Stylesheets for the images plugin
import "@react-page/plugins-image/lib/index.css";

import { renderToString } from "react-dom/server";
import { ServerStyleSheets } from "@material-ui/styles";

import { CellPlugin } from "@react-page/editor";

function callMe() {
  console.log("aaaa");
}

function Carousel() {
  return (
    <div className="carousel">
      <div>
        <img src="https://placeimg.com/640/480/animals" alt="" />
        <img src="https://placeimg.com/640/480/nature" alt="" />
        <img src="https://placeimg.com/640/480/architecture" alt="" />
        <button onClick={callMe}>CALL ME</button>
        <iframe
          title="A"
          src="https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwiB3I_i45n5AhUyIUQIHZo7BIoQPAgI"
        ></iframe>
      </div>
      <br />
      <br />
    </div>
  );
}

const carouselPlugin: CellPlugin = {
  Renderer: () => <Carousel />,
  id: "carousel",
  title: "Carousel of images",
  description: "Block to add images and display them in a carousel",
  version: 1,
  icon: "Salt",
  controls: {
    type: "autoform",
  },
};

// Define which plugins we want to use.
const cellPlugins = [slate(), image, carouselPlugin, spacer];
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
  };

  return (
    <div className="layout-lc">
      <button onClick={saveValue}>Save</button>
      <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
    </div>
  );
}
