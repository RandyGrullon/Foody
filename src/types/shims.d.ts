declare module "qrcode" {
  export function toDataURL(text: string, options?: any): Promise<string>;
  const _default: { toDataURL: typeof toDataURL };
  export default _default;
}

declare module "jsbarcode" {
  const JsBarcode: any;
  export default JsBarcode;
}
