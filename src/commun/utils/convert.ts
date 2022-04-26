
export class Convert {
  private toConvert: any;
  fromString(str: string | undefined) {
    this.toConvert = str;
    return this;
  }
  fromNumber(num: Number | undefined) {
    this.toConvert = num;
    return this;
  }
  toNumber() {
    return +this.toConvert;
  }
  toString() {
    return this.toConvert as string;
  }
}

export const convert = new Convert();