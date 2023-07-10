sap.ui.define([
    "sap/ui/core/UIComponent"
], function(UIComponent) {
    'use strict';

    return UIComponent.extend("fiorinet.template.Component",{

        //implementação customizada

        metadata : {
            manifest: "json"
         },
   


        init:function(){

            UIComponent.prototype.init.apply(this, arguments);

        },


    });
    
});