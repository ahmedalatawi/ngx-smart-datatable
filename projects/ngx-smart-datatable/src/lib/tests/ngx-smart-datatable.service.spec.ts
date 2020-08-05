import { TestBed } from '@angular/core/testing';

import { NgxSmartDatatableService } from '../ngx-smart-datatable.service';

describe('NgxSmartDatatableService', () => {
    let service: NgxSmartDatatableService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgxSmartDatatableService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
