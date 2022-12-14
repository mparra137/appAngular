

#ANGULAR
	
	Baseado no Node

	Termos:
		Webpack
			- Monta os bundles necessários para a aplicação, junto com todas as suas dependências
			
		Polifills
			- São recursos que permitem que browsers antigos funcionem com recursos novos de scripts (como se interpretassem comandos novos para comandos antigos)
			
		Termos:
		SPA - Single Page Applications
	 
			
#ANGULAR CLI
	
	##Atualizar
		
		npm uninstall -g @angular/cli
		
		npm install -g @angular/cli
		
		
		*Criar nova aplicação:
			ng new app2.1
			
		
		*Após instalar a nova versão:
			1) Na nova aplicação
			2) Verificar package.json pelas dependencias
			3) Instalar dependencias via npm
			3) Atualizar o arquivo angular.json (styles e scripts)
			4) Copiar a pasta src da pasta da versão anterior para a atual.
				Pronto!
				Testar.
				
	##Atualizar Também
	
		ng update @angular/core @angular/cli
		
		Este comando (obtido no curso de Full Stack .Net Core com Angular) também faz a atualização do Angular no projeto. 

#Extensão Visual Studio Code

	*Live Server
		- Permite atualizar em tempo real as alterações de código feitas, sem precisar clicar em atualizar no browser
	


#CRIAR NOVO PROJETO

	*Comando
	
	ng new app1
	ng new "nome do projeto"
	
	Este comando deve ser executado referenciando a pasta de destino
	Obs: É importante que o caminho para a pasta não tenha espaços e caracteres especiais
	
#Gerando módulo de roteamento:

	ng generate module app-routing --flat --module=app
	
	Esse comando gera o módulo de roteamento separadamente do módulo principal, e atualiza a dependencia no modulo principal
	
	PARAMETER		DETAILS
	--flat			Puts the file in src/app instead of its own directory.
	--module=app	Tells ng generate to register it in the imports array of the AppModule.
	
