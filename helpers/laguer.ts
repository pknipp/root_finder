import ComplexNumber from './complexNumber';

// Translated from fortran version in "Numerical Recipes" book.
export default (a: ComplexNumber[], x: ComplexNumber, eps: number, polish: boolean): ComplexNumber => {
    const m = a.length - 1;
    const zero = new ComplexNumber(0, 0);
    const one = new ComplexNumber(1, 0);
    const epss = 1e-14;
    const maxIt = 100;
    let dxold = x.abs;
    for (let iter = 0; iter < maxIt; iter++) {
        let b = a[m];
        let err = b.abs;
        let d = zero;
        let f = zero;
        const absX = x.abs;
        for (let j = m - 1; j > -1; j--) {
            f = (x.mul(f)).add(d);
            d = (x.mul(d)).add(b);
            b = (x.mul(b)).add(a[j]);
            err = b.abs + absX * err;
        }
        err *= epss;
        if (b.abs <= err) return x;
        const g = d.div(b);
        const g2 = g.mul(g);
        const h = g2.sub((new ComplexNumber(2, 0).mul(f)).div(b));
        const sq = (new ComplexNumber(m - 1, 0)).mul(((new ComplexNumber(m, 0)).mul(h)).sub(g2)).sqrt;
        let gp = g.add(sq);
        const gm = g.sub(sq);
        if (gp.abs < gm.abs) {
            gp = gm;
        }
        const dx = (new ComplexNumber(m, 0)).div(gp);
        const x1 = x.sub(dx);
        if (x === x1) return x;
        x = x1
        const cdx = dx.abs;
        if (iter > 6 && cdx >= dxold) return x;
        const dxOld = cdx;
        if (!polish && (dx.abs <= eps * x.abs)) return x;
    }
    // Replace following w/some sort of error.
    return new ComplexNumber(0, 0);
}
