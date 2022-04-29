
export function urlValidation(urlSearshParams: any) {
  let missed: string[] = [];
  const properties = Object.keys(urlSearshParams);
  const mandatoryProperties = ['listId', 'listType', 'beginning', 'end', 'isPhoneNumberId'];
  const haveProperty = (property: string): void => {
    const isNotPresent = properties.indexOf(property) === -1;
    if (isNotPresent) {
      missed.push(property);
    }
  }
  mandatoryProperties.forEach(haveProperty);
  if(missed.length) {
    throw new Error(`As propriedade(s): "${missed.join(', ')}", não está(ão) na URL.`);
  }
  return true;
}
