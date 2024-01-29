# Use an official Node.js runtime as a parent image
FROM node:14 as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install client dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the build output from the previous stage to the nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the world outside this container
EXPOSE 80

# Copy the Nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Run nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]













# # build environment
# FROM node:14-alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# RUN npm install
# COPY . ./
# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


