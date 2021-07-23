import * as React from 'react';

const TickBoxIcon = (
  props: React.SVGProps<SVGSVGElement>
): React.ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M19 0H5a5.006 5.006 0 00-5 5v14a5.006 5.006 0 005 5h14a5.006 5.006 0 005-5V5a5.006 5.006 0 00-5-5zm3 19a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3h14a3 3 0 013 3z" />
      <path d="M9.333 15.919L5.414 12A1 1 0 004 12a1 1 0 000 1.414l3.919 3.919a2 2 0 002.829 0L20 8.081a1 1 0 000-1.414 1 1 0 00-1.414 0z" />
    </svg>
  );
};

export default TickBoxIcon;
