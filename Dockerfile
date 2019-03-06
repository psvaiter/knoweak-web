FROM node:8-slim

# In this file we'll add modules to PATH so 'ng' can be executed without 
# installing Angular CLI globally. 
# Also, in CMD we use --poll option from ng in order to allow hot-reloading 
# on Windows hosts. This is not required for hosts that run Linux or MacOS.

ENV PATH /knoweak/node_modules/.bin:$PATH

COPY package.json package-lock.json /knoweak/

WORKDIR /knoweak/
RUN npm install

COPY . /knoweak/

CMD ng serve --host 0.0.0.0 --poll