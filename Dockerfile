# Stage 1: Build the React Application
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
# Copy custom Nginx configuration to support React Router on port 8080 (Cloud Run default)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built static files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 for Google Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
