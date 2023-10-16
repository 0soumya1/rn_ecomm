import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Button, Headline, Portal, Dialog} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../style';

const Nav = () => {
  const {store, setStore} = useContext(AuthContext);
  const auth = store?.user;
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogout = () => {
    setStore({});
    hideDialog();
    navigation.navigate('login');
  };

  return (
    <>
      {auth ? (
        <>
          <Appbar.Header style={style.navbar}>
            <Headline
              style={{fontSize: 20, fontWeight: 'bold'}}
              onPress={() => navigation.navigate('home')}>
              Admin Panel
            </Headline>

            <AntDesign
              onPress={showDialog}
              name="logout"
              style={{fontSize: 25}}
            />

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Logout ?</Dialog.Title>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>No</Button>
                  <Button onPress={handleLogout}>Yes</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </Appbar.Header>
        </>
      ) : (
        <Appbar.Header>
          <Headline style={{fontSize: 20, fontWeight: 'bold'}}>
            Admin Panel
          </Headline>
        </Appbar.Header>
      )}
    </>
  );
};

export default Nav;
