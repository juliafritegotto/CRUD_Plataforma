sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (BaseController, JSONModel, MessageBox) {
		"use strict";

		return BaseController.extend("treinamento.l4e.app.controller.CadastroPlataforma", {
			onInit: function () {
				//Rota de Cadastro
				this.getRouter().getRoute("CadastroPlataforma").attachPatternMatched(this.handleRouteMatched, this);

				//Rota de Edição
				this.getRouter().getRoute("EditarPlataforma").attachPatternMatched(this.handleRouteMatchedEditar, this);

			},
			handleRouteMatched: function () {

				this.getView().setModel(new JSONModel({
					"status": "A"
				}), "Plataforma");
			},
			handleRouteMatchedEditar: async function () {
				var that = this;
				var id = this.getRouter().getHashChanger().getHash().split("/")[1];
				this.getView().setBusy(true);

				await
					$.ajax({
						"url": `/api/plataformas/${id}`,
						"method": "GET",
						success(data) {
							that.getView().setModel(new JSONModel(data), "Plataforma");
						},
						error() {
							MessageBox.error("Não foi possível buscar a Plataforma");
						}
					});
				this.getView().setBusy(false);
			},

			onChangeSwitch: function (oEvent) {
				this.getView().getModel("Plataforma").setProperty("/status", oEvent.getSource().getState() === true ? "A" : "I");

			},
			onConfirmar: async function () {
				var oPlataforma = this.getView().getModel("Plataforma").getData();
				var that = this;
				console.log(oPlataforma);

				if(this.getRouter().getHashChanger().getHash().search("EditarPlataforma") === 0){
					await $.ajax(`/api/plataformas/${oPlataforma.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},

						data: JSON.stringify({
							"nome": oPlataforma.nome,
							"tipo": oPlataforma.tipo,
							"status": oPlataforma.status
						}),
						success() {
							MessageBox.success("Editado com sucesso!", {
								onClose: function () {
									that.getRouter().navTo("ConsultaPlataforma");
								}
							});
						},
						error() {
							MessageBox.error("Não foi possível editar a plataforma.");
						}
					});

				} else {

					this.getView().setBusy(true);

					await $.ajax("/api/plataformas", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						data: JSON.stringify(oPlataforma),
						success() {
							MessageBox.success("Salvo com sucesso!");
						},
						error() {
							MessageBox.error("Não foi possível salvar a plataforma");
						}
					})

					this.getView().setBusy(false);
				}

			},
			onCancelar: function(){

                if(this.getRouter().getHashChanger().getHash().search("EditarPlataforma") === 0){
                    this.getRouter().navTo("ConsultaPlataforma");
                }else{
                    this.getView().setModel(new JSONModel({"status": "A"}), "Plataforma")
                }
            }
		});
	});
