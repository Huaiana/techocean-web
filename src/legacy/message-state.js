export const exampleMessages = [
  { id: "exemplo-1", nome: "Marina · Exemplo", email: "marina@example.com", conteudo: "Gostaria de solicitar um orçamento para amarração de carga conteinerizada.", exemplo: true },
  { id: "exemplo-2", nome: "Rafael · Exemplo", email: "rafael@example.com", conteudo: "Podemos confirmar a visita técnica?", resposta: "Recebemos sua solicitação e entraremos em contato.", exemplo: true },
];

export function readMessageIds(storage) {
  try {
    const value = JSON.parse(storage?.getItem("techocean.readMessages") || "[]");
    return new Set(Array.isArray(value) ? value.map(String) : []);
  } catch {
    return new Set();
  }
}

export function splitMessages(records, readIds) {
  const read = [];
  const unread = [];
  for (const message of records) {
    (message.resposta || readIds.has(String(message.id)) ? read : unread).push(message);
  }
  return { read, unread };
}