#Base Image
FROM  node:24.14.0-alpine3.22

WORKDIR /home/app

RUN apk add --no-cache curl
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY index.js index.js
#Automatic Portmapping
ENV PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
CMD ["npm","start"]

#Portmapping 
#docker run -it host_machineportno : containerportno immage_name
#To make the automatic port mapping we use [docker run -it -P app2 ] (it will randomly assign a port number with the exposed port number)
#For detach mode   (  docker run -itd -P app2 )
#If i want to automatically remove the container when the container is stopped  (docker run -it --rm app2)
