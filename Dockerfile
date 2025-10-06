# Dockerfile
FROM php:8.2-apache

# Optional but useful
RUN a2enmod rewrite

# Copy your app into Apache's doc root
COPY . /var/www/html/

# form-viewer.php will be at https://<service>.onrender.com/form-viewer.php
