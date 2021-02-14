import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import awsConfig from './awsConfig.json'

function init(awsConfig){
      Amplify.configure({
      Auth: {
          userPoolId: awsConfig.cognitoUserPoolId,
          userPoolWebClientId: awsConfig.cognitoUserPoolClientId,
          identityPoolId: awsConfig.cognitoIdentityPoolId,
          region: awsConfig.region,
      }
  });

  Amplify.addPluggable(new AWSIoTProvider({
      aws_pubsub_region: awsConfig.region,
      aws_pubsub_endpoint: `wss://${awsConfig.mqttBrokerEndpoint}/mqtt`,
  }));
}

const topic = 'app/test' //우리가 임의로 지정 할 수 있는 mqtt subscribe 토픽

function App() {
    init(awsConfig);

  PubSub.subscribe('app/test', {
      provider: 'AWSIoTProvider'
  }).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error)
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Hello world
        </h1>
      </header>
    </div>
  );
}

export default App;
