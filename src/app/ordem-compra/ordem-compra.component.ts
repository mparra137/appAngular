import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import CarrinhoService from '../carrinho.service';
import { Pedido } from '../shared/pedido.model'
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService]
})
@Injectable()
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number = 0;
  public itensCarrinho!: ItemCarrinho[]
  

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  });

  constructor(private ordemCompraService: OrdemCompraService, public carrinhoService: CarrinhoService) { }

  ngOnInit() {
    console.log('Itens no OnInit de Ordem Compra: ', this.carrinhoService.exibirItens());
    this.itensCarrinho = this.carrinhoService.exibirItens();
    
  }

  public confirmarCompra(): void{
    
    if (this.formulario.status === 'INVALID'){
      //console.log(this.formulario.status);
      this.formulario.get('endereco')?.markAsTouched()
      this.formulario.get('numero')?.markAsTouched()
      this.formulario.get('complemento')?.markAsTouched()
      this.formulario.get('formaPagamento')?.markAsTouched()
    } else {
      //console.log(this.formulario.value.endereco)
      let pedido: Pedido = new Pedido(this.formulario.value.endereco, this.formulario.value.numero, this.formulario.value.complemento, this.formulario.value.formaPagamento, this.itensCarrinho)
      this.ordemCompraService.efetivarCompra(pedido).subscribe((resposta: number) => {
        this.idPedidoCompra = resposta
        this.carrinhoService.limparCarrinho()
      })      
    }    
  }

  public adicionarItem(item: ItemCarrinho): void{
    this.carrinhoService.adicionarQuantidade(item)
  }

  public removerItem(item: ItemCarrinho): void{
    this.carrinhoService.removerQuantidade(item)
  }

}
