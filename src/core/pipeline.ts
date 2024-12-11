import { DateZ } from "..";
import { operations } from "./operations";

export class Pipeline {
  private queue: DateZ.Pipeline.QueueArgs = [];

  constructor(private date: Date) {}

  addOperation<TArgs extends any[] = unknown[]>(
    operation: string,
    args: TArgs,
  ): this {
    this.queue.push({ operation, args });

    return this;
  }

  execute(oprs: typeof operations, plugins: DateZ.PluginRegistry) {
    return this.queue.reduce<DateZ.Output>(
      (currentDate, { operation, args }) => {
        if (
          !oprs[operation as keyof typeof operations] &&
          !plugins[operation]
        ) {
          throw new Error(`Operation "${operation}" is not supported.`);
        }

        const newDate = new Date(currentDate as any);

        if (!Number.isNaN(newDate.getTime())) {
          if (plugins[operation]) {
            return plugins[operation](newDate, ...args);
          }
          if (oprs[operation as keyof typeof operations]) {
            // TODO: type handle
            return oprs[operation as keyof typeof operations](
              newDate,
              ...(args as [never]),
            );
          }
        }

        // TODO: Handle error
        // In case string or boolean
        return currentDate;
      },
      this.date,
    );
  }
}
