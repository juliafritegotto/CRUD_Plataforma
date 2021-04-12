sap.ui.define([
		"./BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("treinamento.l4e.app.controller.Menu", {
			onInit: function () {

			},
			
			onNavConsultaPlataforma: function(){
				this.getRouter().navTo("ConsultaPlataforma");

			},
			onNavCadastroPlataforma: function(){
				this.getRouter().navTo("CadastroPlataforma");

			}
		});
	});
