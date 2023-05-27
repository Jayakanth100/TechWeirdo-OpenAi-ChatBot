import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
const ChatGpt = () => {

const [data, setData] = useState([]);
const apiKey = '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'
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
const [textInput, setTextInput] = useState('');


const handleSend = async ()=>{
    const prompt = textInput;
    
    const response = await axios.post(apiUrl , {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
    },{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    });
    const text = response.data.choices[0].text;
    setData([...data , {type : 'user' , 'text': textInput}, {type: 'bot' , 'text': text}]);
    setTextInput('');
  
}

  return (
    <View style = {styles.container}>
      <Text style={styles.title}>Ai chatBot</Text>
      <FlatList
        data = {data}
        keyExtractor = {(item, index)=>index.toString()}
        style = {styles.body}
        renderItem = {({item})=>(
            <View style = {{flexDirection:'row',padding:10}}>
                <Text style={{fontWeight:'bold',color: item.type === 'user' ? 'green' : 'red'}}>{item.type === 'user'? 'User': 'Ai'}</Text>
                <Text style={item.type === "user"?styles.botU : styles.botA}>{item.text}</Text>
            </View>
        )}
      />
      <TextInput
        style = {styles.input}
        value = {textInput}
        onChangeText ={(input)=>{setTextInput(input)}}
        placeholder='Want to ask me something ?'
        />
        <TouchableOpacity style = {styles.button} onPress={handleSend}>
            <Text style = {styles.buttontext}>Go</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ChatGpt

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        color:"#8e8bc4",
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 70,
        borderRadius: 100,
        width: "100%",
        height: 50,
        paddingLeft: 140,
        paddingTop: 5

    },
    body:{
        backgroundColor: "",
        borderRadius: 1,
        width: '102%',
        margin: 10
    },
    botU:{
        backgroundColor: "#D2D3DE",
        borderRadius: 50,
        fontSize: 16,
        padding: 10,
        width: "auto",
        maxWidth: "100%",
        marginTop: 10,
        marginLeft:10,
        justifyContent: 'center',
        alignItems:"center"
    },
    botA:{
        backgroundColor: "#007bff",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        fontSize: 16,
        padding:5,
        width: "auto",
        maxWidth: "100%",
        marginTop: 10,
        marginLeft:10,
        justifyContent: 'center',
        alignItems:"center"
        
    },
    input:{
        borderWidth: 1 ,
        borderWidth: 2,
        width: '90%' ,
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
        color: 'black',
        padding: 10,

    },
    button:{
        backgroundColor: 'purple',
        width: '90%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttontext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',

        
    }
})