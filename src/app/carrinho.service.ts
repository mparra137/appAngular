import { ItemCarrinho}  from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService{
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[]{
        return this.itens
    }

    public incluirItem(oferta: Oferta): void{
        //console.log('Oferta no carrinho:', oferta)       
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(oferta.id, oferta.imagens[0], oferta.titulo, oferta.descricao_oferta, oferta.valor, 1);

        let itemEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemEncontrado){
            itemEncontrado.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }       

        //console.log(this.itens);
    }

    public totalCarrinhoCompras(): number{
        let total: number = 0;
        this.itens.map((item: ItemCarrinho) => {
            total += item.quantidade * item.valor
        })

        return total;
    }

    public adicionarQuantidade(item: ItemCarrinho): void{
        //console.log('AdicionarQUantidade: ', item)

        let itemEncontrado = this.itens.find((itemSearch: ItemCarrinho) => itemSearch.id === item.id);
        if (itemEncontrado){
            itemEncontrado.quantidade += 1
        }       

    }

    public removerQuantidade(item: ItemCarrinho): void{
        let itemEncontrado = this.itens.find((itemSearch: ItemCarrinho) => itemSearch.id === item.id);
        if (itemEncontrado){
            itemEncontrado.quantidade -= 1
            if (itemEncontrado.quantidade === 0){
                
                this.itens.splice(this.itens.indexOf(itemEncontrado), 1)
            }
        }
    }

    public limparCarrinho(): void{
        this.itens.splice(0)
    }
}

export default CarrinhoService;