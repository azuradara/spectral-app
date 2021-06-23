const concoct_id = (): string => {
  return Math.random()
    .toString(20)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
};

export default concoct_id;
