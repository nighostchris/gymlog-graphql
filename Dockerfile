FROM node:latest
ENV HOST 0.0.0.0
ENV PORT 4000

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install --silent

COPY . ./
RUN yarn build

CMD ["node", "dist/index.js"]
