# How to use

1. Run `npm install`
2. Start the server by running: `npx ts-node ./src/server/index.ts`
3. In a new terminal, still leaving the server running, start a client by running: `npx ts-node ./src/client/index.ts`
4. In a new terminal, still leaving the server and other client running, start another client by running: `npx ts-node ./src/client/index.ts`
5. In each client terminal answer the prompt to give each client a username. These must be different or you will be asked to enter another username.
6. The quiz should now have started automatically. Use the arrow keys and enter button to select an answer from the options. You have 10 seconds to answer.
7. Once the quiz has finished the clients will exit informing each of the scores. The server resets and you are free to start clients to play again.