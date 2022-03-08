import Validator from '../Core/Validator/Validator';

/**
 * String Length
 *
 * @author Jacob Fitzpatrick <contact@jacobfitzp.co.uk>
 */
export default class StringLengthValidator extends Validator
{
    breakSequence: false;

    check(value: string, params: object): boolean {
        // @ts-ignore
        return !(value.length < params.min || value.length > params.max);
    }
}