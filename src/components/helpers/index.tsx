import * as React from 'react';
import mergeProps from 'merge-props';
import yeetChildren from '../../lib/util/omitChildren';
import useBtnHelper from '../../lib/hooks/useBtnHelper';

export const IcoBtn = (
  props: React.ButtonHTMLAttributes<any>
): React.ReactElement => {
  const [el, onClick] = useBtnHelper();

  return (
    <button
      type="button"
      {...mergeProps(yeetChildren(props), {
        className: 'ico-btn btn btn-default',
        onClick,
        children: el,
      })}
    >
      {props.children}
      {el}
    </button>
  );
};
