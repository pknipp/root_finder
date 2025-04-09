import { Result } from './result';
import isLegalStart from './isLegalStart';
import isLegalChar from './isLegalChar';

export default (url: string): Result<[number[], string]> => {
    console.log("TOP OF PARSEEXPRESSION");

    if (url[0] === "+") {
        // Leading "+" is unnecessary.
        url = url.slice(1);
    }
    // Temporarily replace ** with ^, to allow replacement of single *.
    url = url.split("**").join("^");
    // '+' is unnecessary at beginning of exponent.
    url = url.split("+^").join("^");
    // Make multiplication implicit rather than explicit.
    url = url.split("*").join("");
    // Replace '^' by '**', to prevent instances of '%5E'.
    url = url.split("^").join("**");
    if (url.includes("**-")) {
        return {ok: false, error: "A polynomial does not contain negative powers."};
    }
    // Now search the string for the variable.
    let varName = "";
    let foundVar = false;
    for (const char of url) {
        if (!foundVar) {
            if (isLegalStart(char)) {
                foundVar = true;
                varName = char;
            }
        } else {
            if (isLegalChar(char)) {
                varName += char;
            } else {
                break;
            }
        }
    }
    if (!varName) {
        return {ok: false, error: "No legal variable name was found."};
    }
    const strs = url.split(varName);
    // Ensure that any linear term explicitly includes power, e.g., 2x**1
    for (let i = 1; i < strs.length; i++) {
        if (strs[i].slice(0, 2) !== "**") {
            strs[i] = "**1" + strs[i];
        }
    }
    // Ensure that any constant term is written as, e.g., 2x**0
    // # 1) Deal with leading term separately:
    const str = strs[0];
    const signs = ['+', '-'];
    for (const sign of signs) {
        if (str.includes(sign)) {
            const i = str.indexOf(sign);
            strs[0] = str.slice(0, i);
            strs.splice(1, 0, `**0${str.slice(i)}`);
        }
    }
    console.log("strs after dealing w/first term = ", strs);
    // 2) Deal with list's interior terms.
    let iStr = 1;
    while (iStr < strs.length - 1 && iStr < 20) {
        console.log("iStr/strs = ", iStr, strs);
        const str = strs[iStr];
        let i = -1;
        // Seek 1st sign, which MUST exist.
        for (const sign of signs) {
            if (i === -1) {
                i = str.indexOf(sign)
            }
        }
        if (i === -1) {
            return {ok: false, error: `The string ${str} contains no +/- signs.`};
        }
        // Seek 2nd sign, which MAY exist.
        for (const sign of signs) {
            const iTemp = str.indexOf(sign, i + 1);
            if (iTemp !== -1) {
                i = iTemp;
                strs[iStr] = str.slice(0, i);
                strs.splice(iStr + 1, 0, `**0${str.slice(i)}`); //
            } //
        } //
        // py code (which works)
                // if sign in string[i + 1:]:
                    // i = string.index(sign, i + 1)
                    // strs[i_str] = string[0:i]
                    // strs.insert(i_str + 1, "**0" + string[i:])
        iStr++;
    }
    // 3) Deal w/trailing term
    const trailing = strs[strs.length - 1];
    if (trailing.includes("+") || trailing.includes("-")) {
        strs.push("**0");
    }
    // key = exponent and value = coefficient.
    const coefsMap = new Map<number, number>();
    // Outer scope is needed for coefficient of last term.
    let coef = Infinity;
    // We'll search for following value to facilitate creating coefficient array.
    let exponentMax = 0;
    // Loop includes all but last term.
    for (let iStr = 0; iStr < strs.length - 1; iStr++) {
        let coefString = strs[iStr];
        // The value 1 is "understood" in these situations.
        if (coefString === "+" || coefString === "-" || coefString == "") {
            coefString += "1";
        }
        coef = Number(coefString);
        if (isNaN(coef)) {
            return {ok: false, error: "'" + coefString + "'" + " cannot be parsed as a number."};
        }
        // concatenation of previous exponent, + or -, and next coefficient:
        const exponentAndCoef = strs[iStr + 1].slice(2);
        for (const sign of signs) {
            // The following'll be true for exactly one of the two signs.
            if (exponentAndCoef.includes(sign)) {
                // Find the +/-, which separates exponent and coefficient.
                const i = exponentAndCoef.indexOf(sign)
                const exponentString = exponentAndCoef.slice(0, i);
                const exponent = Number(exponentString);
                if (isNaN(exponent)) {
                    return {ok: false, error: `'${exponentString}' is unparsable as a number.`};
                }
                if (exponent !== Math.round(exponent)) {
                    return {ok: false, error: `The exponent ${exponent} needs to be an integer.`}
                }
                exponentMax = Math.max(exponentMax, exponent);
                strs[iStr + 1] = exponentAndCoef.slice(i);
                // Consolidate any terms which may have the same exponent.
                coefsMap.set(exponent, coef + (coefsMap.get(exponent) || 0));
            }
        }
    }
    // Last string contains only the exponent, so it must be handled differently.
    const exponentString = strs[strs.length - 1].slice(2);
    const exponent = Number(exponentString);
    if (isNaN(exponent)) {
        return {ok: false, error: `'${exponentString}' is unparsable as a number.`};
    }
    if (exponent !== Math.round(exponent)) {
        return {ok: false, error: `The exponent ${exponent} needs to be an integer.`};
    }
    exponentMax = Math.max(exponentMax, exponent);
    coefsMap.set(exponent, coef + (coefsMap.get(exponent) || 0));
    const coefs = Array(exponentMax + 1).fill(0);
    for (const [exponent, coef] of coefsMap.entries()) {
        coefs[exponent] = coef;
    }
    return {ok: true, value: [coefs, varName]}
}
