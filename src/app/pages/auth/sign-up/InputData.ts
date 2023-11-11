export class InputElement {
  type: string;
  isAproved = false;
  borderColor = '';
  dataValue = '';
  fieldLabel = '';

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

  getFieldLabel(): string {
    return this.fieldLabel;
  }
  setFieldLabel(value: string) {
    this.fieldLabel = value;
  }
}
