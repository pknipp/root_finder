import ComplexNumber from './complexNumber';

export default class Validity {
    c: number[]
    r: ComplexNumber[]
    constructor(coefs: number[], roots: ComplexNumber[]) {
      [this.c, this.r] = [coefs, roots]
    }

    public get coefs(): number[] {
      return this.c
    }

    public get roots(): ComplexNumber[] {
      return this.r
    }

    public get n(): number {
        return this.roots.length
    }

    public get sum(): ComplexNumber {
        const sumRoots = this.roots.reduce((sumRoots, root) => {
            return sumRoots.add(root);
        }, new ComplexNumber(0, 0));
        return sumRoots.add(
            new ComplexNumber(this.coefs[this.n - 1] / this.coefs[this.n], 0)
        )
    }

    public get prod(): ComplexNumber {
        const prodRoots = this.roots.reduce((prodRoots, root) => {
            return prodRoots.mul(root);
        }, new ComplexNumber(1, 0));
        return prodRoots.sub(new ComplexNumber(
            this.coefs[0] / this.coefs[this.n] * ((this.n % 2) ? -1 : 1),
            0,
        ));
    }

    public get sumMod(): number {
        return this.roots.reduce((sumMod, root) => {
            const poly = this.coefs.reduce(([poly, fac], coef) => {
                const term = fac.mul(new ComplexNumber(coef, 0));
                fac = fac.mul(root);
                return [poly.add(term), fac];
            }, [new ComplexNumber(0, 0), new ComplexNumber(1, 0)])[0];
            return sumMod + poly.abs;
        }, 0);
    }
  }
