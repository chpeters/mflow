# mFlow.tech

### [mflow.tech](mflow.tech)

## Table of Contents

- [Overview](#overview)
- [Deployment](#deployment)
  - [Now](#Now)

## Overview

mFlow is a financial visualization web app that helps users understand their income and expenses.

## Tech

This is a monorepo split up in the frontend code residinng in `/frontend` and backend code residing in `/api`. We use Create React App with React and Redux on the frontend. On the backend, we expose several lambda functions that make requests to our database.

## Deployment

### [Now](https://zeit.co/now)

We use Zeit Now v2 for deployment. Every push (on every branch) to Github will run Now based on the `now.json` file in the root directory. It will do the following steps:

1. Builds the frontend into static assets, putting it in `/frontend/dist`
2. Builds lambdas for all api endpoints in the backend
3. Setup routing so that the frontend lives under `/` and the backend under `/api`
4. Creates a URL for the deploy (i.e. blahblahbblah.now.sh)
5. If the push was to master, it will alias that deploy to [mflow.tech](mflow.tech)
