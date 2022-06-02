FROM node:16.14.2-alpine3.12 as build-stage

WORKDIR /usr/src/app
RUN apk add git
COPY . .

RUN npm install
RUN npm run build 

FROM nginx:1.15
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html/dist
COPY --from=build-stage /usr/src/app/dist/index.html /usr/share/nginx/html/
RUN echo c2VydmVyIHsKICBsaXN0ZW4gODA7CiAgCiAgbG9jYXRpb24gLyB7CiAgICBpbmNsdWRlICAvZXRjL25naW54L21pbWUudHlwZXM7CiAgICByb290IC91c3Ivc2hhcmUvbmdpbngvaHRtbDsKICAgIGluZGV4IGluZGV4Lmh0bWwgaW5kZXguaHRtOwogICAgdHJ5X2ZpbGVzICR1cmkgJHVyaS8gL2luZGV4Lmh0bWwgPTQwNDsKICB9CiAgCiAgaW5jbHVkZSAvZXRjL25naW54L2V4dHJhLWNvbmYuZC8qLmNvbmY7Cn0K | base64 --decode > /etc/nginx/conf.d/default.conf