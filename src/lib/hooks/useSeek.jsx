import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { SEEK_FAIL, SEEK_INIT, SEEK_SUCC } from '../helpers/deed_types';

const seekReducer = (state, deed) => {
  // spread destruc to keep initial state immutable

  switch (deed.type) {
    case SEEK_INIT:
      return {
        ...state,
        isSeeking: true,
        isError: false,
      };
    case SEEK_SUCC:
      return {
        ...state,
        isSeeking: false,
        isError: false,
        data: deed.payload,
      };
    case SEEK_FAIL:
      return {
        ...state,
        isSeeking: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useSeek = (initUrl, initData) => {
  const [url, setUrl] = useState(initUrl);

  const [state, dispatch] = useReducer(seekReducer, {
    isSeeking: false,
    isError: false,
    data: initData,
  });

  let abandonSeek = false;

  useEffect(() => {
    const seekData = async () => {
      dispatch({
        type: 'SEEK_INIT',
      });

      try {
        const res = await axios(url);

        if (!abandonSeek) {
          dispatch({
            type: 'SEEK_SUCC',
            payload: res.data,
          });
        }
      } catch (err) {
        if (!abandonSeek) {
          dispatch({
            type: 'SEEK_FAIL',
          });
        }
      }
    };

    seekData();

    return () => {
      abandonSeek = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default useSeek;
