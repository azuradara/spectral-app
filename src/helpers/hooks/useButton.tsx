import React, { ReactElement, useCallback, useState } from 'react';
import CSS from 'csstype';
import { delete_from_list_where } from '#utils';
import { sleep } from '#utils';
import { HAMON_DELAY } from '#utils';
import { generate_id } from '#utils';

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

      const id = generate_id();

      setHamon((hamonState) => {
        const newHamon = [
          ...hamonState,
          // eslint-disable-next-line react/jsx-key
          <Hamon {...{ style: position, id, key: id }} />,
        ];

        return newHamon;
      });

      sleep(HAMON_DELAY).then(() => {
        setHamon(delete_from_list_where(id));
      });
    },
    [setHamon]
  );

  return [hamon, hamonClick];
};

export default useBtnHelper;
