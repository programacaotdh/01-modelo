var Form = {

    forms:[],

    redirect:null,

    init:function(){

        this.getForms();
                
        this.forms.forEach(function(el){
            
            //Validação em listener( escuta )
            el.addEventListener('submit',function(el){ 
                
                if(Form.validaCampos(el)){ 
                    Form.submit(el); 
                }
            
            });

            //Mask em listener( escuta )
            Form.masks(el); 

        });

    },

    submit:function(ev){

       var dados = this.b64EncodeUnicode(JSON.stringify(this.geraDados(ev)));       

       ev.target.querySelector('button').classList.add('hidden');

       this.setAllDisabled(ev);

       this.sendDados(dados,ev);

    },

    getForms:function(){

        this.forms = document.querySelectorAll('form[customvalidate="true"]');

    },

    getFields: function(frm) {

        var inputs, textareas, selects, fields = [];

        inputs = frm.querySelectorAll('input');
        textareas = frm.querySelectorAll('textarea');
        selects = frm.querySelectorAll('select');

        inputs.forEach(function(el){ fields.push(el); });
        textareas.forEach(function(el){ fields.push(el); });
        selects.forEach(function(el){ fields.push(el); });

        return fields;

    },

    setAllDisabled:function(ev){

        var fields = [];
        
        fields = this.getFields(ev.target);

        fields.forEach(function(element, index) { 
            
            element.readOnly = true;

        });

    },


    geraDados:function(ev){

        var fields = [];
        var endDados = [];
        
        fields = this.getFields(ev.target);

        fields.forEach(function(element, index) {

            var name = element.getAttribute('data-name');

            endDados[index] = {};
            endDados[index].value = element.value;

            if(name){
                endDados[index].name = name;
            } else {
                endDados[index].sys = 1;
                endDados[index].name = element.getAttribute('name');
            }
            
        });

        return endDados;

    },

    validaCampos:function(ev){
               
        var fields = [];
        var st = true;

        ev.preventDefault();
        fields = this.getFields(ev.target);

        fields.forEach(function(fld){

            fld.parentElement.classList.remove('errorField');
            
            //Verifica se está vaziu
            if(fld.required && fld.value==""){           
                st = false;             
                Form.renderErrorFildEmpty(fld);                
            }

            //Verifica se email é valido
            if(fld.type=="email" && fld.value!=""){
                status = false;   
                if(!Form.validateEmail(fld.value)) {                  
                    Form.renderErrorFildInvalidEmail(fld);
                }                
            }

        });

        return st;

    },

    renderErrorFildEmpty:function(fld){
        
        var div = fld.parentElement;

        div.classList.add('errorField');

        if(!div.querySelector('p')){
            var p = document.createElement('p');
            p.textContent = 'Preencha corretamente esse campo!';
            div.appendChild(p);
        } else {
            div.querySelector('p').textContent = 'Preencha corretamente esse campo!';
        }

    },

    renderErrorFildInvalidEmail:function(fld){
        
        var div = fld.parentElement;
        
        div.classList.add('errorField');

        if(!div.querySelector('p')){
            var p = document.createElement('p');
            p.textContent = 'E-mail inválido!';
            div.appendChild(p);
        } else {
            div.querySelector('p').textContent = 'E-mail inválido!';
        }

    },

    validateEmail:function(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    maskPhone:function(e){
        if(e.value.length<15){ e.value=e.value.replace(/[^\d]/g,"").replace(/^(\d{2})(\d)/,"($1) $2").replace(/(\d{4})(\d)/,"$1-$2"),e.value.length>15?e.value=stop:stop=e.value } else { e.value=e.value.replace(/[^\d]/g,"").replace(/^(\d\d)(\d)(\d)/,"($1) $2 $3").replace(/(\d{4})(\d)/,"$1-$2"),e.value.length>16?e.value=stop:stop=e.value } 
    },

    maskData:function(e){
        e.value=e.value.replace(/[^\d]/g,"").replace(/^(\d{2})/,"$1/").replace(/^(\d{2})\/(\d{2})/,"$1/$2/").replace(/^(\d{2})\/(\d{2})\/(\d{4})/,"$1/$2/$3"),e.value.length>10?e.value=stop:stop=e.value 
    },

    maskCEP:function(e){
        e.value=e.value.replace(/[^\d]/g,"").replace(/^(\d{5})/,"$1-").replace(/^(\d{5})-(\d{3})/,"$1-$2"),e.value.length>9?e.value=stop:stop=e.value 
    },

    maskCPF:function(e){
        e.value=e.value.replace(/[^\d]/g,"").replace(/^(\d{3})/,"$1.").replace(/^(\d{3}).(\d{3})/,"$1.$2.").replace(/^(\d{3}).(\d{3}).(\d{3})/,"$1.$2.$3-").replace(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})/,"$1.$2.$3-$4"),e.value.length>14?e.value=stop:stop=e.value 
    },

    masks:function(ev){
        
        var fields = [];
        fields = ev.querySelectorAll('input');

        fields.forEach(function(field){

           if(field.getAttribute("data-mask")=="telefone"){
                field.addEventListener("keyup",function(){
                    Form.maskPhone(this);
                });
            }

            if(field.getAttribute("data-mask")=="data"){
                field.addEventListener("keyup",function(){
                    Form.maskData(this);
                });
            }            

            if(field.getAttribute("data-mask")=="cep"){
                field.addEventListener("keyup",function(){
                    Form.maskCEP(this);
                });
            }

            if(field.getAttribute("data-mask")=="cpf"){
                field.addEventListener("keyup",function(){
                    Form.maskCPF(this);
                });
            }

       });

    },

    b64EncodeUnicode: function(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    },

    sendDados:function(dados,form){

        Form.active = form;
        
        Form.active.target.querySelector('button').classList.add('hidden');
        Form.active.target.querySelector('.loading').classList.remove('hidden');

        var xhttp = new XMLHttpRequest();       
        
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              
              var response = JSON.parse(this.responseText);

              if(response.st){ window.location = Form.active.target.getAttribute('action'); }
              
              Form.active.target.querySelector('button').classList.remove('hidden');
              Form.active.target.querySelector('.loading').classList.add('hidden');

          }
        };

        xhttp.open('POST','./actions/forms.php', true);
        xhttp.send(dados);

    }
      
}


window.addEventListener('load', function(){ Form.init(); });
