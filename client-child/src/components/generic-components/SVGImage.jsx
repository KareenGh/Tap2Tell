import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';

/**@source import res of svg file
 * @height for image
 * @width for image
 * @style for image
 * @svgProps props for the svg element (works on native devices)
 * @imageProps props for react-native's image element (works on web)
 */

export default function SVGImage(props) {
    const SvgSource = props.source;
    if (Platform.OS === "web") { //on computer!
        const otherProps = { ...props.imageProps };
        let styleWeb = (props.imageProps && props.imageProps.style) || props.style || { width: props.width, height: props.height } //will take @param-style only if there is no .style from @param-imageProps
        delete otherProps.style;
        return <Image
            source={SvgSource}
            style={props.background ? [styleWeb, style.bg] : styleWeb}
            {...otherProps}
        />
    }
    else { // expo app (mobile)
        return <SvgSource
            preserveAspectRatio={props.preserveAspectRatio || undefined}
            height={props.height || (props.style && props.style.height) || undefined}
            width={props.width || (props.style && props.style.width) || undefined}
            style={props.background ? [style.bg, props.style] : props.style}
        />
    }
}



const style = StyleSheet.create({
    bg: {
        position: "absolute",
        backgroundColor: "red",
        opacity: 0.5,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})