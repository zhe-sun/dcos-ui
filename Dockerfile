FROM alpine

#ENV http_proxy http://web-proxy.houston.hp.com:8080
#ENV https_proxy https://web-proxy.houston.hp.com:8080


# install dependencies for imagemin
RUN apk update && apk add \
	autoconf \
	automake \
	build-base \
	file \
	libpng-dev \
	nasm \
	nodejs \
	&& rm -rf /var/cache/apk/*

#RUN npm config set registry http://registry.npmjs.org/
#RUN npm cache clear 

#RUN npm config set proxy "http://web-proxy.houston.hp.com:8080"

#RUN npm config set https-proxy "https://web-proxy.houston.hp.com:8080"

#RUN npm set strict-ssl false

RUN npm install -g gulp 

COPY . /usr/src/dcos-ui
WORKDIR /usr/src/dcos-ui

RUN npm install 

CMD ["npm", "run", "serve"]
