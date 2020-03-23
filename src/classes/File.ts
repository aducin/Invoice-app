import jsPDF from 'jspdf';
import { Invoice, InvoiceItem } from '../types/types';
import { TAX_AMOUNT } from '../constants/constants';

export default class File {
    pdf = new jsPDF();
    hqCity: string;
    invoice: Invoice;

    constructor(invoice: Invoice) {
        this.hqCity = 'Warsaw';
        this.invoice = invoice;
    }

    createPdf() {
        const curDate = new Date();
        const timestamp = curDate.getTime();
        this.setContent(this.formatDate(curDate));

        try {
            this.pdf.save(`invoice_${timestamp}.pdf`);
            return { success: true };
        } catch {
            return { success: false };
        }
    }

    formatDate(date: Date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${date.getFullYear()}-${month}-${day}`;
    }

    setContent(stringDate: string) {
        const summary = this.invoice.getSummary();

        this.pdf.setFont('helvetica');
        this.pdf.setFontSize(9);
        this.pdf.text(`${this.hqCity}, ${stringDate}`, 170, 10);
        this.pdf.setFontSize(14);
        this.pdf.setFontType('bold');
        this.pdf.text(`Invoice Nr XXXX`, 90, 50);
        this.pdf.setFontSize(12);
        this.pdf.setFontType('times');
        this.pdf.text('No.', 10, 80, { align: "center" });
        this.pdf.text('Name', 60, 80, { align: "center" });
        this.pdf.text('Price', 110, 80, { align: "center" });
        this.pdf.text('Tax', 128, 80, { align: "center" });
        this.pdf.text('Amount', 146, 80, { align: "center" });
        this.pdf.text('Price (total)', 168, 80, { align: "center" });
        this.pdf.text('Tax (total)', 190, 80, { align: "center" });

        let posY = 87;
        this.pdf.setFontSize(11);
        
        const invoiceData = this.invoice.getData();
        invoiceData.forEach((el: InvoiceItem, index: number) => {
            const tax = el.product.price * (TAX_AMOUNT / 100);
            const totalPrice = el.product.price * el.amount;
            const totalTax = (el.product.price * el.amount) * (TAX_AMOUNT / 100);
            this.pdf.text(`${(index + 1).toString()}.`, 10, posY, { align: "center" });
            this.pdf.text(el.product.name, 60, posY, { align: "center" });
            this.pdf.text(el.product.price.toFixed(2), 110, posY, { align: "center" });
            this.pdf.text(tax.toFixed(2), 128, posY, { align: "center" });
            this.pdf.text(el.amount.toString(), 146, posY, { align: "center" });
            this.pdf.text(totalPrice.toFixed(2), 168, posY, { align: "center" });
            this.pdf.text(totalTax.toFixed(2), 190, posY, { align: "center" });
            posY = posY + 5;
        });

        this.pdf.setFontSize(12);
        posY = posY + 20;
        this.pdf.setFontType('times');
        this.pdf.text('Total price net:', 120, posY);
        this.pdf.setFontType('bold');
        this.pdf.text(`${summary.price.toFixed(2)}`, 195, posY, { align: "right" });
        posY = posY + 10;
        this.pdf.setFontType('times');
        this.pdf.text('Total tax:', 120, posY);
        this.pdf.setFontType('bold');
        this.pdf.text(`${summary.tax.toFixed(2)}`, 195, posY, { align: "right" });
        posY = posY + 10;
        this.pdf.setFontType('times');
        this.pdf.text('Total price gross:', 120, posY);
        this.pdf.setFontType('bold');
        this.pdf.text(`${summary.total.toFixed(2)}`, 195, posY, { align: "right" });
    }
};
