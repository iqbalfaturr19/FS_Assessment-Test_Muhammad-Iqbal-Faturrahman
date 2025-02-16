# Gunakan image Node.js versi 18
FROM node:18

# Set direktori kerja
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh project ke dalam container
COPY . .

# Jalankan aplikasi saat container berjalan
CMD ["npm", "run", "dev"]