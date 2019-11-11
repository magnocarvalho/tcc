import { FormGroup, ValidatorFn } from '@angular/forms';

/** this control value must be equal to given control's value */
export function priceValidator(targetKey: string, toMatchKey: string, descont: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
        const target = group.controls[targetKey];
        const toMatch = group.controls[toMatchKey];
        const desconto = group.controls[descont];

        if (target.touched && toMatch.touched) {
            const isMatch = target.value > toMatch.value;
            if (target.value < toMatch.value) {
                toMatch.setErrors({ menor: targetKey });
                return { 'menor': 'Valor inicial maior que com desconto' };
            }
            // set equal value error on dirty controls
            if (!isMatch && (target.valid && toMatch.valid) && (target.value > 0 && toMatch.value > 0)) {
                // console.log(target.value, toMatch.value)
                toMatch.setErrors({ menor: targetKey });
                const message = targetKey + ' != ' + toMatchKey;
                return { 'menor': message };
            }
            if (isMatch && toMatch.hasError('menor')) {
                toMatch.setErrors(null);
            }
        }
        return null;
    };
}