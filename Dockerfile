from node:18.17.1

ARG PORT
ENV PORT=$PORT

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE ${PORT}
CMD ["npm", "run", "start"]