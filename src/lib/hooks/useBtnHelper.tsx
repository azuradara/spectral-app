import React, { ReactElement, useCallback, useState } from 'react';
import CSS from 'csstype';
import yeetFromListWhereId from '../util/yeetFromListWhereId';
import schleep from '../helpers/schleep';
import { HAMON_DELAY } from '../fax';
import concoct_id from '../helpers/concoct_id';

interface HamonProps {
  style: CSS.Properties;
}

const Hamon = (props: HamonProps) => {
  return <span style={props.style} className="btn-ring" />;
};

const useBtnHelper = (): [
  ReactElement[] | false,
  (e: React.MouseEvent) => void
] => {
  const [hamon, setHamon] = useState<ReactElement[]>([]);

  const hamonClick = useCallback(
    async (e: React.MouseEvent) => {
      const { pageX: x, pageY: y } = e;

      const { top, left } = (e.target as HTMLElement).getBoundingClientRect();

      const position: CSS.Properties = {
        left: `${x - left}px`,
        top: `${y - top}px`,
      };

      const id = concoct_id();

      setHamon((hamonState) => {
        const newHamon = [
          ...hamonState,
          // eslint-disable-next-line react/jsx-key
          <Hamon {...{ style: position, id, key: id }} />,
        ];

        return newHamon;
      });

      schleep(HAMON_DELAY).then(() => {
        setHamon(yeetFromListWhereId(id));
      });
    },
    [setHamon]
  );

  return [hamon, hamonClick];
};

export default useBtnHelper;
