import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    margin: 3,
  },

  inputs: {
    backgroundColor: 'white',
    marginHorizontal: 50,
    marginVertical: 5,
  },

  heading: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'purple',
    fontWeight: 'bold',
  },

  head: {
    fontSize: 22,
    alignSelf: 'center',
    color: 'purple',
    marginBottom: 10,
    fontWeight: 'bold',
  },

  btn: {
    backgroundColor: 'purple',
    width: '40%',
    alignSelf: 'center',
    borderRadius: 40,
    margin: 5,
    paddingVertical: 3,
  },

  searchBar: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderColor: 'purple',
    borderWidth: 1,
    elevation: 10,
    width: '70%',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin: 5,
  },

  invalid: {
    color: 'red',
    display: 'flex',
    marginVertical: 3,
    marginHorizontal: 55,
  },

  table: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
});
