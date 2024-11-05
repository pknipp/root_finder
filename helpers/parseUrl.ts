import zroots from './zroots';

export default (url: string): string => {
    // Remove spaces in order to prevent '%20' in address bar.
    url = url.replace(/\s+/g, '');
    let varName = "x";
    let char;
    [char, url] = [url[0], url.slice(1)];
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
    const numericalCoefs = coefs.map(coef => Number(coef));
    // return numericalCoefs.join("-");
    const roots = zroots(numericalCoefs, true);
    return roots.map(root => `(${root.r}, ${root.i})`).join(" - ");
}




        // a = list(map(lambda x: float(x), coefs)) # Convert list items from strings to numbers.
//
