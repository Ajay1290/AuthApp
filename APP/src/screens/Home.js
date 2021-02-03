import React from 'react'
import { View, Text } from 'react-native';
import { CustomButton as Button} from '../components/Button';
import { UserService } from '../services/JsonApiFetcher'


export function Home ({AuthContext, state}) {

    const [data, setdata] = React.useState('')

    const { signOut } = React.useContext(AuthContext)
   
    React.useEffect( () => {

        const userData = async () => {
            try {
                const response = await UserService(state.userToken);
                if(response.status){ 
                    setdata(response)
                    console.log(data)
                }
                else{ alert(response['msg']) }
            } catch (error) {
                console.log(error);
            }
        }

        userData();

    }, [state.userToken])

    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Text>Welcom {data ? (data.info.email) : (false) }</Text>
            <Button style={{marginVertical:10, padding: 15, backgroundColor:"#c3c3c3"}} 
                    text="Sign Out" 
                    onPress={() => {signOut()}} />
        </View>
    );

}
