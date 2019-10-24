## Server

- [api-docs](https://exapmle.app/api-docs/#/)

### Installation

Server:
```
npm install
npm run serve
```
### Environment
Create .env file in the root of the project with DB uri to connect postgres and firebase credentials. Check the .env.example file.

#### Database credentials
- DATABASE_URL = postgres://\[user]:\[password]@\[host]:\[port]/\[db_name]

### Development

#### Naming Conventions

##### Use lowerCamelCase for variables, properties and function names

Variables, properties and function names should use `lowerCamelCase`.  They
should also be descriptive. Single character variables and uncommon
abbreviations should generally be avoided.

##### Use UpperCamelCase for class names

Class names should be capitalized using `UpperCamelCase`.


##### Use UPPERCASE for Constants

Constants should be declared as regular variables or static class properties,
using all uppercase letters.

##### Use kebab-case for file names.

There is no official rule that you have to follow while naming your js file,
but the practice of using a hyphenated name like "some-name.js" is the most widely followed naming convention.