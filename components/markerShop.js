import * as React from "react";
import Svg, { Defs, Ellipse, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function MarkerShop(props) {
  return (
    <Svg
      viewBox="0 0 32 44"
      width={props.size.width}
      height={props.size.height}
      style={{
        transform: [
          { translateX: props.size.translateX },
          { translateY: props.size.translateY },
        ],
      }}
    >
      <Ellipse
        cx={16}
        cy={41.47}
        rx={5.7}
        ry={2.53}
        fill="#000"
        opacity={0.1}
      />
      <Path
        d="M14.4 40C2.61 23.4.43 21.7.43 15.59A15.36 15.36 0 0116 .43a15.36 15.36 0 0115.57 15.16c0 6.11-2.18 7.81-14 24.45a2 2 0 01-2.71.47 1.83 1.83 0 01-.46-.51z"
        fill="#e8ba00"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={0.85}
      />
      <Path
        d="M28.24 14.18v.66a1 1 0 01-1 1h-.34l-1.11 7.56a2 2 0 01-2 1.7H8.25a2 2 0 01-2-1.7l-1.13-7.57h-.34a1 1 0 01-1-1v-.66a1 1 0 011-1h2.86l4.54-6.07a1.38 1.38 0 011.9-.29 1.3 1.3 0 01.3 1.85L11 13.18h10l-3.38-4.51a1.3 1.3 0 01.3-1.85 1.38 1.38 0 011.9.29l4.54 6.07h2.86a1 1 0 011.02 1zM17 21.46v-4.64a1 1 0 00-2 0v4.64a1 1 0 002 0zm4.76 0v-4.64a1 1 0 00-2 0v4.64a1 1 0 002 0zm-9.52 0v-4.64a1 1 0 00-2 0v4.64a1 1 0 002 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default MarkerShop;
