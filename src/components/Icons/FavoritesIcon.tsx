import * as React from 'react';

const FavoritesIcon = (
  props: React.SVGProps<SVGSVGElement>
): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Bold"
      viewBox="0 0 24 24"
      width="512"
      height="512"
      fill="#FFFFFF"
      {...props}
    >
      <path d="M22.975,8.694,15.889,1.608a5.507,5.507,0,0,0-7.778,0L1.025,8.694A3.477,3.477,0,0,0,0,11.169V21.547A2.457,2.457,0,0,0,2.455,24h19.09A2.457,2.457,0,0,0,24,21.547V11.169A3.477,3.477,0,0,0,22.975,8.694ZM21,21H16V17.818A3.818,3.818,0,0,0,12.182,14h-.364A3.818,3.818,0,0,0,8,17.818V21H3V11.169a.505.505,0,0,1,.146-.354l7.086-7.086a2.5,2.5,0,0,1,3.536,0l7.086,7.086a.505.505,0,0,1,.146.354Z" />
    </svg>
  );
};

export default FavoritesIcon;
