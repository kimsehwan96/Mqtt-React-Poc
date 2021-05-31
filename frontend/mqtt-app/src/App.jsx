import Amplify, {PubSub} from 'aws-amplify';
import {AWSIoTProvider} from '@aws-amplify/pubsub/lib/Providers';
import awsConfig from './awsConfig.json'
import React, {useEffect, useState, Suspense} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from "styled-components";
import RealTimeChart from './components/RealTimeChart';

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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));

const getTime = (unixTimestamp) => new Date((unixTimestamp + 3600 * 9) * 1000) //for korean time

function App() {

    init(awsConfig);
    const [fields, setFields] = useState([])
    const [values, setValues] = useState([0, 0, 0, 0, 0])
    const [provider, setProvider] = useState("");
    const classes = useStyles();

    useEffect(() => {
        PubSub.subscribe('app/test', {
            provider: 'AWSIoTProvider'
        }).subscribe({
            next: (data) => {
                setFields(data.value.fields);
                setValues(data.value.values);
                setProvider(JSON.stringify(data));
                console.log(data);
            },
            error: (error) => console.log(error)
        })
    })

    return (
        <Suspense fallback={<div>Loading....</div>}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}> Hello world </Paper>
            </Grid>
            {
                fields.map((item, idx) => {
                    return(
                        (item === "timestamp") ? null :
                        <Grid item xs={4}>
                            <RealTimeChartWrap>
                            <RealTimeChart
                                title={item}
                                value={values[idx]}
                                time={Date.now()}
                            />
                            </RealTimeChartWrap>
                        </Grid>
                    )
                })
            }


            <Grid item xs={12}>
                <Paper className={classes.paper} variant="outlined" square>
                    <p> This is provider context </p>
                    <p> {provider} </p>
                </Paper>
            </Grid>
        </Grid>
        </Suspense>
    );
}

export default React.memo(App);

const RealTimeChartWrap = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
    `;