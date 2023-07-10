sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, MessageToast, JSONModel) {
        'use strict';

        return Controller.extend("fiorinet.template.controller.App", {


            ///INITIALIZATION

            onInit: function () {

                //cria objeto de dados
                var oMsg = {
                    MsgInicial: "Seja bem vindo!"
                }

                //cria modelo json
                var oMsgModel = new JSONModel();

                //atribui dados ao modelo
                oMsgModel.setData(oMsg);

                // Atribui o modelo à view
                this.getView().setModel(oMsgModel, "messages");

                //cria um novo modelo ja definindo o objeto
                var oPessoaModel = new JSONModel({
                    nome: "Steven",
                    sobrenome: "Job",
                    habilitado: true,
                    endereco: {
                        rua: "Avenida Victor Hugo 156",
                        cidade: "Paris",
                        cep: "12345",
                        pais: "França"
                    }
                });

                // Atribui o modelo à view   
                this.getView().setModel(oPessoaModel, "pessoa");

                // cria array (lista de registros)
                var oFuncionarios = {

                    Funcionarios: [
                        {
                            nome: "Steven",
                            sobrenome: "Job",
                            habilitado: true
                        },
                        {
                            nome: "Burt",
                            sobrenome: "Preynolds",
                            habilitado: false
                        },
                        {
                            nome: "Maiqe",
                            sobrenome: "Taison",
                            habilitado: true
                        }

                    ]

                };
                //cria um novo modelo ja com objeto definido
                //var oFunModel = new JSONModel(oFuncionarios);
                //this.getView().setModel(oFunModel, "empregados")

            },


            ///////////
            //IMPLEMENTAÇÃO CUSTOMIZADA
            ////////
            onShowHello: function () {

                //coletar o modelo que está na tela 
                var oModel = this.getView().getModel("messages");

                //coletar os dados do modelo
                var oDados = oModel.getData();

                //MessageToast.show(oDados.MsgInicial);
                var nome = this.getView().getModel("pessoa").getProperty("/nome");
                var sobrenome = this.getView().getModel("pessoa").getProperty("/sobrenome");
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sMsg = oBundle.getText("msgInicialPopup", [nome, sobrenome]);
                MessageToast.show(sMsg);

            },


            onFuncionarioSelected: function (oEvent) {
                var oSelectedItem = oEvent.getSource();
                //se não for modelo default, informar nome do modelo. Ex: getBindingContext("pessoa");
                var oContext = oSelectedItem.getBindingContext("empregados");
                var sPath = oContext.getPath();
                var oProductDetailPanel = this.byId("detalhePanel");
                oProductDetailPanel.bindElement({
                    path: sPath,
                    // se não for modelo default, preencher nome do modelo
                    model: "empregados"
                    //opcional. se tiver associação com outra entidade, pode ser informado propriedade de navegação
                    //expand: 'endereco'
                });

            },

            onAddRegistro: function () {

                //coletar o modelo que está na tela 
                var oModel = this.getView().getModel("pessoa");
                //coletar os dados do modelo
                var oDados = oModel.getData();

                //coletar o modelo que está na tela 
                var oModelEmp = this.getView().getModel("empregados");
                //coletar os dados do modelo
                var oDadosEmp = oModelEmp.getData();

                oDadosEmp.Funcionarios.push({
                    nome: oDados.nome,
                    sobrenome: oDados.sobrenome,
                    habilitado: oDados.habilitado
                });

                oModelEmp.refresh();

            },

            onDeleteLinha: function (oEvent) {
                //neste caso o source do evento é a lista, nao o item da lista
                //por isso coletamos a linha clicada com base na lista
                var oSelectedItem = oEvent.getParameter("listItem");

                //busca dentro do modelo o id do registro selecionado
                var oContext = oSelectedItem.getBindingContext("empregados");

                //armazena os dados do registro selecionado
                var obj = oContext.getObject();

                //coleta a view inteira para trabalhar com ela
                var oModelEmp = this.getView().getModel("empregados");

                //coletar a lista inteira (ARRAY) que está dentro do modelo
                var oLista = oModelEmp.getData().Funcionarios;

                // deleta a linha do array (splice) 
                //comparando qual linha tem os dados iguais aos da variavel obj (indexOf)
                oLista.splice(oLista.indexOf(obj), 1);

                //atualiza modelo para atualizar a view
                oModelEmp.refresh();

            },

            empregadosListFactory: function(sId, oContext){
                var olistItem;
                if (oContext.getProperty("habilitado") === false ) {
       
                    olistItem = new sap.m.ObjectListItem({
                      title: "Demitido",
                      icon: "sap-icon://warning",
                      numberState: "Error"
                   });
       
                } else {
       
                   olistItem = new sap.m.ObjectListItem({
                      title: {path: "empregados>nome"},
                      info : {path: "empregados>sobrenome"},
                      numberState: "Success"
                   });
       
                   olistItem.addAttribute(
                      new sap.m.ObjectAttribute({
                         text:{path: "empregados>habilitado"}
                      })
                   );
       
                }
       
                return olistItem;
       
             }

        });

    });