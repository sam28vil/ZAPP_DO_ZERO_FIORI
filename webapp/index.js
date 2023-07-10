sap.ui.define([
    "sap/m/Text",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/core/ComponentContainer"
], function(Text,XMLView,ComponentContainer){
    'use strict';

    //alert('biblioteca carregada');
    //new Text({
	//	text: "Olá Mundo pelo index"
	//}).placeAt("content");

    //XMLView.create({
	//	viewName: "fiorinet.template.view.App"
	//}).then(function (oView) {
	//	oView.placeAt("content");
	//});

    new ComponentContainer({
		name: "fiorinet.template",
		settings : {
			id : "template"
		},
		async: true
	}).placeAt("content");

    
});