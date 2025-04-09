import isLegalStart from './isLegalStart';

export default (char: string): boolean => {
    // isLegalStart: letter (big or little) or underscore
    if (isLegalStart(char)) return true;
    const ascii = char.charCodeAt(0);
    // 0-9 inclusive
    return (ascii > 47 && ascii < 58);
}
