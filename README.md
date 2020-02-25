## Installation

1. Install node (I used version 13.7.0 to develop this codebase)
2. Clone this repository and cd into it. This location will now be referred as by the root directory in the following documentation.
3. Install node modules for the server and the client
   - From the root directoy run `cd server && npm install --production`
   - From the root directoy run `cd client && npm install --production`

## Starting the application

Please note the call to the geocode.xyz api sometimes fails and doesn't work even after a few refreshes. Just wait a minute or so and it should resolve itself.

1. From the root directoy run `cd server && npm start`
2. In a new terminal, from the root directoy run `cd client && npm start`
3. Go to http://localhost:3000 to see the application running

## Running Tests

1. Download dev dependencies. From the root directoy run `cd client && npm install && npm run test`

## Comments

1. I use a server to mediate the calls to the darksky API. This is so that the secret key you obtain fron darksky is not exposed to the fontend, which would be a security risk.

## Things to refactor given more time

1. Biggest flaw to this project is no tests for App.tsx. I made the mistake of leaving this until last and therefore ran out of time. I have used enzyme a lot with lifecycles but it works differently with hooks. `handleSubmit` function is clearly too complicated and with more time I would have refactored the api calls to exist in the container component in which the relationship would have been App -> Container -> Forecast. This would mean that clicking the magnifying glass would render the container and the container would call the API nested in a useEffect. This would mean that the click and the API calls are not so tightly coupled and therefore is easier to test seperately and isolated. It is clear that enzyme in relation to react hooks is something that I need to work on but would love some feedback on my theorised approach to solving the problem.

2. Magnifying glass in the search box is slightly off center vertically.

3. The geocoding service is rudimentary I would implement suggestions and auto correct if this was a production grade app.

4. I could have certainly added more information on the website such as a 7 day forecast or an hourly view however it was clear that the main focus was on the code itself. Its clear from my portfolio that I am capable of good responsive design.
