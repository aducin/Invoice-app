type Filters = {
    amount: number;
    name: string;
    selectedOption: number;
};

export type FiltersProps = {
    filters: Filters;
    loading: boolean;
    onAmountChanged: (value: number) => void;
    onNameChanged: (value: string) => void;
    onOptionSelected: (event: React.FormEvent<HTMLSelectElement>) => void;
    productsLength: number;
    products: Product[];
};

export type FormState = {
    error: boolean;
    filters: Filters;
    loading: boolean;
    message: string;
    success: boolean;
};

export type Invoice = {
    _data: InvoiceItem[];
    _summary: Summary;
    getData: () => InvoiceItem[];
    getSummary: () => Summary;
}

export type InvoiceItem = {
    amount: number;
    product: Product;
};

export type InvoiceItemDetailsElementProps = {
    amount?: number;
    label?: string;
    mobile: boolean;
    onAmountChanged?: (amount: number) => void;
    onRemoved?: () => void;
    productAmount?: number;
    remove?: boolean;
    value?: string;
}

export type InvoiceListProps = {
    list: InvoiceItem[];
    onItemAmountChange: (id: number, amount: number) => void;
    onItemRemove: (id: number) => void;
    summary: Summary;
};

export type MessageProps = {
    allowRemove: boolean;
    error: boolean;
    message: string;
    onRemoveAlert?: () => void;
    success: boolean;
};

export type Product = {
    amount: number;
    available: boolean;
    id: number;
    name: string;
    price: number;
};

export type ReducerAction = {
    type: string;
    payload: {
        amount?: number;
        id?: number;
        invoice?: InvoiceItem;
        products?: Product[];
    };
};

export type StoreState = {
    initialised: boolean;
    invoice: Invoice | null;
    products: Product[] | [];
    productsMatrix: Product[] | [];
};

export type Summary = {
    items: number;
    price: number;
    tax: number;
    total: number;
    products: number;
};

export type SummaryProps = {
    summary: Summary;
    onInvoiceCreate: () => void;
    onInvoiceRemove: () => void;
};
