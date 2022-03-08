import FormValidator from "../FormValidator/FormValidator";
import FieldValidatorResult from "../FieldValidator/Result/FieldValidatorResult";

export abstract class Plugin
{
    formValidator: FormValidator

    abstract init(): void
    abstract onFormInvalid(): void
    abstract onFieldInvalid(field: string, result: FieldValidatorResult): void
    abstract onFieldValid(field: string): void
}