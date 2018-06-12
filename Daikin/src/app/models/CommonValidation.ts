import { OnInit } from '@angular/core';
export class CommonValidation implements OnInit {
    ngOnInit() {
    }

    public isNullorEmtry(nameTxt: string, in_data: string): boolean {
        if (in_data == null || in_data === '') {
          return true;
        }
        return false;
      }

    public isCharacters(in_date: string): boolean {
        const regularChar = /^[A-Za-zก-ฮ]+$/;
        if (in_date.match(regularChar)) {
          return true;
        }
        alert('Not matched');
        return false;
      }

    public isNoSpace(nameTxt: string, in_date: string): boolean {
        const regularChar = /^\S*$/;
        if (in_date.match(regularChar)) {
          return true;
        }
        return false;
      }

    public isNumeric(in_date: string): boolean {
        const regularChar = /^[0-9]+$/;
        if (in_date.match(regularChar)) {
          return true;
        }
        return false;
      }

    public isfloatingNumber(in_date: string): boolean {
        const regularChar = /^[0-9]+\.[0-9]+$/;
        if (in_date.match(regularChar)) {
          return true;
        }
        return false;
      }

    public isAlphaNumber(in_date: string): boolean {
        const regularChar = /^[0-9a-zA-Z]+$/;
        if (in_date.match(regularChar)) {
          return true;
        }
        return false;
      }

    public isEmailFormat(in_date: string): boolean {
        const regularChar = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (in_date.match(regularChar)) {
          return true;
        }
        return false;
      }

    public isMobileNumberFormat(in_date: string): boolean {
        const regularChar = /^\d{10}$/;
        if (in_date.match(regularChar)) {
          return true;
        }
        return false;
      }
}
