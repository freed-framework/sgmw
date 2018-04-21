/**
 * @file global.d.ts
 * @author denglingbo
 */
interface ExtendsWindow extends Window {
  // session(token: string): void;
}

declare var window: ExtendsWindow;
declare var process: any;
