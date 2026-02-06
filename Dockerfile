# 1️⃣ Base image (Node runtime)
FROM node:18

# 2️⃣ App ke liye folder
WORKDIR /app

# 3️⃣ Package files copy karo
COPY package*.json ./

# 4️⃣ Dependencies install karo
RUN npm install

# 5️⃣ Baaki code copy karo
COPY . .

# 6️⃣ App ka port
EXPOSE 3000

# 7️⃣ App start command
CMD ["npm", "start"]

