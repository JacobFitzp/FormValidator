import Validator from '../Core/Validator/Validator';

/**
 * Regex Validator
 *
 * @author Jacob Fitzpatrick <contact@jacobfitzp.co.uk>
 */
export default class NotEmptyValidator implements Validator
{
    breakSequence = true;

    check(value: string, params: object): boolean {
        return value.length > 0
    }
}