// 예약
import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function Reservation(){

    const [Time,setTime] = useState(0);
    const [isTimeVisible, setTimeVisible] = useState(false); 
    const [openTime,setOpenTime] = useState(0);
    const [openMinute, setOpenMinute] = useState(0);
    
    const isBtn = isTimeVisible === false && openTime > 0 || openMinute > 0 && isTimeVisible === false;

    const okay = () => {
        setTimeVisible(true);
        Alert.alert('확인','예약이 되었습니다.');
        setOpenTime(0);
        setOpenMinute(0);
    }

    const upTbtn= () => {
        if(openTime < 24){
            setOpenTime(openTime + 1);
        }
    }

    const downTbtn = () => {
        if(openTime > 0){
            setOpenTime(openTime - 1);
        }
    }

    const upMbtn = () => {
        if(openMinute < 59){
            setOpenMinute(openMinute + 1);
        }
    }

    const downMbtn = () => {
        if(openMinute > 0){
            setOpenMinute(openMinute - 1);
        }
    }

    const handleYesPress = () => {
        setTime(0);
        setTimeVisible(false);
        Alert.alert('알림', '예약 시간이 삭제되었습니다.');
      };
    
      const handleNoPress = (onPress) => {
        onPress
      };
    
      const showConfirmationAlert = () => {
        Alert.alert(
          '삭제',
          '예약된 시간이 삭제됩니다',
          [
            {
              text: '아니요',
              onPress: handleNoPress,
              style: 'cancel', // "아니요" 버튼을 눌렀을 때 취소로 처리
            },
            {
              text: '예',
              onPress: handleYesPress,
            },
          ],
          { cancelable: false } // 뒤로가기 버튼으로 알림창을 닫지 못하게 설정
        );
      };

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.containerText}>예약</Text>
                </View>
                {isTimeVisible && (<View style={styles.setTime}>
                    <Text style={styles.rTime}>남은예약 시간: {Time}</Text>
                    <TouchableOpacity style={styles.dbtn} onPress={showConfirmationAlert}>
                        <Text style={{fontSize:12,color:'#fff'}}>삭제</Text>
                    </TouchableOpacity>
                </View>)}
                <View style={{marginHorizontal:20,marginTop:20}}>
                    <Text style={styles.mainText}>OPEN 시간 설정하기</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:20, flexDirection:'row'}}>
                    <Text style={styles.timeStyle}>{openTime}</Text>
                        <Text style={{fontSize:25}}>:</Text>
                    <Text style={styles.timeStyle}>{openMinute}</Text>
                </View>
                <View style={styles.subContaer}>
                    <Text style={styles.subText}>시간 버튼</Text>
                    <Text style={styles.subText}>분 버튼</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:20,justifyContent:'space-around',marginTop:30}}>
                    <View>
                        <TouchableOpacity style={styles.upBtn} onPress={upTbtn}>
                            <Text style={styles.upbownText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.downBtn} onPress={downTbtn}>
                            <Text style={styles.upbownText}>-</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.upBtn} onPress={upMbtn}>
                            <Text style={styles.upbownText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.downBtn} onPress={downMbtn}>
                            <Text style={styles.upbownText}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity style={[styles.okayBtn,{backgroundColor: isBtn ? '#7D74E4' : '#333' }]}
                    disabled={!isBtn} onPress={okay}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>예약 하기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    rTime: {
        color: '#000',
        fontSize: 18
    },
    dbtn: {
        width:50,
        height:30,
        backgroundColor:'#7D74E4',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    setTime: {
        marginHorizontal:20,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    mainText: {
        color:'#868e96',
        fontSize:16,
        fontWeight:'700'
    },
    timeStyle: {
        width: 40,
        height: 45,
        borderWidth:3,
        borderColor:'#7D74E4',
        borderRadius:10,
        fontSize:16,
        textAlign:'center',
        margin:20,
        textAlignVertical:'center',
        lineHeight: 40
    },
    subContaer: {
        marginHorizontal:20,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        marginTop:20
    },
    subText: {
        color:'#868e96',
        fontSize:16,
        fontWeight:'700'
    },
    upBtn: {
        width:58,
        height:50,
        backgroundColor:'#7D74E4',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:3,
        borderColor:'#D3D3D3',
        borderTopStartRadius:10,
        borderTopEndRadius:10
    },
    downBtn: {
        width:58,
        height:50,
        backgroundColor:'#7D74E4',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:3,
        borderColor:'#D3D3D3',
        borderTopWidth:0,
        borderBottomStartRadius:10,
        borderBottomEndRadius:10
    },
    upbownText: {
        color:'#fff',
        fontSize:21,
        fontWeight:'700'
    },
    okayBtn: {
        width: 250,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 70,
        backgroundColor: '#7D74E4',
    }
});

export default Reservation