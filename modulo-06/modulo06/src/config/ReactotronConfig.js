import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure(
    // { host: '<ipmaquina>'} "para android"
  )
    .useReactNative()
    .connect();
  console.tron = tron;
  tron.clear();
}

// EMULADOR ANDROID
// adb reverse tcp:9090 tcp:9090
