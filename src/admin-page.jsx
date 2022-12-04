import ForgeUI, {AdminPage, render, Text} from '@forge/ui';

const ConfigurePage = () => {
    return (
        <AdminPage>
            <Text>Hello, world!</Text>
        </AdminPage>
    );
};

const MainAdminPage = () => {
    return (
        <AdminPage>
            <Text>Hello Admin!</Text>
        </AdminPage>
    );
};

export const runAdminPage = render(
    <MainAdminPage />
);