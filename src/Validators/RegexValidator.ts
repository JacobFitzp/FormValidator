import Validator from '../Core/Validator/Validator';

/**
 * Regex Validator
 *
 * @author Jacob Fitzpatrick <contact@jacobfitzp.co.uk>
 */
export default class RegexValidator extends Validator
{
    breakSequence = false;

    check(value: string, params: object): boolean {
        return params['regexp'].test(value);
    }
}