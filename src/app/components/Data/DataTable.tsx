import {Empty} from 'antd';
import {useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {appAtom} from '../../atoms/appAtom';
import BarDataTable from './DataTable/BarDataTable';
import LineDataTable from './DataTable/LineDataTable';
import PieDataTable from './DataTable/PieDataTable';

export default function DataTable() {
    const [app] = useAtom(appAtom);
    const {t} = useTranslation();

    const createTable = React.useCallback(() => {
        const activeChart = app.charts.find((chart) => chart.id === app.activeKey);

        if (activeChart) {
            switch (activeChart.type) {
                case 'line':
                    return <LineDataTable id={activeChart.id} />;
                case 'bar':
                    return <BarDataTable />;
                case 'pie':
                    return <PieDataTable />;
            }
        } else {
            return <Empty description={t('Select a chart to view its data')} />;
        }
    }, [app]);

    return createTable();
}
