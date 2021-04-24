import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.useChoise));
    const [rounds, setRounds] = useState(0);

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(
                'Não minta',
                'Você sabe que está errado...',
                [
                    {
                        text: 'Desculpa!',
                        style: 'Cancelar'
                    }
                ]
            );
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };

    return (
        <View
            style={styles.screen}>
            <Text style={DefaultStyles.title}>
                Tentativa do robô
            </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card
                style={styles.buttonContainer}>

                <MainButton
                    onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons
                        name="md-remove"
                        size={24}
                        color="white" />
                </MainButton>

                <MainButton
                    onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons
                        name="md-add"
                        size={24}
                        color="white" />
                </MainButton>

            </Card>
        </View >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '90%'
    }
});

export default GameScreen;