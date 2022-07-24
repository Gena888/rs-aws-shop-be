const generatePolicy = (principalId, resource, effect = 'Allow') => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}


export const basicAuthorizer = (event, context, cb) => {

  if (event["type"] != 'TOKEN') cb('Unauthorized', 'No authorization token found in the request or invalid token' )

  try {
    const authorizationToken = event.authorizationToken
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const username = plainCreds[0]
    const password = plainCreds[1]
    const storedUserPassword = process.env[username]
    const effect = !storedUserPassword || storedUserPassword != password ? 'Deny' : 'Allow'
    const policy = generatePolicy(encodedCreds, event.methodArn, effect)
    cb(null, policy)
  } catch (err) {
    cb(`Unauthorized: ${err.message}`)
  }
};