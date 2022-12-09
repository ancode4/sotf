
export const getIssueTypes = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issuetype`);
    const data = await res.json();
    return data;
};

export const getIssueFields = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/field`);
    const data = await res.json();
    return data;
};

export const getIssueTypesSchemes = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issuetypescheme`);
    const data = await res.json();
    return data;
};

export const getWorkflows = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/workflow/search`);
    const data = await res.json();
    return data;
};

export const getWorkflowscheme = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/workflowscheme`);
    const data = await res.json();
    return data;
};

export const getProjects = async () => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/project/search`);
    const data = await res.json();
    return data;
};