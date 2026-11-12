import { beforeEach, describe, expect, it } from "vitest";
import { readDatabaseEntries, saveDatabaseEntry } from "../legacy/database-catalog.js";

describe("container cargo associations", () => {
  beforeEach(() => localStorage.clear());

  it("links a container to selected cargo types and preserves its ID", () => {
    const container = readDatabaseEntries("conteiner")[0];
    const cargos = readDatabaseEntries("carga");
    saveDatabaseEntry("conteiner", { ...container, cargas: cargos[1].codigo }, container.id);
    const saved = readDatabaseEntries("conteiner").find((entry) => entry.id === container.id);
    expect(saved.codigo).toBe(container.codigo);
    expect(saved.cargas).toBe(cargos[1].codigo);
    expect(readDatabaseEntries("carga")[1].conteineres.split(", ")).toContain(container.codigo);
    expect(readDatabaseEntries("carga")[0].conteineres.split(", ")).not.toContain(container.codigo);
  });

  it("reflects cargo-side edits on the container side", () => {
    const container = readDatabaseEntries("conteiner")[0];
    const cargo = readDatabaseEntries("carga")[1];
    saveDatabaseEntry("carga", { ...cargo, conteineres: container.codigo }, cargo.id);
    expect(readDatabaseEntries("conteiner")[0].cargas.split(", ")).toContain(cargo.codigo);
  });

  it("rejects nonexistent cargo IDs without modifying existing links", () => {
    const container = readDatabaseEntries("conteiner")[0];
    expect(() => saveDatabaseEntry("conteiner", { ...container, cargas: "CRG-999999" }, container.id)).toThrow("ID de carga não encontrado");
    expect(readDatabaseEntries("conteiner")[0].cargas).toBe(container.cargas);
  });
});