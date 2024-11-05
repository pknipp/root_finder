import ComplexNumber from './complexNumber';
import laguer from './laguer';

// Translated from Fortran version in "Numerical Recipes" book.
export default (a: number[], polish: boolean): ComplexNumber[] => {
    // Make a copy of coefficients list, for deflation.
    let ad = a.map(num => new ComplexNumber(num, 0));
    const m = a.length - 1;
    const eps = 1e-14;
    const roots: ComplexNumber[] = [];
    for (let j = 0; j < m; j++) {
        const new_m = m - j;
        // Start nonzero, to avoid certain divide-by-zero errors.
        const x = laguer(ad, new ComplexNumber(.001, .002), eps, false);
        roots.push(x);
        let b = ad[new_m];
        for (let jj = new_m - 1; jj >= 0; jj--) {
            const c = ad[jj];
            ad[jj] = b
            b = (x.mul(b)).add(c);
        }
        ad.pop();
    }
    if (polish) {
        const ad = a.map(coef => new ComplexNumber(coef, 0));
        for (let j = 0; j < m; j++) {
            let root = laguer(ad, roots[j], eps, true)
            if (Math.abs(root.i) <= 2 * Math.abs(root.r) * eps) {
                root = new ComplexNumber(root.r, 0);
            }
            roots[j] = root;
        }
    }
    roots.sort((a, b) => a.r - b.r);
    return roots;
}
