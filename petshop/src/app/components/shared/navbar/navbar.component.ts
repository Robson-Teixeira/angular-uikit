import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';
import { Cart } from 'src/app/models/cart.model';
import { CartUtil } from 'src/app/utils/cart.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  
  public user!: User | null;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = Security.getUser();
  }

  public countQuantity() {
    
    let cart: Cart = CartUtil.get();
    let count: number = 0;

    cart.items.forEach((item) => {
      count += item.quantity;
    });
    
    return count;
  }

  logout() {
    Security.clear();
    this.router.navigate(['/login']);
  }
}
