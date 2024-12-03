import { operations } from "./core/operations";
import { Pipeline } from "./core/pipeline";
import { parseDate } from "./core/utils";
import { DateZ } from "./types";

export function datez(input?: DateZ.InputDate): DateZ.Fluent {
  const date = parseDate(input);

  const pipeline = new Pipeline(date);

  const handler: ProxyHandler<DateZ.Fluent> = {
    get(_, prop: keyof DateZ.Fluent) {
      if (prop === "execute") {
        return () => pipeline.execute(operations);
      }
      if (prop === "toDate") {
        return () => pipeline.execute(operations);
      }
      if (prop === "toString") {
        return () => {
          const returnValue = pipeline.execute(operations);
          return returnValue instanceof Date
            ? returnValue.toISOString()
            : returnValue;
        };
      }

      if (operations[prop]) {
        return (...args: any[]) => {
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

datez(1).addDays(0);
