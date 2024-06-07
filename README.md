This is a [Next.js 14](https://nextjs.org/) project demonstrating some simple games using popular frontend libraries.
You can see the

## How to use it

You can run the project locally at http://localhost:3000/, or you can view the demo website deployed on Vercel at [Demo](https://simple-games-six.vercel.app/).

Hint: Your Node.js version must be above 18.17.0.

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Game 1 - Tic-Tac-Toe

Features:

1. Users can select a level with board sizes 3x3, 4x4, or 5x5.
2. The user plays as the first player with 'O', and the AI player plays as the second player with 'X'.
3. The AI player uses the [Alpha-Beta pruning algorithm](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) (an enhanced version of the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax)) with a maximum depth set to 5. Web workers are used to calculate the results to prevent UI blocking issues.

## Internationalization

This project uses i18n libraries including [next-intl](https://next-intl-docs.vercel.app/) and [i18nexus](https://i18nexus.com/). (Please refer to [next-intl document](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing) or [i18nexus tutorial](https://i18nexus.com/tutorials/nextjs/next-intl) for more information.)

You can register an i18nexus account and project for free and import the entire messages directory. Then, you can modify the string table on the i18nexus console and run the pull script to update the string files:

```bash
npm run pull-string
```
