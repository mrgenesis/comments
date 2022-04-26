
export default class DataTypes {
  expected = null;
  expect(v: any) {
    this.expected = v;
    return this;
  }
  theSameAs(compared: any) {
    return this.expected === compared;
  }
  toBeDifferentOf(compared: any) {
    return this.expected !== compared;
  }
  isNull(v: any) {
    return v === null;
  }

  invert(v: any): boolean {
    return !v;
  }
  isString(str: any): boolean {
    return typeof str === 'string';
  }
  isEmptyString(str: any) {
    return str === '';
  }
  isNotEmptyString(str: any) {
    return str !== '';
  }
  isUndefined(undef: any) {
    return undef === undefined;
  }
  isFalseValue(v: any) {
    return !!v;
  }
  isFalse(bool: boolean) {
    return bool === false;
  }
  isTrue(bool: boolean) {
    return bool === true;
  }
}

export const dataTypes = new DataTypes();
