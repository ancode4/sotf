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
    console.log("PROJECT:");
    console.log(JSON.stringify(projects, null, 2))

    let tabs = []

    for(let i=0;i<projects.length;i++){
        let project = projects[i];
        console.log(JSON.stringify(project.name))
        tabs.push(<Tab label="{project.key}">
                    <Text>{project.name}</Text>
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
    return data.values;
};