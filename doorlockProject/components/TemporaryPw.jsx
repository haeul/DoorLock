//임시 비밀번호
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
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function TemporaryPw(){

    const [newPw,setNewPw] = useState('');
    const [newRpw,setNewRpw] = useState('');
    const [updonwText,setUpDonwText] = useState(0);
    const [timeing,setTimeing] = useState(0);
    const [deleteh,setDeleteh] = useState(false);

    const isBtn = newPw !== '' && newRpw !== '' && newPw === newRpw && updonwText >= 1;

    const upBtn = () => {
        if(updonwText < 24){
            setUpDonwText(updonwText + 1);
        }
    }

    const downBtn = () => {
        if (updonwText > 0) {
            setUpDonwText(updonwText - 1);
        }
    }

    const handleNewPwChange = (value) => {
        setNewPw(value);
    }

    const handelNewRpwChange = (value) => {
        setNewRpw(value);
    }

    const deleteTime = () => {
        setTimeing(0); // timeing 상태를 초기화
        setUpDonwText(0); // 시간 입력 상태를 초기화
    }

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.containerText}>임시 비밀번호</Text>
                </View>
                <View style={styles.pwContainer}>
                    <TextInput 
                    style={styles.inputBox}
                    placeholder={'임시 비밀번호를 설정 해주세요.'}
                    onChangeText={handleNewPwChange}
                    value={newPw}
                    secureTextEntry={true}
                    />
                    <Text style={styles.pwText}>도어락 임시비밀번호를 설정해주세요.</Text>
                </View>
                <View style={styles.pwContainer}>
                    <TextInput 
                    style={styles.inputBox}
                    placeholder={'비밀번호 확인을 위해 다시 입력해주세요.'}
                    onChangeText={handelNewRpwChange}
                    value={newRpw}
                    secureTextEntry={true}
                    />
                    <Text style={styles.pwText}>비밀번호 확인을 위해 재입력해주세요.</Text>
                </View>
                <View style={[styles.pwContainer,{marginTop:20}]}>
                    <Text style={styles.timeText}>임시 비밀번호 시간 설정</Text>
                </View>
                <View style={[styles.pwContainer,{marginTop:10,flexDirection:'row'}]}>
                    <Text> {updonwText} 시간</Text>
                    <TouchableOpacity style={styles.updownBtn} onPress={upBtn}>
                        <Text style={styles.updownText}>UP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.updownBtn} onPress={downBtn}>
                        <Text style={styles.updownText}>DOWN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.haveTime}>
                    <View>
                        <Text style={styles.timeText}>남은 시간</Text>
                        <Text style={styles.hText}>{timeing} 시간</Text>
                    </View>
                    <TouchableOpacity style={styles.updownBtn} onPress={deleteTime}>
                        <Text style={styles.updownText}>삭제</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.okayBtnContainer}>
                    <TouchableOpacity style={[styles.okayBtn,{backgroundColor: isBtn ? '#7D74E4' : '#333' }]}
                    disabled={!isBtn}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>설정하기</Text>
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
    inputBox: {
        width: 250,
        height: 35,
        borderColor: '#7D74E4',
        borderWidth: 2,
        paddingHorizontal: 8,
        marginTop: 16,
        fontSize: 12,
        padding: 3,
        borderRadius: 5,
        marginTop: 45,
    },
    pwContainer: {
        marginHorizontal: 20
    },
    pwText: {
        fontSize:10,
        color: '#000',
        fontWeight:'700',
        marginTop:5
    },
    timeText: {
        color:'#7D74E4',
        fontSize:16,
        fontWeight:'800'
    },
    updownBtn: {
        width:50,
        height:20,
        backgroundColor:'#7D74E4',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginLeft:15
    },
    updownText: {
        fontSize:10,
        fontWeight:'800',
        color:'#fff'
    },
    okayBtnContainer: {
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20%',
        marginBottom:'20%'
    },
    okayBtn: {
        width: 250,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 50,
        backgroundColor:'#000'
    },
    haveTime: {
        marginHorizontal:20,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    hText: {
        marginTop:10,
        fontSize:16
    }
})

export default TemporaryPw