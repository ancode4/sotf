import { storage } from '@forge/api';
import ForgeUI, {AdminPage, render, Heading, Form, Toggle, useState} from '@forge/ui';

const ConfigPage = () => {

    const [moduleConfigState, setModuleConfigState] = useState(async () => {
        const storedModuleConfigState = await storage.get('moduleConfigState');
        if(storedModuleConfigState == null) {
            return DEFAULT_CONFIG
        }
        return storedModuleConfigState;
    });

    const onSubmitConfigForm = async (formData) => {
        const moduleConfigState = {}
        moduleConfigState.module_issue_glance_enabled = formData.hasOwnProperty('module_issue_glance') ? formData.module_issue_glance : false;
        moduleConfigState.module_admin_page_enabled = formData.hasOwnProperty('module_admin_page') ? formData.module_admin_page : false;
        await storage.set('moduleConfigState',moduleConfigState);
        setModuleConfigState(moduleConfigState)
    };

    return (
        <AdminPage>
            <Heading size='medium'>Stay on top App modules</Heading>
            <Form onSubmit={onSubmitConfigForm} >
                <Toggle label="Issue glance" name="module_issue_glance" defaultChecked={moduleConfigState.module_issue_glance_enabled} />
                <Toggle label="Admin page" name="module_admin_page" defaultChecked={moduleConfigState.module_admin_page_enabled} />
            </Form>
        </AdminPage>
    );
};

export const runConfigurePage = render(
    <ConfigPage />
);

const DEFAULT_CONFIG = { 'module_issue_glance_enabled' : false, 'module_admin_page_enabled' : false };
