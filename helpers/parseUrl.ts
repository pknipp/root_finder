import ComplexNumber from './complexNumber';
import zroots from './zroots';
import { Result } from './result';

export default (url: string): Result<ComplexNumber[]> => {
    // Remove spaces in order to prevent '%20' in address bar.
    url = url.replace(/\s+/g, '');
    let varName = "x";
    let coefs: number[] = [];
    let char = url[0];
    if (char === '[') {
        // Remove leading open-bracket.
        url = url.slice(1);
        char = url.slice(-1);
        if (char !== ']') {
            return {ok: false, error: "You forgot the closing square bracket."};
        }
        // Remove trailing close bracket.
        url = url.slice(0, -1);
        const stringCoefs = url.split(",");
        const badCoefs = stringCoefs.filter(coef => isNaN(Number(coef)));
        if (badCoefs.length) {
            return {ok: false, error: `The following coefficient(s) is/are not parseable as a number: ${badCoefs}`};
        }
        const coefs = stringCoefs.map(coef => Number(coef));
        while (coefs.length && !coefs[coefs.length - 1]) coefs.pop();
        if (coefs.length <= 1) {
            return {ok: false, error: "Your polynomial needs to be linear or higher-order."}
        }
    } else {
        return {ok: false, error: "This can presently handle a Url only if in array form."}
    }

    const roots = zroots(coefs, true);
    return roots;
}
