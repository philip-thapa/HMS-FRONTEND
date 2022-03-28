import {FormGroup} from "@angular/forms"


export function IdValidator(
    controlName: string,
    CompareControlName: string,
  ) {
    return (formGroup: FormGroup) => {
      const id_proof_type = formGroup.controls[controlName];
      const id_proof_number = formGroup.controls[CompareControlName];
  
      if (id_proof_type.value == 'Aadhar') {
        if(!/(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/g.test(id_proof_number.value))
            id_proof_number.setErrors({ mustmatch: true });
      } else if(id_proof_type.value == 'PAN') {
          if(!/[A-Za-z]{5}\d{4}[A-Za-z]{1}/g.test(id_proof_number.value))
            id_proof_number.setErrors({mustmatch: true});
      } else if(id_proof_type.value == "License"){
        if(!/^([A-Z]{2})(\d{2}|\d{3})[a-zA-Z]{0,1}(\d{4})(\d{7})$/g.test(id_proof_number.value))
        id_proof_number.setErrors({mustmatch: true});
      }else
        id_proof_number.setErrors(null);
      }
    };


export function DatesCompare(from: string, to: string) {
  return (group: FormGroup) => {
    const check_in_date = new Date(group.controls[from].value);
    const check_out_date = new Date(group.controls[to].value);
    if (check_in_date > check_out_date) {
      group.controls[to].setErrors({dateError: true})
    }
    group.controls[to].setErrors(null)
  }
}
