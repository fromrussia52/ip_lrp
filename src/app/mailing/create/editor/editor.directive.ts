import { forwardRef, ElementRef, Directive, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorDirective),
    multi: true
};
const noop = () => { };

@Directive({
    selector: '[divContentControl]',
    providers: [VALUE_ACCESSOR]
})
export class EditorDirective implements ControlValueAccessor {
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    constructor(private el: ElementRef) { }

    @HostListener("blur")
    public onTouched() {
        this.onTouchedCallback();
    }

    @HostListener("keyup")
    public onKeyup() {
        this.changeValue();
    }

    changeValue() {
        this.writeValue(this.el.nativeElement.innerHTML);
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