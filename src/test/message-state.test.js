import { describe, expect, it } from "vitest";
import { exampleMessages, readMessageIds, splitMessages } from "../legacy/message-state.js";

describe("Mensagens", () => {
  it("separa mensagens marcadas como lidas das não lidas", () => {
    const result = splitMessages([{ id: 1 }, { id: 2 }], new Set(["1"]));
    expect(result.read.map((m) => m.id)).toEqual([1]);
    expect(result.unread.map((m) => m.id)).toEqual([2]);
  });
  it("considera uma mensagem respondida como lida", () => {
    expect(splitMessages([{ id: 3, resposta: "Confirmado" }], new Set()).read).toEqual([{ id: 3, resposta: "Confirmado" }]);
  });
  it("tolera dados locais inválidos sem esconder a caixa de entrada", () => {
    expect(readMessageIds({ getItem: () => "inválido" }).size).toBe(0);
    expect(readMessageIds({ getItem: () => "{}" }).size).toBe(0);
  });
  it("identifica todos os exemplos para impedir envio real", () => {
    expect(exampleMessages.length).toBe(2);
    expect(exampleMessages.every((m) => m.exemplo === true)).toBe(true);
  });
});