import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Product } from './Product.js';
import { CreateProductDto } from './CreateProductDto.js';

const data: Product[] = [
  {
    name: 'Vezeték nélküli egér',
    category: 'elektronika',
    price: 8990,
    stock: 12,
  },
  {
    name: 'Programozás kezdőknek',
    category: 'könyv',
    price: 6490,
    stock: 4,
  },
  {
    name: 'Mechanikus billentyűzet',
    category: 'elektronika',
    price: 24990,
    stock: 3,
  },
  {
    name: 'Fekete kapucnis pulóver',
    category: 'ruházat',
    price: 12990,
    stock: 8,
  },
  {
    name: 'Catan társasjáték',
    category: 'játék',
    price: 11990,
    stock: 0,
  },
  {
    name: 'USB-C töltőkábel',
    category: 'elektronika',
    price: 4990,
    stock: 25,
  },
  {
    name: 'Adidas sportcipő',
    category: 'ruházat',
    price: 27990,
    stock: 2,
  },
  {
    name: 'A kis herceg',
    category: 'könyv',
    price: 3990,
    stock: 15,
  },
  {
    name: 'LEGO City rendőrségi állomás',
    category: 'játék',
    price: 34990,
    stock: 5,
  },
  {
    name: 'Bluetooth hangszóró',
    category: 'elektronika',
    price: 15990,
    stock: 7,
  },
];

const categories = ['elektronika', 'ruházat', 'könyv', 'játék'];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getHello() {
    return {
      title: 'Terméklista',
      products: [...data].sort((a, b) => a.price - b.price),
    };
  }

  @Get('/filter')
  @Render('filter')
  filterProducts(@Query('category') category?: string) {
    return {
      title: 'Szűrés kategória szerint',
      categories,
      category,
      products: data
        .filter((product) => product.category === category)
        .sort((a, b) => b.stock - a.stock),
    };
  }

  @Get('/new')
  @Render('new')
  newProducts() {
    return {
      title: 'Új termék hozzáadása',
      categories,
      success: false,
    };
  }

  @Post('/new')
  @Render('new')
  addProduct(@Body() createProductDto: CreateProductDto) {
    data.push({
      name: createProductDto.name,
      category: createProductDto.category,
      price: Number(createProductDto.price),
      stock: Number(createProductDto.stock),
    });

    return {
      title: 'Új termék hozzáadása',
      categories,
      success: true,
    };
  }

  @Get('/stats')
  @Render('stats')
  getStats() {
    return {
      title: 'Statisztikák',
      totalStock: data.reduce((sum, product) => sum + product.stock, 0),
      averagePrice: data.reduce((sum, product) => sum + product.price, 0) / data.length || 0,
      maxPriceProduct: data.reduce((maxProduct, product) => (product.price > maxProduct.price ? product : maxProduct), data[0]),
      minPriceProduct: data.reduce((minProduct, product) => (product.price < minProduct.price ? product : minProduct), data[0])
    };
  }
}
