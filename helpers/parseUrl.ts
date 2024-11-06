import ComplexNumber from './complexNumber';
// import zroots from './zroots';
import parseArray from './parseArray';
import parseExpression from './parseExpression';
import { Result } from './result';

export default (url: string): Result<number[]> => {
    // Remove spaces in order to prevent '%20' in address bar.
    url = url.replace(/\s+/g, '');
    let varName = "x";
    let result: Result<number[]>;
    // let coefs: number[] = [];
    let char = url[0];
    if (char === '[') {
        result = parseArray(url);
    } else {
        result = parseExpression(url);
    }
    if (!result.ok) {
        return {
            ok: false,
            error: result.error,
        };
    }
    return {ok: true, value: result.value};
    // const roots = zroots(result.value, true);
    // return roots;
}
