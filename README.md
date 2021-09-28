# star-warz-app
Star-Warz-Challenge API is an application that consumes the [star wars API](https://pipedream.com/apps/swapi). Get movies and characters from the API and add comments to a given movie.

This collection contains sample requests from this [API](https://fathomless-retreat-17386.herokuapp.com/api)

It contains the following requests

• Get Movies (GET) [/movies/movies](https://fathomless-retreat-17386.herokuapp.com/api/movies/movies)

• Get Characters (GET) [/movies/characters](https://fathomless-retreat-17386.herokuapp.com/api/movies/characters)

• Get Comments (GET) [/comments/](https://fathomless-retreat-17386.herokuapp.com/api/comments/)

• Get Comment (GET) [/comments/:commentId](https://fathomless-retreat-17386.herokuapp.com/api/comments/:commentId)

• Create Comment (POST) [/comments/:movieId](https://fathomless-retreat-17386.herokuapp.com/api/comments/:movieId)
    #Where movieId === episode_id of a movie

• Update Comment (PATCH) [/comments/:commentId](https://fathomless-retreat-17386.herokuapp.com/api/comments/:commentId)

• Delete Comment (DELETE) [/comments/:commentId](https://fathomless-retreat-17386.herokuapp.com/api/comments/:commentId)

# Get Movies route

• EndPoint "/movies/movies"

• Request type: GET

• A successful result will result in a HTTP 200 Status Code and a response object 
```
•{
  "status": 200,
  "result": [
    {
      "episode_id": 4,
      "name": "A New Hope",
      "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      "release_date": "1977-05-25",
      "comment_counts": 1
    },
    {
      "episode_id": 5,
      "name": "The Empire Strikes Back",
      "opening_crawl": "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
      "release_date": "1980-05-17",
      "comment_counts": 0
    }
  ]
}

```
# Get Characters route

• EndPoint "/movies/characters"

• Request type: GET

• A successful request will result in a HTTP 200 Status Code and a response object 
```
{
  "total_height_cm": "1592cm",
  "total_height_inches": "64.90inches",
  "total_height_ft": "46.82ft",
  "character_count": 10,
  "results": [
    {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "skin_color": "fair",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
      "homeworld": "https://swapi.dev/api/planets/1/",
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
      ],
      "species": [],
      "vehicles": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
      ],
      "starships": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
      ],
      "created": "2014-12-09T13:50:51.644000Z",
      "edited": "2014-12-20T21:17:56.891000Z",
      "url": "https://swapi.dev/api/people/1/"
    },
    {
      "name": "C-3PO",
      "height": "167",
      "mass": "75",
      "hair_color": "n/a",
      "skin_color": "gold",
      "eye_color": "yellow",
      "birth_year": "112BBY",
      "gender": "n/a",
      "homeworld": "https://swapi.dev/api/planets/1/",
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/"
      ],
      "species": [
        "https://swapi.dev/api/species/2/"
      ],
      "vehicles": [],
      "starships": [],
      "created": "2014-12-10T15:10:51.357000Z",
      "edited": "2014-12-20T21:17:50.309000Z",
      "url": "https://swapi.dev/api/people/2/"
    }
  ],
  "status": 200
}

```

# Get Characters with sort or filter query parameter route

• EndPoint "movies/characters?sort=name:asc&filter=female"

• Request type: GET

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
  "total_height_cm": "315cm",
  "total_height_inches": "12.84inches",
  "total_height_ft": "9.26ft",
  "character_count": 2,
  "results": [
    {
      "name": "Beru Whitesun lars",
      "height": "165",
      "mass": "75",
      "hair_color": "brown",
      "skin_color": "light",
      "eye_color": "blue",
      "birth_year": "47BBY",
      "gender": "female",
      "homeworld": "https://swapi.dev/api/planets/1/",
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/"
      ],
      "species": [],
      "vehicles": [],
      "starships": [],
      "created": "2014-12-10T15:53:41.121000Z",
      "edited": "2014-12-20T21:17:50.319000Z",
      "url": "https://swapi.dev/api/people/7/"
    },
    {
      "name": "Leia Organa",
      "height": "150",
      "mass": "49",
      "hair_color": "brown",
      "skin_color": "light",
      "eye_color": "brown",
      "birth_year": "19BBY",
      "gender": "female",
      "homeworld": "https://swapi.dev/api/planets/2/",
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
      ],
      "species": [],
      "vehicles": [
        "https://swapi.dev/api/vehicles/30/"
      ],
      "starships": [],
      "created": "2014-12-10T15:20:09.791000Z",
      "edited": "2014-12-20T21:17:50.315000Z",
      "url": "https://swapi.dev/api/people/5/"
    }
  ],
  "status": 200
}

```
# Create Comment route

• EndPoint "/comments/:movieId"

• Request type: POST

• Request type: comment

example:

```
{
    "comment" : "This is an Interesting movie with episode_id 5 like craze"
}
```

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
  "status": 200,
  "savedComment": {
    "id": 2,
    "comment": "This is an Interesting movie with episode_id 5 like craze",
    "movieId": 5,
    "publicIp": "172.16.178.2",
    "updatedAt": "2021-09-28T01:49:40.336Z",
    "createdAt": "2021-09-28T01:49:40.336Z"
  }
}

```

# Get Comments route

• EndPoint "/comments/"

• Request type: GET

• A successful request will result in a HTTP 200 Status Code and a response object 
```
{
  "status": 200,
  "comments": [
    {
      "id": 2,
      "comment": "This is an Interesting movie with episode_id 5 like craze",
      "publicIp": "172.16.178.2",
      "movieId": 5,
      "createdAt": "2021-09-28T01:49:40.336Z",
      "updatedAt": "2021-09-28T01:49:40.336Z"
    },
    {
      "id": 1,
      "comment": "This is an Interesting movie like craze",
      "publicIp": "172.16.178.2",
      "movieId": 4,
      "createdAt": "2021-09-28T01:43:14.726Z",
      "updatedAt": "2021-09-28T01:43:14.726Z"
    }
  ]
}

```

# Get Comment route

• EndPoint "/comments/:commentId"

• Request type: GET

• A successful request will result in a HTTP 200 Status Code and a response object 
```
{
  "status": 200,
  "comment": {
    "id": 2,
    "comment": "This is an Interesting movie with episode_id 5 like craze",
    "publicIp": "172.16.178.2",
    "movieId": 5,
    "createdAt": "2021-09-28T01:49:40.336Z",
    "updatedAt": "2021-09-28T01:49:40.336Z"
  }
}

```

# Update Comment route

• EndPoint "/comments/:commentId"

• Request type: PATCH

• payload: comment

e.g

```
{
    "comment" : "What a great api, giving me joy"
}

```

• A successful request will result in a HTTP 200 Status Code and a response object 
```
{
  "status": 200,
  "updatedComment": [
    1
  ]
}

```

# delete comment

• EndPoint "/comments/:id"

• Request type: DELETE

• A successful request will return 1.

[Link to the API documentation with sample requests](https://documenter.getpostman.com/view/9775449/UUxzASmd)
