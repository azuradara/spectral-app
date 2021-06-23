const schleep = (s: number): Promise<number> => {
  return new Promise((resolve) => {
    const id = setTimeout((): void => {
      resolve(id);
    }, s * 1000) as unknown as number;
  });
};

export default schleep;
