import ComplexNumber from './complexNumber';
// import zroots from './zroots';
import parseArray from './parseArray';
import parseExpression from './parseExpression';
import { Result } from './result';

export default (url: string): Result<[number[], string]> => {
    console.log("TOP OF PARSEURL");
    // Remove spaces in order to prevent '%20' in address bar.
    url = url.replace(/\s+/g, '');
    let varName = "x";
    let result: Result<[number[], string]>;
    let char = url[0];
    if (char === '[') {
        console.log("TOP OF ARRAY BRANCH");
        result = parseArray(url);
    } else {
        console.log("TOP OF EXPRESSION BRANCH");
        result = parseExpression(url);
    }
    if (!result.ok) {
        return {
            ok: false,
            error: result.error,
        };
    }
    return {ok: true, value: result.value};
}
