const { PrismaClient } = require('@prisma/client');
const { joinGame } = require('./game.service');

const prisma = new PrismaClient();

async function main() {
    try {
        // 1. התחברות למסד הנתונים [cite: 25]
        await prisma.$connect();
        console.log("Connected to database.");

        // 2. יצירת נתוני דמי: משתמש אחד ומשחק אחד בסטטוס Waiting [cite: 26]
        const user = await prisma.user.create({
            data: { username: `user_${Date.now()}` }
        });

        const game = await prisma.game.create({
            data: { status: 'Waiting' }
        });

        console.log(`Created User (ID: ${user.id}) and Game (ID: ${game.id})`);

        // 3. קריאה לפונקציה joinGame עם הנתונים שנוצרו [cite: 27]
        await joinGame(user.id, game.id);

        // 4. הדפסת הודעת הצלחה [cite: 28, 39]
        console.log("Success: User joined game");

    } catch (error) {
        // הדפסת שגיאה אם הפעולה נכשלה [cite: 28, 29]
        console.error("Error:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();