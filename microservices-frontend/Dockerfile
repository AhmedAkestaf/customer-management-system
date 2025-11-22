FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build -- --output-path=dist


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/browser /usr/share/nginx/html
RUN cp /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
