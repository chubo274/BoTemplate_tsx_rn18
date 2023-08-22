import ImageSource from 'app/assets/images';
import { RenderImage } from 'components/image/RenderImage';
import React, { useCallback, useState } from 'react';
import { ImageSourcePropType, Platform, ViewStyle } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { ILatLongBus } from 'shared/hooks/firebaseRealTime/useRealTimeLatLg';
import { useAppTheme } from 'shared/theme';

interface IProps {
    height?: number;
    width?: number;
    iconMarker?: ImageSourcePropType;
    mapViewStyle?: ViewStyle;
    onPress?: () => void;
    latLongBusAtInit: ILatLongBus,
    latLongBus: ILatLongBus
}

export const AppMapView = React.memo((props: IProps) => {
    const { latLongBusAtInit } = props
    const theme = useAppTheme();
    const { height = theme.dimensions.deviceHeight,
        width = theme.dimensions.deviceWidth,
        iconMarker = ImageSource.ic_bus_location_maker,
        mapViewStyle
    } = props;

    const [region, setRegion] = useState<Region>({
        latitude: latLongBusAtInit.lat,
        longitude: latLongBusAtInit.long,
        latitudeDelta: 0.018691047982560605,
        longitudeDelta: 0.009226737619655978
    });

    const changeRegion = useCallback((value: Region) => {
        setRegion(value)
    }, [setRegion]);

    return <MapView
        region={region}
        onRegionChangeComplete={changeRegion}
        style={[{ height: height, width: width }, mapViewStyle]}
        rotateEnabled={false}
        onPress={props.onPress}
    >
        <Marker
            coordinate={{ latitude: props?.latLongBus?.lat || 0, longitude: props?.latLongBus?.long || 0 }}
            // title={'Con:'}
            // description={'Hoàng Long'}
            image={Platform?.OS === 'ios' ? iconMarker : undefined}
            // icon={iconMarker}
        >
            <RenderImage svgMode source={iconMarker} style={{ width: 30, height: 30, tintColor: 'red' }} resizeMode={'contain'} />
        </Marker>
    </MapView>
})