import * as React from 'react';
import {Form, Slider, Switch} from 'antd';
import {useTranslation} from 'react-i18next';
import {FcSettings} from 'react-icons/fc';
import ConfigPage from '../ConfigPage';
import {useRecoilState} from 'recoil';
import {pieStateFamily, PieState} from '../../../atoms/pieStateFamily';
import MarginInput from '../../CustomInput/MarginInput';

export default function GeneralConfig() {
    const {t} = useTranslation();
    const [pie, setPie] = useRecoilState(pieStateFamily('pie'));

    const initialValues: PieState = {
        ...pie,
    };

    return (
        <ConfigPage title={t('General')} icon={<FcSettings />}>
            <Form
                layout={'vertical'}
                initialValues={initialValues}
                onValuesChange={(changedValues) => setPie({...pie, ...changedValues})}
            >
                <Form.Item name={'innerRadius'} label={t('Inner Radius')}>
                    <Slider min={0} max={1} step={0.01} />
                </Form.Item>
                <Form.Item name={'startAngle'} label={t('Start Angle')}>
                    <Slider min={-180} max={360} step={1} />
                </Form.Item>
                <Form.Item name={'endAngle'} label={t('End Angle')}>
                    <Slider min={-180} max={360} step={1} />
                </Form.Item>
                <Form.Item name={'padAngle'} label={t('Pad Angle')}>
                    <Slider min={0} max={45} step={1} />
                </Form.Item>
                <Form.Item name={'sortByValue'} label={t('Sort by Value')} valuePropName={'checked'}>
                    <Switch />
                </Form.Item>
                <Form.Item name={'margin'} label={t('Margin')}>
                    <MarginInput />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
