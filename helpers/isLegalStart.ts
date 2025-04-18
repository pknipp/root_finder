export default (char: string): boolean => {
    const ascii = char.charCodeAt(0);
    // capital letter or lower-case letter or underscore
    return ((ascii > 64 && ascii < 91) || (ascii > 96 && ascii < 123) || ascii === 95);
}
