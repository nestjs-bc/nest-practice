#!/bin/bash
npm ci
npm run build
NODE_ENV=prod pm2 restart dist/main.js --name nest-skeleton