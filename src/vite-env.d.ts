/// <reference types="vite/client" />
declare module "dompurify" {
  import { PluginObject } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DOMPurify: PluginObject<any>;
  export default DOMPurify;
}
