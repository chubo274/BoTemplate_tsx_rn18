import ImageSource from 'app/assets/images';
import { IUploadImageFile } from 'app/models/parent/IUploadAvaModel';
import { RenderImage } from 'components/image/RenderImage';
import { AppModal } from 'components/modalize/AppModal';
import { CaretLeft } from 'phosphor-react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Modalize } from 'react-native-modalize';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { ITheme, useAppTheme } from 'shared/theme';


interface ITakePhotoUpload {
    selectImage?: (path: string, appendBody: IUploadImageFile) => void;
    onPress?: () => void
    children?: any
}
const TakePhotoUpload = React.memo((props: ITakePhotoUpload) => {
    // !State
    const { children, onPress, selectImage } = props;
    const theme = useAppTheme();
    const styles = useStyles(theme);
    const { t } = useTranslation()
    const modalRef = useRef<Modalize>();
    // CAMERA
    const devices = useCameraDevices();
    const device = devices.front
    const cameraRef = useRef<Camera>(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [cameraType, setCameraType] = useState(device);
    const refRawSizeImg = useRef<{ height: number, width: number }>({ height: 600, width: 800 });

    const redirectSetting = useCallback(() => {
        return Alert.alert(t('noPermissionCamera'), '', [
            { text: t('gotoSetting'), onPress: () => Linking.openSettings() },
        ])
    }, [t])

    // !Function
    const toggleCamera = useCallback(() => {
        setCameraType(
            cameraType === device
                ? devices?.back
                : device
        );
    }, [cameraType, device, devices?.back])

    const renderCamera = useMemo(() => {
        if (devices == null) {
            return <View style={{ flex: 1 }} />
        } else {
            if (modalIsOpen) {
                return <Camera
                    style={{ flex: 1 }}
                    device={cameraType || device}
                    isActive={true}
                    enableZoomGesture
                    ref={cameraRef}
                    photo={true}
                    captureGroup='captured'
                />
            } else {
                return <View style={{ flex: 1 }} />
            }
        }
    }, [cameraType, device, devices, modalIsOpen])

    const cleanImagePickerCrop = useCallback(() => {
        ImagePicker.clean().then(() => {
            // console.log('removed all tmp images from tmp directory');
        }).catch(e => {
            // alert(e);
        });
    }, [])

    const cropPicker = useCallback((photo: any) => {
        const pathByPlatform = Platform.select({
            ios: photo?.path,
            android: `file://${photo?.path}`
        })
        if (photo) {
            ImagePicker.openCropper({
                path: pathByPlatform,
                compressImageQuality: Platform.OS == 'ios' ? 0.99 : 1,
                cropping: true,
                mediaType: 'photo',
                cropperCircleOverlay: true,
                hideBottomControls: false,
                cropperCancelText: t('cancel'),
                cropperChooseText: 'OK',
                cropperRotateButtonsHidden: true,
                showsSelectedCount: false,
                cropperToolbarTitle: t('noteZoomImage'),
                forceJpg: false,
                height: refRawSizeImg.current.height,
                width: refRawSizeImg.current.width,
            }).then(image => {
                selectImage?.(image?.path, { uri: image?.path ?? '', type: image?.mime, name: 'name' });
            }).catch(e => {
                // console.log('cropPicker = useCallback((photo: any)', e);
            }).finally(async () => {
                Platform.OS == 'android' && await cleanImagePickerCrop()
            })
        }
    }, [selectImage, t, cleanImagePickerCrop])

    const takePhoto = useCallback(async () => {
        try {
            if (cameraRef?.current === null) {
                throw new Error('Camera Ref is Null!')
            }
            if (cameraRef?.current) {
                const photo = await cameraRef.current.takePhoto({
                    flash: 'auto',
                    skipMetadata: true,
                });
                refRawSizeImg.current.height = photo?.height || 600
                refRawSizeImg.current.width = photo?.width || 800
                modalRef.current?.close()
                setModalIsOpen(false)
                // selectImage?.(photo?.path, { uri: photo?.path ?? '', type: photo?.mime, name: 'name' });
                cropPicker(photo)
            }
        } catch (error) {
            // console.log(error)
        }
    }, [cropPicker])

    const PLATFORM_PERMISSIONS = useMemo(() => Platform.select<typeof PERMISSIONS.ANDROID | typeof PERMISSIONS.IOS>({
        android: PERMISSIONS.ANDROID,
        ios: PERMISSIONS.IOS,
        default: PERMISSIONS.IOS,
    }), []);

    const checkCameraPermission = useCallback(async () => {
        try {
            const result = await check(PLATFORM_PERMISSIONS.CAMERA);
            switch (result) {
                case RESULTS.GRANTED:
                    modalRef.current?.open();
                    break;
                case RESULTS.DENIED:
                    const requestStatus = await request(PLATFORM_PERMISSIONS.CAMERA);
                    switch (requestStatus) {
                        case RESULTS.BLOCKED:
                            redirectSetting()
                            break;
                        case RESULTS.GRANTED:
                            modalRef.current?.open();
                            break;
                        default:
                            redirectSetting()
                            break;
                    }
                    break;
                case RESULTS.BLOCKED:
                    redirectSetting()
                    break;
            }
        } catch (error) {
            redirectSetting()
        }
    }, [PLATFORM_PERMISSIONS.CAMERA, redirectSetting]);

    const openModal = useCallback(async () => {
        await checkCameraPermission();
    }, [checkCameraPermission]);


    const handleSelectImage = useCallback(async () => {
        ImagePicker.openPicker({
            multiple: false,
            compressImageQuality: Platform.OS == 'ios' ? 0.99 : 1,
            cropping: false,
            mediaType: 'photo',
        }).then((image) => {
            modalRef.current?.close()
            cropPicker(image)
        });
    }, [cropPicker])

    const renderSafeview = useMemo(() => {
        return <SafeAreaView style={styles.safeViewContainer} >
            <StatusBar barStyle={'light-content'} />
            <View style={{ flex: 1, position: 'relative' }} >
                <TouchableOpacity onPress={() => modalRef.current?.close()} activeOpacity={1} style={styles.safeViewHeader}>
                    <CaretLeft size={16} weight="bold" color={theme.color.textColor.white} />
                </TouchableOpacity>
                {renderCamera}
                <View style={styles.safeViewFooter}>
                    <TouchableOpacity onPress={handleSelectImage} activeOpacity={0.8} >
                        <RenderImage source={ImageSource.img_group_camera} style={styles.imgGroupCam} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePhoto} activeOpacity={0.8} style={styles.cam} >
                        <View style={styles.viewCam}></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={toggleCamera} >
                        <RenderImage style={styles.imgGroupCam} source={ImageSource.ic_flip_camera} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    }, [styles.safeViewContainer, styles.safeViewHeader, styles.safeViewFooter, styles.imgGroupCam, styles.cam, styles.viewCam, theme.color.textColor.white, renderCamera, handleSelectImage, takePhoto, toggleCamera])

    // !Effect
    // useEffect(() => {
    //     const getCameraPermission = async () => {
    //         const cameraPermission = await Camera.getCameraPermissionStatus();
    //         if (cameraPermission === 'not-determined') {
    //             await Camera.requestCameraPermission();
    //         }
    //     }
    //     getCameraPermission();
    // }, [])

    // !Render
    return (
        <>
            <TouchableOpacity activeOpacity={1} onPress={() => { openModal(), onPress?.() }}>{children}</TouchableOpacity>
            <AppModal
                disableScroll
                hideViewHolder
                modalTopOffset={0}
                modalHeight={theme.dimensions.deviceHeight}
                refModal={modalRef}
                childrenStyle={styles.childrenStyle}
                scrollViewProps={{
                    scrollEnabled: false
                }}
                onOpened={() => setModalIsOpen(true)}
                onClosed={() => setModalIsOpen(false)}
            >
                {renderSafeview}
            </AppModal>
        </>
    );
});

