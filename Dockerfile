FROM node:8-slim

# Node modules are being added to PATH so 'ng' can be executed without 
# installing Angular CLI globally (it's already one of the packages to 
# install).

# In CMD the ng option --poll is being used in order to allow hot-reloading 
# on Windows hosts. This is not required for hosts that run Linux or MacOS.

ENV PATH /knoweak/node_modules/.bin:$PATH

WORKDIR /knoweak/

COPY package*.json ./
RUN npm install

COPY . .

CMD ng serve --host 0.0.0.0 --poll