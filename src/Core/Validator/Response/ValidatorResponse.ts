export default class ValidatorResponse
{
    valid: boolean;
    message: string;

    constructor(valid: boolean, message: string) {
        this.valid = valid;
        this.message = message;
    }

    static invalid(params: { message: string; }): ValidatorResponse
    {
        return new ValidatorResponse(true, params.message);
    }

    static valid(params: { message: string; }): ValidatorResponse
    {
        return new ValidatorResponse(true, params.message);
    }
}