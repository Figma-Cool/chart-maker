import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer} from 'recharts';
// import {CurveType} from 'recharts/types/shape/Curve';
// import {useImmer} from 'use-immer';
import {RootState} from '../../redux/store';
import {ResponsiveLine} from '@nivo/line';
import {setActiveSerie} from '../../features/chart/lineChartSlice';

export default function VisLineChart() {
    const {
        showXAxis,
        showYAxis,
        colors,
        lines,
        // showYAxis,
        data,
        showGridX,
        showGridY,
        margin,
        lineWidth,
        enablePoints,
        pointColor,
        xScale,
        // legendAlign,
        // legendVerticalAlign,
        // lines,
        // showCartesianGrid,
        // activeKey,
        // scale,
        axisBottom,
        curve,
        enableArea,
        areaBaselineValue,
        areaOpacity,
        areaBlendMode,
        pointSize,
        legends,
    } = useSelector((state: RootState) => state.line);

    const dispatch = useDispatch();

    return (
        <ResponsiveLine
            margin={margin}
            data={data.filter((item) => lines.includes(item.id))}
            enableGridX={showGridX}
            enableGridY={showGridY}
            xScale={xScale}
            yScale={{type: 'linear', min: 0, max: 'auto', reverse: false}}
            yFormat=" >-.2f"
            // axisTop={null}
            // axisRight={null}
            axisBottom={showXAxis ? axisBottom : null}
            axisLeft={
                showYAxis
                    ? {
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legend: 'count',
                          legendOffset: -40,
                          legendPosition: 'middle',
                      }
                    : null
            }
            colors={colors}
            enablePoints={enablePoints}
            pointColor={pointColor}
            pointSize={pointSize}
            pointBorderColor={{theme: 'background'}}
            pointLabelYOffset={-12}
            onClick={(point) => {
                console.log(point);
                dispatch(setActiveSerie(point.serieId));
            }}
            curve={curve}
            enableArea={enableArea}
            areaBaselineValue={areaBaselineValue}
            areaOpacity={areaOpacity}
            areaBlendMode={areaBlendMode}
            useMesh={true}
            lineWidth={lineWidth}
            legends={legends}
        />
    );
}
// data={data}
//

// export default function VisLineChart() {
//     const [hoveringKey, setHoveringKey] = useImmer('');
//     const dispatch = useDispatch();
//     // const

//     return (
//         <ResponsiveContainer width={`${100 * scale}%`} height={`${100 * scale}%`}>
//             <LineChart data={data} margin={margin}>
//                 {showCartesianGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
//                 <XAxis dataKey="name" label={{value: xAxisLabel, position: 'bottom'}} hide={!showXAxis} />
//                 {showYAxis ? <YAxis /> : null}
//                 {showLegend ? (
//                     <Legend
//                         layout={legendLayout}
//                         align={legendAlign}
//                         verticalAlign={legendVerticalAlign}
//                         onClick={(e) => {
//                             console.log(e);
//                         }}
//                     />
//                 ) : null}
//                 {lines.map((item) => {
//                     return (
//                         <Line
//                             style={{cursor: 'pointer'}}
//                             key={item.key}
//                             id={item.key}
//                             onMouseEnter={() => setHoveringKey(item.key)}
//                             onMouseLeave={() => setHoveringKey('')}
//                             onClick={() => dispatch(setActiveSerie(item.key))}
//                             type={item.curveType as CurveType}
//                             dataKey={item.key}
//                             stroke={activeKey && activeKey !== item.key ? item.color + '33' : item.color}
//                             strokeWidth={hoveringKey === item.key ? 3 : 2}
//                             activeDot={{r: 8}}
//                         ></Line>
//                     );
//                 })}
//             </LineChart>
//         </ResponsiveContainer>
//     );
// }