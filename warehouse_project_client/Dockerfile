# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining app files to the working directory
COPY . .

# Build the React app
RUN npm run build

# Set the command to start the React app
CMD ["npm", "start"]

