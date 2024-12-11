import { DateZ } from "..";

const pluginRegistry: DateZ.PluginRegistry = {};

export const registerPlugin = (name: string, handler: DateZ.PluginHandler) => {
  if (pluginRegistry[name]) {
    throw new Error(`Plugin "${name}" is already registered.`);
  }
  pluginRegistry[name] = handler;
};

export const getPlugins = () => {
  return { ...pluginRegistry };
};