const useStyles = (theme: ITheme) => StyleSheet.create({
    childrenStyle: {
        width: '100%',
        paddingHorizontal: 0,
        paddingBottom: 0,
    },
    safeViewContainer: {
        height: theme.dimensions.deviceHeight,
        backgroundColor: '#111111',
        flex: 1
    },
    safeViewHeader: {
        backgroundColor: '#111111',
        position: 'absolute',
        zIndex: theme.dimensions.makeResponsiveSize(99),
        top: 0,
        right: 0,
        left: 0,
        flexDirection: 'row',
        flex: 1,
        paddingLeft: theme.dimensions.p16,
        paddingTop: Platform.OS === 'ios' ? theme.dimensions.makeResponsiveSize(10) : theme.dimensions.p40,
        paddingBottom: theme.dimensions.p16
    },
    safeViewFooter: {
        backgroundColor: '#111111',
        position: 'absolute',
        zIndex: theme.dimensions.makeResponsiveSize(99),
        bottom: 0,
        right: 0,
        left: 0,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: theme.dimensions.makeResponsiveSize(21),
        paddingBottom: theme.dimensions.p12,
        paddingHorizontal: theme.dimensions.p16
    },
    imgGroupCam: { width: theme.dimensions.p24, height: theme.dimensions.makeResponsiveSize(28) },
    cam: {
        height: theme.dimensions.makeResponsiveSize(64),
        width: theme.dimensions.makeResponsiveSize(64),
        borderRadius: theme.dimensions.makeResponsiveSize(50),
        backgroundColor: theme.color.bg.white,
        padding: theme.dimensions.p4,
        justifyContent: 'center'
    },
    viewCam: {
        height: '100%',
        width: '100%',
        borderRadius: theme.dimensions.makeResponsiveSize(50),
        borderWidth: theme.dimensions.p2,
        borderColor: '#111111',
        backgroundColor: theme.color.bg.white
    }
})
export default TakePhotoUpload;
