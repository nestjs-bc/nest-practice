#!/bin/bash
npm run build
NODE_ENV=prod pm2 restart dist/main.js --name nest-skeleton