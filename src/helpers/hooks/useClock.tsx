import dayjs from 'dayjs';
import * as React from 'react';

interface ClockProps {
  month: string;
  day: string;
  year: string;
  hour: string;
  minute: string;
  seconds: string;
}

const FORMAT: ClockProps = {
  month: 'MMMM',
  day: 'DD',
  year: 'YYYY',
  hour: 'hh',
  minute: 'mm',
  seconds: 'ss',
};

const objectify = (clock: dayjs.Dayjs) => {
  const x: { [e: string]: any } = {};
  Object.keys(FORMAT).forEach((y: string) => {
    x[y] = clock.format(FORMAT[y as keyof ClockProps]);
  });
  return x;
};

const useClock = (): ClockProps => {
  const [clock, setClock] = React.useState(
    objectify(dayjs(new Date().toUTCString()))
  );

  React.useEffect(() => {
    const inter = setInterval(() => {
      setClock(objectify(dayjs(new Date().toISOString())));
    }, 1000);

    return () => clearInterval(inter);
  }, []);

  return clock as ClockProps;
};

export default useClock;
