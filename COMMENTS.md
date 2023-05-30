# Comments
Let's start by defining to steps to take and a small description of each.

## API
We will start by implementing the API, this way we have everything ready for the webapp.

### Structure
We will follow an hexagonal structure, in this case we will define 3 main folders:
__domain__, __aplication__ and __infrastructure__

#### Domain
This folder will contain our 2 main entities: __drink__ and __sale__

##### Drink
Contains the following properties: __name__, __price__, __cost__  and __quantity__.
The DrinksReposity contains a __getAll__ and __update__ methods.

##### Sale
Contains the following properties: __drinkId__, __quantity__ and __profit__.

#### Application
Contains use cases for the application: __getAllDrinks__ and __createSale__.

#### Infrastructure
Contains 2 folders: __controllers__ and __services__.

##### Controllers
Contains a __drinks__ controller with a `get` __index__ route to get all drinks and a __sales__ controller with a `post` __index__ route to create the sale.

##### Services
Contains implementations for the repositories using json files for simplicity reasons.

### Migrations
A migration command un Make will be added to create the "database" and populate with a few drinks.

## Webapp
To be added...
