This is a [Next.js 14](https://nextjs.org/) project demonstrating some simple games using popular frontend libraries.

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Internationalization

This project uses i18n libraries including [next-intl](https://next-intl-docs.vercel.app/) and [i18nexus](https://i18nexus.com/). (Please refer to [next-intl document](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing) or [i18nexus tutorial](https://i18nexus.com/tutorials/nextjs/next-intl) for more information.)

You can register an i18nexus account and project for free and import the entire messages directory. Then, you can modify the string table on the i18nexus console and run the pull script to update the string files:

```bash
npm run pull-string
```
