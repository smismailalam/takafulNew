export function newConnection(connection) {
  return {
    type: 'newConnection',
    connection,
  };
}
