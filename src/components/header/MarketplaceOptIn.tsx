import Modal from '../common/Modal';
import Button from '../common/Button';
import { ISettings } from '../../utils/interfaces';
import Link from '../common/Link';

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

function MarketplaceOptin({ settings, setSettings }: Props) {
  const enableButton = (<Button label="ENABLE" onClick={() => setSettings({ ...settings, enableMarketplace: true })} className="w-full inline-flex justify-center" />);
  const disableButton = (<Button label="DISABLE" onClick={() => setSettings({ ...settings, enableMarketplace: false })} className="w-full inline-flex justify-center" inverted />);

  // Only ask for confirmation once
  if (settings.enableMarketplace !== undefined) return null;

  return (
    <Modal title="ENABLE MARKETPLACE" isOpen additionalButtons={[enableButton, disableButton]}>
      <div className="text-lg">
        ALLBASTARDS now features a MARKETPLACE using the <Link text="RARIBLE PROTOCOL" to="https://docs.rarible.org/" />,
        which is also used by the well-established RARIBLE marketplace. THE ALLBASTARDS MARKETPLACE is in
        a <b>PUBLIC BETA</b> phase, so some functionality may not work correctly.
        <br /><br />
        By enabling the MARKETPLACE functionality you agree that ALLBASTARDS.COM or its
        creators <b>CANNOT BE HELD LIABLE</b> for the results of any bugs or unexpected behaviour.
        The MARKETPLACE can be toggled in the settings.
      </div>
    </Modal>
  );
}

export default MarketplaceOptin;
