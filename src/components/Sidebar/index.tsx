import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';
import { IcoBtn } from '../helpers';

const Sidebar = (): ReactElement => {
  const { push } = useHistory();

  return (
    <div className="sidebar-inner">
      <div className="siderbar-inner__single">
        <IcoBtn onClick={() => push('/login')}>ye</IcoBtn>
      </div>
    </div>
  );
};

export default Sidebar;
