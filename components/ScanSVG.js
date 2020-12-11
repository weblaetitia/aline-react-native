import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function ScanSVG(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" height="80%" width="80%">
      <Path
        d="M0 200h640"
        fill="none"
        stroke="#2db08c"
        strokeWidth={6.126}
        strokeMiterlimit={10}
      />
      <Path
        d="M50 3.1H3.1V50m633.8 0V3.1H590m0 393.8h46.9V350M3.1 350v46.9H50"
        fill="none"
        stroke="#2db08c"
        strokeWidth={6.177}
        strokeMiterlimit={10}
      />
    </Svg>
  )
}

export default ScanSVG
