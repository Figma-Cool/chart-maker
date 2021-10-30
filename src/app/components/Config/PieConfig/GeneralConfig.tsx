import * as React from 'react';
import {Form, Slider, Switch} from 'antd';
import {useTranslation} from 'react-i18next';
import {FcSettings} from 'react-icons/fc';
import ConfigPage from '../ConfigPage';
import {useAtom} from 'jotai';
import {pieAtomFamily} from '../../../atoms/pieAtomFamily';
import MarginInput from '../../CustomInput/MarginInput';
import {appAtom} from '../../../atoms/appAtom';
import {useForm} from 'antd/lib/form/Form';

export default function GeneralConfig() {
    const {t} = useTranslation();
    const [app] = useAtom(appAtom);
    const [pie, setPie] = useAtom(pieAtomFamily({id: app.activeKey}));

    const [form] = useForm();

    React.useEffect(() => {
        form.setFieldsValue({...pie});
    }, [pie]);

    return (
        <ConfigPage title={t('General')} icon={<FcSettings />}>
            <Form
                form={form}
                layout={'vertical'}
                initialValues={{...pie}}
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
