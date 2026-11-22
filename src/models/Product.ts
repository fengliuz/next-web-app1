import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Nama produk wajib diisi'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug produk wajib diisi'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Deskripsi produk wajib diisi'],
    },
    price: {
      type: Number,
      required: [true, 'Harga produk wajib diisi'],
      min: [0, 'Harga produk tidak boleh negatif'],
    },
    category: {
      type: String,
      required: [true, 'Kategori produk wajib diisi'],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Stok produk wajib diisi'],
      default: 0,
      min: [0, 'Stok tidak boleh negatif'],
    },
    imageUrl: {
      type: String,
      required: [true, 'URL gambar produk wajib diisi'],
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export { Product };
export default Product;
