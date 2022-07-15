import { renderToString } from "react-dom/server";

export function toHTML(value: any) {
  return renderToString(value);
}
