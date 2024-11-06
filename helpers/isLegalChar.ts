import isLegalStart from './isLegalStart';

export default (char: string): boolean => {
    if (isLegalStart(char)) return true;
    const ascii = char.charCodeAt(0);
    return (ascii > 47 && ascii < 58);
}
