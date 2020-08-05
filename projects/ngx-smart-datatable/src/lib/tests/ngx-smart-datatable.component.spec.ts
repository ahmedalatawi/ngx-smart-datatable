import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSmartDatatableComponent } from '../ngx-smart-datatable.component';

describe('NgxSmartDatatableComponent', () => {
    let component: NgxSmartDatatableComponent;
    let fixture: ComponentFixture<NgxSmartDatatableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgxSmartDatatableComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxSmartDatatableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
