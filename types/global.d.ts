/**
 * @file global.d.ts
 * @author denglingbo
 */
interface ExtendsWindow extends Window {
  // session(token: string): void;
  globalConfig: any = {
    startTime: '',
    endTime: ''
  }
}

declare var window: ExtendsWindow;
declare var process: any;
declare var Dete: any;
