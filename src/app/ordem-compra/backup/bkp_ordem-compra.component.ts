import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra!: number

  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''

  public enderecoValido!: boolean
  public numeroValido!: boolean
  public complementoValido!: boolean
  public formaPagamentoValido!: boolean

  public enderecoPristine: boolean = true
  public numeroPristine: boolean = true
  public complementoPristine: boolean = true
  public formaPagamentoPristine: boolean = true

  public formEstado: string = 'disabled'
  private pedido!: Pedido

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
    //this.ordemCompraService.efetivarCompra();
  }

  public atualizaEndereco(endereco: string): void{
    this.endereco = endereco

    this.enderecoPristine = false

    //console.log(this.endereco)
    if (this.endereco.length > 3){
      this.enderecoValido = true
    } else {
      this.enderecoValido = false
    }
    this.AtualizaEstado()
  }

  public atualizaNumero(numero: string): void{
    this.numero = numero

    this.numeroPristine = false

    //console.log(this.numero)
    if (this.numero != '' && this.numero != '0') {
      this.numeroValido = true
    } else {
      this.numeroValido = false
    }
    this.AtualizaEstado()
  }

  public atualizaComplemento(complemento: string): void{
    this.complemento = complemento

    this.complementoPristine = false

    //console.log(this.complemento)
    if (this.complemento.length > 2){
      this.complementoValido =  true
    } 
    this.AtualizaEstado()
  }

  public atualizaFormaPagamento(formaPagamento: string): void{
    this.formaPagamento = formaPagamento
    console.log(this.formaPagamento)

    this.formaPagamentoPristine = false

    if (this.formaPagamento != ''){
      this.formaPagamentoValido = true
    } else {
      this.formaPagamentoValido = false
    }
    this.AtualizaEstado()
  }

  public AtualizaEstado(): void{
    if (this.enderecoValido == true && this.numeroValido == true && this.formaPagamentoValido == true){
      this.formEstado = ''
    } else{
      this.formEstado = 'disabled'
    }

  }

  public confirmarCompra(): void{   

    this.pedido = new Pedido(this.endereco, this.numero, this.complemento, this.formaPagamento)

    this.ordemCompraService.efetivarCompra(this.pedido).subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
    })
  }

}
