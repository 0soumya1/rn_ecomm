import {View, Text, Appearance} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Button, Headline, Portal, Dialog} from 'react-native-paper';
import {AuthContext} from '../AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from '../style';

const Nav = () => {
  const {store, setStore} = useContext(AuthContext);
  const auth = store?.user;
  const navigation = useNavigation();
  // const [theme, setTheme] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  // const [visible, setVisible] = React.useState(false);
  const [logoutVisible, setLogoutVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);

  // const showDialog = () => setVisible(true);
  // const hideDialog = () => setVisible(false);

  const showDeleteDialog = () => setDeleteVisible(true);
  const hideDeleteDialog = () => setDeleteVisible(false);

  const showLogoutDialog = () => setLogoutVisible(true);
  const hideLogoutDialog = () => setLogoutVisible(false);

  const handleLogout = () => {
    setStore({});
    hideLogoutDialog();
    navigation.navigate('login');
  };
  const handleDelete = () => {
    setStore({});
    hideDeleteDialog();
    navigation.navigate('login');
  };
  // useEffect(() => {
  //   // const colorScheme = Appearance.getColorScheme();
  //   const listener = Appearance.addChangeListener(colorTheme => {
  //     console.log(colorTheme);
  //     if (colorTheme.colorScheme === 'dark') {
  //       setTheme('DARK');
  //     } else {
  //       setTheme('LIGHT');
  //     }
  //   });
  //   return () => {
  //     listener;
  //   };
  // }, []);

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

            <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
              <AntDesign
                onPress={showDeleteDialog}
                name="deleteuser"
                style={{
                  fontSize: 25,
                  color: theme === 'light' ? '#070F2B' : '#EFECEC',
                }}
              />

              <AntDesign
                onPress={showLogoutDialog}
                name="logout"
                style={{
                  fontSize: 23,
                  color: theme === 'light' ? '#070F2B' : '#EFECEC',
                }}
              />
            </View>

            <Portal>
              <Dialog visible={deleteVisible} onDismiss={hideDeleteDialog}>
                <Dialog.Title>Delete Account ?</Dialog.Title>
                <Dialog.Actions>
                  <Button onPress={hideDeleteDialog}>
                    <Text style={{fontSize: 18}}>No</Text>
                  </Button>
                  <Button onPress={handleDelete}>
                    <Text style={{fontSize: 18}}>Yes</Text>
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            <Portal>
              <Dialog visible={logoutVisible} onDismiss={hideLogoutDialog}>
                <Dialog.Title>Logout ?</Dialog.Title>
                <Dialog.Actions>
                  <Button onPress={hideLogoutDialog}>
                    <Text style={{fontSize: 18}}>No</Text>
                  </Button>
                  <Button onPress={handleLogout}>
                    <Text style={{fontSize: 18}}>Yes</Text>
                  </Button>
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
