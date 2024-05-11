import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    marginHorizontal: 5,
  },

  head: {
    fontSize: 22,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    fontWeight: 'bold',
  },

  heading: {
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },

  inputs: {
    backgroundColor: 'white',
    marginHorizontal: 50,
    marginVertical: 5,
  },

  btn: {
    width: '40%',
    alignSelf: 'center',
    borderRadius: 40,
    margin: 5,
    paddingVertical: 3,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 5,
    marginBottom: 10,
  },

  searchBar: {
    flexDirection:"row",
    alignItems:"center",
    // textAlign:"center",
    // alignSelf:"center",
    backgroundColor: '#fff',
    borderColor: 'purple',
    borderWidth: 1,
    elevation: 10,
    width: '70%',
    height: '95%',
    // borderRadius:30
    
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
