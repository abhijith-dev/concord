import HelperMiddleware from "./helper";
import userValidation from "./userValidation";

export const userValidationMiddleware = () => {
    return [
        HelperMiddleware,
        userValidation
    ];
}