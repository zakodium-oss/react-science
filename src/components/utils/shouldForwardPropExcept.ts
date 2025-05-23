export function shouldForwardPropExcept(properties: string[]) {
  const propsSet = new Set(properties);
  return (property: string) => {
    return !propsSet.has(property);
  };
}
