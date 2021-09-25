export interface parsedQuery {
  redir: string;
  isguest: string;
  id: string;
  apiKey: string;
  oobCode: string;
}

export let parseQuery: (rawQuery: string) => object;

parseQuery = (rawQuery) => {
  const removeQuestion = rawQuery.slice(1, rawQuery.length);
  const queryList = removeQuestion.split('&')
  const queryArray = queryList.map(item => {
    const interim = item.split('=');
    return { [interim[0]]: interim[1] }
  })
  const finalizedQueries: object = queryArray.reduce(function (acc, x) {
    for (let key in x) acc[key] = x[key];
    return acc;
  }, {})
  return finalizedQueries;
}

// export default { parseQuery }