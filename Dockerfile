# משתמשים בתמונה רשמית של Node
FROM node:18

# יצירת תיקיית עבודה
WORKDIR /app

# העתקת קבצי הגדרות והתקנת תלויות
COPY package*.json ./
RUN npm install

# העתקת כל שאר הקבצים (כולל תיקיית prisma)
COPY . .

# יצירת ה-Client של Prisma (חשוב לריצה)
RUN npx prisma generate

# הפקודה שתרוץ כשהקונטיינר עולה (נשנה אותה דרך ה-compose כדי להריץ מיגרציות)
CMD ["node", "main.js"]