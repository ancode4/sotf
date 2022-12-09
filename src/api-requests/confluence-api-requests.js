import api, { route } from "@forge/api";

export const fetchPage = async (pageId) => {
  const res = await api
    .asUser()
    .requestConfluence(route`/wiki/rest/api/content/${pageId}`);

  const data = await res.json();
  return data.results;
};



/*const fetchCommentsForContent = async (contentId) => {
  const res = await api
    .asUser()
    .requestConfluence(route`/wiki/rest/api/content/${contentId}/child/comment`);

  const data = await res.json();
  return data.results;
};*/