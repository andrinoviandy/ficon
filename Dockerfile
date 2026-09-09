# Build Stage
FROM node:20.11.1 AS builder

ARG REACT_APP_API_URL
ARG REACT_APP_BASE_URL
ARG REACT_APP_BASE_URL_LOCAL
ARG REACT_APP_PORTALSI_SALT

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:stable-alpine

# Copy built React files to Nginx HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Replace default Nginx config with custom one if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
