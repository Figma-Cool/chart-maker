import {DefaultRawDatum, PieSvgProps} from '@nivo/pie';
import {atomFamily} from 'recoil';
import {baseLegend} from '../data/baseLegend';
import {data} from '../data/basePieData';

export interface PieState extends PieSvgProps<DefaultRawDatum> {
    data: DefaultRawDatum[];
    x: number;
    y: number;
    scale: number;
}

export const pieStateFamily = atomFamily<PieState, any>({
    key: 'PieState',
    default: {
        // Base
        data: data,
        scale: 1,
        width: 400,
        height: 300,
        x: 400,
        y: 100,
        innerRadius: 0,
        startAngle: 360,
        endAngle: 0,
        padAngle: 0.7,
        cornerRadius: 3,
        sortByValue: false,
        margin: {top: 40, right: 80, bottom: 80, left: 80},
        // Style
        colors: {scheme: 'nivo'},
        borderColor: {from: 'color', modifiers: [['darker', 1]]},
        borderWidth: 0,
        // Arc Labels
        enableArcLabels: true,
        arcLabel: 'formattedValue',
        arcLabelsRadiusOffset: 0.5,
        arcLabelsSkipAngle: 0,
        arcLabelsTextColor: {theme: 'labels.text.fill'},
        // Arc Link Labels
        enableArcLinkLabels: true,
        arcLinkLabel: 'id',
        arcLinkLabelsSkipAngle: 0,
        arcLinkLabelsOffset: 0,
        arcLinkLabelsDiagonalLength: 16,
        arcLinkLabelsStraightLength: 24,
        arcLinkLabelsTextOffset: 6,
        arcLinkLabelsThickness: 0,
        arcLinkLabelsTextColor: '#333333',
        arcLinkLabelsColor: '#333333',
        // Intractivity
        activeOuterRadiusOffset: 8,
        activeInnerRadiusOffset: 0,
        // Legends
        legends: [...baseLegend],
    },
});