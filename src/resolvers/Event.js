async function owner(parent, args, context) {
  return context.prisma.event({
    id: parent.id,
  }).owner();
}

async function invited(parent, args, context) {
  return context.prisma.event({
    id: parent.id,
  }).invited();
}

async function joined(parent, args, context) {
  return context.prisma.event({
    id: parent.id,
  }).joined();
}

export default {
  owner,
  invited,
  joined,
};
