import { connect, ConnectedProps } from 'react-redux';
import * as React from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { openModal } from '../../store/deeds';
import AddCategoryModal from '../ModalContent/AddCategoryModal';
import AddIcon from '../../Icons/AddIcon';

const connector = connect(null, { openModal });

type ComponentProps = {
  id: string;
} & ConnectedProps<typeof connector>;

const CtxMenu = (props: ComponentProps): React.ReactElement => {
  const { id, openModal } = props;

  return (
    <ContextMenu id={id}>
      <MenuItem
        onClick={() =>
          openModal({
            title: 'Add Category',
            content: <AddCategoryModal />,
          })
        }
      >
        <AddIcon
          style={{
            opacity: 0.5,
            height: '1.2rem',
          }}
        />
        Add category
      </MenuItem>
    </ContextMenu>
  );
};

export default connector(CtxMenu);
