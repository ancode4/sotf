import ForgeUI, {AdminPage, render, Text, Heading, Link, Form, Toggle,
        useProductContext, useState, Table, Head, Row, Cell} from '@forge/ui';
import { getIssueTypes, getIssueFields, getIssueTypesSchemes, getWorkflows, getWorkflowscheme, getProjects } from './api-requests/jira-api-requests.js'
import { groupBy } from './util/util.js'

const MainAdminPage = () => {
    const projects = useState(async ()=> await getProjects() );
    const values = projects[0].values;
    const simplified = values.filter( project => project.simplified )

    const projectTypeKeyData = groupBy( values, 'projectTypeKey');
    const projectTypeKeys = Object.keys(projectTypeKeyData);

    const issueTypes = useState(async ()=> await getIssueTypes() );
    const issueTypesSchemes = useState(async ()=> await getIssueTypesSchemes() );
    const workflows = useState(async ()=> await getWorkflows() );
    const workflowSchemes = useState(async ()=> await getWorkflowscheme() );
    const issueFields = useState(async ()=> await getIssueFields() );
    const customIssueFields = issueFields[0].filter( (field) => {
        return field.custom === true;
    } )

    return (
        <AdminPage>
            <Heading size="large">Site statistics</Heading>
            <Heading size="medium">
                <Text>
                    <Link href="/jira/projects" openNewTab="true">Projects</Link>
                </Text>
            </Heading>
            <Table>
                <Row>
                    <Cell>
                        <Text>Total</Text>
                    </Cell>
                    <Cell>
                        <Text>{values.length}</Text>
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Text>Team managed projects</Text>
                    </Cell>
                    <Cell>
                        <Text>{simplified.length}</Text>
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Text>Team managed projects</Text>
                    </Cell>
                    <Cell>
                        <Text>{values.length-simplified.length}</Text>
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Text>JIRA Software projects</Text>
                    </Cell>
                    <Cell>
                        <Text>{projectTypeKeyData['software'].length}</Text>
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Text>JSM projects</Text>
                    </Cell>
                    <Cell>
                        <Text>{projectTypeKeyData['service_desk'].length}</Text>
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Text>JWM projects</Text>
                    </Cell>
                    <Cell>
                        <Text>{projectTypeKeyData['business'].length}</Text>
                    </Cell>
                </Row>
            </Table>

            <Heading size="medium">
                <Text>
                    <Link href="/jira/settings/issues/issue-types" openNewTab="true">
                    Issue Types
                    </Link>
                </Text>
            </Heading>
            <Table>
                <Row>
                    <Cell>
                        <Text>Issue type count</Text>
                    </Cell>
                    <Cell>
                        <Text>{issueTypes[0].length}</Text>
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Text>
                            <Link href="/jira/settings/issues/issue-type-schemes" openNewTab="true">Issue type schemes
                            </Link>
                        </Text>
                    </Cell>
                    <Cell>
                        <Text>{issueTypesSchemes[0].total}</Text>
                    </Cell>
                </Row>
            </Table>

            <Heading size="medium">
                <Text>
                    <Link href="/jira/settings/issues/workflows" openNewTab="true">
                    Workflows
                    </Link>
                </Text>
            </Heading>
            <Table>
                <Row>
                    <Cell>
                        <Text>Workflow count</Text>
                    </Cell>
                    <Cell>
                        <Text>{workflows[0].total}</Text>
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        <Text>
                            <Link href="/secure/admin/ViewWorkflowSchemes.jspa" openNewTab="true">Workflow schemes
                            </Link>
                        </Text>
                    </Cell>
                    <Cell>
                        <Text>{workflowSchemes[0].total}</Text>
                    </Cell>
                </Row>
            </Table>

            <Heading size="medium">
                <Text>
                    <Link href="/secure/admin/ViewCustomFields.jspa" openNewTab="true">
                    Custom Fields
                    </Link>
                </Text>
            </Heading>
            <Table>
                <Row>
                    <Cell>
                        <Text>
                            Custom field count    
                        </Text>
                    </Cell>
                    <Cell>
                        <Text>{customIssueFields.length}</Text>
                    </Cell>
                </Row>
            </Table>
        </AdminPage>
    );
};

export const runAdminPage = render(
    <MainAdminPage />
);

const onSubmitConfigForm = async (formData) => {
    /**
     * formData:
     * {
     *    username: 'Username',
     *    products: ['jira']
     * }
     */
    console.log(formData);
};

export const runConfigurePage = render(
    <AdminPage>
        <Heading size='medium'>Stay on top App modules</Heading>
        <Form onSubmit={onSubmitConfigForm} >
            <Toggle label="Issue glance" name="module_issue_glance" />
            <Toggle label="Admin page" name="module_admin_page" />
        </Form>
    </AdminPage>
);
