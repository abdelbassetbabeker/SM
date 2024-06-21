import * as yup from 'yup';
export const schema = yup
    .object()
    .shape({
        productName: yup.string().required('Product name is required'),
        quantity: yup.number().required('Product Quantity is required'),
        colors: yup.array().min(1, "Color is required"),
        categories: yup.array().min(1, "Select At least One Category "),
        purchasePrice: yup.string("qsd").required('Purchase price is required'),
        sellPrice: yup.number().required('Sell price is required')
    })
    .required();