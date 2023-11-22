export class InputElement {
  type: string;
  isAproved = false;
  borderColor = '';
  dataValue = '';
  fieldLabel = '';

  constructor(type: string) {
    this.type = type;
  }
  /**
   * getType
   * Returns the InputElement instance name.
   */
  getType(): string {
    return this.type;
  }
  /**
   * getIsAproved
   * Returns the InputElement instance aproval flag.
   */
  getIsAproved(): boolean {
    return this.isAproved;
  }
  /**
   * setIsAproved
   * Assigns a new value to the InputElement instance aproval flag.
   */
  setIsAproved(newStatus: boolean): void {
    this.isAproved = newStatus;
  }
  /**
   * getBorderColor
   * Returns the InputElement instance borderColor property value.
   */
  getBorderColor(): string {
    return this.borderColor;
  }
  /**
   * setBorderColor
   *  Assigns a new color to the InputElement instance borderColor property.
   */
  setBorderColor(color: string) {
    this.borderColor = color;
  }
  /**
   * getValue
   * Returns the InputElement instance text value.
   */
  getValue(): string {
    return this.dataValue;
  }
  /**
   * setValue
   * Assigns a new value to the InputElement instance value.
   */
  setValue(value: string) {
    this.dataValue = value;
  }
  /**
   * getFieldLabe
   * Returns the InputElement instance fieldset value.
   */
  getFieldLabel(): string {
    return this.fieldLabel;
  }
  /**
   * setFieldLabel
   * Assigns a new value to the InputElement instance fieldset property.
   */
  setFieldLabel(value: string) {
    this.fieldLabel = value;
  }
}
