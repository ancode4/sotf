import ForgeUI, {AdminPage, render, Text, Heading, Tabs, Tab, 
        useProductContext, useState} from '@forge/ui';

const ConfigurePage = () => {
    return (
        <AdminPage>
            <Text>Hello, world!</Text>
        </AdminPage>
    );
};

const MainAdminPage = () => {
    const projects = useState(async ()=> await getProjects() );
    const values = projects[0].values;
    let tabs = []

    for(let i=0;i<values.length;i++){
        let value = values[i];
        tabs.push(<Tab label={value.name}>
                    <Text>{value.name}</Text>
                </Tab>)
    }

    return (
        <AdminPage>
            <Heading size="medium">Site statistics</Heading>
            <Tabs>
                {tabs}
            </Tabs>
        </AdminPage>
    );
};

export const runAdminPage = render(
    <MainAdminPage />
);

const getProjects = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/project/search`);
    const data = await res.json();
    return data;
};