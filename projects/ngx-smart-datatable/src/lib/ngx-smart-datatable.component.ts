import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, Inject } from '@angular/core';
import { NgxSmartDatatableService } from './ngx-smart-datatable.service';
import { DOCUMENT } from '@angular/common';
import { forkJoin } from 'rxjs';

declare var jQuery: any;

@Component({
	selector: 'ngx-smart-datatable',
	templateUrl: './ngx-smart-datatable.component.html'
})
export class NgxSmartDatatableComponent implements OnInit, AfterViewInit {
	@Input() settings: any;

	@Output() loadedjQuery: EventEmitter<any> = new EventEmitter();

	@Output() emittedEvent: EventEmitter<any> = new EventEmitter();

	@Output() sortedOrder: EventEmitter<any> = new EventEmitter();

	@Output() selectedRows: EventEmitter<any> = new EventEmitter();
	@Output() deselectedRows: EventEmitter<any> = new EventEmitter();

	@Output() selectedKeyCells: EventEmitter<any> = new EventEmitter();

	@Output() reorderedRow: EventEmitter<any> = new EventEmitter();
	@Output() reorderedColumn: EventEmitter<any> = new EventEmitter();

	@Output() changedPage: EventEmitter<any> = new EventEmitter();

	@Output() autoFilledCells: EventEmitter<any> = new EventEmitter();

	@Output() displayedResponsive: EventEmitter<any> = new EventEmitter();

	@Output() loadedTable: EventEmitter<any> = new EventEmitter();

	loadTable = false;

	constructor(
		private readonly ngxSmartDatatableSvc: NgxSmartDatatableService,
		@Inject(DOCUMENT) private readonly document: any
	) {}

	ngAfterViewInit(): void {}

	ngOnInit(): void {
		this.ngxSmartDatatableSvc.lazyLoadDataTableMainLib().subscribe((_) => {
			if (!jQuery) {
				jQuery = this.document.defaultView.jQuery;
			}

			this.loadedjQuery.emit(jQuery);

			this.settings = this.settings || {};
			const libs = [];

			this.settings.colReorder && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableColReorderLib());
			this.settings.rowReorder && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableRowReorderLib());
			this.settings.select && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableSelectLib());
			this.settings.fixedHeader && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableFixedHeaderLib());
			this.settings.fixedColumns && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableFixedColumnsLib());
			this.settings.autoFill && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableAutoFillLib());
			this.settings.keys && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableKeyTableLib());
			this.settings.responsive && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableResponsiveLib());
			this.settings.rowGroup && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableRowGroupLib());
			this.settings.scroller && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableScrollerLib());
			this.settings.searchPanes && libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableSearchPanesLib());
			this.settings.buttons &&
				this.settings.buttons.length &&
				libs.push(this.ngxSmartDatatableSvc.lazyLoadDataTableButtonsLib());

			if (libs.length) {
				forkJoin(libs).subscribe((_) => {
					this.initTable();
				});
			} else {
				this.initTable();
			}
		});
	}

	private initTable(): void {
		jQuery &&
			setTimeout(() => {
				this.loadTable = true;
				(($) => {
					$(document).ready(() => {
						const table = $('#smartTable').DataTable(this.settings);
						this.loadedTable.emit(table);

						this.settings.eventNames &&
							Array.isArray(this.settings.eventNames) &&
							this.settings.eventNames.forEach((event) => {
								table.on(event, (e, parm1, parm2, parm3, parm4, parm5) => {
									this.emittedEvent.emit({ e, parm1, parm2, parm3, parm4, parm5 });
								});
							});

						table.on('order', (e, details, changes) => {
							this.sortedOrder.emit(changes);
						});

						table.on('key', (e, datatable, key, cell, originalEvent) => {
							this.selectedKeyCells.emit({ key, cell });
						});

						table.on('row-reorder', (e, details, changes) => {
							this.reorderedRow.emit(details);
						});

						table.on('column-reorder', (e, settings, details) => {
							this.reorderedColumn.emit(details);
						});

						table.on('page', (e, settings) => {
							const info = table.page.info();
							this.changedPage.emit(info);
						});

						table.on('select', (e, dt, type, indexes) => {
							if (type === 'row') {
								const rows = table.rows({ selected: true }).data();
								this.selectedRows.emit(rows);
							}
						});

						table.on('deselect', (e, dt, type, indexes) => {
							if (type === 'row') {
								const rows = table.rows(indexes).data();
								this.deselectedRows.emit(rows);
							}
						});

						table.on('autoFill', (e, datatable, cells) => {
							this.autoFilledCells.emit(cells);
						});

						table.on('responsive-display', (e, datatable, row, showHide, update) => {
							this.displayedResponsive.emit({ row, showHide, update });
						});
					});
				})(jQuery);
			}, 100);
	}
}
