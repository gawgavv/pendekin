# Pendekin Design Documentation

## Project Details

- Author: gawgaw
- Developer: gawgaw
- Version: 1.0
- Description: A service that helps to shorten a long URL and manage those shortened URLs.

<br>

## Minimum Viable Product
- User can submit a long URL and get a shortened URL as long as the user's requests haven't exceeded limit
- Somebody can uses the shortened URL and gets redirected to the original long URL
- User can see how many people clicked the shortened URL

<br>

## Entity Relation Diagram

![pendekin-ERD](./assets/Pendekin_ERD.png)

<br>

## Application Diagram Flow

### User generates a shortened URL
![pendekin-flow-1](./assets/Generate_Short_URL_Flow.drawio.png)

### Somebody clicked the shortened URL
![pendekin-flow-2](./assets/Click_Short_URL_Flow.drawio.png)

### User requests data on the number of people clicked the shortened URL
![pendekin-flow-3](./assets/Click_Short_URL_Flow.drawio.png)

<br>

## Design Challenges