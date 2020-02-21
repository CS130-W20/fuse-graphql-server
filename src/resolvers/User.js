async function ownedEvents(parent, args, context) {
  return context.prisma.events({
    where: {
      owner: {
        id: parent.id,
      },
    },
  });
}

export default {
  ownedEvents,
};
