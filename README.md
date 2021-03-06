[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://grandstack.io/deploy-starter-netlify) [![Deploy to Vercel](https://vercel.com/button)](https://grandstack.io/deploy-starter-vercel) [![Provision Neo4j](https://grandstack.io/img/provision-neo4j.png)](https://sandbox.neo4j.com/?usecase=blank-sandbox)

<h1 style="text-align: center;">
  Gabriel's test
</h1>

## How Start?

### API
Enter inside the `api` folder and run `yarn start:dev`

### App
Enter inside the `web-react` folder and run `yarn start`

### [Deploy URL](https://boring-roentgen-9f67e3.netlify.app/)


## Todo List

- [ ] Like as graphql type, to reference on Post type. Example:
````
  type Post {
    postId: ID!
    author: User @relation(name: "AUTHOR", direction: "IN")
    title: String!
    description: String!
    numberOfLikes: Int
    comments: [Comment] @relation(name: "COMMENT", direction: "IN")
    likes: [Like] @relation(name: "LIKE", direction: "IN")
  }

  type Like {
    likeId: ID!
    author: User @relation(name: "AUTHOR", direction: "IN")
  }
````
- [ ] Improve UI
- [x] Make the comment reference work
- [ ] Reference User after create post
- [ ] Add image upload using `aws-s3` 

### Other ways to create the project without using a code generator
- [Neo4 Example Application - GraphQL JavaScrip](https://github.com/neo4j-examples/movies-graphql-javascript)
