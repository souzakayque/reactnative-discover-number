import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
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
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
    },
    highlight: {
        color: Colors.primary,
        fontWeight: 'bold',
    }
});

export default GameOverScreen;