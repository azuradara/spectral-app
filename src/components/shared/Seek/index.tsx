import React, { ReactElement, useCallback, useRef } from 'react';
import { keys } from 'ramda';
import { Slc } from '#components/shared';
import { motion } from 'framer-motion';

interface SeekProviders {
  Google: (e: string) => string;
  YouTube: (e: string) => string;
}

// TODO: (azuradara) add more search engines later
// some of 'em don't like redirects

const SEEK_PROVIDERS: SeekProviders = {
  Google: (e: string) => `https://www.google.com/search?q=${encodeURI(e)}`,
  YouTube: (e: string) =>
    `https://www.youtube.com/results?search_query=${encodeURI(e)}`,
};

const SEEK_ENGINES = keys(SEEK_PROVIDERS);

const redirSeek = (e: string) => {
  window.location.href = e;
};

const motionVariants = {
  hidden: {
    translateY: -20,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function SeekBar(): ReactElement {
  const seekFunction = useRef(SEEK_PROVIDERS[SEEK_ENGINES[0]]);
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const seek: string = (formData.get('seek') as string) || '';
      redirSeek(seekFunction.current(seek));
    },
    [seekFunction]
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants}
      className="seek-bar"
    >
      <form onSubmit={handleSubmit}>
        <input
          name="seek"
          autoComplete="off"
          placeholder="Search.."
          className="seek-bar__facade"
        />
        <Slc
          className="seek-select"
          iValue={SEEK_ENGINES[0]}
          options={SEEK_ENGINES.map((engine) => ({
            label: engine,
            value: engine,
          }))}
          onChange={(e) => {
            seekFunction.current = SEEK_PROVIDERS[e as keyof SeekProviders];
          }}
        />
      </form>
    </motion.div>
  );
}

export default SeekBar;
