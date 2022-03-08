import RegexValidator from "../../Validators/RegexValidator";
import StringLengthValidator from "../../Validators/StringLengthValidator";
import Validator from "./Validator";
import NotEmptyValidator from "../../Validators/NotEmptyValidator";

export default class ValidatorManager
{
    static validatorMap = {
        regexp:           new RegexValidator(),
        stringLength:     new StringLengthValidator(),
        notEmpty:         new NotEmptyValidator()
    }

    static registerValidator(handle: string, validator: Validator): ValidatorManager
    {
        // @ts-ignore
        this.validatorMap[handle] = validator;
        return self;
    }

    static getValidatorInstance(handle: string): null|Validator
    {
        // @ts-ignore
        let validator = this.validatorMap[handle];

        if (validator instanceof Validator) {
            return validator;
        }

        return null;
    }
}