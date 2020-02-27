# Tests

We use the Jest testing framework to test different components of our app.

## Meta Tests

### jest is working
Empty test to ensure that the jest testing framework is working correctly

## GraphQL Tests

### ping the graphql server
Pings the GraphQL server and asserts that it gets a 'pong' response

### get auth token
Attempts a login mutation with a known set of test credentials and asserts
that an authorization token is returned

### wrong password fails login
Asserts that a login with an incorrect password fails with the correct 
error message

### invalid email fails login
Asserts that a login with an invalid email fails with the correct error
message