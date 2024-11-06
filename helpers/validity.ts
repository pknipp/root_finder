import ComplexNumber from './complexNumber';

export default class Validity {
    c: number[]
    r: ComplexNumber[]
    v: string
    constructor(coefs: number[], roots: ComplexNumber[], varName: string) {
      [this.c, this.r, this.v] = [coefs, roots, varName]
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

    public get polyString(): string[][] {
        let str = "";
        for (let i = 0; i <= this.n; i++) {
            const coef = this.coefs[i];
            let addStr = "";
            if (coef) {
                if (i === 0) {
                    addStr = String(coef);
                } else {
                    addStr += coef < 0 ? " - " : str === "" ? "" : " + ";
                    if (Math.abs(coef) !== 1) addStr += String(Math.abs(coef));
                    addStr += this.v;
                    if (i > 1) addStr += `<sup>${i}</sup>`;
                }
            }
            str += addStr;
        }
        // The following is need because EJS will not allow html injection.
        const strArray = str.split("</sup>").map(strFrag => strFrag.split("<sup>"));
        return strArray;
    }
  }
