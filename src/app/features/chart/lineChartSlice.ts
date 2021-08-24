import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {data} from '../../data/baseData';
import {Serie, LineProps} from '@nivo/line';
import {OrdinalColorScaleConfig} from '@nivo/colors';
import {ColorSchemeId} from '@nivo/colors';
import {AxisProps} from '@nivo/axes';
import cryptoRandomString from 'crypto-random-string';

export interface ChartState extends LineProps {
    showXAxis: boolean;
    xAxisLabel: string;
    showYAxis: boolean;
    showLegend: boolean;
    showGridX: boolean;
    showGridY: boolean;
    colors: OrdinalColorScaleConfig;
    legendDirection: 'column' | 'row';
    legendAlign: 'left' | 'center' | 'right';
    legendVerticalAlign: 'top' | 'middle' | 'bottom';
    margin: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    data: Serie[];
    lines: Array<string | number>;
    activeSerie: string | number;
    scale: number;
}

const initialState: ChartState = {
    showXAxis: true,
    xAxisLabel: '',
    showYAxis: true,
    showLegend: true,
    legendDirection: 'column',
    legendAlign: 'left',
    legendVerticalAlign: 'bottom',
    colors: {scheme: 'nivo'},
    margin: {top: 50, right: 110, bottom: 50, left: 60},
    data: data,
    lines: data.map((item) => item.id),
    showGridX: true,
    showGridY: true,
    activeSerie: '',
    scale: 1,
    enableArea: true,
    curve: 'linear',
    enablePoints: true,
    pointSize: 8,
    axisBottom: {
        legend: 'x 轴',
        legendPosition: 'middle',
        tickRotation: 0,
        legendOffset: 24,
        tickPadding: 0,
    },
};

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        loadState: (_state, action: PayloadAction<ChartState>) => {
            return action.payload;
        },
        setShowXAxis: (state, action: PayloadAction<boolean>) => {
            state.showXAxis = action.payload;
        },
        setXAxisLabel: (state, action: PayloadAction<string>) => {
            state.xAxisLabel = action.payload;
        },
        setShowYAxis: (state, action: PayloadAction<boolean>) => {
            state.showYAxis = action.payload;
        },
        setShowLegend: (state, action: PayloadAction<boolean>) => {
            state.showLegend = action.payload;
        },
        addKey: (state, action: PayloadAction<string | number>) => {
            state.lines = [...state.lines, action.payload];
        },
        removeKey: (state, action: PayloadAction<string | number>) => {
            state.lines = state.lines.filter((item) => item !== action.payload);
        },
        setLegendDirection: (state, action: PayloadAction<'column' | 'row'>) => {
            state.legendDirection = action.payload;
        },
        setShowGridX: (state, action: PayloadAction<boolean>) => {
            state.showGridX = action.payload;
        },
        setShowGridY: (state, action: PayloadAction<boolean>) => {
            state.showGridY = action.payload;
        },
        setSerieId: (state, action: PayloadAction<{id: string | number; newId: string | number}>) => {
            const {id, newId} = action.payload;
            state.data.find((serie) => serie.id === id).id = newId;
            state.lines.push(newId);
        },
        setMargin: (
            state,
            action: PayloadAction<Partial<{left: number; right: number; top: number; bottom: number}>>
        ) => {
            state.margin = Object.assign(state.margin, action.payload);
        },
        setData: (
            state,
            action: PayloadAction<{serieIndex: number; datumIndex: number; key: string; value: number}>
        ) => {
            const {serieIndex, datumIndex, key, value} = action.payload;
            state.data[serieIndex]['data'][datumIndex][key] = value;
        },
        setNewData: (state, action: PayloadAction<ChartState['data']>) => {
            state.data = action.payload;
            state.lines = action.payload
                .filter((serie) => serie.data.filter((datum) => isNaN(parseFloat(datum.y as string))).length === 0)
                .map((serie) => serie.id);
        },
        setActiveSerie: (state, action: PayloadAction<string | number>) => {
            state.activeSerie = action.payload;
        },
        setScale: (state, action: PayloadAction<number>) => {
            state.scale = action.payload;
        },
        setLegendAlign: (state, action: PayloadAction<'left' | 'center' | 'right'>) => {
            state.legendAlign = action.payload;
        },
        setLegendVerticalAlign: (state, action: PayloadAction<'top' | 'middle' | 'bottom'>) => {
            state.legendVerticalAlign = action.payload;
        },
        setColorScheme: (state, action: PayloadAction<ColorSchemeId>) => {
            state.colors = {scheme: action.payload};
        },
        setCurve: (state, action: PayloadAction<LineProps['curve']>) => {
            state.curve = action.payload;
        },
        setEnablePoints: (state, action: PayloadAction<boolean>) => {
            state.enablePoints = action.payload;
        },
        setLineWidth: (state, action: PayloadAction<number>) => {
            state.lineWidth = action.payload;
        },
        setPointSize: (state, action: PayloadAction<number>) => {
            state.pointSize = action.payload;
        },
        addValue: (state, action: PayloadAction<string | number>) => {
            state.data
                .find((datum) => (datum.id = action.payload))
                .data.push({x: cryptoRandomString({length: 4}), y: 100});
        },
        setAxis: (
            state,
            action: PayloadAction<{
                which: 'axisBottom' | 'axisLeft' | 'axisTop' | 'axisRight';
                props: Partial<AxisProps>;
            }>
        ) => {
            const {which, props} = action.payload;
            !state[which] ? (state[which] = props) : Object.assign(state[which], props);
        },
    },
});

export const {
    setShowXAxis,
    setShowYAxis,
    setShowLegend,
    setMargin,
    setLegendDirection,
    setXAxisLabel,
    addKey,
    removeKey,
    setData,
    setShowGridX,
    setShowGridY,
    setActiveSerie,
    setNewData,
    setScale,
    setLegendAlign,
    setLegendVerticalAlign,
    loadState,
    setColorScheme,
    setCurve,
    setLineWidth,
    setSerieId,
    setPointSize,
    setEnablePoints,
    addValue,
    setAxis,
} = chartSlice.actions;

export default chartSlice.reducer;
