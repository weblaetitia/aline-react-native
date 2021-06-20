import * as React from 'react'
import Svg, { Ellipse, Path } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

function MarkerRestaurant({ size }) {
  return (
    <Svg
      viewBox="0 0 32 44"
      width={size.width}
      height={size.height}
      style={{
        transform: [{ translateX: size.translateX }, { translateY: size.translateY }],
      }}
    >
      <Ellipse cx={16.04} cy={41.54} rx={5.7} ry={2.53} fill="#000" opacity={0.2} />
      <Path
        d="M14.44 40.1C2.65 23.47.47 21.76.47 15.65A15.37 15.37 0 0116 .49a15.37 15.37 0 0115.61 15.16c0 6.11-2.19 7.82-14 24.45a2 2 0 01-2.71.48 1.86 1.86 0 01-.46-.48z"
        fill="#ef7e67"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeWidth={0.85}
      />
      <Path
        d="M20.92 26.34a1 1 0 01-1-.91.11.11 0 010-.08l.62-7c-6.5-4.64-.73-11.4 2.69-11.4a1 1 0 011 .91v17.57a1 1 0 01-1 .91h-2.31zm-10.32 0a.91.91 0 01-.89-.93l.48-9a4 4 0 01-2.55-4 46.76 46.76 0 01.59-4.88c.12-.77 1.68-.78 1.78 0v5.35c.05.13.56.12.59 0 .05-1 .29-5.27.3-5.38.12-.78 1.65-.78 1.77 0 0 .1.25 4.41.3 5.37 0 .12.55.13.59 0V7.56c.1-.82 1.66-.81 1.78 0 .28 1.61.48 3.24.6 4.88a4 4 0 01-2.56 4l.48 9a.9.9 0 01-.85 1H10.6z"
        fill="#fff"
      />
    </Svg>
  )
}

export default MarkerRestaurant