#Servir como pagina web/ Sobe um servidor de dev

	Posicionar o prompt na pasta onde estiver a aplicação criada.
	Executar o comando:
	ng serve		
	ng server
		Adendo: Pode ser adicionada a opção -o no ng serve para que assim que compilado, automaticamente ocorre a abertura do projeto no browser
			ng serve -o
			
	Também podem ser usados os comandos npm para executar o projeto
		npm start (executa o ng serve conforme espeficado no arquivo package.json - é possível alterar os comandos no package.json: 
						Por exemplo: Configurar para que o "npm start" executo ng serve com a opção -o
						Sendo assim fica:
							"scripts": {
								"ng": "ng",
								"start": "ng serve -o",
								"build": "ng build",
								"watch": "ng build --watch --configuration development",
								"test": "ng test"
							  },
						
		
		
	
	O angular irá criar uma url local para testar a aplicação
	
#Estrutura de uma aplicação ANGULAR

	- Utilizar um IDE: VS Code por exemplo

	Package.json
		Possui as configurações da aplicação
		- Está dividido em Dev e Prod
		
	tsconfig.json
		TypeScript
		
	src
		- Source Code
		- Arquivos da aplicação
		
	Organização de projeto Angular:
		Abaixo da pasta app, criar as seguintes pastas:
			components 					- Componentes
			helpers						- Classes com recursos adicionais / Pipes
			models						- Modelos
			services					- Serviços			
			shared						- Recursos Compartilhados (Components usados por varios outros components - Componentes de navegação, titulos, etc)
			util						- Recursos uteis - Arquivos com recursos compartilhados
		 
	
	main.ts
	É o arquivo inicial, onde está definido o módulo inicial que será carregado na aplicação
	
#Compenente 

	Criando manualmente:
	- Deve ser criado numa pasta separada para cada componente.
	- Deve obrigatoriamente ter o arquivo component.ts e o component.html (template) 
	
	Criando automaticamente utilizando o Angular-cli:
	- ng generate component NomeDoComponente
		Cria automaticamente todos os arquivos do component e atualiza o arquivo App.Module.ts
	- ng g c nomeDoComponente (generate component e não cria o arquivo spec - arquivo de testes)
	
		Para não criar o arquivo spec:
		ng g c nomeDoComponente --skip-tests
		
	Criando sub-components
		ng g c pai/componentFilho 
		
	Flag indicar para incluir em qual modulo
	
		ng g c nomeComponent --module app
			--module indica que vc quer informar qual o modulo
			app é o nome do modulo 
			Assim ele inclui as referencias do component no arquivo app.module (nos meus projetos, isso tem acontecido automaticamente sem a flag --module)
																			   (Provavelmente isso será util quando tivermos varios módulos)

#Template

	- O template é o decorator que define qual o arquivo html do componente (render da view)
	- definido no arquivo ts do component pelo decorator "templateUrl: './topo.component.html'"
	@Component({
		selector: 'app-topo'.
		templateUrl: './topo.component.html'
	})
	
	É possível definir in-line, utilizando o decorator "template"
	
#Component selector

	- Define o seletor que deve ser usado no local onde deve ser renderizado o component.
	- Temos alguns opções

	@Component({
		selector: 'app-topo'
	})
	Deste modo, o componente será renderizado no local onde houver a tag html: <app-topo></app-topo>
	
	Outros métodos:
		Como propriedade/atributo de um elemento html:
			definir entre colchetes
			@Component({
				selector: '[app-topo]'
			})
	
			No html deve ser definido como atributo de um elemento:
			<div app-topo></div>
			
		Como instrução de classe:
			@Component({
				selector: '.app-topo'
			})
	
			No html deverá ser definido como uma classe:
			<div class="app-topo"></div>
			
			Neste caso, tomar cuidado com a existencia de classes com o mesmo nome. Causa erro e não funciona.
			
#Data Binding

	##Property Binding -> [property]="data"
		- O template faz o "bind" do atributo html ao valor configurado na classe do componente.
			No template:
			<img [src]="variavelDaClasse"></img>
		
			Na classe:
			public variavelDaClasse: string = 'Mostrar em tela esta frase'
			
			Qualquer propriedade html pode ser setada deste modo.
			
			Exemplos de atributos html que podem trabalhar com property bind:
			[href] = "link"
			[disable] = "isDisabled"
			
			ATENÇÃO: NÃO COMBINAR Property Binding com String Interpolation
				- Erro: 
					<img [src] = "{{url}}">
				- Ok:
					<img [src] = "variavelDaClasse">
					<img src = "{{variavelDaClasse}}">  // Esta é valida, pois o src não está setado como se fosse obter valor de uma property, e a String Interpolation trará o valor setado na classe do componente
					

	##String Interpolation -> {{data}}
	
		- Na classe do component (arquivo ts):
			public titulo: string = 'texto';
		- No template (html)
			Basta inserir em qualquer ponto do Html a anotação:
			{{titulo}}
			Com o nome da propriedade definida na classe do component, o seu valor será apresentado em tela na view (html)
	
	
	
	##Event Binding -> (event) = "expression"
	
		- Do template html para a classe do componente
		- O angular adiciona um event listener no elemento 
		- Associado a um elemento html especifico
		- Um atributo do elemento html que indica um evento que pode chamar uma função javascript, pode ser associado a uma função da classe do componente.
		Sintaxe:
		(input)="funcao()"
		
		o evento fica entre parenteses, e após o simbolo = a função definida na classe do componente é chamada entre aspas
		
		click
		foco
		sair do campo
		entrar no campo
		...
		
		Parâmetro = $event 
			- Passa os dados do evento encaminhados para o método
			
			- A função é executada com base em listener, então o this está fora de contexto. 
				- Não é possível passar como parâmetro o "this.value"
				- O resultado é "undefined"
				
			- Utilizar o $event
				- Captura o estado do html no dom no momento que o elemento é disparado
				- Possibilita acessar todos os atributos do elemento html no momento que o evento acontece.
				
				
		Two-Way Binding:

			Se a variavel que for alterada no Event Binding estiver em tela, usando string Interpolation, a alteração se dá em tempo real do evento para a tela.
			
	#Input		
	
	@Input()
		- Importado do core do angular
		- Enviar o valor de um atributo de um componente para outro componente.
		
		- Um componente instanciado dentro do template de outro componente remonta uma relação de parentesco.
		
		- Para que o component aceite parametros externos, a variavel/propriedade precisa ser decorada com o @Input
		- Para que seja possivel, Input deve ser importado do @angular/core
		
		No import:
			import { Component, OnInit, Input} from '@angular/Core'
			
		Na classe:
			@Input() public progresso: number = 0;
		
		No template do component pai, utilizando a sintaxe de property binding
			<app-progresso [variavelNoComponentFilho] = "variavelDoComponentePai"></app-progresso>
		
			Adendo:
				Para fazer a correlação no property binding onde "variavelNoComponentFilho"
					- Se ela for o mesmo nome da classe do component, o input pode ser com o valor @Input() - em branco dentro dos parenteses
					- Caso seja necessário relacionar o property binding com nomes de variaveis diferentes, informar no @Input('propertyName')
					- Deste modo:
						<app-progresso [propertyName] = "progressoPai"></app-progresso>
						
						@Input('propertyName') public varFilho: number = 0;
						
	#Output
	
	@Output
		Decorador @Output usado para que componentes possam emitir eventos para componentes pais (acima)
		Através da classe EventEmmiter, um component filho pode emitir um valor a um component pai (aquele que faz referencia ao filho no template:
		
		Componente painel:
			import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
			
			@Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();
			
			this.encerrarJogo.emit('vitoria');
		
		Template do componente App:
			<div *ngIf="jogoEmAndamento; else fimDeJogo">
				<app-painel (encerrarJogo)="encerrarJogo($event)"></app-painel>
			</div>
			
			<ng-template #fimDeJogo>
				<div *ngIf="tipoEncerramento === 'derrota';else fimDeJogoVitoria" class="container" style="margin-top: 50px;">
					<div class="row">
						<div class="col">
							<h3 style="color: red;">Fim de jogo! Você perdeu!@</h3>
							<button type="button" class="btn btn-primary" (click)="reiniciarJogo()">Reiniciar Jogo</button>
						</div>
					</div>
				</div>
			</ng-template>
			<ng-template #fimDeJogoVitoria>
				<div class="container" style="margin-top: 50px;">
					<div class="row">
						<div class="col">
							<h3 style="color: green;">Fim de jogo! Você Venceu!!!!!11onze</h3>
							<button type="button" class="btn btn-primary" (click)="reiniciarJogo()">Reiniciar Jogo</button>
						</div>
					</div>
				</div>
			</ng-template>
			
		Componente app:
			export class AppComponent {
  
			  public jogoEmAndamento: boolean = true;
			  public tipoEncerramento: string  = '';

			  public encerrarJogo(tipo: string): void{   
				this.jogoEmAndamento = false;
				this.tipoEncerramento = tipo;
			  }

			  public reiniciarJogo(): void{
				this.jogoEmAndamento = true;
				this.tipoEncerramento = '';
			  }
			}
			
#Diretivas do Angular

	ngIf
		- renderiza a div caso a condição seja verdadeira
		<div *ngIf=" valor == true; else divElsecom_ng-template">
		</div>
		<ng-template #divElsecom_ng-template>
			
		</ng-template>
		
	
	ngFor
	
	ngTemplate
	
	
	ngClass
	
	ngComponent
	
	ngStyle
	
	ngPluralCase
						
#Ciclo de vida do Componente (aula 120) / Lifecycle Hooks

	- Uma variavel @Input pode não ser inicializada no construtor da classe, pois devido ao ciclo de vida, o construtor ocorre antes da variavel input receber seu valor.
	- Função ngOnInit()
		- Variaveis input são inicializadas no inicializar do component, ou no ngOnInit()
		
	Cada método do ciclo de vida podem ser capturados dentro das classes do componente.
		- Os métodos são conhecidos como Lifecycle Hooks
		
		ngOnChanges()		//Acontece antes do ngOnInit
		ngOnInit()
		ngDoCheck()
		ngAfterContentInit()
		ngAfterContentChecked()
		ngAfterViewInit()
		ngAfterViewChecked()
		ngOnDestroy()
		
		
		
		 

#Estilos/Css

	- Pode ser definido in-line
	- É mais interessante utilizar um arquivo component.css
	- styleUrls: ['./topo/topo.component.css', 'site.css'...]
	


#Bootstrap

	Para instalar o bootstrap para dentro da aplicação executar o npm
	- npm install bootstrap
		Assim será instalado a ultima versão do bootstrap para dentro da aplicação
		
	Poderá ser encontrado dentro da pasta "node_modules"
	
	Para torna-lo um arquivo de estilos global:
		Deve ser incluido dentro do arquivo de configurações angular.json
			no item Styles:["node_modules/bootstrap/dist/css/bootstrap.min.css"]
			
		Incluir também o js do bootstrap dentro da tag
			Scripts:["node_modules/bootstrap/dist/js/bootstrap.min.js"]
			
	Para reinstalar:
		npm uninstall bootstrap
		
		npm install --save bootstrap@4.0.0-beta
									[caso seja necessário informar a versão]
	
#Jquery

	Na pasta da aplicação:
	npm install jquery --save
	
	incluir na tag;
		scripts:["node_modules/jquery/dist/jquery.min.js"]
	do arquivo de configuração angular.json	(antes do js do bootstrap)
	Para que seja de uso global da aplicação (estará referenciado em todas os componentes	

#Tether

	Popper 
		Nas versões mais atuais, o tether foi trocado pelo popper

	npm install tether --save
		scripts:["node_modules/tether/dist/js/tether.min.js"]
	do arquivo de configuração angular.json	(antes do js do bootstrap)
	Para que seja de uso global da aplicação (estará referenciado em todas os componentes	
	
	
		
		
	
	
#Build

	ng build -c development
	ng build -c production
	
	de acordo com os ambientes definidos no arquivo Angular.json, deve ser utilizado o ambiente definido abaixo de "configurations".
	Geralmente será:
		production
		development
		
#http-server

	Pacote que serve uma pasta como um servidor http
	npm install http-server -g
	
	executar o comando http-server na pasta onde estiver o build da aplicação
	
	Comando:
	c:\...\pastadaaplicação>http-server
	<enter>
	
#Xampp / Apache

	Distribuir e servir a aplicação neste método/servidor
	Aula 132
	
#Amazon/Aws

	Conta gratuita
	
	S3
	
	Na sessão 12, aula 133, há instruções de como publicar na amazon.
	
	
#favicon

	https://www.favicon-generator.org/
	
	Transforma qualquer imagem em ico, e disponibiliza o código html para inserir no código da página, com configurações para diferentes dispositivos
	
#Services

	Um classe (normal) em arquivo do tipo typescript.
	nome.service.ts
	
	Um serviço é uma classe que executa ou disponibiliza qualquer coisa necessária.
	
	Para instanciar um serviço dentro de um component:
	
	importar a classe no topo
		import {Service} from './pasta/service';
		
	no decorator component, informar a tag provider:
	@Component({
		...,
		providers: [Service]
	})
	
	Após isto, é possivel criar uma variavel no construtor do tipo do serviço. 
		constructor(private service: Service){}
		
		ngOnInit(){
			this.service.getData();
		}
		
	Injeção de serviços pode ter 3 escopos
		1. Somente no proprio component
		2. Para o component e seus filhos
		3. Por módulo
	
	Declaração de Serviço por escopo de módulo (264)
		Instancia SingleTon: Uma intancia somente para todo o módulo
		
		Incluir a declaração do serviço no programa app.modulo.ts:
		
			import CarrinhoService from './carrinho.service';
		
		Provider:
			@NgModule({
			  declarations: [
				...
			  ],
			  imports: [
				...
			  ],
			  providers: [ ..., CarrinhoService],
			  bootstrap: [AppComponent]
			})
	
		Nos componentes que forem utilizar o serviço:
			Efetuar a importação:
				import CarrinhoService from '../carrinho.service';
				
			No provider, para utilizar o escopo do módulo, não incluir no provider do component filho do modulo:
				@Component({
				  selector: 'app-ordem-compra',
				  templateUrl: './ordem-compra.component.html',
				  styleUrls: ['./ordem-compra.component.css'],
				  providers: []
				})
	
			Injetar no método construtor do component:
				constructor(private ordemCompraService: OrdemCompraService, private carrinhoService: CarrinhoService) { }
				
			Deste modo, esta disponivel o serviço no escopo do módulo.

	
#Json Server 

	Auxilia em testes. 
	Disponibiliza um server servindo um "Rest" - Um serviço retornando um arquivo json.
	
	
	Na pasta onde estiver disponivel o arquivo json, executar no prompt de comando:
	json-server --watch nome_do_arquivo.json
	<ENTER>
	
	Cria um servidor que responde a requisições, retornando o conteudo do arquivo. 
	
	
#Injectable

	Decorator that marks a class as available to be provided and injected as a dependency.

	@see — Introduction to Services and DI

	@see — Dependency Injection Guide

	@usageNotes
	Marking a class with @Injectable ensures that the compiler will generate the necessary metadata to create the class's dependencies when the class is injected.

	The following example shows how a service class is properly marked so that a supporting service can be injected upon creation.
	
	@Injectable({
	  providedIn: 'root' //Indica que pode ser injetado em qualquer lugar/qualquer componente - Não precisa informar dentro do componente que ele faz parte dos providers
	})
	
	Quando o "providedIn: 'root' é informado, não precisa preencher o provider no component
	Caso contrario, 
		precisa identificar em provider no componente, ou no provider do app.module.ts
	
#HTTP do Angular / Observable

	Importar a dependência do HTTP para o app.module.ts
	
	import { HttpClient} from '@angular/commom/http'
	
	No arquivo app.module
	Incluir dentro do 
	@NgModule(
		{
			Imports: [
				HttpClient
			]
		}
	)
	
	No componente:
		import {HttpClient} from '@angular/common/http'
		import { Injectable } from '@angular/core'
		
		//Decorar a classe com Injectable
		@Injectable()
		export class OfertasService{
	
			constructor(private http: HttpClient){}    

			public getOfertas(): Promise<Oferta[]>{        
				
				return lastValueFrom(this.http.get<Oferta[]>("http://localhost:3000/ofertas"));

			}
			
			//lastValueFrom = Converte Observable para Promise
			
#Routes / Rotas

	Criar as rotas para os diferentes componentes dentro da aplicação
	Criar arquivo:
		app.routes.ts
		
		Conteudo:
			import { Routes} from "@angular/router";

			import { HomeComponent } from "./home/home.component";
			import { DiversaoComponent } from "./diversao/diversao.component";
			import { RestaurantesComponent } from "./restaurantes/restaurantes.component";

			export const ROUTES: Routes = [
				{path: '', component: HomeComponent},
				{path: 'restaurantes', component: RestaurantesComponent},
				{path: 'diversao', component: DiversaoComponent}
			]
	
	No arquivo app-routing.module.ts
		Incluir referencia ao nosso arquivo de rotas:
			import {ROUTES} from './app.routes'
			
		na instrução import de RouterModulo, alterar para que o módulo receba as nossas rotas com o comando forRoot;
			@NgModule({
			  imports: [RouterModule.forRoot(ROUTES)],
			  exports: [RouterModule]
			})
			
			
	No template principal da aplicação, informar onde as rotas serão renderizadas, usando as tags <router-outlet>:
	
		<app-topo></app-topo>		
		<router-outlet></router-outlet>
		<app-rodape></app-rodape>
		
	Assim, as rotas já funcionarão de acordo com o que é digitado no browser.
	
	Para que o componente topo (ou qualquer outro que tenha links para nossas rotas), deve ser usado o elemento routerLink:
	
		<div class="menu">
		  <div class="container">
			<ul class="nav">
			  <li class="nav-item">
				<a class="nav-link active" routerLink="/restaurantes">Restaurantes</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" routerLink="/diversao">Diversão</a>
			  </li>
			</ul>
		  </div>
		</div>
	  </div>
	  
	routerLinkActive="active"
		O elemento routerLinkActive pode ser usado para setar qual a classe será utilizada para o link ativo da rota.
		
		
		
	Snapshot
		Para obter os valores dos Ids nas Rotas através do Snapshot
			- No arquivo de definição de rotas deve ser definida a rota com o seu parâmetro
			
			export const ROUTES: Routes = [				
				{path: 'oferta/:id', component: OfertaComponent}
			]
	
			
		Dentro do arquivo ts do component, da para se utilizar o comando snapshot da classe ActivatedRoute contido na biblioteca @angular/router
			Importações:
			import { ActivatedRoute } from '@angular/router';
			
			Criação da propriedade:
				private route: ActivatedRoute
				
			Obter o valor do parâmetro conforme definido seu nome na rota:
				this.route.snapshot.params['id']
				
			Exemplo:
			
			ngOnInit(): void {
				console.log('Id da Rota:', this.route.snapshot.params['id'])
				let id: number = this.route.snapshot.params['id']
				this.ofertasService.getOfertaByID(id).then(
				  (response: Oferta) => {
					console.log(response)
					this.oferta = response
				  }
				)
			  }
			
	Subscribe
		Igualmente ao snapshot, utiliza o recurso ActivatedRoute da classe @angular/router
		Ex:
		this.route.params.subscribe(
		  (parametro) => {
			console.log(parametro['id'])
		  }
		);
		
	Criando componentes filhos (componentes que ficarão dentro das páginas de outros componentes)
		ng g c oferta/ondeFica 
		ng g c oferta/comoUsar
		
		ng g c componentePai/NomeDoComponente
		
	Rotas Filhas/Children
		Para renderizar através das rotas os componentes dentro de outros componentes, definimos componentes filhos 
		no arquivo de definição de rotas (app.routes.ts):
		
		export const ROUTES: Routes = [			
			{path: 'oferta/:id', component: OfertaComponent, 
				children: [
					{path: 'como-usar', component: ComoUsarComponent},
					{path: 'onde-fica', component: OndeFicaComponent}
				]
			}
		]
		
		obter o id do link atraves do recurso de obter os valores do link "pai":
			this.route.parent?.snapshot.params['id']
			
			Deste modo é possível pegar o valor do id no objeto filho 
			
		O elemento <router-outlet> é utilizado dentro do component pai para que sejam renderizadas as rotas filhas:
		
			{path: 'eventos', component: EventosComponent, 
				children:[
				  {path: 'detalhe/:id', component: EventoDetalheComponent}, 
				  {path: 'detalhe', component: EventoDetalheComponent}, 
				  {path: 'lista', component: EventoListaComponent} 
				]
			  }
			  
			Eventos:
				<app-titulo [titulo]="'Eventos'" [iconClass]="'fa fa-calendar-alt'" [botaoListar]="true"></app-titulo>

				<router-outlet></router-outlet>
				
				
			Assim podemos navegar para os filhos apenas utilizandos os links.
		
			
			
	Router Guard
		Criar um guarda de rota para permitir que a rota seja acessada somente se uma condição seja satisfatório:
		Ex:
			- O usuário deve estar logado para que seja possível acessar o recurso
			
			
		Atribute:
			- CanActivate
			
			Na configuração da rota, pode ser incluida a propriedade canActivate.
				- Ela recebe um array de classes da aplicação
				- A classe deve retornar um valor true ou false para identificar se é possível acessar a rota.
				- A classe deve implementar CanActivate para que seja checada a permissão
			
			export const ROUTES: Routes = [
				{path: '', component: AcessoComponent},
				{path: 'home', component: HomeComponent, canActivate: [ AuthGuard]}
			]
			
			A classe que faz o router Guard deve ser provida como serviço.
				- Pode ser dentro de app.module
				
			- Caso o retorno seja falso, a rota não é renderizada. 	
			
		
		Retornando para a tela inicial
			Caso o resultado do CanActivate seja falso (a rota não é permitida nesse momento), basta fazer o redirecionamento dentro da classe router guard no método canActivate (ou na classe que faz a checagem de permissão que o canActivate utilizada):
			
			if (notAuthorized){
				this.router.navigate(['/'])
			}
			
	RedirectTo / Redirecionar a rota na configuração
	
		{path: '', redirectTo: 'dashboard', pathMatch: 'full'},  //para rota em branco
		{path: '**', redirectTo: 'dashboard', pathMatch: 'full'} //para rotas que não estejam mapeadas
	
	Rota ativa
		- Realçar a rota ativa 
		routerLinkActive="active"
		
		
	Exemplo:
	
		const routes: Routes = [
		{path: 'eventos', redirectTo: 'eventos/lista'},    //Para o redirectTo funcionar, deve estar definido antes do path da rota a ser direcionada
		  {path: 'eventos', component: EventosComponent, 
			children:[
			  {path: 'detalhe/:id', component: EventoDetalheComponent}, 
			  {path: 'detalhe', component: EventoDetalheComponent}, 
			  {path: 'lista', component: EventoListaComponent} 
			]
		  },
		  {path: 'palestrantes', component: PalestrantesComponent},
		  {path: 'dashboard', component: DashboardComponent},
		  {path: 'perfil', component: PerfilComponent},
		  {path: 'contatos', component: ContatosComponent},
		  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
		  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
		  
		];	
			
#Reative Programming

	Orientada a mensagens
	Elasticidade
	Resiliente
	Responsiva
	
	rxjs (biblioteca)
	
	Observables
		Atende aos pilares da programação reativa 
		
		Pode receber 3 parametros no subscribe
			1. Obtém o valor
			2. Trata o erro
			3. Trata a finalização (sucesso)
			
		ActivatedRoute.params é um exemplo de observable implementado pela biblioteca routes do Angular. 
		
		
		reactivex.io
		
		.retry(10)
			Repete a tentativa de conexão ao observable caso ocorra falha na conexão
			
			
		Inferencia de tipos ?
		
		
		

##Subject

	proxy
		Funciona como gateway para o Observable
	Observavel e observador
	
	switchMap
		recebe o parametro passado pelo metodo next do subject e executa as ações
		
	Precisa ser feito o subscribe
	
	Pode ser declarado no ngInit (funciona como um event listener)
	
	
	Exemplo:
	
		public ofertas!: Observable<Oferta[]>;
  
		  private subjectPesquisa: Subject<string> = new Subject<string>();

		  constructor(private ofertasService: OfertasService) { }
	
	
		ngOnInit(): void {
			this.ofertas = this.subjectPesquisa.pipe(switchMap((termo: string) => {
			  console.log('requisição http para api')
			  return this.ofertasService.pesquisaOfertas(termo);
			}))

			this.ofertas.subscribe((ofertas: Oferta[]) => console.log(ofertas))
		  }

		  public pesquisa(termodaBusca: string): void{
			console.log('keyup caracter: ', termodaBusca);
			this.subjectPesquisa.next(termodaBusca); 

		  }
			
	
	Debounce Time
		Operador
		
		debounceTime(1000) //ms

		Utilizado juntamente com o subject e antes do switchMap, ele faz o operador switchMap aguardar o tempo definido pelo debounceTime para iniciar a execução.
		
	operador of
		utilizei no curso para retornar um observavel com array vazio 
			Seria um observable do tipo Array de Oferta 
		import { of } from 'rxjs'
			
		return of<Oferta[]>([])
	
	DistinctUntilChanged
		Ele desconsidera a pesquisa atual se o termo de busca for igual ao anterior, sendo assim, não faz uma nova requisição ao serviço
		
		.pipe(
			debounceTime(1000),
			distinctUntilChanged(),
			switchMap((termo: string) => {
				//faz a chamada de consulta a api que retorna o observable
			})
		)
		
	Exemplo completo da implementação conforme acima:
		ngOnInit(): void {
			this.ofertas = this.subjectPesquisa.pipe(
			  debounceTime(1000), //executa a ação swicthMap após 1 segundo
			  distinctUntilChanged(), // Para fazer pesquisas distinstas
			  switchMap((termo: string) => {
				
				if (termo.trim() === ''){
				  //retornar um observable de array de ofertas vazio
				  return of<Oferta[]>([])        
				}
				console.log('requisição http para api')
				return this.ofertasService.pesquisaOfertas(termo);
			}),catchError((erro) => {
			  console.log('Erro Subject: ', erro.status, erro)
			  return of<Oferta[]>([])        
			}))

			this.ofertas.subscribe((ofertas: Oferta[]) => {
			  console.log(ofertas)
			  this.ofertasSearch = ofertas
			})
		}

		public pesquisa(termodaBusca: string): void{
			console.log('keyup caracter: ', termodaBusca);
			this.subjectPesquisa.next(termodaBusca); 

		}
		
	Obs:
		Para listar os itens do search, o instrutor usou após o campo de pesquisa, um listgroup do Bootstrap
		Ficaria ao lado do campo, mas ao utilizar um style="position: absolute", o campo passa a ficar abaixo do campo de pesquisa (tive que mudar a classe do form para form-inline ... estava d-flex)
		
	O instrutor criou uma nova variavel dentro do topo.component
	Essa variavel recebeu os valores retornados pelo observable no subscribe
	
	Dentro do código html, utilizou a diretiva *ngfor= "let nomevar of NomeVarComponent" para listar os itens no listgroup:
	
	<form class="form-inline" style="width: 60%">
          
		<input type="search" class="form-control me-2" placeholder="Pesquise por ofertas" 
		#termoDaPesquisa (keyup)="pesquisa(termoDaPesquisa.value)"/>       
	  
	  
		<ul class="list-group" style="position: absolute; width: inherit;">
		  <li class="list-group-item" *ngFor="let oferta of ofertasSearch">{{oferta.titulo}}</li>              
		</ul>           
					
	</form>

#Pipes

	Determinar como a informação deve ser apresentada na View (em qual formato)
	
	| json
	| uppercase
	| lowercas
	| percent
	| date: 'dd/MM/yyyy'
	| currency: 'BRL': true
	| slice: 0:4
	| async
	
	Handles ou Parâmetro:
		após a definição do pipe, podem ser usados parâmetros para definir como a transformação deve ser feita.
		Basta informar : (dois-pontos) após a definição, e após os : definir como a informação deve ser apresentada. 
		
	Pipe Customizado
		Cria-se como uma classe normalmente implementando PipeTransform
			Pipe customizado para truncar texto em 15 posições e concatenar com ...
			
			
			<code>
			import { Pipe, PipeTransform } from "@angular/core";
	
			@Pipe({
				name: 'descricaoReduzida'
			})
			export class DescricaoReduzida implements PipeTransform{
				transform(texto: string): string {
					if (texto.length > 15){
						return texto.substring(0,15) + '...'
					}
					return texto
				}
			}
			</code>
							
		
		Deve ser declarado no contexto da aplicação
			importar o pipe em App.Module.ts
			
				//pipe
				import { DescricaoReduzida } from '../app/util/descricao-reduzida.pipe'
			
			Declarar junto com os componentes
		
				declarations: [
					...,
					DescricaoReduzida
				  ],
		
		
		Utilizar o pipe nos templates de modo igual aos pipes padrões
			
		Encaminhar parÂmetros ao Pipe
			Basta receber novos parâmetros no método transform do pipe, e fazer a transformação necessária no código:
				transform(texto: string, truncarEm: number): string {
					if (texto.length > truncarEm){
						return texto.substring(0,truncarEm) + '...'
					}
					return texto
				}
			Ao utilizar o pipe no template, para encaminhar o parâmetro, utilizar os : (dois-pontos)
			
				{{oferta.titulo | descricaoReduzida: 15}}
				
			Podem ser utilizados quantos parâmetros forem necessários
			
	Encadeamento de Pipes
		Basta informar o próximo pipe em seguida ao primeiro:
		
			{{oferta.titulo | descricaoReduzida: 15 | uppercase}}
			
	Pipe async (Inscrição em Observable e promises)
	
		Recuperar os valores de observables ou promessas diretamente no template, sem precisar de um data binding
		
		Como funciona:
			Ao inves de fazer o subscribe em uma propriedade observable dentro do component, pasta incluir no template o pipe async quando for obter a informação. 
			O proprio template funciona como se fosse o subscribe e já pega o retorno e transforma no tipo retornado.
			
			<li class="list-group-item" *ngFor="let oferta of ofertas | async">{{oferta.titulo | descricaoReduzida: 15}}</li> 
			
			Não necessita realizar o subscribe para transformar a informação:
				- O Código abaixo deixa de ser necessário
				//this.ofertas.subscribe((ofertas: Oferta[]) => {
				//  console.log(ofertas)
				//  this.ofertasSearch = ofertas
				//})
				
				Basta receber no template o próprio observable de ofertas:
				
				public ofertas!: Observable<Oferta[]>;
				
				this.ofertas = this.subjectPesquisa.pipe(
				  debounceTime(1000), //executa a ação swicthMap após 1 segundo
				  distinctUntilChanged(), // Para fazer pesquisas distinstas
				  switchMap((termo: string) => {
					
					if (termo.trim() === ''){
					  //retornar um observable de array de ofertas vazio
					  return of<Oferta[]>([])        
					}        
					return this.ofertasService.pesquisaOfertas(termo);
				}),catchError((erro) => {      
				  return of<Oferta[]>([])        
				}))
				
	Alterar o Pipe de Date
		Já existe um Pipe para Date
			Mas caso desejarmos utilizar o pipe de Date para formatar nossa data para um outro formato, podemos extender o DatePipe e customizar o formato:
			
			<code>
				import { DatePipe } from '@angular/common';
				import { Pipe, PipeTransform } from '@angular/core';
				import { Constants } from '../util/Constants';

				@Pipe({
				  name: 'DateTimeFormatPipe'
				})
				export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

				  public override transform(value: any, args?: any): any {
					return super.transform(value, Constants.DATE_TIME_FMT);
				  }

				}
			</code>
			
			
			Do mesmo modo, deve ser informado ao app.module o novo Pipe na parte Declarations do app.module
		
#intl

	Pacote de internacionalização para que os valores currency possam ser representados corretamente (com virgula dividindo os decimais)
	
		npm install --save intl (apontando para a pasta da aplicação)
	
	dentro do arquivo polyfills.ts, incluir os imports:
	
		import 'intl'
		import 'intl/locale-data/jsonp/pt-BR
		
		OBS: NÃO COLOCAR ISSO NO ANGULAR 13
		
	No arquivo App.Module.ts
	
	importar o LOCALE_ID do core do Angular
	
		import { NgModule, LOCALE_ID } from '@angular/core';
		import { registerLocaleData } from '@angular/common';
		import localePt from '@angular/common/locales/pt'
		
		registerLocaleData(localePt)
	
	Na tag Providers, incluir a instrução:
		providers: [ {provide: LOCALE_ID, useValue: 'pt'}],
	
	
	
	
		
	
#Variaveis de referencia do template

	"#nomeDaVariavel"
	Dentro do elemento html é possível setar uma variavel do elemento de template.
	Exemplo:
	<input type="search" class="form-control me-2" placeholder="Pesquise por ofertas" #termoDaPesquisa (keyup)="pesquisa(termoDaPesquisa.value)"/>
	
	Insere-se o noma da variavel com o # (hashtag) na frente do nome,
		assim é possível encaminhar o valor do campo utlizado a variavel de template referenciada no campo.
		
		No evento do component, recebe-se seu valor como string
		
#Formularios NgForms

	Iniciando:
		- Declaração na classe de módulo
		
		Para utilizar os formularios do angular, deve-se primeiramente informar o módulo da aplicação que iremos trabalhar com a classe de formulários do angular.
		
		app.modulo.ts
		
			-Importar FormsModule:
				import { FormsModule } from '@angular/forms';

			- Dizer ao módulo que iremos importar esse serviços:
				@NgModule({
					declarations: [
					...
					],
					imports: [
						...,
						FormsModule
					]
				})
		
		Após a importação, basta utilizar a tag NgForms dentro dos templates e importar a diretira NgForms de @angular/forms para dentro das classes de component que utilizarão os forms
		
		Template:
			- Nas tags <form>, declarar a variavel de referencia que da nome ao formulario: Ex: #formulario="ngForm"
			- Nos campos input do formulario, devem ser informados as propriedades name e ngModel...assim, a variavel de referencia saberá que o campo deve ser seu valor carregado para dentro do formulario com o respectivo name
			
			<form novalidate #formulario="ngForm" (ngSubmit)="confirmarCompra()">
				<input 
				type="text" 
				class="form-control is-invalid" 
				placeholder="Endereço" 
				autocomplete="off" 
				minlength="5" 
				required
				name="endereco"   
				ngModel
			  >
				
		Para submeter valores a classe do component, podemos fazer de algumas maneiras:
			devemos ter um <button type="submit">
			
			Na tag form, informar (ngSubmit)="NomeDoMetodoComponent(formulario)";
			
		Para receber o valor na classe do component:
			importar a diretiva NgForm:
				import { NgForm } from '@angular/forms';
				
			- Podemos receber seu valor através do parâmetro do método
			
			public nomeDoMetodoComponent(form: ngForm): void{
				console.log(form)
			}
			
			Ou podemos utilizar a diretiva ViewChild
		
		@ViewChild
			- Essa diretiva nos permite criar dentro do component uma propriedade que automaticamente já recebe os valores do formulario ngForm do template:
			- importar a diretiva para o component do @angular/core:
				import { ..., ViewChild } from '@angular/core';
				
			para criar a propriedade, informar o decorador @ViewChild com o respectivo nome do form declarado no template:
				@ViewChild('formulario') public formulario: NgForm
				
			Deste modo, ao fazer o submit não é necessário enviar o formulario no parâmetro, já que ele já está vinculado ao component:
			No template:
			<form novalidate #formulario="ngForm" (ngSubmit)="NomeDoMetodoComponent()"
			
			no Component:
				public nomeDoMetodoComponent():void{
					this.formulario;
				}
				
				
			##################**************************##########################
			Olha que legal!
			Utilizando a função decoradora @ViewChild, é possível acessar os métodos de um componente filho.
			Como?
			Assim:
			
				Onde é feita a instancia do component no html, setar uma variavel de referência:
				
					<app-publicacoes #publicacoes> </app-publicacoes>
				
				No component.ts da classe pai, importar e associar a variaveis de referencia ao viewchild:
					import {..., ViewChild } from '@angular/core';
					
				Criar uma variavel com o viewchild
					@ViewChild('publicacoes') public publicacoes: any
					
					No momento apropriado, pode ser chamado o método do componente filho:
					
					public atualizarTimeLine(): void{
						console.log('Home','chegamos até aqui!')
						this.publicacoes.atualizarTimeLine()
					}
				
		
		Trabalhando com variavel de referencia do tipo ngModel:
		Em um campo do tipo input/select/etc
			É possível criar uma variavel de referencia no template do tipo ngModel, para assim obter os estados do campo que o ngModel possibilita:
			
			Exemplo:
			<div class="col-md-4">
			  <input 
				type="text" 
				class="form-control" 
				placeholder="Complemento" 
				autocomplete="off"
				name="complemento"
				ngModel
				#inputComplemento="ngModel"            
			  >
			  <small *ngIf="inputComplemento.touched" class="form-text text-success">Ok</small>
		
			Neste caso foi criada a variavel
				- #inputComplemento="ngModel"
				
				deste modo é possível acessar as propriedades dessa variavel para trabalhar com o estados do campo:
					valid
					invalid
					touched
					pristine
					
					*ngIf="inputComplemento.touched"
			
	Validação 		
		required
		minlength
		maxlength
		
	Carregar dados 
		
		public carregarEvento(): void{
			const eventoIdParam = this.route.snapshot.paramMap.get('id');

			if (eventoIdParam !== null){
			  this.eventoService.getEventoById(+eventoIdParam).subscribe(
				(evento: Evento) => {
				  this.evento = {...evento};
				  this.form.patchValue(this.evento);
				},
				(error :  any) => {
				  console.error(error);
				},
				() => {}
			  );
			}
		  }
		
		
		
		
		

#ReactiveFormsModule	
	
	Iniciando:
		- Declaração na classe de módulo
		
		Para utilizar os formularios do angular, deve-se primeiramente informar o módulo da aplicação que iremos trabalhar com a classe de formulários do angular.
		
		app.module.ts
		
			-Importar ReactiveFormsModule:
				import { ReactiveFormsModule } from '@angular/forms';

			- Dizer ao módulo que iremos importar esse serviços:
				@NgModule({
					declarations: [
					...
					],
					imports: [
						...,
						ReactiveFormsModule
					]
				})
		
		Na classe do component:
		
			import { FormGroup, FormControl } from '@angular/forms';
		
		Um formgroup corresponde a um formulario do template, e os formcontrols aos elementos do formulario
		
		Na instanciação do FormGroup, é necessário definir FormControls:
		
			public formulario: FormGroup = new FormGroup({
				'endereco': new FormControl(null),
				'numero': new FormControl(null),
				'complemento': new FormControl(null),
				'formaPagamento': new FormControl(null)
			  });
			  
		Outro modo de criar o FormGroup:
			
		
		No template
			Associar o elemento form ao form group instanciado no component
				- <form [formGroup]="formulario"
			
			Associar os elementos input/select/etc do form aos formControls:
				- formControlName="nomeDoControleDefinidoNoComponent"
				
		Submit
			- é possível utilizar um input do tipo button e disparar um evento click para o evento do component
			- ou manter o input do tipo submit e na propriedade do elemento form incluir o evento (ngSubmit)="evento()"
		
		
		Validação:
			Validators do @angular/forms

			import { FormGroup, FormControl, Validators } from '@angular/forms';

			// Na declaração do FormGroup, implementa validações nos FormControls 
			public formulario: FormGroup = new FormGroup({
				'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
				'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]),
				'complemento': new FormControl(null),
				'formaPagamento': new FormControl(null, [Validators.required])
			  });
			

			Desabilitar controle de acordo com a validação do formulario
				[disabled]="!formulario.valid"
			
								
			//Se formulario invalido, marca os campos como "tocados" para apresentar os erros (caso estejam invalidos mas não tenham passado por validação)
			if (this.formulario.status === 'INVALID'){
			  console.log(this.formulario.status);
			  this.formulario.get('endereco')?.markAsTouched()
			  this.formulario.get('numero')?.markAsTouched()
			  this.formulario.get('complemento')?.markAsTouched()
			  this.formulario.get('formaPagamento')?.markAsTouched()
			}
			
			
			Comportamento do Angular automático (provavelmente Angular 11+)
			
			Quando temos um campo input com a classe form-control, e colocamos logo abaixo um elemento (div, span) com a classa invalid-feedback, o Angular processa automaticamente quando o invalid-feedback deve aparecer.
				Ele só vai mostrar se no campo input estiver atribuida a classe is-invalid.
			
	Possiveis Erros:
		Se não realizar o import do ReactiveFormsModule no app.module, o template pode acusar que há erro de bind / não reconhece FormGroup
			- Cannot bind to formgroup since it isn't a known property of 'form'
			
			
	NgClass
		[ngClass]="{'is-invalid': true}" 
		
		Injeta a classe no elemento html caso a condição seja true
		
		
		Condiçao ngIf para teste de erros do Validators:
		
			<div *ngIf="form.get('tema')?.hasError('required')" class="invalid-feedback">Tema é obrigatório</div>
			<div *ngIf="form.get('tema')?.hasError('minlength')" class="invalid-feedback">Tema deve ter no mínimo 4 caracteres</div>
			<div *ngIf="form.get('tema')?.hasError('maxlength')" class="invalid-feedback">Tema deve ter no máximo 50 caracteres</div>
			
	
	Temos um jeito menos verboso de listar os erros:
	FormBuilder (FORMBUILDER)
		É uma solução muito melhor para se usar o Reactive Forms, muito menos verbosa e mais direta.
		Como:
		
		Injetar FormBuilder pela construtor do componente:
			constructor(private fb: FormBuilder) { }
			
		Instanciar o FormGroup igual o modo padrão:
			public form!: FormGroup;
			
		Utilizar a variavel injetada para criar o FormGroup atraves do FormBuilder:
		Note que muda um pouco (algumas chaves viram colchetes:
		
			this.form = this.fb.group({
			  tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
			  local: ['', [Validators.required]],
			  dataEvento: ['', [Validators.required]],
			  qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
			  imagemURL : ['', [Validators.required]],
			  email: ['', [Validators.required, Validators.email]],
			  telefone: ['', [Validators.required]]
			}); 
			
		
		Criar o get para que seja possível obter os controles no template:
			get f(): any{
				return this.form.controls;
			  }
	
	
		No template (html) do component, é possível acessar os controles e suas propriedades do seguinte modo:
		
			input type="text" class="form-control" 
				[ngClass]="{'is-invalid': f.tema.errors && f.tema.touched}" 
				placeholder="Insira o Tema" formControlName="tema">

				<div *ngIf="f.tema.errors?.required" class="invalid-feedback">Tema é obrigatório</div>
				<div *ngIf="f.tema.errors?.minlength" class="invalid-feedback">Tema deve ter no mínimo 4 caracteres</div>
				<div *ngIf="f.tema.errors?.maxlength" class="invalid-feedback">Tema deve ter no máximo 50 caracteres</div>
		
			<input type="text" class="form-control" 
				[ngClass]="{'is-invalid': f.local.errors && f.local.touched}"
				placeholder="" formControlName="local">
				
		Dica:
			No [ngClass] podemos chamar uma método do componente, e retornar a validação através do método.
			Basta passar para o método, o control, no exemplo acima, f.local, e retornar o objeto de validação, deste modo:
			
			Método:
			<code>
			public cssValidator(formControl: FormControl): any{
				return {'is-invalid': formControl.errors && formControl.touched}
			  }
			</code>
			
			Template:
			<code>
			<input type="text" class="form-control" 
                    [ngClass]="cssValidator(f.tema)" 
                    placeholder="Insira o Tema" formControlName="tema">
			</code>
		
	Validator Customizado
		Como podemos criar validação de erros para as nossas necessidades:
		
		1) Ex: Validar confirmação de senha
			Quando temos um campo de senha e um campo de para confirmar a senha 
			
			Criar uma classe:
				(colocar na Pasta helpers)
				<code>
				import { AbstractControl, FormGroup } from "@angular/forms";

				export class ValidatorField {
					static MustMatch(controlName: string, matchingControlName: string): any{
						return (group: AbstractControl) => {
							const formGroup = group as FormGroup;
							const control = formGroup.controls[controlName];
							const matchingControl = formGroup.controls[matchingControlName];

							if (matchingControl.errors && !matchingControl.errors['mustMatch']){
								return null;
							}    

							if (control.value !== matchingControl.value){
								matchingControl.setErrors({mustMatch: true});
							} else {
								matchingControl.setErrors(null);
							}

							return null;
						};
					}
				}
				</code>
			
			Para incluir na validação do campo, colocar no componente da classe onde termos o campo:
				<code>
				const formOptions: AbstractControlOptions = {
				validators: ValidatorField.MustMatch('senha', 'confirmaSenha')
				};

				this.form = this.fb.group({
				  titulo: ['', [Validators.required]],
				  ...,
				  primeiroNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]			  
				}, formOptions);
				
				</code>
				
				
#Chamada de métodos dinamicamente (typescript)

	Dentro de uma classe temos métodos que podem ser chamados para executar seus comandos, etc.
	Geralmente a chamada se dá por
		
		this.Nome_da_Classe.Metodo(parametros);
		
		No caso de um serviço http, que retorna um observable, temos
			this.service.Metodo(parametro).subscribe(...);
			
		Podemos chamar esses métodos, definindo seu nome com uma variavel string, podendo assim fazer somente uma chamada, e na variavel definimos qual método será chamado.
		Ex:
			Digamos que temos 2 metodos que recebam o mesmo parâmetro, mas executam coisas diferentes, mas são muito parecidos,
			Digamos um http post e o put.
			
			O metodo post seria;
				public post(param: tipo){...}
				
			O metodo put:
				public put(param: tipo){...}
	
	
			A chamada do metodo deste serviço pode ser feita assim:
			
				Dependendo da condição de execução, podemos definir uma variavel com o nome do método a ser chamado
				let modo = 'post'
				ou 
				let modo = 'put'
				
				No momento de chamar o método, fazemos assim:
				
					(service é a variavel da classe
						private service: EventoService definida no construtor)
						
					this.service[modo](param).subscribe({...});
					
					Deste modo, o [modo] define qual método será chamado:
					
					ATENÇÃO: para isto ser possível no typescript, no arquivo tsconfig.json, precisamos incluir a condição:
						"noImplicitAny": false,"
						ou alterar o 
						"strict":false, (porém este modo afeta todos as outras checagens do typescript
		
#Animations

	A biblioteca e animações do Angular está em @angular/platform-browser/animations:
	
	Deve ser importado para o módulo do app:
		import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
		
		Declarado no providers:
			imports: [
				BrowserModule,
				AppRoutingModule,
				BrowserAnimationsModule
			]


	Na classe do component a ser implementado, devem ser importados as libs necessários para a configuração da animação:
		São elas: trigger, state, style, transition, animate
			import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
			
		
		A animação deve ser configurada no decorador @component:
			@Component({
			  selector: 'app-banner',
			  templateUrl: './banner.component.html',
			  styleUrls: ['./banner.component.css'],
			  animations: [
				trigger('banner', [
				  state('escondido', style({
					opacity: 0
				  })),
				  state('visivel', style({
					opacity: 1
				  })),
				  transition('escondido <=> visivel', animate('1s ease-in'))
				])
			  ]
			})
			
	No template:
		O elemento que irá receber as regras de animação será identificado por property binding
			- incluir no property binding o @ seguido do nome da trigger, seguido do estado da animação
			<img [@banner]="estado"/>
			ou seja:
			<img [@banner]="variavelDefineEstado"

	Estado Void
		È possível animar o elemento a partir do estado Void, que é o estado que o elemento se encontra quando ainda não existe no DOM:
		
		Esta animação define o estado criado (quando o elemento já existe) e define uma transição de void para criado, começando com opacidade zero, e alterando a posição inicial do elemento, para que ele se mova até sua posição original. 
		animations: [
			trigger('animacao-banner',[
			  state('criado', style({
				opacity: 1
			  })),
			  transition('void => criado', [
				style({opacity: 0, transform: 'translate(-50px, 0)'}),  //Move o componente de uma posição inicial no eixo x de -50 para 0 
				animate('500ms 1s ease-in-out')])//duração, delay, aceleração
			])
		  ]

		É preciso criar uma variavel de estado para setar a animação e seu estado no template:
			public estadoBanner: string = 'criado'
			
		No html:
			<div class="col-sm-6 d-flex justify-content-end" [@animacao-banner]="estadoBanner">
				<app-banner></app-banner>
			</div>
	
	Keyframes
		O recurso keyframes nos da a possibilidade de inserir alterações na animação, até ela terminar.
		O recurso keyframes esta disponivel na biblioteca '@angular/animations';
		
		import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
		
		
		Para inserir pontos de animação diferentes na animação, usamos o offset, que identifica as posições da animação entre 0 e 1, onde 0 é o inicio e 1 o final da animação (0 a 100%)
		
		Basta inserir no comando animate, informando o offset e os estilos da animação:
		
		trigger('animacao-painel',[
		  state('criado', style({
			opacity: 1
		  })),
		  transition('void => criado', [
			style({opacity: 0, transform: 'translate(50px, 0)'}), //inicio
			animate('1.5s 0s ease-in-out', keyframes([    //duração de 1.5 segundos, sem delay, animação ease-in-out
			  style({offset: 0.15, opacity: 1, transform: 'translateX(0)'}), //15%
			  style({offset: 0.86, opacity: 1, transform: 'translateX(0)'}), //86%

			  style({offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}), //88%
			  style({offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),   // 90%
			  style({offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),  // 92%
			  style({offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),   // 94%
			  style({offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),  // 96%
			  style({offset: 0.98, opacity: 1, transform: 'translateY(10px)'})    // 98%
			])) //duração, delay, aceleração                                      // 100% é o final da animação, onde chega no estado 'criado'
		  ])
		])
		
	
#Diversos 
	
	Chamar métodos de serviços direto do html/template do component!!!
	É possível por String Interpolation fazer a chamada no html, utilizando a instancia criada no component. O html mostrará o retorno:
	
	<div> {{ carrinhoService.metodo() }} </div>
	
	
#StrictTemplate

	tsconfig.json
	
	Essas opções adicionam uma camada de checagem para a tipagem do typescript (checar se os tipos estão corretos dentro do template html).
	Adicionam também checagem para necessidade de injeção de dependencia. 
	
	"angularCompilerOptions": {
		"enableI18nLegacyMessageIdFormat": false,
		"strictInjectionParameters": true,
		"strictInputAccessModifiers": true,
		"strictTemplates": true
	}
		
#paths

	A configuração paths dentro do arquivo tsconfig.json nos da a opção de encurtar os caminhos das referencias dos componentes/serviços/etc dentro dos componentes.
	Ex:
	
	"paths": {
      "@app/*": ["src/app/*"],
      "@environments/*": ["src/environments/*"]
    }
	
	Ao referenciar recursos dentro dos components, podem ser reduzidos deste modo:
	Ex:
	import { Evento } from '@app/models/Evento';
	import { EventoService } from '@app/services/evento.service';

		
#Chrome Network

	Na ferramenta de desenvolvedor do Google Chrome é possível verificar as requisições do Site na Aba Network e verificar os retornos
	
#Optional Chaining com Array

	evento.lotes?.[0]?.nome

#HttpParamsOptions

#HostListener

	https://angular.io/api/core/HostListener
	
	Cria um listener para executar um evento e uma função
	
	


#Html

	Atributo Pattern
		Permite configurar uma regular expression para o campo html (input)
		
		<div class="row">
			<div class="col d-flex justify-content-end">
			  <h4>Total do pedido: {{carrinhoService.totalCarrinhoCompras() | currency: 'BRL': 'symbol-narrow'}} </h4>
			</div>
		</div>
		
	Remover item do array
		this.itens.splice(this.itens.indexOf(itemEncontrado), 1)
		
crashlytics
	
	
#To Base64

	Angular 12
	
	import { Buffer} from 'buffer'
	
	
	console.log(Buffer.from("Hello World").toString('base64'));
	// SGVsbG8gV29ybGQ=
	console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('binary'))
	// Hello World
	
	
#Firebase

	293874923879
	
	firebase.google.com
	
	O banco de dados Firebase é um banco NoSQL. Pode ser acessado gratuitamente.
	
	Como instalar o Firebase SDK:
	
	npm install --save firebase.
	
	Seguir a configuração apresentada no site do firebase:
	
	No app.component.ts configurar o acesso ao Firebase, inclusivo banco de dados:
	
		- app.component.ts:
		
			import * as firebase from 'firebase/app'
			
			ngOnInit(){
				const firebaseConfig = {
				  apiKey: "AIzaSyCrzhEV5LXBHegWaJ3r9CpSXFFJK8paJ1w",
				  authDomain: "jta-instagram-clone-73704.firebaseapp.com",
				  projectId: "jta-instagram-clone-73704",
				  storageBucket: "jta-instagram-clone-73704.appspot.com",
				  messagingSenderId: "507476175364",
				  appId: "1:507476175364:web:54fd655afff93ba389a351",
				  measurementId: "G-6VEXZY3VHP",
				  databaseURL: "https://jta-instagram-clone-73704-default-rtdb.firebaseio.com"
				};

				firebase.initializeApp(firebaseConfig)
			}
			
			
		- Cadastrar usuário:
			public cadastrarUsuario(usuario: Usuario): Promise<any>{
			console.log('Chegamos até o serviço', usuario)

			let hashEmail = Buffer.from(usuario.email).toString('base64')        
			
			const auth = firebase.getAuth()
			return firebase.createUserWithEmailAndPassword(auth,usuario.email, usuario.senha).then((resposta: any) => {
				//console.log(resposta)

				//@ts-expect-error 
				delete usuario.senha           

				let db = firebaseDatabase.getDatabase();
				firebaseDatabase.set(firebaseDatabase.ref(db, 'users/'+hashEmail), {
					usuario
				})
				

				}).catch((error: Error) => {
					console.log(error)
				})        
			}
			
		- Autenticar usuário:
			public AutenticarUsuario(email: string, senha: string): void{
				console.log('Tentando autenticar usuário...')

				const auth = firebase.getAuth()
				firebase.signInWithEmailAndPassword(auth, email, senha).then((response: any) => {
					console.log(response);
					auth.currentUser?.getIdToken().then((idToken: string) => {                
						this.token_id = idToken
						this.router.navigate(['/home'])
					});

				}).catch((error: any) => {
					console.log(error.code, ' - ', error.message)            
				})


			}
				
	LocalStorage para armazenamento do token de autenticação
		LocalStorage: É mantido pelo navegador pelo tempo que ele é confirado para ser mantido. Caso feche o navegador, o LocalStorage se mantém
		SessionStorage: É mantido 
		
		Ex:
			localStorage.setItem('idToken', idToken);
			
	
	Efetuando LogOut:
		- Para que ocorra a desconexão para com o firebase:
		firebase.auth().SignOut();
	
	
	Obter o usuário logado:
	
		let auth = firebase.getAuth()
		firebase.onAuthStateChanged(auth, (user) => {
		  console.log(user?.email)
		  this.userEmail = user?.email!
		})
		
		
		
	
#ngx-bootstrap

	npm install ngx-bootstrap --save
	
	collapse
	dropdown
	modal
	tooltip
	Toastr: Apresenta mensagem de confirmação temporaria
		ngx-toastr (pesquisar no google)
			Tem todo o passo a passo de como configurar o Toastr!
			
			
#ngx-toastr

	Apresenta mensagens para responder a resultados de processamento
	import { ToastrModule } from 'ngx-toastr';
	
#ngx-spinner

	Imagem de carregando 	
	import { NgxSpinnerModule } from 'ngx-spinner';
	
#ngx-datepicker

	ngx-bootstrap/datepicker

	import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
	import { defineLocale } from 'ngx-bootstrap/chronos';
	import { ptBrLocale } from 'ngx-bootstrap/locale';	
	defineLocale('pt-br', ptBrLocale);
			
	
#font-awesome

	npm install --save @fortawesome/fontawesome-free
	
#Converter uma string em int

	basta colocar o sinal + na frente da variavel
		+string
		
		
		
	

