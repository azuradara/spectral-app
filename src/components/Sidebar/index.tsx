import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import { IcoBtn } from '../helpers';
import LogoutIcon from '../../Icons/LogoutIcon';
import FavoritesIcon from '../../Icons/FavoritesIcon';
import { connect } from 'react-redux';
import { GlobalState } from '../../lib/interfaces';
import { logoutUser } from '../../store/deeds';
import { keys } from 'ramda';
import SettingsIcon from '../../Icons/SettingsIcon';

interface ComponentProps {
  logoutUser: () => void;
}

const Sidebar = (props: ComponentProps): ReactElement => {
  const { logoutUser } = props;
  const { push } = useHistory();

  return (
    <div className="sidebar-inner">
      <div className="sidebar-inner__single">
        <IcoBtn onClick={() => push('/')}>
          <FavoritesIcon />
        </IcoBtn>
      </div>
      <div className="sidebar-inner__single">
        <IcoBtn>
          <SettingsIcon />
        </IcoBtn>

        <IcoBtn onClick={async () => await logoutUser()}>
          <LogoutIcon />
        </IcoBtn>
      </div>
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { logoutUser })(Sidebar);
