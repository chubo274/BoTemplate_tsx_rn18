import React from 'react';
import { View } from 'react-native';

interface IProps {
    width: number,
    height: number,
    color?: string,
    shadowColor?: string,
}

export const TriangleShape = React.memo((props: IProps) => {
    const { width, height, color, shadowColor } = props;

    return <View style={{
        width: 0,
        height: 0,
        borderLeftWidth: width + 1.5,
        borderRightWidth: width + 1.5,
        borderTopWidth: height - 1.5,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: shadowColor ?? '#FFFFFF',
    }}>
        <View style={{
            position: 'absolute',
            top: -height,
            left: -width,
            width: 0,
            height: 0,
            borderLeftWidth: width,
            borderRightWidth: width,
            borderTopWidth: height,
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: color ?? '#FFFFFF',
        }} />
    </View>
})