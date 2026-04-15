const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function joinGame(userId, gameId) {
    const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: { participants: true }
    });

    if (!game) throw new Error("Game not found");
    if (game.status !== 'Waiting') throw new Error(`Game is already ${game.status}`);

    const exists = game.participants.some(p => p.userId === userId);
    if (exists) throw new Error("User already in game");

    return await prisma.gameParticipant.create({
        data: { userId, gameId, role: 'Player' }
    });
}

module.exports = { joinGame };