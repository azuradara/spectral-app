import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import { IcoBtn } from '../helpers';
import LogoutIcon from '../../Icons/LogoutIcon';
import FavoritesIcon from '../../Icons/FavoritesIcon';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '../../lib/interfaces';
import { logoutUser, openModal } from '../../store/deeds';
import SettingsIcon from '../../Icons/SettingsIcon';
import SeekBar from '../Seek';

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
      </div>
      <div className="sidebar-inner__single">
        <IcoBtn
          onClick={() => openModal({ title: 'Settings', content: <SeekBar /> })}
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
