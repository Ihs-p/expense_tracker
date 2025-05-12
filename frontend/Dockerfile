


FROM node:20.16.0

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install && npm rebuild esbuild

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
