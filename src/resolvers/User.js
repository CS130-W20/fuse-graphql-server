async function ownedEvents(parent, args, context) {
  return context.prisma.events({
    where: {
      owner: {
        id: parent.id,
      },
    },
  });
}

// eslint-disable-next-line no-unused-vars
async function events(parent, { userId, association, status }, context) {
  // TODO add association support
  return context.prisma.events({
    where: {
      AND: [
        {
          OR: [
            {
              owner: {
                id: userId,
              },
            },
            {
              invited_some: {
                id: userId,
              },
            },
            {
              joined_some: {
                id: userId,
              },
            },
          ],
        },
        {
          status_in: status,
        },
      ],
    },
  });
}

export default {
  ownedEvents,
  events,
};
