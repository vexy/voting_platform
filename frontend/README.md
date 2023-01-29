# Voting platform frontend
Frontend component of the simple _distributed voting platform_.  
It is written in `TypeScript` with `SvelteKit` framework.  

Platform version: `v1.2`  
Platform URL: `https://infoportal.app`

## Base features
  - search questions
  - add new content
  - interact with content (question vote)
  - report inadequate content

## Installation
Make sure you have latest [NPM](https://www.npmjs.com/) installed.  
This project uses:
- node `v16.15`
- npm `v8.5.5`

Then, perform installation in this way:
```bash
npm install    # wait for installation to complete
```

## Preview & Development
Current Svelte adapter is `adapter-node`. You can adjust `svelte.config.js` for your needs.  

To run the frontend component in development mode, execute the following:
```bash
npm run dev
```
After transpile completes, you should see a project interface if you visit `localhost`, port `3000` or `5000` in your browser.


To make production ready build, use:
```bash
npm run build  #wait for build to complete
```

---
Copyright (c) by Vexy, November 2021  
GPG: `E95AC467 2CB80301 05AD28E5 D9870441 7A92DE56`
