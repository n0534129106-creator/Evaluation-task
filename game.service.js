const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function joinGame(userId, gameId) {
     try {
    const game = await prisma.game.findUnique({
        where: { id: gameId },
        // ע"מ שלא ניצטרך לשלוף הכל בדיקה ישירה האם האם המשתמש קים במשחק הזה
        select: { 
            status: true,
            // בודקים ישירות אם המשתמש הספציפי כבר קיים במשחק הזה
            participants: {
                where: { userId: userId }
            }
        }
    });

    if (!game) throw new Error("Game not found");
    if (game.status !== 'Waiting') throw new Error(`Game is already ${game.status}`);

// הבדיקה אם המשתמש כבר נמצא במשחק הזה, אם כן, לא ניתן להצטרף שוב
    if (game.participants.length > 0) {
        throw new Error("User already in game");
    }

    // יצירת הקשר החדש (GameParticipant)
    return await prisma.gameParticipant.create({
        data: { 
            userId: userId, 
            gameId: gameId, 
            role: 'Player' // כאן חשוב להשתמש בערך ה-Enum שהגדרת ב-Prisma
        }
    });
}
catch (error) {
    if (error.code === 'P2002') {
            throw new Error("Concurrency error: User already joined this game");
        }
        throw error;
    }
}

module.exports = { joinGame };