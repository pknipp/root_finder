// copied from exercism.org/tracks/typescript/exercises/complex-numbers/solutions/hid8
export default class ComplexNumber {
    r: number
    i: number
    constructor(real: number, imaginary: number) {
      [this.r, this.i] = [real, imaginary]
    }

    public get real(): number {
      return this.r
    }

    public get imag(): number {
      return this.i
    }

    public get isComplex(): boolean {
      return Math.abs(this.i) > 0.000000001;
    }

    public add(other: ComplexNumber): ComplexNumber {
      const [r, i] = [this.real + other.real, this.imag + other.imag]
      return new ComplexNumber(r, i)
    }

    public sub(other: ComplexNumber): ComplexNumber {
      const [r, i] = [this.real - other.real, this.imag - other.imag]
      return new ComplexNumber(r, i)
    }

    public div(other: ComplexNumber): ComplexNumber {
      const [a, b, c, d] = [this.real, this.imag, other.real, other.imag]
      const [r, i] = [
        (a * c + b * d) / (c * c + d * d),
        (b * c - a * d) / (c * c + d * d)
      ]
      return new ComplexNumber(r, i)
    }

    public mul(other: ComplexNumber): ComplexNumber {
      const [a, b, c, d] = [this.real, this.imag, other.real, other.imag]
      const [r, i] = [a * c - b * d, b * c + a * d]
      return new ComplexNumber(r, i)
    }

    public get abs(): number {
      return Math.sqrt(this.real * this.real + this.imag * this.imag)
    }

    public get arg(): number {
      return Math.atan2(this.imag, this.real);
    }

    public get sqrt(): ComplexNumber {
        const r = Math.sqrt(this.abs);
        const theta = this.arg / 2;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        return new ComplexNumber(x, y);
    }
    public get irreducible(): string[] {
      const coef = this.isComplex ? -2 * this.real : -this.real;
      let str = coef > 0 ? " + " : coef < 0 ? " - " : "";
      const absCoef = Math.abs(coef);
      str += absCoef ? String(absCoef) : "";
      const stringFrags = [str];
      if (this.isComplex) {
        stringFrags.push(` + ${this.abs * this.abs}`);
      } else {
        stringFrags.unshift("");
      }
      return stringFrags;
    }
  }
