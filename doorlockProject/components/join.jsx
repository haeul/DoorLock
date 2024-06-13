//회원가입 페이지
import React, { useState } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

function Join() {

  const serverUrl = 'https://port-0-door-lock-server-jvpb2alnwnfxkw.sel5.cloudtype.app'; // 서버 url

          const handleLogin = () => {
            console.log(id,pw,name,rpw);
        // POST 요청에 보낼 데이터
        const postData = {
          userId: id,
          userPw: pw,
          userNickname:name,
          correctPassword:rpw
        };
        // POST 요청 보내기
        axios.post(`${serverUrl}/signup`, postData)
        .then(response => {
          // 성공적으로 응답을 받았을 때 처리
          console.log('서버 응답:', response.data);
        })
        .catch(error => {
          // 오류가 발생했을 때 처리
          console.error('오류:', error);
        });
        };
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [rpw, setRpw] = useState('');

  const isButtonEnabled = name !== '' && id !== '' && pw !== '' && rpw !== '' && pw === rpw;

  const handleIdChange = (newid) => {
    setId(newid);
  };

  const handleNameChange = (newname) => {
    setName(newname);
  };

  const handlePwChange = (newpw) => {
    setPw(newpw);
  };

  const handlePwrChange = (newrpw) => {
    setRpw(newrpw);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.containerText}>회원가입</Text>
      </View>
      <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={styles.inputBox}
          placeholder={'닉네임'}
          onChangeText={handleNameChange}
          value={name}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'아이디'}
          onChangeText={handleIdChange}
          value={id}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'비밀번호'}
          onChangeText={handlePwChange}
          value={pw}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'비밀번호 확인'}
          onChangeText={handlePwrChange}
          value={rpw}
          secureTextEntry={true}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.okayBtn, { backgroundColor: isButtonEnabled ? '#7D74E4' : '#333' }]}
          disabled={!isButtonEnabled} onPress={handleLogin}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>가입하기</Text>
        </TouchableOpacity>
      </View>
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
  okayBtn: {
    width: 250,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
  },
});

export default Join;
