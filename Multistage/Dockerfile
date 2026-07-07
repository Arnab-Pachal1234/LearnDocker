FROM  node:24.14.0-alpine3.22 as base 

#stage 1
FROM  base as builder

WORKDIR /home/build

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY src/ src/

RUN npm run build

#Stage-2
FROM base as runner

WORKDIR /home/build

COPY --from=builder /home/build/dist dist/
COPY --from=builder /home/build/package*.json .

RUN  npm install --omit=dev
#Security Concern not giving the root access 
RUN addgroup --system  --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

USER  nodejs
EXPOSE 3000
ENV PORT = 8000

CMD ["npm" , "start"]

