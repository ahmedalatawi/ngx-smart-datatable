[![Build Status](https://travis-ci.com/AhmedAlatawi/ngx-smart-datatable.svg?branch=master)](https://travis-ci.org/AhmedAlatawi/ngx-smart-datatable)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)


# NgxSmartDatatable

A light weight Angular component used as a wrapper for [DataTables.net](https://datatables.net/), the smartest datatable in the world :fire:.

DataTables.net provides many [extensions](https://datatables.net/extensions/index) that you might or might not need for your datatable. Therefore, NgxSmartDatatable is lazily loaded meaning that only the extensions you need will be loaded once in the web page. This technique prevents any of the extension libraries from being bundled in your application.

### [Demo](https://stackblitz.com/github/AhmedAlatawi/ngx-smart-datatable) :movie_camera:

### :arrow_down: Installation 
```sh
npm install ngx-smart-datatable --save
```

### Quick start :rocket:
```html
<ngx-smart-datatable
     ...

    [settings]="settings">
</ngx-smart-datatable>
```

Zero configuration
```typescript
...

columns: any = [
    {
        data: 'id',
        title: 'ID'
    },
    {
        data: 'firstName',
        title: 'First Name'
    },
    {
        data: 'lastName',
        title: 'Last Name'
    },
    {
        data: 'email',
        title: 'Email'
    }
];

data = [
    {
        id: 1,
        firstName: "Paul",
        lastName: "Young",
        email: "paul.young@gmail.com"
    },
    {
        id: 2,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@yahoo.com"
    },

    ...
]

settings = {
    columns: this.columns,
    data: this.data,
    ...

    // these are set to true by default
    paging: false,
    ordering: false,
    info: false,
    searching: false
}
```

### :page_facing_up: NgxSmartDatatable API

| Attributes | Description |
| --- | --- |
| `[settings]` | The settings applied to the `table`, which include the `columns` and `data` properties (required) | 
| `(sortedOrder)` | A `sort` event fired when data order is changed (`asc` or `desc`). Note: `ordering` property must be set to `true` in `settings` |
| `(selectedRows)` | A `select` event fired when a row is selected. Note: `select` property must be set to `true` in `settings` |
| `(deselectedRows)` | A `deselect` event fired when a row is deselected |
| `(reorderedRow)` | A `row-reorder` event fired when rows are reordered. Note: `rowReorder` property must be set to `true` in `settings` |
| `(reorderedColumn)` | A `column-reorder` event fired when columns are reordered. Note: `colReorder` property must be set to `true` in `settings` |
| `(selectedKeyCells)` | A `key` event fired when a keyboard key is detected and pressed. Note: `keys` property must be set to `true` in `settings` |
| `(changedPage)` | A `page` event fired when table's paging is updated |
| `(autoFilledCells)` | An `autoFill` event triggered when an fill action is completed. Note: `autoFill` property must be set to `true` in `settings` |
| `(displayedResponsive)` | A `responsive-display` event fired when the display of table is updated. Note: `responsive` property must be set to `true` in `settings` |
| `(loadedTable)` | An event fired when the table is fully loaded |
| `(loadedjQuery)` | An event fired when an instance of jQuery is loaded |


### Note: :bulb:

`(emittedEvent)`: This is used to fire an event(s), which is not mentioned in the above table. The list of all available events can be found [here](https://datatables.net/reference/event/). The name(s) of the event(s) would need to be added to `eventNames` array in the `settings` object. 

Example of adding `responsive-resize` and `column-reorder` events:
```html
<ngx-smart-datatable
     ...

    (emittedEvent)="onEmitEvent($event)">
</ngx-smart-datatable>
```
 ```typescript
 settings = {
    ...
    
    eventNames: ['responsive-resize', 'column-reorder']
}
...

onEmitEvent(event: any): void {
    console.log('onEmitEvent: ', event);

    if (event.e.type === 'responsive-resize') {
        // do something
    }

    if (event.e.type === 'column-reorder') {
        // do something
    }
}
 ```

### Reference :dart:
[DataTables.net](https://datatables.net/)


### Author :books:
[Ahmed Alatawi](https://github.com/AhmedAlatawi)

