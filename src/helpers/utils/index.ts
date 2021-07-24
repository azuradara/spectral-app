import { complement, omit, pathEq, filter } from 'ramda';

/** __FUNCTIONS__ */

export const generate_id = (): string => {
  return Math.random()
    .toString(20)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
};

export const sleep = (s: number): Promise<number> => {
  return new Promise((resolve) => {
    const id = setTimeout((): void => {
      resolve(id);
    }, s * 1000) as unknown as number;
  });
};

export const byte_size = (str: string): number => new Blob([str]).size;

export const prune_children = omit(['children']);

export const parse_url = (url: string): string[] => {
  const parsed = /https?:\/\//.test(url) ? url : `https://${url}`;

  const display = url
    .replace(/https:\/\//, '')
    .replace('www', '')
    .replace(/\$/, '');

  return [display, parsed];
};

export const file_blob = (file: File): Promise<string> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    if (!file) reject();

    const blob = new Blob([new Uint8Array(await file.arrayBuffer())], {
      type: file.type,
    });

    const fr = new FileReader();

    fr.readAsDataURL(blob);
    fr.onloadend = () => resolve(fr.result as string);
    fr.onerror = (error) => reject(error);
  });

export const delete_from_list_where: (e: string) => (x: any[]) => any[] = (
  e: string
) => filter(complement(pathEq(['props', 'id'], e)));

/** CONSTANTS */

export const HAMON_DELAY = 0.7;

export const partition = (array: any[], callback: (elem: any) => boolean) => {
  return array.reduce(
    ([pass, fail], elem) => {
      return callback(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
};
