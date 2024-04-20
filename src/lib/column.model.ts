export interface column {
    type:
    | 'text'
    | 'number'
    | 'dropdown'
    | 'note' //needs popup
    | 'image'
    | 'date'
    | 'auto_complete'
    | 'date_time'
    | 'checkbox'
    | 'month_range';
    control:
    | DefaultControlConfig
    | SelectControlConfig
    | AutoCompleteConfig
    | DateTimeControlConfig
    | DateControlConfig
    | ImageControlConfig;
}

export interface DefaultControlConfig {
    required: boolean;
    maxLength?: number;
    minLength?: number;
    name: string;
    label: string;
    searchable?: boolean; // filter show
    show?: boolean; // table show
    sortable?: boolean;
    exactMatch?: boolean;
    depends?: string;
    isStatus?: boolean;
    isDateTime?: boolean;
}

export interface ImageControlConfig extends DefaultControlConfig {
    state: string;
}

export interface NumberControlConfig extends DefaultControlConfig {
    range: boolean;
    acceptNegative: boolean;
}

export interface SelectControlConfig extends DefaultControlConfig {
    multiple: boolean;
    options: any[];
    valueField: string;
    description: string;
    entityName: string;
}

export interface AutoCompleteConfig extends SelectControlConfig {
    selectable?: boolean;
    removable?: boolean;
    key: string;
}

export interface DateControlConfig extends DefaultControlConfig {
    range: boolean;
    view?: string;
}

export interface DateTimeControlConfig extends DateControlConfig {
    startLabel?: string;
    range: boolean;
}
