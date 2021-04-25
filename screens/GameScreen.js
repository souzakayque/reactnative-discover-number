import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const renderListItem = (value, rounds) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{rounds}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.useChoise);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses]);
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

            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>

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
    },
    list: {
        flex: 1,
        width: '80%',
    },
    listItem: {
        borderColor: '#CCC',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

export default GameScreen;