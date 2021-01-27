# Use the official image as a parent image.
FROM node:latest

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY package*.json ./

# Run the command inside your image filesystem.
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 80

# Run the specified command within the container. This will start both BE and FE
CMD ["npm","run", "start:prod"]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
