# Documentation

## Running locally (aws credential needed)

1. [Create I am User](https://sst.dev/chapters/create-an-iam-user.html)
2. [Configure the aws cli](https://sst.dev/chapters/configure-the-aws-cli.html/)

```
pnpm i
pnpm run dev --stage dev
```

Open Second terminal (run one by one);

```
npx sst --stage dev secrets set DATABASE_URL <GET FROM GMAIL>
npx sst --stage dev secrets set REDIS_URL <GET FROM GMAIL>
npx sst --stage dev secrets set REDIS_TOKEN <GET FROM GMAIL>
npx sst --stage dev secrets set JWT_SECRET <GET FROM GMAIL>
```

In your First terminal after 2-3 minute it will print url that url is you api rest endpoint. Below are the endpoints along with their respective operations:

#### /register (POST) = For creating account

parameters

```
{
    email:string,
    password:string,
    name:string
    userName:string
}
```

response

```
{
    status:200,
    body: {
        token:string
    }
}
```

### /login (POST) = For login user

parameters

```
{
    email:string,
    password:string
}
```

response

```
{
    status:200,
    body: {
        token:string
    }
}
```

### /logout (GET) -> For logouting from your account

parameters

```
{
    headers:{
        "authorization":token
    }
}
```

response

```
{
    status:200,
    body: {
        message:"Successfully Logout"
    }
}
```

### /user-info (GET) -> Only for authorize user

parameters

```
{
    headers:{
        "authorization":token
    }
}
```

response

```
{
    status:200,
    body: {
       name:string,
       email:string,
       id:string,
       userName:string
    }
}
```

## Running tests

Read /packages/functions/test/utils.ts comment  
If want to test local server code

```
cd packages/functions
pnpm run test

```

If want to test deploy code

```
cd packages/functions
pnpm run deploy-test

```

## Rate limiting strategy

I am using the sliding window technique for rate limiting, In this within a specific time frame, a particular authenticated user is allowed to make a limited number of request. In our scenario, 20 requests per minute. In our API, the /user-info is a rate-limited endpoint where we utilize the user's email as the key. We increment this key, and when the counter value reaches 20, we suspend further requests until the next minute.

## deploying

after configuring aws cli execute these line of command one by one

```
npx sst --stage prod secrets set DATABASE_URL <GET FROM GMAIL>
npx sst --stage prod secrets set REDIS_URL <GET FROM GMAIL>
npx sst --stage prod secrets set REDIS_TOKEN <GET FROM GMAIL>
npx sst --stage prod secrets set JWT_SECRET <GET FROM GMAIL>
pnpm sst deploy --stage prod
```
