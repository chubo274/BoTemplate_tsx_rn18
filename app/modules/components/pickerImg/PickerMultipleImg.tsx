import { AppModal } from 'components/modalize/AppModal';
import { AppText } from 'components/text/AppText';
import { Camera, Upload } from 'phosphor-react-native';
import React, { ReactNode, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePicker, { Image as IImage } from 'react-native-image-crop-picker';
import { Modalize } from 'react-native-modalize';
import { ChooseImg } from 'shared/helpers/constant';
import { ITheme, useAppTheme } from 'shared/theme';
interface IPickerMultipleImg {
    assetArray?: (arrayImage: Array<IImage>) => void;
    children?: ReactNode
    onPress?: () => void
}
const PickerMultipleImg = React.memo((props: IPickerMultipleImg) => {
    // !State
    const { assetArray = () => null, children, onPress } = props;
    const theme = useAppTheme();
    const styles = useStyles(theme);
    const modalRef = useRef<Modalize>();
    const { t } = useTranslation();

    // !Function
    const openModal = () => {
        modalRef.current?.open();
    };

    const handleItem = useCallback((type: string) => {
        if (type === ChooseImg.TakePhoto) {
            ImagePicker.openCamera({
                multiple: false,
                mediaType: 'photo',
            }).then(img => {
                if (Array.isArray(img)) {
                    assetArray([...img]);
                } else {
                    assetArray([img]);
                }
                modalRef.current?.close();
            });
        } else {
            ImagePicker.openPicker({
                multiple: true,
                compressImageQuality: Platform.OS == 'ios' ? 0.99 : 1,
                cropping: false,
                mediaType: 'photo',
            }).then(image => {
                assetArray([...image]);
                modalRef.current?.close();
            });
        }
    }, [assetArray]);
    const renderItem = (icon: any, text: string, type: string) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleItem(type)} >
                <View style={styles.itemWrapper}>
                    {icon}
                    <AppText style={styles.textImage}>{text}</AppText>
                </View>
                <View style={styles.underline} />
            </TouchableOpacity>
        )
    }

    // !Render
    return (
        <>
            <TouchableOpacity onPress={() => { openModal(), onPress?.() }}>{children}</TouchableOpacity>
            <AppModal
                refModal={modalRef}
                titleHeader={t('selection')}
                adjustToContentHeight
                childrenStyle={{paddingBottom: theme.dimensions.p40}}
            >
                {renderItem(<Camera size={16} weight="bold" color={theme.color.brand.primary} />, t('takePhoto'), 'takePhoto')}
                {renderItem(<Upload size={16} weight="bold" color={theme.color.brand.primary} />, t('takeLibrary'), 'takeLibrary')}
            </AppModal>
        </>
    );
});
const useStyles = (theme: ITheme) => StyleSheet.create({
    underline: {
        borderBottomWidth: 1,
        borderColor: theme.color.line.divider,
        position: 'absolute',
        bottom: 0,
        left: theme.dimensions.p12,
        right: theme.dimensions.p12,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.dimensions.p16,
        marginTop: theme.dimensions.p12
    },
    textImage: {
        color: theme.color.textColor.primary,
        fontSize: theme.fontSize.p15,
        fontFamily: theme.font.Medium,
        marginLeft: theme.dimensions.p12
    }
})
export default PickerMultipleImg;
