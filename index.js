/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Background FCM Message:', remoteMessage);

  const { title, body } = remoteMessage.data;

  await notifee.displayNotification({
    title: title || 'New Alert',
    body: body || '',
    android: {
      channelId: 'default',
      smallIcon: 'ic_stat_circle_notifications',
      color: '#000',
      style: {
        type: AndroidStyle.BIGTEXT,
        text: body || '',
      },
      pressAction: {
        id: 'default',
      },
      
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
