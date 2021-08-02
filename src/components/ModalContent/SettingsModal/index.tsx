import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '#interfaces';
import { updateSettings, closeModal } from '#store/actions';
import Scrollbar from '#components/shared/Scrollbar';
import SettingsAppearance from './Tabs/SettingsAppearance';
import SettingsWeather from './Tabs/SettingsWeather';

const mapStateToProps = (state: GlobalState) => ({
  initialSettings: state.settings.settings,
});

const connector = connect(mapStateToProps, { updateSettings, closeModal });

const tabs = [
  {
    category: 'App Settings',
    items: [
      { label: 'Appearance', component: <SettingsAppearance /> },
      { label: 'Weather', component: <SettingsWeather /> },
    ],
  },
];

type SettingsModalProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const SettingsModal = (props: SettingsModalProps): React.ReactElement => {
  const [activeTab, setActiveTab] = React.useState<{
    label: string;
    component: React.ReactElement;
  }>(tabs[0].items[0]);

  return (
    <div className="settings">
      <div className="settings__body">
        <div className="settings__body__tabs">
          {tabs.map((t) => {
            return (
              <div key={t.category}>
                <div className="tab--label">{t.category}</div>
                {t.items.map((i) => {
                  return (
                    <div
                      key={i.label}
                      onClick={() => setActiveTab(i)}
                      className="tab"
                    >
                      {i.label}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Scrollbar autoHeight autoHeightMin={'75vh'}>
          <div className="settings__body__content">{activeTab.component}</div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default connector(SettingsModal);
