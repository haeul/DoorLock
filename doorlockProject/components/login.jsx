//로그인 페이지
import {useState} from 'react';
import axios from 'axios';
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
import {TextInput} from 'react-native-gesture-handler';
import {useAuth} from '../contexts/AuthContext';
function Login({navigation}) {
  // idText useState 사용하던 거 지우고 contexts애서 갖고옴
  const {setLoginCheck, idText, setIdText} = useAuth();

  const serverUrl =
    'https://port-0-door-lock-server-jvpb2alnwnfxkw.sel5.cloudtype.app'; // 서버 url

  const handleLogin = () => {
    // POST 요청에 보낼 데이터
    const postData = {
      userId: idText,
      userPw: pwText,
    };

    // POST 요청 보내기
    axios
      .post(`${serverUrl}/login`, postData)
      .then(response => {
        // 성공적으로 응답을 받았을 때 처리
        console.log('서버 응답:', response.data);
        navigation.navigate('main');
        console.log(idText);
        setLoginCheck(true);
        // 사용자 이름을 메인 페이지로 전달
      })
      .catch(error => {
        // 오류가 발생했을 때 처리
        console.error('오류:', error);
      });
  };

  const [pwText, setPwText] = useState('');

  const handleIdChange = newId => {
    setIdText(newId);
  };
  const handlePwChange = newPw => {
    setPwText(newPw);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.logingLogo}>
          <Text>로고</Text>
        </View>
        <View style={styles.idpwContainer}>
          <TextInput
            style={[
              styles.inputStyle,
              Platform.OS === 'ios' ? styles.iosInput : styles.androidInput,
            ]}
            placeholder="아이디를 입력해주세요."
            onChangeText={handleIdChange}
            value={idText}
          />
          <TextInput
            style={[
              styles.inputStyle,
              Platform.OS === 'ios' ? styles.iosInput : styles.androidInput,
            ]}
            placeholder="비밀번호를 입력해주세요."
            onChangeText={handlePwChange}
            value={pwText}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.loginBtn}>
          <TouchableOpacity style={styles.btnLo} onPress={handleLogin}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLo}
            onPress={() => navigation.navigate('join')}>
            <Text style={styles.btnText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logingLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  idpwContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    width: 230,
    height: 30,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 16,
    fontSize: 14,
    padding: 3,
    borderRadius: 5,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  btnLo: {
    margin: 10,
    width: 100,
    height: 30,
    backgroundColor: '#7D74E4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Login;
