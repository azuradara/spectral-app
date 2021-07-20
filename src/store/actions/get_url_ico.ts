export const get_url_ico = (url: string): string => {
  return `https://api.faviconkit.com/${new URL(url).host}/144`;
};
