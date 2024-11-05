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

    public get conj(): ComplexNumber {
      return new ComplexNumber(this.real, this.imag ? this.imag * -1 : 0)
    }

    public get sqrt(): ComplexNumber {
        const r = Math.sqrt(this.abs);
        const theta = this.arg / 2;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        return new ComplexNumber(x, y);
    }

    public get exp(): ComplexNumber {
      const [r, i] = [Math.E ** this.real * Math.cos(this.imag), Math.sin(this.imag)]
      return new ComplexNumber(r, i)
    }
  }
