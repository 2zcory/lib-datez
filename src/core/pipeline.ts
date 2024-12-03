import { DateZ } from "../types";
import { operations } from "./operations";

export class Pipeline {
  private queue: DateZ.Pipeline.QueueArgs = [];

  constructor(private date: Date) {}

  addOperation<TArgs extends any[] = unknown[]>(
    operation: DateZ.Operation,
    args: TArgs,
  ): this {
    this.queue.push({ operation, args });

    return this;
  }

  execute(oprs: typeof operations) {
    return this.queue.reduce<DateZ.Output>(
      (currentDate, { operation, args }) => {
        if (!oprs[operation]) {
          throw new Error(`Operation "${operation}" is not supported.`);
        }

        if (currentDate instanceof Date) {
          // TODO: type handle
          return oprs[operation](currentDate, ...(args as [never]));
        }

        // In case string or boolean
        return currentDate;
      },
      this.date,
    );
  }
}
