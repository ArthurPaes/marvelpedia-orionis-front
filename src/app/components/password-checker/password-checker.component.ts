import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { IPasswordChecker, IRules } from './interface/password-checker.interface';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.scss'],
})
export class PasswordCheckerComponent implements OnChanges {
  /**
   * setStatus
   * Sets the status to a given rule.
   * @param rule: A rule from password rule list: eightChars | oneLetter | oneNumber | oneSpecialChar.
   * @param status: Set the rule status: True | False | Null.
   */
  setStatus = (rule: keyof IRules, status: boolean | null): void => {
    switch (status) {
      case true:
        this.ruleList[rule] = 'aproved';
        this.currentStatus[rule] = true;
        break;
      case false:
        this.ruleList[rule] = 'notAproved';
        this.currentStatus[rule] = false;
        break;
      case null:
        this.ruleList[rule] = 'waitingTest';
        this.currentStatus[rule] = null;
        break;
    }
  };
  /**
   * passwordChecker
   * Recives the password input from parent component and check it against the regex rules.
   * @param passwordInput:
   */
  passwordChecker = (passwordInput: string): void => {
    if (passwordInput.length >= 8) {
      this.setStatus('eightChars', true);
      passwordInput.match(/[a-zA-Z]+/)
        ? this.setStatus('oneLetter', true)
        : this.setStatus('oneLetter', false);
      passwordInput.match(/\d/)
        ? this.setStatus('oneNumber', true)
        : this.setStatus('oneNumber', false);
      passwordInput.match(/[!@#]/)
        ? this.setStatus('oneSpecialChar', true)
        : this.setStatus('oneSpecialChar', false);
    } else {
      this.setStatus('eightChars', false);
      this.setStatus('oneLetter', null);
      this.setStatus('oneNumber', null);
      this.setStatus('oneSpecialChar', null);
    }
  };
  @Input() passwordInput = '';
  @Output() sendStatus = new EventEmitter<boolean>();
  currentStatus: IPasswordChecker = <IPasswordChecker>{
    eightChars: false,
    oneLetter: false,
    oneNumber: false,
    oneSpecialChar: false,
  };
  ruleList: IRules = {
    eightChars: 'waitingTest',
    oneLetter: 'waitingTest',
    oneNumber: 'waitingTest',
    oneSpecialChar: 'waitingTest',
  };
  /**
   * ngOnChanges
   * Checks the passwordInput and emits the current status of overall rules trigged by passwordInput change.
   * @param passwordInput:
   */
  ngOnChanges() {
    this.sendStatus.emit(
      Object.values(this.currentStatus).reduce((a, c) => a && c),
    );
    this.passwordInput != undefined
      ? this.passwordChecker(this.passwordInput)
      : this.setStatus('eightChars', null);
  }
}
