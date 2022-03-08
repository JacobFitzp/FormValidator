import Validator from "../../Validator/Validator";

export default class FieldValidatorResult
{
    public valid: boolean;
    public messages: Array<string>;
    public failedValidators: Array<string>;
}