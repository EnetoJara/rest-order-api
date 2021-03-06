FROM node:12.13.0

ENV NODE_ENV production
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . .

RUN npm install
RUN npm install --dev


EXPOSE 3000

CMD ["npm", "run", "prod"]
