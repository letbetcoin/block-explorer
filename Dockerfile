FROM node:alpine
ADD dist /block-explorer/
ADD node_modules /block-explorer/node_modules 
WORKDIR /block-explorer
CMD node server.js
