export default function replaceText(text: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<!doctype html><body>${text}`,
    'text/html',
  );

  return dom.body.textContent;
}
