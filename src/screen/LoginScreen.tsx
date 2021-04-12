import { Button, Card, Input, Text } from '@ui-kitten/components';
import * as React from 'react';
import { ActivityIndicator, Linking, StyleSheet, View } from 'react-native';

import { appLoginAsyncAction, appUpdateAction } from '../action';
import { Status } from '../api/fetch';
import Password from '../component/Password';
import useAppState from '../hook/useAppState';
import AsyncScreen from './AsyncScreen';

export default function LoginScreen() {
  const [state, dispatch] = useAppState();
  const api = () => dispatch(appLoginAsyncAction(state.email, state.password));

  return (
    <AsyncScreen initialState={Status.notStarted} api={api}>
      {(loginState, resetScreenStatus) => (
        <View style={styles.loginScreen}>
          <View style={styles.loginForm}>
            <Input
              autoCapitalize="none"
              caption="Use the same email that you registered with."
              onChangeText={(v) => dispatch(appUpdateAction({ email: v }))}
              placeholder="Your LibreView E-mail"
              style={styles.input}
              textContentType={'emailAddress'}
              value={state.email}
            />
            <Password
              caption="Should contain at least 8 symbols."
              onChangeText={(v) => dispatch(appUpdateAction({ password: v }))}
              style={styles.input}
              value={state.password}
            />
            <View style={styles.button}>
              {loginState === Status.notStarted ||
              loginState === Status.failure ? (
                <Button onPress={() => resetScreenStatus(Status.loading)}>
                  Login
                </Button>
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </View>
          <Card>
            <Text>
              Please first create an account on{' '}
              <Text
                style={{ color: 'blue' }}
                onPress={() => Linking.openURL('http://libreview.com')}
              >
                {' '}
                LibreView.com{' '}
              </Text>
              before proceeding.
            </Text>
            {loginState === Status.failure && (
              <Text status="danger">
                There was an error authenticating you. Please try again.
              </Text>
            )}
          </Card>
        </View>
      )}
    </AsyncScreen>
  );
}

const styles = StyleSheet.create({
  input: { marginBottom: 40 },
  button: { marginBottom: 40 },
  loginForm: {},
  loginScreen: {
    width: '100%',
    padding: 20,
  },
});
