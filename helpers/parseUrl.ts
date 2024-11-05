import ComplexNumber from './complexNumber';
import zroots from './zroots';
import { Result } from './result';

export default (url: string): Result<ComplexNumber[]> => {
    // Remove spaces in order to prevent '%20' in address bar.
    url = url.replace(/\s+/g, '');
    let varName = "x";
    let coefs: string[] = [];
    let char = url[0];
    if (char === '[') {
        url = url.slice(1);
        [url, char] = [url.slice(0,-1), url[-1]];
        // if not str_temp[-1] == ']':
                // return {"error": "You forgot the closing square bracket."}
        // Convert string to array.
        const coefs = url.split(",");
        let nCoef = coefs.length;
        const leadingCoef = Number(coefs[nCoef - 1]);
        // isNaN(leadingCoef), return error
        if (!leadingCoef) {
            coefs.pop();
            nCoef--;
        }
        // Tabulate these problems with user input.
        let notANumber = 0;
        for (const coef of coefs) {
            if (!isNaN(Number(coef))) {
                notANumber++
            }
        }
        if (notANumber) {
            // return {"error": str(not_a_number) + " of your coefficients is/are not a number."}
        }
        if (nCoef === 1) {
            // return {"error": "Your polynomial seems to be constant, which'll lead to either zero roots or an infinite number thereof."}
        }
    } else {
        return {ok: false, error: "This can presently handle a Url only if in array form."}
    }
    const numericalCoefs = coefs.map(coef => Number(coef));
    const roots = zroots(numericalCoefs, true);
    return roots;
}
