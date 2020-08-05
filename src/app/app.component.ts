import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

var btn: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'angular-datatable-demo';

    selectedRows = [];

    $: any;

    columns: any = [
        {
            data: 'id',
            title: 'ID',
        },
        {
            data: 'name',
            title: 'Name',
        },
        {
            data: 'username',
            title: 'Username',
        },
        {
            data: 'email',
            title: 'Email',
        },
        {
            data: 'phone',
            title: 'Number',
        },
        {
            data: 'address.street',
            title: 'Street',
        },
        {
            data: 'address.city',
            title: 'City',
        },
        {
            data: 'address.zipcode',
            title: 'Zipcode',
        },
        {
            data: 'company.name',
            title: 'Company',
        },
        {
            data: 'website',
            title: 'Website',
        },
    ];

    data: any = [];

    customBtn = {
        text: 'Edit selected row(s)',
        init: function (dt, node, config) {
            btn = this;
            this.disable();
        },
        action: function (e, dt, node, config) {
            this.enable();
        },
    };

    searchPanes: any = {
        panes: [
            {
                header: 'Name Filter',
                options: [
                    {
                        label: 'Names start with "C"',
                        value: function (rowData, rowIdx) {
                            return rowData.name[0] === 'C';
                        },
                    },
                    {
                        label: 'Names start with "L"',
                        value: function (rowData, rowIdx) {
                            return rowData.name[0] === 'L';
                        },
                    },
                ],
            },
            {
                header: 'Phone Number Filter',
                options: [
                    {
                        label: 'Numbers start with "1"',
                        value: function (rowData, rowIdx) {
                            return rowData.phone[0] === '1';
                        },
                    },
                    {
                        label: 'Numbers start with "5"',
                        value: function (rowData, rowIdx) {
                            return rowData.phone[0] === '5';
                        },
                    },
                ],
            },
        ],
        layout: 'columns-2',
    };

    buttons = [
        'excel',
        {
            extend: 'csv',
            filename: function () {
                return `users-csv-${new Date()}`;
            },
        },
        'pdf',
        'print',
        'colvis',
        {
            extend: 'copy',
            text: 'Copy to clipboard',
            titleAttr: 'copy table ',
            className: '',
            init: function (api, node, config) {},
        },
        this.customBtn,
    ];

    settings: any = {
        columns: this.columns,
        colReorder: true,
        rowReorder: true,
        paging: true,
        ordering: true,
        fixedHeader: true,
        // keys: true,
        // deferRender:    true,
        // scrollY:        200,
        // scrollCollapse: true,
        // scroller:       true,
        // rowGroup: {
        // 	// dataSrc: 2,
        // 	dataSrc: 'name'
        // },
        // searchPanes: this.searchPanes,
        dom: 'PBfrtipl',
        buttons: this.buttons,
        // scrollY: '300px',
        // scrollX: true,
        // scrollCollapse: true,
        // fixedColumns: true,
        // order: [[ 0, 'asc' ], [ 1, 'asc' ], [ 3, 'desc' ]],
        // autoFill: true,
        // responsive: true,
        // searchPanes: true,
        searching: true,
        processing: true,
        info: true,
        lengthChange: true,
        select: true,
        lengthMenu: [5, 10, 25, 50, 75, 100],
        stylings: {
            bordered: false,
            hover: true,
        },
        eventNames: ['responsive-display'],
        initComplete: function () {
            console.log('init complete.. ');
        },
    };

    constructor(private svc: AppService) {}

    ngOnInit(): void {
        this.svc.getUsers().subscribe((users) => {
            this.settings.data = users;
        });
    }

    onLoadTable(table: any): void {
        console.log('onLoadTable: ', table);
    }

    onEmitEvent(event: any): void {
        console.log('onEmitEvent: ', event);
    }

    onLoadjQuery(jQuery: any): void {
        this.$ = jQuery;
    }

    onSortOrder(column: any): void {
        console.log('onSortOrder: ', column);
    }

    onSelectRows(rows: any): void {
        console.log('onSelectRows: ', rows);
        this.selectedRows = [];
        for (var i = 0; i < rows.length; i++) {
            this.selectedRows.push(rows[i]);
        }
        btn.enable();
    }

    onDeselectRows(rows: any): void {
        console.log('onDeselectRows: ', rows);
        for (let i = 0; i < rows.length; i++) {
            const indx = this.selectedRows.findIndex((r) => r.id === rows[i].id);
            if (indx > -1) {
                this.selectedRows.splice(indx, 1);
            }
        }

        if (!this.selectedRows.length) {
            btn.disable();
        }
    }

    onReorderRow(row: any): void {
        console.log('onReorderRow: ', row);
    }

    onReorderColumn(col: any): void {
        console.log('onReorderColumn: ', col);
    }

    onSelectKeyCells(cells: any): void {
        console.log('onSelectKeyCells: ', cells);
    }

    onChangePage(pageInfo: any): void {
        console.log('onChangePage: ', pageInfo);
    }

    onAutoFillCells(cells: any): void {
        console.log('onAutoFillCells: ', cells);
    }
}
