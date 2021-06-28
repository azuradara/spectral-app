import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import { useSpring, animated } from '@react-spring/web';
import concoct_id from '../../lib/helpers/concoct_id';
import clsx from 'clsx';
import { urlifyFile } from '../../lib/util/urlifyFile';

// TODO: Brush up on Formik ~

interface DropZoneProps {
  name: string;
  label: string;
}

// eslint-disable-next-line react/prop-types
const DropZoneInput: React.FC<DropZoneProps> = ({ name, label }) => {
  const id = React.useRef(concoct_id());
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [field, meta] = useField(name);
  const [grabbing, setGrabbing] = React.useState<boolean>(false);
  const alterFile = (file: string) => field.onChange(name)(file);

  return (
    <div className="form-control dropzone">
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          inputRef?.current?.click();
        }}
        role="button"
        tabIndex={-1}
        onDragOver={(e) => {
          e.preventDefault();
          setGrabbing(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setGrabbing(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setGrabbing(false);
        }}
        onDrop={async (e) => {
          e.preventDefault();
          alterFile(await urlifyFile(e.dataTransfer.files[0]));
          setGrabbing(false);
        }}
        className={clsx('form-control__dropzone', grabbing && 'dropping')}
      >
        {label}
        <input
          onClick={(e) => e.stopPropagation()}
          onChange={async (e) => {
            alterFile(await urlifyFile((e.target.files as any)[0]));
          }}
          id={id.current}
          type="file"
          ref={inputRef}
          className="form-control__dropzone__input"
        />

        {Boolean(field.value) && (
          <div className="form-control__dropzone__preview">
            <img src={field.value} alt="Upload Preview" />
          </div>
        )}
      </div>

      {Boolean(meta.touched && meta.error) && (
        <div className="form-control__error">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

export { DropZoneInput };
