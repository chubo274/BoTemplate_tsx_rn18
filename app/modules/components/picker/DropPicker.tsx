import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, LayoutChangeEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

interface IProps {
    currentValue?: any;
    listValueSelect: any[];
    onSelected: (value: any) => void;
    renderItemCurrentValue: (currentValue?: any) => JSX.Element;
    renderItemDropDown: (item: any, index: number) => JSX.Element;
}

export const DropPicker = React.memo((props: IProps) => {
    const { listValueSelect, renderItemCurrentValue, renderItemDropDown, currentValue, onSelected } = props;

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [heightViewDropDown, setHeightViewDropDown] = useState(0);

    const dataListRenderDropDown = useMemo(() => {
        if (currentValue) {
            return listValueSelect.filter((value: any) => value !== currentValue)
        }
        return listValueSelect;
    }, [listValueSelect, currentValue]);

    const changeHeightViewDropDown = useCallback((event: LayoutChangeEvent) => {
        const layoutHeight = event.nativeEvent.layout.height;
        if (layoutHeight > 0 && heightViewDropDown !== layoutHeight) {
            setHeightViewDropDown(layoutHeight * 4);
        }
    }, [setHeightViewDropDown, heightViewDropDown]);

    const onPressCurrentValueItem = useCallback(() => {
        setIsCollapsed((prev: boolean) => !prev)
    }, [setIsCollapsed]);

    const onPressSelectedItem = useCallback((item: any) => {
        onSelected(item);
        setIsCollapsed(true)
    }, [onSelected, setIsCollapsed]);

    const renderCollapsible = () => {
        return <View style={{ height: heightViewDropDown }}>
            <FlatList
                keyExtractor={(item: any, index: number) => index.toString()}
                data={dataListRenderDropDown}
                renderItem={({ item, index }: { item: any, index: number }) => {
                    return <TouchableOpacity activeOpacity={0.8} onLayout={index === 0 ? changeHeightViewDropDown : undefined} onPress={() => onPressSelectedItem(item)}>
                        {renderItemDropDown(item, index)}
                    </TouchableOpacity>
                }}
            />
        </View>
    }

    return <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} onPress={onPressCurrentValueItem}>
            {renderItemCurrentValue(currentValue)}
        </TouchableOpacity>

        <View style={styles.viewCollap}>
            <Collapsible collapsed={isCollapsed}>
                {renderCollapsible()}
            </Collapsible>
        </View>
    </View>
});

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
    },
    viewCollap: {
        position: 'absolute',
        top: 45,
        left: 0,
        right: 0,
    },
});
