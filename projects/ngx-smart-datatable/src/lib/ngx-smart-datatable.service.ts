import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, forkJoin } from 'rxjs';
import { DOCUMENT } from '@angular/common';

declare var document: any;

@Injectable({
    providedIn: 'root',
})
export class NgxSmartDatatableService {
    private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

    constructor(@Inject(DOCUMENT) private readonly document: any) {}

    lazyLoadDataTableMainLib(): Observable<any> {
        return forkJoin([
            this.loadScript(
                'https://cdn.datatables.net/v/bs4-4.1.1/jq-3.3.1/dt-1.10.21/datatables.min.js'
            ),
            this.loadStyle('https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.css'),
            this.loadStyle(
                'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css'
            ),
        ]);
    }

    lazyLoadDataTableColReorderLib(): Observable<any> {
        return forkJoin([
            this.loadScript(
                'https://cdn.datatables.net/colreorder/1.5.2/js/dataTables.colReorder.min.js'
            ),
            this.loadStyle(
                'https://cdn.datatables.net/colreorder/1.5.2/css/colReorder.bootstrap4.min.css'
            ),
        ]);
    }

    lazyLoadDataTableRowReorderLib(): Observable<any> {
        return forkJoin([
            this.loadScript(
                'https://cdn.datatables.net/rowreorder/1.2.7/js/dataTables.rowReorder.min.js'
            ),
            this.loadStyle(
                'https://cdn.datatables.net/rowreorder/1.2.7/css/rowReorder.bootstrap4.min.css'
            ),
        ]);
    }

    lazyLoadDataTableSelectLib(): Observable<any> {
        return forkJoin([
            this.loadScript('https://cdn.datatables.net/select/1.3.1/js/dataTables.select.min.js'),
            this.loadStyle('https://cdn.datatables.net/select/1.3.1/css/select.bootstrap4.min.css'),
        ]);
    }

    lazyLoadDataTableFixedHeaderLib(): Observable<any> {
        return forkJoin([
            this.loadScript(
                'https://cdn.datatables.net/fixedheader/3.1.7/js/dataTables.fixedHeader.min.js'
            ),
            this.loadStyle(
                'https://cdn.datatables.net/fixedheader/3.1.7/css/fixedHeader.bootstrap4.min.css'
            ),
        ]);
    }

    lazyLoadDataTableFixedColumnsLib(): Observable<any> {
        return forkJoin([
            this.loadScript(
                'https://cdn.datatables.net/fixedcolumns/3.3.1/js/dataTables.fixedColumns.min.js'
            ),
            this.loadStyle(
                'https://cdn.datatables.net/fixedcolumns/3.3.1/css/fixedColumns.bootstrap4.min.css'
            ),
        ]);
    }

    lazyLoadDataTableButtonsLib(): Observable<any> {
        return forkJoin([
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js'),
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js'),
            this.loadScript(
                'https://cdn.datatables.net/v/bs4/jszip-2.5.0/b-1.6.2/b-colvis-1.6.2/b-flash-1.6.2/b-html5-1.6.2/b-print-1.6.2/datatables.min.js'
            ),
            this.loadStyle(
                'https://cdn.datatables.net/v/bs4/jszip-2.5.0/b-1.6.2/b-colvis-1.6.2/b-flash-1.6.2/b-html5-1.6.2/b-print-1.6.2/datatables.min.css'
            ),
        ]);
    }

    lazyLoadDataTableAutoFillLib(): Observable<any> {
        return forkJoin([
            this.loadScript('https://cdn.datatables.net/v/bs4/af-2.3.5/datatables.min.js'),
            this.loadStyle('https://cdn.datatables.net/v/bs4/af-2.3.5/datatables.min.css'),
        ]);
    }

    lazyLoadDataTableKeyTableLib(): Observable<any> {
        return forkJoin([
            this.loadScript(
                'https://cdn.datatables.net/keytable/2.5.2/js/dataTables.keyTable.min.js'
            ),
            this.loadStyle(
                'https://cdn.datatables.net/keytable/2.5.2/css/keyTable.bootstrap4.min.css'
            ),
        ]);
    }

    lazyLoadDataTableResponsiveLib(): Observable<any> {
        return forkJoin([
            this.loadScript('https://cdn.datatables.net/v/bs4/r-2.2.5/datatables.min.js'),
            this.loadStyle('https://cdn.datatables.net/v/bs4/r-2.2.5/datatables.min.css'),
        ]);
    }

    lazyLoadDataTableRowGroupLib(): Observable<any> {
        return forkJoin([
            this.loadScript(
                'https://cdn.datatables.net/rowgroup/1.1.2/js/dataTables.rowGroup.min.js'
            ),
            this.loadStyle(
                'https://cdn.datatables.net/rowgroup/1.1.2/css/rowGroup.bootstrap4.min.css'
            ),
        ]);
    }

    lazyLoadDataTableScrollerLib(): Observable<any> {
        return forkJoin([
            this.loadScript(
                'https://cdn.datatables.net/scroller/2.0.2/js/dataTables.scroller.min.js'
            ),
            this.loadStyle(
                'https://cdn.datatables.net/scroller/2.0.2/css/scroller.bootstrap4.min.css'
            ),
        ]);
    }

    lazyLoadDataTableSearchPanesLib(): Observable<any> {
        return forkJoin([
            this.loadScript('https://cdn.datatables.net/v/bs4/sp-1.1.1/datatables.min.js'),
            this.loadStyle('https://cdn.datatables.net/v/bs4/sp-1.1.1/datatables.min.css'),
        ]);
    }

    private loadScript(url: string): Observable<any> {
        if (this._loadedLibraries[url]) {
            return this._loadedLibraries[url].asObservable();
        }

        this._loadedLibraries[url] = new ReplaySubject();

        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        script.onload = () => {
            this._loadedLibraries[url].next();
            this._loadedLibraries[url].complete();
        };

        this.document.body.appendChild(script);

        return this._loadedLibraries[url].asObservable();
    }

    private loadStyle(url: string): Observable<any> {
        if (this._loadedLibraries[url]) {
            return this._loadedLibraries[url].asObservable();
        }

        this._loadedLibraries[url] = new ReplaySubject();

        const style = this.document.createElement('link');
        style.type = 'text/css';
        style.href = url;
        style.rel = 'stylesheet';
        style.onload = () => {
            this._loadedLibraries[url].next();
            this._loadedLibraries[url].complete();
        };

        const head = document.getElementsByTagName('head')[0];
        head.appendChild(style);

        return this._loadedLibraries[url].asObservable();
    }
}
