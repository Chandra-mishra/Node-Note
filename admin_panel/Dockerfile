FROM node:12.4.0-stretch

# Create app directory
WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./

EXPOSE 3000
CMD [ "npm", "start" ]

