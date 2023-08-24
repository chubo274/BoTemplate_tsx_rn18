import React, { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleProp, TextLayoutEventData, TextLayoutLine, TextStyle } from 'react-native';
import { AppText } from './AppText';
import { useAppTheme } from 'shared/theme';

interface IProps {
    text: string;
    numberOfLinesWantShow?: number;
    style?: StyleProp<TextStyle>;
}

export const AppTextTruncate = React.memo((props: IProps) => {
    const { text, numberOfLinesWantShow = 1, style } = props;
    const [titleBreaked, setTitleBreaked] = useState('');
    const [isDone, setIsDone] = useState(false);
    const numberOfLinesGetLayout = numberOfLinesWantShow + 1;
    const textRef = useRef<string | null>(null)
    const theme = useAppTheme()

    const textWrapBreakWord = (event: TextLayoutLine[], numberOfLinesWantShow: number): string => {
        let newText = '';
        for (let i = 0; i < Math.min(event.length, numberOfLinesWantShow); i++) {
            newText = `${newText}${event[i].text}`;
        }
        if (event.length > numberOfLinesWantShow) {
            newText = `${newText.trim()}...`;
        }
        return newText.trim();
    }

    useEffect(() => {
        textRef.current = text
        setTitleBreaked('')
    }, [text])

    return <>
        <AppText
            onTextLayout={(e: NativeSyntheticEvent<TextLayoutEventData>) => {
                
                if (textRef?.current !== titleBreaked) {
                    textRef.current = titleBreaked
                    const lines = e.nativeEvent.lines;
                    if (lines.length <= numberOfLinesWantShow ) {
                        setIsDone(true)
                    }
                    if (lines.length > numberOfLinesWantShow) {
                        setTitleBreaked(textWrapBreakWord(lines, numberOfLinesWantShow))
                    }
                } else {
                    setIsDone(true)
                }
            }}
            style={[style, !isDone ? {color: theme.color.textColor.white}: {color: theme.color.textColor.primary}]}
            numberOfLines={numberOfLinesGetLayout}
        >
            {(titleBreaked || text)}
        </AppText>
    </>
});

