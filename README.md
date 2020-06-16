# Bons-Nodejs

Node.js Challenge

> # Create Game

- **Method: POST**
- **Route: /game**
- **Body**: 1-hero: Choose a name. 2-turns: How much turns do you wanna play? cannot be more than 12.

> # Get Game

- **Method: GET**
- **Route: /game**

> # Next Turn

- **Method: POST**
- **Route:/game/turn**
- **Body**: If is your turn send index, with the number of the card you want to play. Example {"index":1}

> # Players Status

- **Method: GET**
- **Route:/player**
- **Body**: type could be "hero" or "monster". Example: {"type":"hero"}

> # Players Cards

- **Method: GET**
- **Route:/playerscards**
- **No Parameters**: Return to you the cards of monster and hero.
