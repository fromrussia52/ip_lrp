import { ChangeDetectionStrategy, Component, forwardRef, HostListener, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
};
const noop = () => { };

@Component({
    selector: 'mailing-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    providers: [VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnDestroy, ControlValueAccessor {
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private subscriptions: Subscription[] = [];

    public form: FormGroup = null;

    @HostListener("blur")
    public onTouched() {
        this.onTouchedCallback();
    }

    constructor(
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            text: ['']
        });

        this.form.controls.text.valueChanges.subscribe(value => this.onChangeCallback(value));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    writeValue(value: any) {
        this.onChangeCallback(value);
    }
}