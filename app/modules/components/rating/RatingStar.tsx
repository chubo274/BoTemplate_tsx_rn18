import ImageSource from 'app/assets/images';
import {RenderImage} from 'components/image/RenderImage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

interface IProps {
    initRating?: number;
    setValue?: (rating: number) => void;
    extraEachStyle?: ViewStyle;
    extraStyle?: ViewStyle;
    initCountRating?: number;
}

const sizeImg = {width: 16, height: 16};

export const RatingStar = React.memo((props: IProps) => {
    const {initRating, setValue, extraStyle, extraEachStyle, initCountRating} =
        props;
    const [rating, setRating] = useState(initRating ?? 0);
    const [arrRating, setDataRating] = useState(['', '', '', '', '']);

    useEffect(() => {
        if (initCountRating) {
            const arrData = [];
            for (let index = 0; index < initCountRating; index++) {
                arrData.push('');
            }
            setDataRating(arrData);
        }
    }, [initCountRating]);

    return (
        <View style={[styles.ratingContainer, extraStyle]}>
            {arrRating.map((val, ind) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setRating(ind+1);
                            setValue && setValue(ind+1);
                        }}
                        key={ind}
                        style={[styles.ratingEach, extraEachStyle]}>
                        {rating >= ind + 1 ? (
                            <RenderImage
                                svgMode
                                source={ImageSource.ic_star}
                                style={sizeImg}
                            />
                        ) : (
                            <RenderImage
                                svgMode
                                source={ImageSource.ic_star_in}
                                style={sizeImg}
                            />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
});

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingEach: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
