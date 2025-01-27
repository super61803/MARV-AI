FROM node:20.15-bullseye-slim as base

FROM base as builder

WORKDIR /home/node/app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

WORKDIR /home/node/app
COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps --production
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

# Copy the .env file
COPY .env ./

EXPOSE 3000

CMD ["node", "dist/server.js"]
