import React, { MutableRefObject } from 'react';
import { Keyboard, StyleSheet, View, ViewStyle } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import theme from 'shared/theme';

export interface IAppModalProps extends ModalizeProps {
    refModal: MutableRefObject<Modalize | undefined>;
    isScroll?: boolean;
    childrenStyle?: ViewStyle;
}

export const AppModal = React.memo((props: IAppModalProps) => {
    const { refModal, isScroll, childrenStyle, children, HeaderComponent, ...rest } = props;

    return (
        <Portal>
            <Modalize
                ref={refModal}
                {...rest}
                scrollViewProps={{
                    keyboardShouldPersistTaps: 'handled',
                    scrollEnabled: isScroll,
                    // automaticallyAdjustKeyboardInsets: true,
                    showsVerticalScrollIndicator: false,
                }}
                onOverlayPress={() => Keyboard.dismiss()}
                withHandle={false}
                childrenStyle={[styles.childrenStyle, childrenStyle]}
                HeaderComponent={<>
                    <View style={styles.viewHolder} />
                    {HeaderComponent}
                </>}
            >
                {children}
            </Modalize>
        </Portal>
    );
});

const styles = StyleSheet.create({
    viewHolder: {
        backgroundColor: '#CACFDA',
        borderRadius: 3,
        height: 3,
        width: 40,
        alignSelf: 'center',
        marginTop: theme.dimensions.p12,
    },
    childrenStyle: {
        paddingVertical: theme.dimensions.p20,
        paddingHorizontal: theme.dimensions.p20,
    },
});
