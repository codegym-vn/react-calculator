import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ButtonCalculator from './ButtonCalculator'

export const buttonTitles = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+'],
    ['c', 'ce']
];

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            selectedSymbol: null,
            previousInputValue: 0,
        }
    }

    handleButton(input) {
        switch (typeof input) {
            case 'number':
                let value = (this.state.value * 10) + input;
                this.setState({value});
            default:
                return this.handleStringInput(input);
        }
    }

    handleStringInput(input) {
        switch (input) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: input,
                    previousInputValue: this.state.value,
                    value: 0
                });
                break;
            case '=':
                let symbol = this.state.selectedSymbol,
                    value = this.state.value,
                    previousInputValue = this.state.previousInputValue;

                if (!symbol) {
                    return;
                }
                this.setState({
                    previousInputValue: 0,
                    value: eval(previousInputValue + symbol + value),
                    selectedSymbol: null
                });
                break;
            case 'ce':
                this.setState({previousInputValue: 0, value: 0, selectedSymbol: null});
                break;

            case 'c':
                this.setState({value: 0});
                break;
        }
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.displayContainer}>
                    <Text style={styles.displayText}>{this.state.value}</Text>
                </View>
                <View style={styles.inputContainer}>
                    {buttonTitles.map((values, index) => {
                        return (
                            <View style={styles.inputRow} key={index}>
                                {values.map((value, idx) => {
                                    return (
                                        <ButtonCalculator
                                            value={value}
                                            key={idx}
                                            onPress={this.handleButton.bind(this, value)}
                                            highlight={this.state.selectedSymbol === value}
                                        />
                                    )
                                })}
                            </View>
                        );
                    })

                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center'
    },
    displayText: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },
    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    },
    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }
});
