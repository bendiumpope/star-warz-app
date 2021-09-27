
exports.GetHerokuConnectionString = (dataBaseURL) => {
  let connStr = dataBaseURL;
  connStr = connStr.replace("postgres://", "");
  const databaseUriVariables = connStr.split(":");
  const user = databaseUriVariables[0];
  const password = databaseUriVariables[1].split("@")[0];
  const host = databaseUriVariables[1].split("@")[1];
  const port = databaseUriVariables[2].split("/")[0];
  const database = databaseUriVariables[2].split("/")[1];
  return [user, password, host, port, database];
}
