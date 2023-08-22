import Clipboard from '@react-native-community/clipboard';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    I18nManager,
    Platform,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import {codeToArray} from 'shared/helpers/function';
import {useAppTheme} from 'shared/theme';

interface IProps {
    code: string;
    autoFocusOnLoad?: boolean;
    clearInputs?: boolean;
    pinCount: number;
    onCodeFilled?: (code: string) => void;
    onCodeChanged?: (code: string) => void;
    style?: ViewStyle;
    codeInputFieldStyle?: ViewStyle;
    codeInputHighlightStyle?: ViewStyle;
    secureTextEntry?: boolean;
    selectionColor?: string;
}

export const AppOTPInputFull = (props: IProps) => {
    const {
        code,
        autoFocusOnLoad,
        pinCount,
        onCodeFilled,
        onCodeChanged,
        clearInputs,
        secureTextEntry,
        style,
        codeInputFieldStyle,
        codeInputHighlightStyle,
        selectionColor,
    } = props;

    const [digits, setDigits] = useState(codeToArray(code));
    const [selectedIndex, setSelectedIndex] = useState(
        autoFocusOnLoad ? 0 : -1,
    );
    const theme = useAppTheme();
    const [colorTxt, setColorTxt] = useState(theme.color.bg.input_p1);
    const refField = useRef<any>([]);
    const refhasCheckedClipBoard = useRef<boolean>(false);
    const refClipBoardCode = useRef<string>('');

    const copyCodeFromClipBoardOnAndroid = () => {
        if (Platform.OS === 'android') {
            checkPinCodeFromClipBoard();
        }
    };

    const focusField = useCallback(
        (index: number) => {
            if (index < refField.current.length) {
                // refField.current[index]?.focus();
                setTimeout(() => {
                    refField?.current[index]?.focus();
                }, 100);

                setSelectedIndex(index);
                if (index === 0) {
                    setColorTxt(theme.color.bg.input_p1);
                }
            }
        },
        [theme.color.bg.input_p1],
    );

    const bringUpKeyBoardIfNeeded = useCallback(() => {
        try {
            const digitCurrent = digits;
            const focusIndex = digitCurrent.length
                ? digitCurrent.length - 1
                : 0;
            if (focusIndex < pinCount && autoFocusOnLoad) {
                focusField(focusIndex);
            }
        } catch (error: any) {
        } finally {
        }
    }, [autoFocusOnLoad, digits, focusField, pinCount]);

    const checkPinCodeFromClipBoard = () => {
        const regexp = new RegExp(`^\\d{${pinCount}}$`);
        Clipboard.getString()
            .then(code => {
                if (
                    refhasCheckedClipBoard.current &&
                    regexp.test(code) &&
                    refClipBoardCode.current !== code
                ) {
                    setDigits(code.split(''));
                    blurAllFields();
                    onCodeFilled && onCodeFilled(code);
                    onCodeChanged && onCodeChanged(code);
                }
                refClipBoardCode.current = code;
                refhasCheckedClipBoard.current = true;
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(err => {});
    };

    const handleChangeText = (index: number, text: string) => {
        const digitsCurrent = digits;
        let newdigits = digitsCurrent.slice();
        const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
        const newTextLength = text.length;
        if (newTextLength - oldTextLength === pinCount) {
            // user pasted text in.
            newdigits = text.split('').slice(oldTextLength, newTextLength);
            setDigits(newdigits);
            if (onCodeChanged) {
                onCodeChanged(newdigits.join(''));
            }
        } else {
            if (text.length === 0) {
                if (newdigits.length > 0) {
                    newdigits = newdigits.slice(0, newdigits.length - 1);
                }
            } else {
                text.split('').forEach(value => {
                    if (index < pinCount) {
                        newdigits[index] = value;
                        index += 1;
                    }
                });
                index -= 1;
            }
            setDigits(newdigits);
            if (onCodeChanged) {
                onCodeChanged(newdigits.join(''));
            }
        }
        const result = newdigits.join('');
        if (result.length >= pinCount) {
            onCodeFilled && onCodeFilled(result);
            focusField(pinCount - 1);
            blurAllFields();
        } else {
            if (text.length > 0 && index < pinCount - 1) {
                focusField(index + 1);
            }
        }
    };

    const blurAllFields = () => {
        refField.current.forEach((field: any) => field?.blur());
        setSelectedIndex(-1);
    };

    useEffect(() => {
        if (clearInputs && code === '') {
            setDigits([]);
            setSelectedIndex(0);
            setColorTxt(theme.color.bg.input_p1);
            focusField(0)
        }
    }, [code, clearInputs, theme.color.bg.input_p1, focusField]);

    const clearAllFields = useCallback(() => {
        if (clearInputs && code === '') {
            setDigits([]);
            setSelectedIndex(0);
            setColorTxt(theme.color.bg.input_p1);
        }
    }, [clearInputs, code, theme.color.bg.input_p1]);

    const handleKeyPressTextInput = (index: number, key: string) => {
        const digitsCurrent = digits;
        if (key === 'Backspace') {
            if (!digitsCurrent[index] && index > 0) {
                handleChangeText(index - 1, '');
                focusField(index - 1);
            }
        }
    };

    const renderTextFields = () => {
        const array = new Array(pinCount).fill(0);
        return array.map((val, index) => {
            return (
                <View
                    pointerEvents="none"
                    key={index + 'view'}
                    testID="inputSlotView">
                    <TextInput
                        testID="textInput"
                        underlineColorAndroid="rgba(0,0,0,0)"
                        style={
                            selectedIndex === index
                                ? [
                                    styles.defaultTextFieldStyle,
                                    codeInputFieldStyle,
                                    codeInputHighlightStyle,
                                    {color: colorTxt},
                                ]
                                : [
                                    styles.defaultTextFieldStyle,
                                    codeInputFieldStyle,
                                    {color: colorTxt},
                                ]
                        }
                        ref={ref => {
                            refField.current[index] = ref;
                        }}
                        onChangeText={text => {
                            handleChangeText(index, text);
                        }}
                        onKeyPress={({nativeEvent: {key}}) => {
                            handleKeyPressTextInput(index, key);
                        }}
                        value={!clearInputs ? digits[index] : ''}
                        keyboardAppearance={'default'}
                        keyboardType={'number-pad'}
                        // textContentType={'oneTimeCode'}
                        key={index}
                        selectionColor={selectionColor}
                        secureTextEntry={secureTextEntry}
                        editable={true}
                        placeholder={''}
                    />
                </View>
            );
        });
    };

    useEffect(() => {
        copyCodeFromClipBoardOnAndroid();
        bringUpKeyBoardIfNeeded();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (code && codeToArray(code) !== digits) {
            setDigits(codeToArray(code));
            if (code.length === 0) {
                setColorTxt(theme.color.bg.input_p1);
            } else {
                if (colorTxt !== '#000000') {
                    setTimeout(
                        () => {
                            setColorTxt('#000000');
                        },
                        code.length === 6 ? 200 : 0,
                    );
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);

    return (
        <View testID="OTPInputView" style={style}>
            <TouchableWithoutFeedback
                style={{width: '100%', height: '100%'}}
                onPress={() => {
                    if (!clearInputs) {
                        const filledPinCount = digits.filter(
                            (digit: string) => {
                                return digit !== null && digit !== undefined;
                            },
                        ).length;
                        focusField(Math.min(filledPinCount, pinCount - 1));
                    } else {
                        clearAllFields();
                        focusField(0);
                    }
                }}>
                <View
                    style={{
                        flexDirection: I18nManager.isRTL
                            ? 'row-reverse'
                            : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}>
                    {renderTextFields()}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    defaultTextFieldStyle: {
        width: 45,
        height: 45,
        borderColor: 'rgba(226, 226, 226, 1)',
        borderWidth: 1,
        borderRadius: 2,
        textAlign: 'center',
        color: 'white',
    },
});
