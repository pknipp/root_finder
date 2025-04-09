import ComplexNumber from './complexNumber';
// import zroots from './zroots';
import parseArray from './parseArray';
import parseExpression from './parseExpression';
import { Result } from './result';

export default (url: string): Result<[number[], string]> => {
    // Remove spaces in order to prevent '%20' in address bar.
    url = url.replace(/\s+/g, '');
    let result: Result<[number[], string]>;
    result = (url[0] === '[') ? parseArray(url) : parseExpression(url);
    if (!result.ok) return {ok: false, error: result.error};
    return {ok: true, value: result.value};
}
