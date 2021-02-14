import logging
import time
import json
from random import randint
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

host = 'a37j5ardzq7hal-ats.iot.ap-northeast-2.amazonaws.com'
port = 8883  # TLS SSL

rootCaPath = './root.pem'
certificatePath = './TestDevice_0214.cert.pem'
privateCertificatePath = './TestDevice_0214.private.key'

clientId = 'iotconsole-{}'.format(randint(1, 5000))

topic = 'app/test'

AllowedActions = ['both', 'publish', 'subscribe']

logger = logging.getLogger("AWSIoTPythonSDK.core")
logger.setLevel(logging.DEBUG)
streamHandler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
streamHandler.setFormatter(formatter)
logger.addHandler(streamHandler)

myAWSIoTMQTTClient = None
myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId)
myAWSIoTMQTTClient.configureEndpoint(host, port)
myAWSIoTMQTTClient.configureCredentials(rootCaPath, privateCertificatePath, certificatePath)

myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec

myAWSIoTMQTTClient.connect()

loopCount = 0


def make_message(rand_randge: tuple) -> dict:
    message = {
        "fields": [
            "timestamp",
            "speed",
            "rpm",
            "temperature",
            "engineLoad"
        ],
        "values": [
                time.time(),
                randint(*rand_randge),
                randint(*rand_randge),
                randint(*rand_randge),
                randint(*rand_randge)
        ]
    }

    return message


while True:
    myAWSIoTMQTTClient.publish(topic, json.dumps(make_message((1, 1000))), 1)
    print("published.")
    time.sleep(1)