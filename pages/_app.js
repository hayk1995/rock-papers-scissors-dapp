import '../styles/globals.css';
import { EthAccountProvider } from '../hooks/use-eth-account';
import { Web3Provider } from '../hooks/use-web3';
import Game from '../containers/game';
import ConnectedDapp from '../components/connected-dappp';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp() {
  return (
    <EthAccountProvider>
      <ConnectedDapp>
        <Web3Provider>
          <Game />
        </Web3Provider>
      </ConnectedDapp>
    </EthAccountProvider>
  );
}

export default MyApp;
