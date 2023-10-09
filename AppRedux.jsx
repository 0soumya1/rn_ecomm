import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './app/routes';
// import store from './app/redux/Store';
// import {Provider} from 'react-redux';

export default function App() {
  return (
    <>
      {/* <Provider store={store}> */}
        <SafeAreaProvider>
          <PaperProvider>
            <Routes />
          </PaperProvider>
        </SafeAreaProvider>
      {/* </Provider> */}
    </>
  );
}
