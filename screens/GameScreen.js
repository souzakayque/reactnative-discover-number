import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.useChoise);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

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
        setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses]);
    };

    // Solution 1
    // if (Dimensions.get('window').height > 600) {
    //     return (code);
    // }

    // Solution 2
    // let listContainerStyle = styles.listContainer;
    // if(Dimensions.get('window').width < 350) {
    //     listContainerStyle = styles.listContainerBig;
    // }

    return (
        <View
            style={styles.screen}>
            <Text style={DefaultStyles.title}>
                Tentativa do robô
            </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            {/* <Card style={Dimensions.get('window').height > 600 ? styles.buttonContainer : styles.smallButtonContainer}> */}
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

            <View
                style={styles.listContainer}>
                {
                    /*
                    <ScrollView
                        contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                    */
                }
                <FlatList
                    key={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}>
                </FlatList>
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window') > 500 ? '60%' : '80%',
    },

    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#CCC',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});

export default GameScreen;