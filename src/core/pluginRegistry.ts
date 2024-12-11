import { DateZ } from "..";

const pluginRegistry: DateZ.PluginRegistry = {};

export const registerPlugin: DateZ.RegisterPlugin = (handler, overwrite) => {
  const name = handler.name;

  if (!name) {
    throw new Error("Not accept anonymous function!!");
  }

  if (pluginRegistry[name] && !overwrite) {
    throw new Error(`Plugin "${name}" is already registered.`);
  }

  pluginRegistry[name] = handler;
};

export const getPlugins = () => {
  return { ...pluginRegistry };
};
