/* eslint-disable react/prop-types */
import * as React from 'react';
import clsx from 'clsx';
import useMeasure from 'react-use-measure';
import { useSpring, a } from '@react-spring/web';

import mergeProps from 'merge-props';
import yeetChildren from '#lib/util/omitChildren';

import useExternalClick from '#lib/hooks/useExternalClick';
import useBtnHelper from '#lib/hooks/useBtnHelper';

import ArrowIcon from '#components/Icons/ArrowIcon';

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

const SlcOpt = ({
  opt,
  setValue,
}: {
  opt: Opt;
  setValue: React.Dispatch<any>;
}) => {
  const [crumbs, onClick] = useBtnHelper();

  return (
    <div
      key={opt.value}
      role="button"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setValue(opt.value);
        }
      }}
      onClick={(e) => {
        setValue(opt.value);
        onClick(e);
      }}
      className="select-opts__single btn"
    >
      {crumbs}
      <span>{opt.label}</span>
    </div>
  );
};

export const Slc: React.FC<SlcProps> = ({
  placeholder = '',
  className,
  options,
  iValue = '',
  onChange,
}) => {
  const [value, setValue] = React.useState<any>(iValue);
  const [shown, setShown] = React.useState<boolean>(false);
  const [boundRef, bounds] = useMeasure();

  const ref = useExternalClick(() => {
    setShown(false);
  }) as React.MutableRefObject<HTMLDivElement>;

  const bakoSpring = useSpring({
    to: async (next) => {
      if (shown) {
        await next({
          opacity: 1,
          display: '',
          transform: 'translate(-50%, 0%)',
          pointerEvents: 'all',
        });
        return;
      }

      await next({
        opacity: 0,
        transform: 'translate(-50%, 25%)',
        pointerEvents: 'none',
      });
    },
  });

  const show = React.useCallback(
    (e: React.MouseEvent) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      if ((e as any).key && (e as any).key !== 'Enter') {
        return;
      }

      setShown((state) => !state);
    },
    [setShown]
  );

  React.useEffect(() => {
    setShown(false);
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  //TODO: (azuradara) revisit styling

  return (
    <div
      ref={ref}
      role="menu"
      tabIndex={-1}
      className={clsx('select', className)}
      onKeyDown={show as any}
      onClick={show}
    >
      <div className="select-inner">
        <div className="select-bako" style={{ minWidth: bounds.width - 32 }}>
          <span>{value || placeholder}</span>

          <div className="select-bako__arrow">
            <ArrowIcon orientation={shown ? 'up' : 'down'} />
          </div>
        </div>

        <a.div ref={boundRef} style={bakoSpring} className="select-opts">
          {options.map((opt) => {
            return <SlcOpt key={opt.value} opt={opt} setValue={setValue} />;
          })}
        </a.div>
      </div>
    </div>
  );
};
