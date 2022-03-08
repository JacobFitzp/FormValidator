/**
 * Abstract Validator
 *
 * @author Jacob Fitzpatrick <contact@jacobfitzp.co.uk>
 */
import {RequiredParams} from "./Types/RequiredParams";

export default abstract class Validator
{
    /**
     * Should this validator break the sequence.
     * If true the sequence of Validators will be broken on
     * an invalid field, and no additional Validators after
     * this one will be cheched against.
     */
    breakSequence: boolean;

    /**
     * Check if a given value passes validation.
     * Returns a promise
     *
     * @param {string} value
     * @param {object} params
     */
    abstract check(value: string, params: object): boolean;
}