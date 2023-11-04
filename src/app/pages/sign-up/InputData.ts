export class InputElement {
  type: string;
  isAproved = false;
  borderColor: string = '#2C85D8' || 'red';
  dataValue = '';

  constructor(type: string) {
    this.type = type;
  }

  getType(): string {
    return this.type;
  }

  getIsAproved(): boolean {
    return this.isAproved;
  }
  setIsAproved(newStatus: boolean): void {
    this.isAproved = newStatus;
  }

  getBorderColor(): string {
    return this.borderColor;
  }
  setBorderColor(color: string) {
    this.borderColor = color;
  }

  getValue(): string {
    return this.dataValue;
  }
  setValue(value: string) {
    this.dataValue = value;
  }
}
