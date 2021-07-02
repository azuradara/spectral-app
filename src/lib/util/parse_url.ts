export const parse_url = (url: string): string[] => {
  let parsed: string;

  if (/https?:\/\//.test(url)) parsed = url;
  else parsed = `http://${url}`;

  const display = url
    .replace(/https?:\/\//, '')
    .replace('www', '')
    .replace(/\/$/, '');

  return [display, parsed];
};
