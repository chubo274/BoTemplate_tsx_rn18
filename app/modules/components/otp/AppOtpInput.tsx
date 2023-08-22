// import OTPInputView from '@twotalltotems/react-native-otp-input';
import {AppText} from 'components/text/AppText';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import {useCountDown} from 'shared/hooks/helper/useCountDown';
import {ITheme, useAppTheme} from 'shared/theme';
import { AppOTPInputFull } from './AppOtpInputFull';

// export type KeyOtp = 'SignIn' | 'SignUp' | 'Forgot' | 'ProfilePhoneVerify'

interface IProps {
    styleContainer?: StyleProp<ViewStyle>;
    onCodeFilled?: (code: string) => void;
    onResend?: () => void;
    countResended?: number;
    limitedTimeResend?: number;
    expiresTime?: number;
    autoRun?: boolean;
    error?: string;
}

export const AppOtpInput = React.memo((props: IProps) => {
    const {
        styleContainer,
        onCodeFilled,
        onResend,
        countResended = 0,
        expiresTime,
        autoRun,
        limitedTimeResend = 5,
        error = '',
    } = props;
    const theme = useAppTheme();
    const styles = useStyles(theme);
    const {t} = useTranslation();
    const [code, setCode] = useState('');
    const {timeRemaining, isTimeRemaining, resetCount} = useCountDown(
        expiresTime,
        autoRun,
    );

    const _onResend = useCallback(() => {
        onResend?.();
        resetCount(expiresTime);
        setCode('');
    }, [onResend, resetCount, expiresTime]);

    const _onChangeCode = useCallback(
        (code: string) => {
            setCode(code);
            if (code.length == 6) {
                onCodeFilled?.(code);
                // Trick cannot delete after full otp code
                setTimeout(() => {
                    setCode('');
                }, 300);
                return;
            }
        },
        [onCodeFilled],
    );

    const renderText = useCallback(() => {
        if (isTimeRemaining)
            return (
                <AppText
                    style={[
                        styles.textResend,
                        {color: theme.color.textColor.disable},
                    ]}>
                    {t('resendOtp')}:{' '}
                    {
                        <AppText
                            style={[
                                styles.textResend,
                                {color: theme.color.brand.primary},
                            ]}>
                            {timeRemaining}s
                        </AppText>
                    }
                </AppText>
            );
        if (!isTimeRemaining && countResended >= limitedTimeResend)
            return (
                <AppText
                    style={[
                        styles.textResend,
                        {color: theme.color.function.error.primary},
                    ]}>
                    {t('outOfTurnResendOtp', {
                        number: `${limitedTimeResend}/${limitedTimeResend}`,
                    })}
                </AppText>
            );
        if (!isTimeRemaining && countResended < limitedTimeResend)
            return (
                <AppText
                    style={[
                        styles.textResend,
                        {color: theme.color.brand.secondary},
                    ]}>
                    {t('resendOtp')}!{' '}
                    {countResended > 1
                        ? `(${countResended}/${limitedTimeResend})`
                        : ''}
                </AppText>
            );
    }, [
        isTimeRemaining,
        timeRemaining,
        countResended,
        limitedTimeResend,
        styles,
        t,
        theme.color,
    ]);

    return (
        <View style={styleContainer}>
            <AppText style={styles.labelInput}>
                <AppText style={styles.requireFieldStyle}>*</AppText>{' '}
                {t('enterOtp')}
            </AppText>
            {/* <OTPInputView
                style={{width: '100%', height: 50}}
                pinCount={6}
                code={code}
                onCodeChanged={_onChangeCode}
                autoFocusOnLoad={true}
                codeInputFieldStyle={styles.viewInputBase}
                codeInputHighlightStyle={styles.viewInputFocus}
                clearInputs={!code}
            /> */}
            <AppOTPInputFull
                style={{width: '100%', height: 50}}
                pinCount={6}
                code={code}
                onCodeChanged={_onChangeCode}
                autoFocusOnLoad={true}
                codeInputFieldStyle={styles.viewInputBase}
                codeInputHighlightStyle={styles.viewInputFocus}
                clearInputs={code===''}
            />
            {error && <AppText style={styles.errorOtp}>{error}</AppText>}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={_onResend}
                disabled={isTimeRemaining || countResended >= limitedTimeResend}
                style={styles.viewResend}>
                {renderText()}
            </TouchableOpacity>
        </View>
    );
});

const useStyles = (theme: ITheme) =>
    StyleSheet.create({
        viewInputBase: {
            height: 48,
            width: 45,
            backgroundColor: theme.color.bg.input_p1,
            borderRadius: 8,
            borderColor: theme.color.bg.input_p1,
            color: theme.color.textColor.primary,
        },
        viewInputFocus: {
            borderColor: theme.color.brand.primary,
            borderRadius: 8,
        },
        labelInput: {
            marginBottom: 4,
            color: theme.color.textColor.secondary,
            fontSize: theme.fontSize.p11,
        },
        requireFieldStyle: {
            color: theme.color.function.error.primary,
            fontSize: theme.fontSize.p11,
        },
        viewResend: {
            marginTop: theme.dimensions.p24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textResend: {
            fontSize: theme.fontSize.p11,
            fontFamily: theme.font.Medium,
            textAlign: 'center',
        },
        errorOtp: {
            fontSize: theme.fontSize.p11,
            fontFamily: theme.font.Medium,
            color: theme.color.function.error.primary,
            textAlign: 'center',
            marginTop: theme.dimensions.p24,
        },
    });
