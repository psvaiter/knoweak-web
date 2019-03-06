FROM node:8-alpine

# Adding modules to PATH so 'ng' can be executed without 
# installing Angular CLI globally.
ENV PATH /knoweak/node_modules/.bin:$PATH

COPY package.json package-lock.json /knoweak/

WORKDIR /knoweak/
RUN npm install

COPY . /knoweak/

CMD ng serve --host 0.0.0.0