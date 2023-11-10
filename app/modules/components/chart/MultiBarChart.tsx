import { TriangleShape } from 'components/shape/TriangleShape'
import { AppText } from 'components/text/AppText'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, StyleSheet, View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { itemType } from 'react-native-gifted-charts/src/BarChart/types'
import { ITheme, useAppTheme } from 'shared/theme'
import { globalShadowStyle } from 'shared/theme/globalStyle';
const dataFake = [
    {
        id: 1,
        value: 250,
        frontColor: '#009FFF',
        gradientColor: '#006DFF',
        label: '21/09/2023',
    },
    {
        id: 2,
        value: 240,
        frontColor: '#3BE9DE',
        gradientColor: '#93FCF8'
    },
    {
        id: 3,
        value: 350,
        frontColor: '#009FFF',
        gradientColor: '#006DFF',
        label: '21/09/2023',
    },
    {
        id: 4,
        value: 300,
        frontColor: '#3BE9DE',
        gradientColor: '#93FCF8'
    },
    {
        id: 5,
        value: 450,
        frontColor: '#009FFF',
        gradientColor: '#006DFF',
        label: '21/09/2023',
    },
    {
        id: 6,
        value: 400,
        frontColor: '#3BE9DE',
        gradientColor: '#93FCF8'
    },
    {
        id: 7,
        value: 520,
        frontColor: '#009FFF',
        gradientColor: '#006DFF',
        label: '21/09/2023',
    },
    {
        id: 8,
        value: 490,
        frontColor: '#3BE9DE',
        gradientColor: '#93FCF8'
    },
    {
        id: 9,
        value: 300,
        frontColor: '#009FFF',
        gradientColor: '#006DFF',
        label: '21/09/2023',
    },
    {
        id: 10,
        value: 280,
        frontColor: '#3BE9DE',
        gradientColor: '#93FCF8'
    },
];
interface IProps {
    data?: itemType[]
    onPressBar?: (data?: any) => void
    width?: number
}

export const MultiBarChart = (props: IProps) => {
    const { data = dataFake, onPressBar, width } = props
    const { t } = useTranslation()
    const theme = useAppTheme();
    const styles = useStyles(theme);
    // !State
    const [indexActive, setIndexActive] = useState<number>(-2)
    const [maxValue, setMaxValue] = useState<number>(0)

    const styleDefault = useCallback((topLabel?: string | number, color?: string, opacity?: number) => {
        return {
            topLabelComponent: () => (
                <AppText style={{ fontSize: 13 }}>{topLabel}</AppText>
            ),
            barStyle: {
                borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 5,
                borderTopRightRadius: 5, borderColor: color ? color : '#006DFF', opacity
            }
        }
    }, [])

    const styleNotActive = useCallback((value: number, index: number) => {
        const style = {
            frontColor: theme.color.bg.white,
            gradientColor: theme.color.brand.light,
            ...styleDefault(value, theme.color.brand.secondary)
        }

        return index % 2 === 0 ? { spacing: 0, ...style } : style
    }, [styleDefault, theme.color])

    const styleActive = useCallback((value: number, index: number) => {
        const style = {
            frontColor: theme.color.brand.primary,
            gradientColor: theme.color.brand.secondary,
            ...styleDefault(value, theme.color.brand.secondary)
        }

        return index % 2 === 0 ? { spacing: 0, ...style } : style
    }, [styleDefault, theme.color])

    const dataConvert = useMemo(() => {
        return data?.map((el: itemType, index: number) => {
            const listActive = indexActive % 2 === 0 ? [indexActive, indexActive + 1] : [indexActive - 1, indexActive]
            if (listActive.includes(index)) return { ...el, ...styleActive(el.value, index) }
            return { ...el, ...styleNotActive(el.value, index) }
        });
    }, [data, indexActive, styleActive, styleNotActive])

    const _renderTooltip = useCallback((dataItem?: any) => {
        onPressBar?.(dataItem)
        const index = data?.findIndex((e) => e?.id === dataItem?.id)
        let leftView = -50
        let leftTriangle = 54
        let rightView = undefined
        let rightTriangle = undefined
        if (index == 0 || index == 1) {
            leftView = -16
            leftTriangle = 22
        }
        if (index == data?.length - 1 || index == data?.length - 2) {
            leftView = undefined
            leftTriangle = undefined
            rightView = -32
            rightTriangle = 12
        }

        return <View style={{ position: 'absolute', bottom: 25, left: leftView, right: rightView, ...globalShadowStyle.shadow_edufit }}>
            <View style={styles.wrapperTooltip}>
                <AppText style={styles.txtTooltip}>{`${t('weight')} : ${dataItem?.value}kg`}</AppText>
                <AppText style={styles.txtTooltip}>{`${t('height')} : ${dataItem?.value}cm`}</AppText>
            </View>
            <View style={{ position: 'absolute', bottom: -6, left: leftTriangle, right: rightTriangle }}>
                <TriangleShape width={6} height={6} shadowColor={Platform.OS === 'android' ? 'rgba(8, 48, 112, 0.08)' : 'transparent'} />
            </View>
        </View>
    }, [data, onPressBar, styles.txtTooltip, styles.wrapperTooltip, t])

    useEffect(() => {
        if (data) {
            let max = 0
            data.forEach((el: itemType, index: number) => {
                if (el.value > max) max = el.value
                if (index == data?.length - 1) setMaxValue(max)
            })
        }
    }, [data])

    if (!maxValue) return null
    // !Render
    return <View style={{ backgroundColor: 'white', ...globalShadowStyle.shadow_edufit, width: width }}>
        <BarChart
            data={dataConvert}
            hideYAxisText={true}
            barWidth={26}
            initialSpacing={16}
            endSpacing={16}
            spacing={52}
            barBorderTopLeftRadius={4}
            barBorderTopRightRadius={4}
            yAxisThickness={0}
            xAxisColor={theme.color.brand.lighter}
            maxValue={maxValue + 250}
            labelWidth={80}
            xAxisLabelTextStyle={styles.txtValueChart}
            renderTooltip={_renderTooltip}
            onPress={(item, index) => { setIndexActive(index) }}
            dashGap={4}
            activeOpacity={0.8}
            width={width ? (width - 32) : undefined}
        />
    </View>
}

const useStyles = (theme: ITheme) => StyleSheet.create({
    txtValueChart: {
        color: theme.color.textColor.secondary,
        fontFamily: theme.font.Medium,
        fontSize: theme.fontSize.p11,
        lineHeight: 16,
        marginLeft: -36
    },
    txtTooltip: {
        flexShrink: 1,
        fontSize: theme.fontSize.p11,
        fontFamily: theme.font.Medium,
        color: theme.color.textColor.primary
    },
    wrapperTooltip: {
        backgroundColor: theme.color.bg.white,
        padding: theme.dimensions.p8,
        borderRadius: theme.dimensions.p4,
    }
});