import {Plugin} from "../../Plugin/Plugin";
import {FormValidatorFields} from "./FormValidatorFields";

export type FormValidatorOptions = {
    fields: FormValidatorFields,
    submitCallback?: Function
    plugins?: Array<Plugin>
}