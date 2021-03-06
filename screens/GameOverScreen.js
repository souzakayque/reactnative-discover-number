import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    if (availableDeviceHeight < 500) {
        return (
            <ScrollView>

                <View
                    style={styles.screen}>
                    <TitleText>
                        O jogo acabou!
                        </TitleText>
                    <View style={styles.imageContainerBig}>
                        <Image
                            fadeDuration={1000}
                            // source={require('../assets/success.png')}
                            source={{ uri: 'https://image.freepik.com/free-vector/you-win-neon-text-sign_118419-1005.jpg' }}
                            style={styles.image}
                            resizeMode="cover" />
                    </View>

                    <View style={styles.resultContainer}>
                        <BodyText
                            style={styles.resultTextBig}>
                            O robô precisou de{' '}
                            <Text
                                style={styles.highlight}>
                                {props.roundsNumber}
                            </Text>
                            {' '}tentativas para descobrir o número{' '}
                            <Text
                                style={styles.highlight}>
                                {props.userNumber}.
                                </Text>
                        </BodyText>
                    </View>

                    <MainButton
                        onPress={props.onRestart}>
                        NOVO JOGO
                </MainButton>

                </View>
            </ScrollView>
        );
    }


    return (
        <ScrollView>

            <View
                style={styles.screen}>
                <TitleText>
                    O jogo acabou!
                </TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        fadeDuration={1000}
                        // source={require('../assets/success.png')}
                        source={{ uri: 'https://image.freepik.com/free-vector/you-win-neon-text-sign_118419-1005.jpg' }}
                        style={styles.image}
                        resizeMode="cover" />
                </View>

                <View style={styles.resultContainer}>
                    <BodyText
                        style={styles.resultText}>
                        O robô precisou de{' '}
                        <Text
                            style={styles.highlight}>
                            {props.roundsNumber}
                        </Text>
                        {' '}tentativas para descobrir o número{' '}
                        <Text
                            style={styles.highlight}>
                            {props.userNumber}.
                    </Text>
                    </BodyText>
                </View>

                <MainButton
                    onPress={props.onRestart}>
                    NOVO JOGO
                </MainButton>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    imageContainerBig: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 490 ? 10 : 20,
    },
    resultTextBig: {
        textAlign: 'center',
        fontSize: 12,
    },
    highlight: {
        color: Colors.primary,
        fontWeight: 'bold',
    }
});

export default GameOverScreen;