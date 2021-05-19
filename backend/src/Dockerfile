FROM node:10
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn install
ADD . /app
RUN npx parcel build src/main.ts -d out --no-minify --target=node --no-cache
HEALTHCHECK CMD curl --fail --max-time 1 http://localhost:8000/ || exit 1
CMD ["node", "out/main.js"]
