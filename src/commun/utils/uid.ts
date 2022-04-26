

interface IOptions {
  readableName?: string;
  blocks?: number;
  separator?: string;
  customChars?: string;
}
export function uid({ readableName, blocks, separator, customChars }: IOptions = {}) {
  separator = separator || '-';
  readableName = (readableName) ? `${readableName}${separator}` : '';
  blocks = blocks || 1;
  
  const chars = customChars || 'abcdefghifklmnopqrstuvwxyz0123456789';
  let base = '';
  let counter = 1;
  const limitLoop = blocks || 1;
  const form = 'xxxxxxx';
  base += form;
  while (counter < limitLoop) {
    base += `${separator}${form}`;
    counter++;
  }
  const max = chars.length;
  const random = () => Math.floor(Math.random() * max);

  const result = base.replace(/x/g, (_) => chars[random()]);
  
  return `${readableName}${result}`;
}