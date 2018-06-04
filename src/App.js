import React, { Component } from 'react';
import './App.css';

import ContactList from './component/contact.jsx';

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      lists:[],
      contatcId:"",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Edit = this.Edit.bind(this);
    this.EditList = this.EditList.bind(this);
    this.Remove = this.Remove.bind(this);
  }



  handleSubmit(event){
    event.preventDefault();
    let nom =  this.nom.value;
    let prenom =  this.prenom.value;
    let tel =  this.tel.value;
    let mail =  this.mail.value;
    let tgas =  this.tgas.value;
    
    // validate all the input before submiting
    let nomValidate = nom.length;
    let prenomValidate = prenom.length;
    let tgasValidate = tgas.length;
    let mailValidate = /\S+@\S+\.\S+/.test(mail);
    let telValidate = /0[1-9]\d{8}/.test(tel);


       // indicate the error to the user
      if (!nomValidate) {window.alert('vous avez un probleme au champ nom')};
      if (!prenomValidate) {window.alert('vous avez un probleme au champ Prenom')};
      if (!telValidate) {window.alert('vous avez un probleme au champ telephone')};
      if (!mailValidate) {window.alert('vous avez un probleme au champ mail')};
      if (!tgasValidate) {window.alert('vous avez un probleme au champ tags')};


      //insert objet
    if (!!nomValidate && !!prenomValidate && !!tgasValidate && !!mailValidate && !!telValidate) {
        let tagsSplited = tgas.split(/[\s,;]+/);
        let obj = {
          id:tel,
          nom:nom,
          prenom:prenom,
          tel:tel,
          mail:mail,
          tags:tagsSplited
        }
        
        let listState = this.state.lists;
 
        // verifier l'existence de l'objet avant l'inseration
        let exits =  listState.find(item => item.id === obj.id);

            if (!exits) {
           this.setState({ lists: [...this.state.lists, obj] }) 
           };
    };
  }



Edit(Id){

  this.setState({contatcId:Id})
}


EditList(obj){
  let listState = this.state.lists;
    let exite =  listState.map((item,i) => {

      if(item.id === obj.id){
          return i;
         } else {
          return undefined;
         }
        }
      );
    //filter from undefined , let only index of the modified one
    exite = exite.filter(function(n){ return n !== undefined });

    listState[exite[0]].tel=obj.tel;
    listState[exite[0]].nom=obj.nom;
    listState[exite[0]].prenom=obj.prenom;
    listState[exite[0]].tel=obj.tel;
    listState[exite[0]].mail=obj.mail;
    listState[exite[0]].tags=obj.tags;

    this.setState(prevState => ({
    lists: [...listState],
    contatcId:"",
  }))

}




Remove(Id){
   let listState = this.state.lists;
    let exite =  listState.map((item,i) => {

      if(item.id === Id){
          return i;
         }else{
          return undefined;
         }
        }
      );
    
    //filter from undefined , let only index of object to be removed
    let index = exite.filter(function(n){ return n !== undefined })[0];

    // update the array without the object of index above
     this.setState((prevState) => ({
          lists: prevState.lists.filter((_, i) => i !== index)
        }));
}

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">simple contact base</h1>
        </header>
        <div className="bodyContainer">
        <form>
            <input type="text"  placeholder="Nom"  ref={(nom) => { this.nom = nom }} />
            <input type="text"  placeholder="Prenom" ref={(prenom) => { this.prenom = prenom }} />
            <input type="tel" placeholder="Tel:0123456578" ref={(tel) => { this.tel = tel }} />
            <input type="email" placeholder="email@email.em" ref={(mail) => { this.mail = mail }} />
            <input type="text"  placeholder="Tags:jeune, homme..." ref={(tags) => { this.tgas = tags }} />
            <input type="submit" onClick={this.handleSubmit} value="Ajouter" />
        </form>
        <ContactList lists={this.state.lists} contatcId={this.state.contatcId} Edit={this.Edit} EditList={this.EditList} Remove={this.Remove} />
      </div>
      </div>
    );
  }
}

export default App;
