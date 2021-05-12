const dev = {
  apiGateway: {
    REGION: "ca-central-1",
    URL: "https://5pyn6z7ox7.execute-api.ca-central-1.amazonaws.com/dev/",
  },
  cognito: {
    REGION: "ca-central-1",
    USER_POOL_ID: "ca-central-1_czNtI2TZ0",
    APP_CLIENT_ID: "3ikicagngvm2b692d1miu9voj",
    IDENTITY_POOL_ID: "ca-central-1:5480f324-3658-4658-9fc2-4d12b8cb1a8a",
  },
};

const prod = {
  apiGateway: {
    REGION: "ca-central-1",
    URL: "https://31lmag6rf6.execute-api.ca-central-1.amazonaws.com/prod/",
  },
  cognito: {
    REGION: "ca-central-1",
    USER_POOL_ID: "ca-central-1_Z4aR8OC4d",
    APP_CLIENT_ID: "7pnmfu5l4dfrjojvmvjc57pqml",
    IDENTITY_POOL_ID: "ca-central-1:462ec239-ea84-41ee-9321-ceb36e91d814",
  },
};

const config = {
  // Default to dev if not set to production
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
