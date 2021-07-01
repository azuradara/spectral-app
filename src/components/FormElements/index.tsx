import * as React from 'react';
import { useField, useFormikContext } from 'formik';
// import mergeProps from 'merge-props';
// import { useSpring, animated } from '@react-spring/web';
import clsx from 'clsx';
import { urlifyFile } from '../../lib/util/urlifyFile';
import concoct_id from '../../lib/helpers/concoct_id';

type DropZoneProps = {
  name: string;
  label: string;
};

const DropZoneInput: React.FC<DropZoneProps> = ({
  name,
  label,
}: DropZoneProps) => {
  const id = React.useRef(concoct_id());
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [grabbing, setGrabbing] = React.useState<boolean>(false);
  const [field, meta] = useField(name);

  const handleFile = (file: string) => field.onChange(name)(file);

  return (
    <div className="form-control dropzone">
      <div
        className={clsx('form-control__dropzone', grabbing && 'grabbing')}
        role="button"
        tabIndex={-1}
        // Metric ****load of event listeners
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          inputRef?.current?.click();
        }}
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
          handleFile(await urlifyFile(e.dataTransfer.files[0]));
          setGrabbing(false);
        }}
        // Ae
      >
        {label}
        <input
          type="file"
          className="form-control__dropzone__input"
          id={id.current}
          ref={inputRef}
          onClick={(e) => e.stopPropagation()}
          onChange={async (e) =>
            handleFile(await urlifyFile((e.target.files as any)[0]))
          }
        />

        {Boolean(field.value) && (
          <div className="form-control__dropzone__preview">
            <img src={field.value} alt="Uploaded File Preview." />
          </div>
        )}

        {Boolean(meta.touched && meta.error) && (
          <div className="form-control__error">
            <span>{meta.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  min: number;
  max: number;
}

const SliderInput: React.FC<SliderProps> = ({
  name,
  label,
  min,
  max,
}: SliderProps) => {
  const [field, meta] = useField(name);

  const id = React.useRef(concoct_id());

  return (
    <div className="form-control">
      <div className="form-control__slider">
        <label htmlFor={id.current}>{label}</label>
        <input
          type="range"
          max={max}
          min={min}
          step={0.01}
          id={id.current}
          {...field}
        />
      </div>

      {Boolean(meta.touched && meta.error) && (
        <div className="form-control__error">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

const FormBtn: React.FC<any> = () => {
  const formik = useFormikContext();

  return (
    <div className="form-buttons">
      <button type="submit" className="btn btn-default btn-btn">
        Submit
      </button>
      <button
        onClick={() => formik.resetForm()}
        type="button"
        className="btn btn-default btn-btn"
      >
        Reset
      </button>
    </div>
  );
};

export { DropZoneInput, SliderInput, FormBtn };
