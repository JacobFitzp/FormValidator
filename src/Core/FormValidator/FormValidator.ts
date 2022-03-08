import {FormValidatorOptions} from "./Types/FormValidatorOptions";
import {FormValidatorValidators} from "./Types/FormValidatorValidators";
import FieldValidator from "../FieldValidator/FieldValidator";
import PluginManager from "../Plugin/PluginManager";
import EventHandler from "../Event/EventHandler";
import {Plugin} from "../Plugin/Plugin";

/**
 * FormValidator
 *
 * @author Jacob Fitzpatrick <contact@jacobfitzp.co.uk>
 */
export default class FormValidator
{
    form: HTMLFormElement;
    options: FormValidatorOptions;
    valid: boolean;
    fieldValidator: FieldValidator;
    eventHandler: EventHandler
    plugins: Array<Plugin>

    constructor(form: HTMLFormElement, options: FormValidatorOptions) {

        this.form = form;
        this.options = options;
        this.fieldValidator = new FieldValidator(form);
        this.eventHandler = new EventHandler(form);
        this.plugins = options.plugins || [];

        this.registerEventListeners();

        /**
         * Bind plugin manager to this validator instance.
         * Will configure all the required event listeners
         * and link them to registered plugins.
         */
        PluginManager.bind(this);
    }

    /**
     * Register event listener
     *
     * @param eventHandle
     * @param callback
     */
    on(eventHandle: string, callback: Function): void
    {
        this.form.addEventListener(eventHandle, (event) => { callback(event) });
    }

    /**
     * Add new field to validator
     *
     * @param {string} name
     * @param {FormValidatorValidators} validators
     */
    addField(name: string, validators: FormValidatorValidators): FormValidator
    {
        this.options.fields[name] = validators;

        this.registerEventListenersForField(
            this.getFieldElement(name),
            name
        );

        return this;
    }

    /**
     * Get fields
     */
    getFields(): Array<string>
    {
        return Object.keys(this.options.fields);
    }

    /**
     * Get properties for given field by name
     *
     * @param name
     */
    getField(name: string)
    {
        return this.options.fields[name];
    }

    /**
     * Get element for given field by name
     *
     * @param name
     */
    getFieldElement(name: string): HTMLElement
    {
        return this.form.querySelector('[name="' + name + '"]')
    }

    /**
     * Get fields as elements
     */
    getFieldElements(): Array<HTMLElement>
    {
        let fields = [];

        for (let fieldName in this.options.fields) {
            fields.push(this.getFieldElement(fieldName));
        }

        return fields;
    }

    /**
     * Validate field
     *
     * @param field
     */
    validateField(field: string): FormValidator
    {
        let fieldElement = this.getFieldElement(field),
            fieldValidators = this.getField(field),
            result = this.fieldValidator.validate(
                fieldElement['value'],
                fieldValidators
            );

        /**
         * If field is invalid then override the valid
         * property, this invalidates the whole form.
         */
        if (!result.valid) {
            this.eventHandler.triggerInvalidField(field, result);
            this.valid = false;
        } else {
            this.eventHandler.triggerValidField(field);
        }

        return this;
    }

    /**
     * Validate form
     */
    validateForm(): FormValidator
    {
        /**
         * Assume form is valid to begin with:
         * This will be overriden if we come across an
         * erroneous field in the next step.
         */
        this.valid = true;

        /**
         * Loop through fields and validate them.
         */
        this.getFields().forEach((field) => {
            this.validateField(field);
        });

        return this;
    }

    /**
     * Is the form valid
     */
    isFormValid(): boolean
    {
        return this.valid;
    }

    /**
     * Register event listeners for field
     *
     * @param field
     * @param fieldName
     * @private
     */
    private registerEventListenersForField(field: HTMLElement, fieldName: string)
    {
        if (field.getAttribute('value') !== null) {
            this.validateField(fieldName);
        }

        field.addEventListener('input', (event) => {
            this.validateField(fieldName);
        });
    }

    /**
     * Register event listeners
     *
     * @private
     */
    private registerEventListeners()
    {
        this.getFields().forEach((field) => {
            this.registerEventListenersForField(this.getFieldElement(field), field);
        });

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validateForm();

            if (this.isFormValid()) {
                this.handleSubmit(event);
            }
        });
    }

    /**
     * Handle valid form submit
     *
     * @param event
     * @private
     */
    private handleSubmit(event: SubmitEvent)
    {
        /**
         * If the submit callback is set then call it.
         * If the callback returns true then we will not submit
         * the form. This is useful if custom logic is needed for
         * form submition, for example submitting using ajax.
         */
        if (this.options.submitCallback instanceof Function) {
            let result = this.options.submitCallback(event);

            if (result) {
                return true;
            }
        }

        this.form.submit();
    }
}