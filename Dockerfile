ARG nodejs=node:20-alpine

FROM ${nodejs} AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run bundle


FROM ${nodejs} AS runner

WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/dist/bundle.js ./bundle.js

EXPOSE 7000 

CMD ["node", "bundle.js"]
