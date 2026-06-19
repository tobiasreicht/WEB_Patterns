export interface Observer {
  update(temp: number, humidity?: number, pressure?: number): void;
}

export interface Subject {
  register(o: Observer): void;
  remove(o: Observer): void;
  notify(): void;
}