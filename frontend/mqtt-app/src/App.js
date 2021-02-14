import Amplify, {PubSub} from 'aws-amplify';
import {AWSIoTProvider} from '@aws-amplify/pubsub/lib/Providers';
import awsConfig from './awsConfig.json'
import {useEffect, useState} from 'react';

function init(awsConfig) {
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

    const [fields, setFields] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => {
        PubSub.subscribe('app/test', {
            provider: 'AWSIoTProvider'
        }).subscribe({
            next: (data) => {
                setFields(data.value.fields);
                setValues(data.value.values);
            },
            error: (error) => console.log(error)
        })
    })


    return (
        <div className="App">
            <header className="App-header">
                Hello App
            </header>
            <>
                {
                    fields.map((item, idx) => {
                        console.log(values)
                        return (
                            <>
                            <p> fields : {item} </p>
                        <p> value : {values[0][idx]} </p>
                            </>
                        );
                    })
                }
            </>
        </div>
    );
}

export default App;
