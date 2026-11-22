import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

const SAMPLE_PRODUCTS = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    slug: 'wireless-noise-canceling-headphones',
    description:
      'Headphone over-ear nirkabel dengan teknologi active noise cancellation terdepan, kualitas audio resolusi tinggi, dan daya tahan baterai hingga 30 jam.',
    price: 1599000,
    category: 'Audio',
    stock: 25,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Mechanical Gaming Keyboard RGB',
    slug: 'mechanical-gaming-keyboard-rgb',
    description:
      'Keyboard mekanik dengan switch tactile responsif, lampu latar RGB yang dapat dikustomisasi per-tombol, serta rangka aluminium kokoh.',
    price: 899000,
    category: 'Aksesoris',
    stock: 40,
    imageUrl:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description:
      'Kursi kerja ergonomis dengan sandaran jaring breathable, penyangga lumbar adaptif, dan armrest 3D untuk kenyamanan kerja sepanjang hari.',
    price: 2499000,
    category: 'Furnitur',
    stock: 15,
    imageUrl:
      'https://images.unsplash.com/photo-1580481077195-c328a37db729?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Minimalist Leather Backpack',
    slug: 'minimalist-leather-backpack',
    description:
      'Tas ransel berbahan kulit sintetis premium dengan kompartemen laptop hingga 15 inci, tahan percikan air, dan bergaya modern elegan.',
    price: 549000,
    category: 'Fashion',
    stock: 30,
    imageUrl:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Smart Fitness Watch Ultra',
    slug: 'smart-fitness-watch-ultra',
    description:
      'Jam tangan pintar dengan layar AMOLED cerah, pelacak detak jantung 24/7, monitor saturasi oksigen SpO2, GPS ganda, dan tahan air hingga 50 meter.',
    price: 1299000,
    category: 'Wearable',
    stock: 20,
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'Portable Bluetooth Speaker Waterproof',
    slug: 'portable-bluetooth-speaker-waterproof',
    description:
      'Speaker bluetooth portabel berdaya tahan baterai 12 jam dengan rating IPX7 anti air, menghasilkan bass bertenaga dan audio 360 derajat.',
    price: 450000,
    category: 'Audio',
    stock: 50,
    imageUrl:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
  },
];

async function handleSeed() {
  try {
    await connectToDatabase();

    const existingCount = await Product.countDocuments();

    if (existingCount > 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'Koleksi produk sudah memiliki data. Seeding dilewati.',
          count: existingCount,
        },
        { status: 200 }
      );
    }

    const createdProducts = await Product.insertMany(SAMPLE_PRODUCTS);

    return NextResponse.json(
      {
        success: true,
        message: 'Berhasil menginisialisasi 6 data produk awal ke MongoDB.',
        count: createdProducts.length,
        products: createdProducts,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error seeding products:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal melakukan seeding data produk ke MongoDB.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return handleSeed();
}

export async function POST() {
  return handleSeed();
}
