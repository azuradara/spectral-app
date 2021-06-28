import { useSpring, animated } from '@react-spring/web';
import * as React from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '../../Icons/CloseIcon';
import { MODAL_SRC_ID, useModalCtx } from '../../lib/modal/ModalCtx';

import useExternalClick from '../../lib/hooks/useExternalClick';
import { IcoBtn } from '../helpers';

export interface ModalProps {
  id: string;
  title: string;
}

const portalToSource = (elem: React.ReactElement, id: string) => {
  const source = document.querySelector(`#${MODAL_SRC_ID}`);

  if (source) {
    return createPortal(elem, source, id);
  }

  return elem;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { content, closeModal } = useModalCtx();
  const [shown, setShown] = React.useState<boolean>(false);

  const spring = useSpring<{ opacity: string; transform: string }>({
    to: async (next) => {
      if (content === props.id) {
        setShown(true);
        await next({ opacity: 1, transform: 'translate(0%,0%)' });
        return;
      }

      await next({ opacity: 0, transform: 'translate(0%, 20%)' });
      setShown(false);
    },
  });

  const ref = useExternalClick(() => {
    closeModal();
  }) as React.MutableRefObject<HTMLDivElement>;

  if (!shown) {
    return null;
  }

  return portalToSource(
    <animated.div style={{ opacity: spring.opacity }} className="modal">
      <animated.div style={spring} ref={ref} className="modal-body">
        <IcoBtn onClick={closeModal} className="modal-close">
          <CloseIcon />
        </IcoBtn>
        <div className="modal-body__title">
          <h2>{props.title}</h2>
        </div>
        <div className="modal-body__content">{props.children}</div>
      </animated.div>
    </animated.div>,
    props.id
  );
};

export default Modal;
