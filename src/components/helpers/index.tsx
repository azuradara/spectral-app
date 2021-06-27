import * as React from 'react';
import mergeProps from 'merge-props';
import yeetChildren from '../../lib/util/omitChildren';
import useBtnHelper from '../../lib/hooks/useBtnHelper';
import useMeasure from 'react-use-measure';

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

type Opt = { label: string; value: any };

interface SlcProps {
  placeholder?: string;
  options: Opt[];
  iValue?: string;
  className?: string;
  onChange?: (e: string) => any;
}

export const Slc: React.FC<SlcProps> = ({
  placeholder = '',
  className,
  options,
  iValue = '',
  onChange,
}) => {
  const [value, setValue] = React.useState<any>(iValue);
  const [show, setShow] = React.useState<boolean>(false);
  const [boundRef, bounds] = useMeasure();
};
