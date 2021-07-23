import * as React from 'react';

const SquareIcon = (
  props: React.SVGProps<SVGSVGElement>
): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width="512"
      height="512"
      {...props}
    >
      <path d="M19,0H5A5,5,0,0,0,0,5V19a5,5,0,0,0,5,5H19a5,5,0,0,0,5-5V5A5,5,0,0,0,19,0Zm3,19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3Z" />
    </svg>
  );
};

export default SquareIcon;
