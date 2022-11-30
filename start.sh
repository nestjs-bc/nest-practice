#!/bin/bash
npm run build
NODE_ENV=prod pm2 start dist/main.js --name nest-skeleton