FROM node:18-alpine 

WORKDIR /app

COPY package*.json tsconfig*.json nest-cli.json webpack.config.js ./
COPY src /app/src

RUN npm install
RUN npm run build

RUN rm *.json && \
    rm  webpack.config.js && \
    rm -r .webpack && \
    rm -r src && \
    rm -rf node_modules 


EXPOSE 7000 

CMD node dist/main.js