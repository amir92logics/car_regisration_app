import React from 'react';
import {StyleSheet} from 'react-native';

import {Heading} from '../components/Heading';
import {Input} from '../components/Input';
import {FilledButton} from '../components/FilledButton';
import {Error} from '../components/Error';
import {IconButton} from '../components/IconButton';
import {AuthContainer} from '../components/AuthContainer';
import {AuthContext} from '../contexts/AuthContext';
import {Loading} from '../components/Loading';

export function RegistrationScreen({navigation}) {
  const {register} = React.useContext(AuthContext);
  const [name, setName  ] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <AuthContainer>
      <IconButton
        style={styles.closeIcon}
        name={'closecircle'}
        onPress={() => {
          navigation.pop();
        }}
      />
      <Heading style={styles.title}>REGISTRATION</Heading>
      <Error error={error} />
      <Input
        style={styles.input}
        placeholder={'Full Name'}
        value={name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        title={'Register'}
        style={styles.loginButton}
        onPress={async () => {
          try {
            setLoading(true);
            await register(email, password);
            navigation.pop();
          } catch (e) {
            setError('Please fill all the fields properly.');
            setLoading(false);
          }
        }}
      />
      <Loading loading={loading} />
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  closeIcon: {
    position: 'absolute',
    top: 60,
    right: 16,
  },
});
