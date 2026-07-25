import { FormControl, FormGroup, Validators } from '@angular/forms';

export function parseData(data: any): any {
  return typeof data === 'object' ? data : typeof data === 'string' ? JSON.parse(data) : data;
}

export function buildFormGroupFromFields(fields: any[] = []): FormGroup {
  const controls: { [key: string]: FormControl } = {};
  fields.forEach(field => {
    const validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.validations?.minLength) validators.push(Validators.minLength(field.validations.minLength.value));
    controls[field.key] = new FormControl(field.defaultValue || '', validators);
  });
  return new FormGroup(controls);
}

export function classList(...items: Array<string | null | undefined | false>): string {
  return items.filter(Boolean).join(' ');
}
