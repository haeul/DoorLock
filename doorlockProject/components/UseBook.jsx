//이용백서
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
    Linking 
} from 'react-native';

function UseBook(){

    const handleLinkPress = () => {
        const url = 'http://www.naver.com'; // 무적 링크 노션으로 만들기....
        Linking.openURL(url);
    };

    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.containerText}>이용백서</Text>
                </View>
                <View style={styles.pageContiner}>
                    <View>
                        <Text style={{fontSize:16,color:'#000'}}>무적 이용백서 홈페이지 접속하기</Text>
                        <TouchableOpacity onPress={handleLinkPress}>
                            <Text style={{ color: 'blue' }}>www.naver.com</Text>
                        </TouchableOpacity>
                    </View>
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
    pageContiner: {
        marginHorizontal:20,
        height:450,
        flexDirection:'row',
        alignItems:'center'
    }
});

export default UseBook