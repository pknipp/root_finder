import { Result } from './result';

export default (url: string): Result<number[]> => {
    // Remove leading open-bracket which identifies this as a stringified array.
    url = url.slice(1);
    if (url.slice(-1) !== ']') {
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
    // Trim away any leading coefficients which are zero.
    while (coefs.length && !coefs[coefs.length - 1]) coefs.pop();
    if (coefs.length <= 1) {
        return {ok: false, error: "Your polynomial needs to be linear or higher-order."}
    }
    return {ok: true, value: coefs};
}
