# Start from the official Node.js LTS base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally in the docker image
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Define arguments for the ports
ARG HTTP_PORT
ARG GRPC_PORT

# Set the ports from the arguments
ENV HTTP_PORT=$HTTP_PORT
ENV GRPC_PORT=$GRPC_PORT

# Expose the ports the app runs on
EXPOSE $HTTP_PORT $GRPC_PORT

#EXPOSE 5000 50051

# Start the application
CMD ["pnpm", "run", "start:dev"]