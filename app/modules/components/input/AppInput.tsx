import { AppText } from 'components/text/AppText';
import React, { ReactElement } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
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
    leftIcon?: ImageSourcePropType | ReactElement;
    rightIcon?: ImageSourcePropType | ReactElement;
    onPressIconLeft?: () => void
    onPressIconRight?: () => void
}

export const AppInput = React.memo(React.forwardRef((props: IAppInput, ref: React.ForwardedRef<TextInput | null>) => {
    const { value, label, containerStyle, inputStyle, inputContainerStyle, labelStyle, validateStyle, error,
        leftIcon, rightIcon, disabled = false, pointerEvents, onPressIconLeft, onPressIconRight } = props;
    // const refInput = useRef<TextInput>(null)

    const renderLeftContent = () => {
        if (!leftIcon) return;
        if (typeof leftIcon === 'number') {
            leftIcon as ImageSourcePropType;
            return <TouchableOpacity onPress={onPressIconLeft} disabled={!onPressIconLeft} activeOpacity={0.8}>
                <Image style={styles.leftIcon} source={leftIcon} />
            </TouchableOpacity>
        }
        return <>{leftIcon}</>;
    };

    const renderRightContent = () => {
        // const onClickClearInput = () => {
        //     refInput.current?.clear()
        // }
        // if (!rightIcon)
        //     return <TouchableOpacity onPress={onClickClearInput} activeOpacity={0.8}>
        //         <Text>x</Text>
        //     </TouchableOpacity>
        if (!rightIcon) return null
        if (typeof rightIcon === 'number') {
            rightIcon as ImageSourcePropType;
            return <TouchableOpacity onPress={onPressIconRight} disabled={!onPressIconRight} activeOpacity={0.8}>
                <Image style={styles.rightIcon} source={rightIcon} />
            </TouchableOpacity>
        }
        return <>{rightIcon}</>;
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
                <View style={{ flex: 1, justifyContent: 'center' }} pointerEvents={pointerEvents}>
                    <TextInput
                        {...props}
                        ref={ref}
                        autoCapitalize="none"
                        value={value?.toString()}
                        style={[
                            styles.defaultInputStyle,
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
}))

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
    defaultInputStyle: {
        // fontFamily: theme.font.Regular,
        // color: theme.color.textColor.primary,
        fontSize: theme.fontSize.p16,
        paddingVertical: 0,
        marginHorizontal: 0,
        marginBottom: 0,
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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