import {Plugin} from "./Plugin";
import FormValidator from "../FormValidator/FormValidator";

export default class PluginManager
{
    static plugins: Array<any>;

    static bind(formValidator: FormValidator): void
    {
        this.plugins = formValidator.plugins;

        if (!this.plugins.length) {
            return;
        }

        this.getPlugins().forEach((plugin) => {

            plugin.init();

            formValidator.on('fv.field.invalid', (event) => {
                plugin.onFieldInvalid(event.field, event.result);
            });

            formValidator.on('fv.field.valid', (event) => {
                plugin.onFieldValid(event.field);
            });

            formValidator.on('fv.form.invalid', () => {
                plugin.onFormInvalid();
            });
        });
    }

    static addPlugin(plugin: Plugin): PluginManager
    {
        this.plugins.push(plugin);
        return false;
    }

    static getPlugins(): Array<Plugin>
    {
        return this.plugins;
    }
}