import { Component, Input, OnInit } from '@angular/core';
import { CartUtil } from 'src/app/utils/cart.util';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  
  @Input() product!: Product;

  constructor(
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  addToCart() {
    CartUtil.add(
      this.product._id,
      this.product.title,
      1,
      this.product.price,
      this.product.image
    )
    this.toastr.success(`${this.product.title} adicionado ao carrinho`, 'Produto Adicionado');
  }  

}
