# Section 4

## Ethereum App Architecture
* Review of traditional architecture
    * User sends requests to server to modify the database
    * Server is used to host a web address
    * Server engages with database
    * Layout
        * User <> server <> database
* Review of Ethereum architecture
    * Server sends HTML/JS assets to the browser but does not interact with the database
    * User transacts with the blockchain without the use of a server
    * Layout
        * User <> server
        * User <> database
* The user (or "client") is responsible for writing any data inside our application so most of the code we are writing is executed inside the users browser
    * React JS is the preferred library to simplify complex code inside the browser

## Boilerplate and React App Updates
* run `npx create-react-app lottery-react`