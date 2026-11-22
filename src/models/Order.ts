import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IOrder extends Document {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'failed' | 'expired' | 'cancelled';
  paymentDetails?: {
    token?: string;
    redirectUrl?: string;
    paymentType?: string;
    transactionStatus?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rawResponse?: Record<string, any>;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID wajib diisi'],
    },
    name: {
      type: String,
      required: [true, 'Nama produk wajib diisi'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Harga satuan wajib diisi'],
      min: [0, 'Harga tidak boleh negatif'],
    },
    quantity: {
      type: Number,
      required: [true, 'Jumlah item wajib diisi'],
      min: [1, 'Jumlah minimal 1'],
    },
    subtotal: {
      type: Number,
      required: [true, 'Subtotal wajib diisi'],
      min: [0, 'Subtotal tidak boleh negatif'],
    },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      required: [true, 'Order ID wajib diisi'],
      unique: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: [true, 'Nama pelanggan wajib diisi'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Email pelanggan wajib diisi'],
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      trim: true,
      default: '',
    },
    items: {
      type: [OrderItemSchema],
      required: [true, 'Daftar item pesanan tidak boleh kosong'],
      validate: [
        (val: IOrderItem[]) => val.length > 0,
        'Pesanan harus memiliki minimal 1 item',
      ],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total pembayaran wajib diisi'],
      min: [0, 'Total pembayaran tidak boleh negatif'],
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'expired', 'cancelled'],
      default: 'pending',
    },
    paymentDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export { Order };
export default Order;
