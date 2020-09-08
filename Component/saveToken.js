import { AsyncStorage} from 'react-native'

const deviceStorage = {
    async storeToken(user){
        try{
            await AsyncStorage.setItem('userData', JSON.stringify(user));
            console.log('stockageReussi')
        } catch(error){
            console.log('erreur stockage', error);
        }
    },
    
}



export default deviceStorage;