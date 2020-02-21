async function owner(parent, args, context) {
  return context.prisma.event({
    id: parent.id,
  }).owner();
}

export default {
  owner,
};
