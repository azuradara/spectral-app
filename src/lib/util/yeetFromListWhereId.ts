import { complement, filter, pathEq } from 'ramda';

const yeetFromListWhereId: (e: string) => (x: any[]) => any[] = (e: string) =>
  filter(complement(pathEq(['props', 'id'], e)));

export default yeetFromListWhereId;
