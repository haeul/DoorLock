//이용내역 페이지
import React, { useState, useEffect }from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const serverUrl =
'https://port-0-door-lock-server-jvpb2alnwnfxkw.sel5.cloudtype.app';


function Usagedetails() {
    useEffect(() => {
        axios
        .post(`${serverUrl}/usage-history-get`, {userId: 'test'})
        .then(response => {
            setData(response.data.usageHistory)
          console.log(response.data);
        })
        .catch(error => {
          console.error('오류 발생: ' + error);
        });
        }, []);

    const [data,setData] = useState([

    ])

    const [updown,setUpDown] = useState(false);

    const updownBtn = () => {

        const sortedData = updown
          ? [...data].sort((a, b) => (a.dateHistory > b.dateHistory ? 1 : -1))
          : [...data].sort((a, b) => (a.dateHistory > b.dateHistory ? -1 : 1));

        setData(sortedData);
        setUpDown(!updown);
    };

    const ReadBox = ({ item }) => (
        <View style={styles.readBox}>
          <Text style={[styles.statusText, { color: item.openHistory==="OPEN" ? 'blue' : 'red' }]}>
        {item.openHistory ? 'OPEN' : 'CLOSE'}
          </Text>
          <View>
            <Text style={[styles.textStyle, { fontSize: 16 }]}>{item.dateHistory}</Text>
            <Text style={{ alignSelf: 'flex-end', color: '#000', fontSize: 12 }}>{item.timeHistory}</Text>
          </View>
        </View>
    );

    return(
        <SafeAreaView>

                <View style={styles.container}>
                    <Text style={styles.containerText}>이용내역</Text>
                </View>
                <TouchableOpacity onPress={updownBtn} style={styles.updownBtn}>
                    <Text style={{fontSize:12, color:'#868e96'}}>{updown ? '오른차순' : '내림차순'}</Text>
                </TouchableOpacity>
                <View>
                <FlatList
                   data={data}
                   renderItem={ReadBox}
                   contentContainerStyle={{width:'100%'}}
                />
                </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 3,
        borderBottomColor: '#7D74E4',
        marginHorizontal: 20,
        marginTop: '10%',
    },
    containerText: {
        color: '#868e96',
        fontSize: 16,
        marginBottom: 10,
    },
    updownBtn: {
        marginHorizontal:20,
        marginTop:10,
        alignSelf:'flex-end'
    },
    readBox: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginTop:15
    },
    textStyle: {
        color:'#000',
    },
})

export default Usagedetails