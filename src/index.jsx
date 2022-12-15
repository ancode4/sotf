import ForgeUI, { render, Fragment, Text, Strong, IssueGlance, useProductContext, useState, SectionMessage } from '@forge/ui';
import { storage } from '@forge/api';

enum LicenseOverride {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export function isLicenseActive(context) {
  // Check for an environment variable that overrides the license state
  const override = process.env.LICENSE_OVERRIDE;
  if (typeof override !== 'undefined') {
      if (override.toLowerCase() === LicenseOverride.ACTIVE) {
          return true;
      }
      if (override.toLowerCase() === LicenseOverride.INACTIVE) {
          return false;
      }
  }
  // Else return the actual value
  return context && context.license && context.license.isActive;
}

const App = () => {
  const [moduleConfigState, setModuleConfigState] = useState(async () => {
      const storedModuleConfigState = await storage.get('moduleConfigState');
      return storedModuleConfigState;
  });
  if(moduleConfigState != null){
      if(moduleConfigState.module_issue_glance_enabled) {
          return (<Stats />)
      }
  }
  return ( <ForbiddenMessage /> )
};

const Stats = () => {
    const context = useProductContext();
    const assigneeEmail = useState(async ()=> await fetchAssigneeFromIssue(context.platformContext.issueKey));
    const reporterEmail = useState(async ()=> await fetchReporterFromIssue(context.platformContext.issueKey));
    const createdSinceDays = useState(async ()=> await fetchCreatedSinceDaysFromIssue(context.platformContext.issueKey));
    const timeInCurrentStatus = useState(async ()=> await fetchTimeInCurrentStatusFromIssue(context.platformContext.issueKey));
    const components = useState(async ()=> await fetchComponentsFromIssue(context.platformContext.issueKey));
  /*
    console.log(assigneeEmail);
    console.log(reporterEmail);
    console.log(createdSinceDays);
    console.log(timeInCurrentStatus);
    console.log(components);*/

    return (
      <Fragment>
        <Text>Key Information:</Text>
        <Text><Strong>Assignee:</Strong> {assigneeEmail[0]}</Text>
        <Text><Strong>Reporter:</Strong> {reporterEmail[0]}</Text>
        <Text><Strong>Created Since (days):</Strong> {createdSinceDays[0]}</Text>
        <Text><Strong>Time in Current Status (days):</Strong> {timeInCurrentStatus[0]}</Text>
      </Fragment>
    );
}

const ForbiddenMessage = () => {
    return (
        <Fragment>
            <SectionMessage title="Forbidden" appearance="error">
              <Text>You are not permitted to view this section. Please contact your admin!</Text>
            </SectionMessage>
        </Fragment>
    )
}

export const run = render(    
  <IssueGlance>
    <App />
  </IssueGlance>
);

const fetchAssigneeFromIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issue/${issueId}`);

    const data = await res.json();
    if (data.fields.assignee == null) {
      return 'Unassigned'
    } else {
      
      return data.fields.assignee.emailAddress;
    }  
};

const fetchReporterFromIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issue/${issueId}`);

    const data = await res.json();

    return data.fields.reporter.emailAddress;
};

const fetchCreatedSinceDaysFromIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issue/${issueId}`);

    const data = await res.json();
    const todayDate = new Date();
    const timeDifference = Math.abs(new Date(data.fields.created) - todayDate);
    const createdSinceDays = Math.ceil(timeDifference/(1000*60*60*24));
  /*  console.log(`createdDate ${data.fields.created}`);
    console.log(`todayDate ${todayDate}`);
    console.log(`timeDifference ${timeDifference}`);
    console.log(`createdSinceDays ${createdSinceDays}`);
 */ switch(true) {
      case createdSinceDays-1 == 0:
        return `Today`;
      case createdSinceDays-1 > 0:
        return createdSinceDays;
    }
};

const fetchTimeInCurrentStatusFromIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issue/${issueId}/?expand=changelog`);

    const data = await res.json();
    
    let statusDate = [];
    if(data.changelog.histories.length==0) {
     // console.log(`No change history`);
      return `Not transitioned yet`;
    } else {
      data.changelog.histories.forEach(function(element) {        
        element.items.forEach(function(item){
          if (item.field==`status`){
            statusDate.push(element.created);
            console.log(`Change log created: ${element.created}`);
            console.log(`To Status: ${item.toString}`)
          }
        });
      });
    }
    if(statusDate.length==0) {
      return `Not transitioned yet`;
    } else {
   //   console.log(`statusDate ${statusDate[0]}`);
      return fetchDaysDifference(statusDate[0]);
    } 
};

function fetchDaysDifference(date) {
   // console.log(`date in function ${date}`);
    const todayDate = new Date();
    const timeDifference = Math.abs(new Date(date) - todayDate);
    const daysDifference = Math.ceil(timeDifference/(1000*60*60*24));
    
 //   console.log(`daysDifference ${daysDifference}`);
    switch(true) {
      case daysDifference-1 == 0:
        return `Today`;
      case daysDifference-1 > 0:
        return daysDifference;
    }
};

const fetchComponentsFromIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(`/rest/api/3/issue/${issueId}`);

    const data = await res.json();

    if (data.fields.components.length==0) {
     // console.log(`No Components`);
      return `No Components`;
    } else {
      
      let components = [];
      
      data.fields.components.forEach(function(element) {
        const leadName = useState(async ()=> await fetchComponentDetails(element.id));
       // console.log(`componentId: ${element.id}, leadName: ${leadName[0]}`);
        components.push([element.name, leadName[0]]);
      });
      //return components;
      return "Components found"
    }  
};

const fetchComponentDetails = async (componentId) => {
  const res = await api
    .asUser()
    .requireJira(`/rest/api/3/component/${componentId}`);

    const data = await res.json();
    //console.log(`Component lead`);
    if(data.lead) {
      return `Nice lead`; //Fetch component lead here later
    } else {
      return `No lead`;
    }
};
