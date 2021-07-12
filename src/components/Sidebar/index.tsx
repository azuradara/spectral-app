import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import { IcoBtn } from '#components/helpers';
import LogoutIcon from '#components/Icons/LogoutIcon';
import FavoritesIcon from '#components/Icons/FavoritesIcon';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '#interfaces';
import { logoutUser, openModal } from '#store/deeds';
import SettingsIcon from '#components/Icons/SettingsIcon';
import SettingsModal from '#components/ModalContent/SettingsModal';
import BookmarkIcon from '#components/Icons/BookmarkIcon';
import TaskIcon from '#components/Icons/TaskIcon';

const mapStateToProps = (state: GlobalState) => {
  return {
    user: state.user,
  };
};

const connector = connect(mapStateToProps, { openModal, logoutUser });

type ComponentProps = Record<string, undefined> &
  ConnectedProps<typeof connector>;

const Sidebar = (props: ComponentProps): ReactElement => {
  const { logoutUser, openModal } = props;
  const { push } = useHistory();

  return (
    <div className="sidebar-inner">
      <div className="sidebar-inner__single">
        <IcoBtn onClick={() => push('/')}>
          <FavoritesIcon />
        </IcoBtn>

        <IcoBtn onClick={() => push('/bookmarks')}>
          <BookmarkIcon />
        </IcoBtn>

        <IcoBtn onClick={() => push('/tasks')}>
          <TaskIcon />
        </IcoBtn>
      </div>
      <div className="sidebar-inner__single">
        <IcoBtn
          onClick={() =>
            openModal({
              title: 'Settings',
              content: <SettingsModal />,
            })
          }
        >
          <SettingsIcon />
        </IcoBtn>

        <IcoBtn onClick={async () => await logoutUser()}>
          <LogoutIcon />
        </IcoBtn>
      </div>
    </div>
  );
};

export default connector(Sidebar);
