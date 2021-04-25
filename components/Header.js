import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import Colors from '../constants/colors'
import TitleText from './TitleText';

const Header = props => {
    return (
        <View
            style={
                {
                    ...styles.headerBase,
                    ...Platform.select({
                        ios: styles.headerIOS,
                        android: styles.headerAndroid
                    })
                }}>
            <TitleText style={styles.title}>
                {props.title}
            </TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        borderBottomColor: Platform.OS === 'ios' ? '#CCC' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
    },
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    title: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white'
    }
});

export default Header;