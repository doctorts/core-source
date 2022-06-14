import { startSock } from "../utils/start.util";

export function Commands(classes?: any[]): ClassDecorator {
  return (constructor: Function) => {
    startSock(classes);
  };
}
