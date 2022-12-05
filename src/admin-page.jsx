import ForgeUI, {AdminPage, render, Text, Heading, 
        useProductContext, useState, Table, Head, Row, Cell} from '@forge/ui';


const MainAdminPage = () => {
    const projects = useState(async ()=> await getProjects() );
    const values = projects[0].values;
    
    const projectRows = []
    for(let i=0;i<values.length;i++){
        let project = values[i];
        projectRows.push(
            <Row>       
                <Cell>
                    <Text>{i+1}</Text>
                </Cell>
                <Cell>
                    <Text>{project.key}</Text>
                </Cell>
                <Cell>
                    <Text>{project.name}</Text>
                </Cell>
            </Row>
        )
    }

    const issueTypes = useState(async ()=> await getIssueTypes() );

    const issueTypesSchemes = useState(async ()=> await getIssueTypesSchemes() );
    //console.log("ISSUE TYPE SCHEMES:")
    //console.log(issueTypesSchemes)

    return (
        <AdminPage>
            <Heading size="medium">Site statistics</Heading>
            <Heading size="small">Projects</Heading>
            <Table>
                <Head>
                    <Cell>
                        <Text>Sr.</Text>
                    </Cell>
                    <Cell>
                        <Text>Key</Text>
                    </Cell>
                    <Cell>
                        <Text>Name</Text>
                    </Cell>
                </Head>
                {projectRows}
            </Table>

            <Heading size="small">Issue Types</Heading>
            <Table>
                <Row>
                    <Cell>
                        <Text>Number of issue types</Text>
                    </Cell>
                    <Cell>
                        <Text>{issueTypes[0].length}</Text>
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Text>Number of issue types schemes</Text>
                    </Cell>
                    <Cell>
                        <Text>{issueTypesSchemes[0].total}</Text>
                    </Cell>
                </Row>
            </Table>
        </AdminPage>
    );
};

export const runAdminPage = render(
    <MainAdminPage />
);

const getIssueTypes = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issuetype`);
    const data = await res.json();
    return data;
};

const getIssueTypesSchemes = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issuetypescheme`);
    const data = await res.json();
    return data;
};

const getProjects = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/project/search`);
    const data = await res.json();
    return data;
};