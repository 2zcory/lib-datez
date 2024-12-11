import { DateZ } from ".";
import { operations } from "./core/operations";
import { Pipeline } from "./core/pipeline";
import { getPlugins, registerPlugin } from "./core/pluginRegistry";
import { parseDate } from "./core/utils";

function datez(input?: DateZ.InputDate): DateZ.Fluent {
  const date = parseDate(input);

  const pipeline = new Pipeline(date);

  const plugins = getPlugins();

  const handler: ProxyHandler<DateZ.Fluent> = {
    get(_, prop: keyof DateZ.Fluent) {
      if (prop === "execute") {
        return () => pipeline.execute(operations, plugins);
      }
      if (prop === "toDate") {
        return () => pipeline.execute(operations, plugins);
      }
      if (prop === "toString") {
        return () => {
          const returnValue = pipeline.execute(operations, plugins);
          return returnValue instanceof Date
            ? returnValue.toISOString()
            : returnValue;
        };
      }
      if (prop === "register") {
        return (handler: DateZ.PluginHandler, overwrite?: boolean) => {
          registerPlugin(handler, overwrite);
          return proxy;
        };
      }

      if (plugins[prop]) {
        return (...args: unknown[]) => {
          pipeline.addOperation(prop, args);
          return proxy;
        };
      }

      if (operations[prop]) {
        return (...args: unknown[]) => {
          pipeline.addOperation(prop, args);
          return proxy;
        };
      }

      throw new Error(`Method "${prop}" is not supported.`);
    },
  };

  const proxy = new Proxy({} as DateZ.Fluent, handler);

  return proxy;
}

export default datez;
