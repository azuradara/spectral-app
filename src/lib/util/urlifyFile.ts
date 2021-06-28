export const urlifyFile = (file: File): Promise<string> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    if (!file) reject();

    const blob = new Blob([new Uint8Array(await file.arrayBuffer())], {
      type: file.type,
    });

    const fileReader = new FileReader();

    fileReader.readAsDataURL(blob);

    fileReader.onloadend = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
