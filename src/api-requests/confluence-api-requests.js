import api, { route } from "@forge/api";

export const fetchPage = async (pageId) => {
  const res = await api
    .asUser()
    .requestConfluence(route`/wiki/rest/api/content/${pageId}`);

  const data = await res.json();
  return data.results;
};

export const createPage = async (title, spaceKey, content) => {

  const bodyData = {}
  bodyData.title = title
  bodyData.type = 'page'

  const space = {}
  space.key = spaceKey
  bodyData.space = space

  const body = {}
  const storage = {}
  storage.representation = 'storage'
  storage.value = content
  body.storage = storage
  bodyData.body = body;


  const res = await api
    .asUser()
    .requestConfluence(route`/wiki/rest/api/content`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyData
    });

  const data = await res.json();
  return data.results;
};

