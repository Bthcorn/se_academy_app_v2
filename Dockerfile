# Stage 1: Build the static site
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the application code to the container
COPY . .

# Install dependencies and build the static files
RUN npm install && npm run build

# Stage 2: Serve static files with Nginx
FROM nginx:stable-alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Copy the built static files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
