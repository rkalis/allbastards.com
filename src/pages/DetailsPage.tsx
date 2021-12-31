import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Background from '../components/p5/Background';
import { HIGHEST_BASTARD_ID } from '../utils/constants';
import { ISettings } from '../utils/interfaces';
import BastardDetails from '../components/details/BastardDetails';

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

type Params = 'bastardId';

function DetailsPage({ settings, setSettings }: Props) {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const bastardId = Number.parseInt(params.bastardId ?? '', 10);

  if (Number.isNaN(bastardId) || bastardId < 0 || bastardId > HIGHEST_BASTARD_ID) {
    navigate('/');
  }

  return (
    <div>
      <Header settings={settings} setSettings={setSettings} />
      <BastardDetails tokenId={bastardId} settings={settings} />
      {settings.colourfulBackground && <Background />}
    </div>
  );
}

export default DetailsPage;
