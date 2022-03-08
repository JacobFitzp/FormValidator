import {FormValidatorValidators} from "../FormValidator/Types/FormValidatorValidators";
import FieldValidatorResult from "./Result/FieldValidatorResult";
import ValidatorManager from "../Validator/ValidatorManager";

export default class FieldValidator
{
    form: HTMLFormElement;

    constructor(form: HTMLFormElement) {
        this.form = form;
    }

    validate(value: string, validators: FormValidatorValidators): FieldValidatorResult
    {
        let response = {
            valid: true,
            messages: [],
            failedValidators: []
        };

        for (let [handle, params] of Object.entries(validators)) {

            let validator = ValidatorManager.getValidatorInstance(handle);

            if (!validator.check(value, params)) {

                response.valid = false;
                response.messages.push(params.message);
                response.failedValidators.push(handle);

                if (validator.breakSequence) {
                    return response;
                }
            }
        }
        return response;
    }
}