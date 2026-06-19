interface Observer {
  update(temp: number, humidity?: number, pressure?: number): void;
}

interface Subject {
  register(o: Observer): void;
  remove(o: Observer): void;
  notify(): void;
}