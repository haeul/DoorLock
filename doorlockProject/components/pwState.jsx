// 현관 비밀번호 설정 및 관리
import {faL} from '@fortawesome/free-solid-svg-icons';
import React, {useState, useEffect, useRef} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

function PwState({navigation}) {
  const [mypw, setMypw] = useState('');
  const [newpw, setNewpw] = useState('');
  const [btnhiden, setBtnhiden] = useState(false);

  //   webSocket
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket(
      `ws://port-0-door-lock-server-jvpb2alnwnfxkw.sel5.cloudtype.app`,
    );
    ws.current.onopen = () => {
      // connection opened
      console.log('connected');
      // send a message
    };

    ws.current.onmessage = e => {
      // a message was received
      console.log(e.data);
    };

    ws.current.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    ws.current.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleMypwchange = value => {
    setMypw(value);
  };

  const handleNewpwchange = value => {
    setNewpw(value);
  };

  const btnOnOff = () => {
    // if(btnhiden === false){
    //     setBtnhiden(btnhiden === true);
    // } else{
    //     setBtnhiden(btnhiden === false);
    // }
    setBtnhiden(!btnhiden);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.containerText}>도어락 비밀번호 관리 및 설정</Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <TextInput
            style={styles.inputBox}
            placeholder="현재 비밀번호을 설정해주세요."
            onChangeText={handleMypwchange}
            value={mypw}
          />
          <Text style={styles.subText}>현재 비밀번호를 설정해주세요.</Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <TouchableOpacity style={styles.btnstyle} onPress={btnOnOff}>
            <Text style={{fontSize: 16, color: '#fff'}}>재설정</Text>
          </TouchableOpacity>
        </View>
        {btnhiden ? (
          <View style={{marginHorizontal: 20}}>
            <TextInput
              style={[styles.inputBox, {marginTop: 10}]}
              placeholder="재설정할 비밀번호를 입력해주세요."
              onChangeText={handleNewpwchange}
              value={newpw}
            />
            <Text style={styles.subText}>재설정 해주세요.</Text>
          </View>
        ) : (
          ''
        )}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.okayBtn}
            onPress={() => {
              ws.current.send(`pwChange-${newpw}`);
              Alert.alert('비밀번호 변경 완료~');
              navigation.navigate('main');
            }}>
            <Text style={{color: '#fff', fontSize: 16}}>확인</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    fontSize: 14,
    padding: 3,
    borderRadius: 5,
    marginTop: 45,
  },
  subText: {
    fontSize: 9,
    color: 'gray',
    marginTop: 3,
  },
  btnstyle: {
    width: 100,
    height: 30,
    backgroundColor: '#7D74E4',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  okayBtn: {
    width: 250,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 100,
    backgroundColor: '#7D74E4',
  },
});

export default PwState;
