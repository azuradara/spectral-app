import React from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';

// eslint-disable-next-line react/prop-types
const Scrollbar: React.FC<ScrollbarProps> = ({ children, ...rest }) => {
  return (
    <Scrollbars
      autoHide
      renderThumbVertical={(props) => (
        <div {...props} className="scrollbars-knob" />
      )}
      renderThumbHorizontal={(props) => (
        <div {...props} className="scrollbars-knob" />
      )}
      renderView={(props) => <div {...props} className="renderView" />}
      width="100%"
      autoHeight
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
