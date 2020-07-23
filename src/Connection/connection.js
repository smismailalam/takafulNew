import Store from '@store/Store';
import {newConnection} from '@store/actions';
import InCallManager from 'react-native-incall-manager';

const signalR = require('@aspnet/signalr');

var hubConnection = null;

export function NewConnection() {
  if (global.token) {
    return new signalR.HubConnectionBuilder()
      .withUrl(global.API_URL + '/livechat', {
        accessTokenFactory: () => {
          return global.token;
        },
        logging: signalR.LogLevel.Information,
      })
      .build();
  } else {
  }
}

export function Start() {
  if (hubConnection === null || hubConnection.length == 0) {
    this.NewConnection();
  }
  if (hubConnection.state != 1) {
    hubConnection
      .start()
      .then(() => {})
      .catch(error => {
        console.log('Error Connection Start', error);
      });
  } else {
    console.log('App State is 1, ', hubConnection);
  }

  return hubConnection;
}
