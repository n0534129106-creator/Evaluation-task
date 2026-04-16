FROM node:18

# התקנת תעודות אבטחה של לינוקס כדי לפתור את שגיאת ה-SSL
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# הפעם אנחנו לא מריצים פריזמה בתוך ה-Build
CMD ["node", "main.js"]