import ValidatorResponse from "../Validator/Response/ValidatorResponse";
import FieldValidatorResult from "../FieldValidator/Result/FieldValidatorResult";

export default class EventHandler
{
    form: HTMLFormElement;

    constructor(form: HTMLFormElement) {
        this.form = form;
    }

    buildCustomEvent(name: string, detail: Object): CustomEvent
    {
        return new CustomEvent(name, {
            cancelable: false,
            detail: detail
        });
    }

    triggerEvent(name: string, detail: Object): void
    {
        this.form.dispatchEvent(
            this.buildCustomEvent(name, detail)
        );
    }

    triggerInvalidField(field: string, result: FieldValidatorResult): void
    {
        this.triggerEvent('fv.field.invalid', {
                form: this.form,
                field: field,
                result: result
            }
        )
    }

    triggerValidField(field: string): void
    {
        this.triggerEvent('fv.field.valid', {
                form: this.form,
                field: field
            }
        );
    }

    triggerInvalidForm(): void
    {
        this.triggerEvent('fv.form.invalid', {
                form: this.form
            }
        );
    }
}