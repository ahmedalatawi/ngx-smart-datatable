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

### Reference :dart:
* [DataTables.net](https://datatables.net/)


### Author :books:
[Ahmed Alatawi](https://github.com/AhmedAlatawi)

