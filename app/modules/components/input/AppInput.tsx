import { AppText } from 'components/text/AppText';
import React, { ReactElement } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import theme from 'shared/theme';

interface IAppInput extends TextInputProps {
    value: string;
    pointerEvents?: 'none' | 'box-none' | 'box-only' | 'auto' | undefined;
    disabled?: boolean;
    label?: string | ReactElement;
    error?: boolean | string;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    validateStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    leftIcon?: ImageSourcePropType;
    rightIcon?: ImageSourcePropType;
}

export const AppInput = (props: IAppInput) => {
    const { value, label, containerStyle, inputStyle, inputContainerStyle, labelStyle, validateStyle, error, leftIcon, rightIcon, disabled = false, pointerEvents } = props;

    const renderLeftContent = () => {
        if (!leftIcon) return;
        return <Image style={styles.leftIcon} source={leftIcon} />
    };
    const renderRightContent = () => {
        if (!rightIcon) return;
        return <Image style={styles.rightIcon} source={rightIcon} />;
    };

    return (
        <View style={[styles.defaultContainer, containerStyle]}>
            {label ? (
                <AppText style={[styles.labelInput, labelStyle]}>
                    {label}
                </AppText>
            ) : null}
            <View
                style={[
                    styles.inputWrapper,
                    inputContainerStyle,
                    error ? { borderColor: '#EA4335', borderWidth: 1 } : null,
                ]}
            >
                {renderLeftContent()}
                <View style={{ flex: 1 }} pointerEvents={pointerEvents}>
                    <TextInput
                        {...props}
                        autoCapitalize="none"
                        value={value?.toString()}
                        style={[
                            {
                                fontSize: theme.fontSize.p16,
                            },
                            inputStyle,
                            disabled ? { color: theme.color.gray88 } : null,
                        ]}
                        placeholderTextColor={props.placeholderTextColor || theme.color.grey11}
                    />
                </View>
                {renderRightContent()}
            </View>
            {error && (
                <AppText style={[styles.defaultValidate, validateStyle]}>{error}</AppText>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    defaultContainer: {
        width: '100%',
        paddingHorizontal: theme.dimensions.p12,
        paddingVertical: theme.dimensions.p12,
        borderWidth: 1,
    },
    defaultValidate: {

    },
    labelInput: {
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftIcon: {
        width: theme.dimensions.makeResponsiveSize(16),
        height: theme.dimensions.makeResponsiveSize(16),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.dimensions.makeResponsiveSize(6),
    },
    rightIcon: {
        width: theme.dimensions.makeResponsiveSize(16),
        height: theme.dimensions.makeResponsiveSize(16),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.dimensions.makeResponsiveSize(6),
    },
});