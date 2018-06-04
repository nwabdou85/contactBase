import React from 'react';
import '../App.css';



export default class ContactList extends React.Component {
    constructor(props){
      super(props);
      this.state = {};
	      this.renderContatcName = this.renderContatcName.bind(this);
	      this.handleSubmit = this.handleSubmit.bind(this);
    }


handleSubmit= id => event =>{
	event.preventDefault();
    let nom =  this.nom.value;
    let prenom =  this.prenom.value;
    let tel =  this.tel.value;
    let mail =  this.mail.value;
    let tgas =  this.tgas.value;
    
    // validate all the input before submiting
    let nomValidate = nom.length;
    let prenomValidate = prenom.length;
    let mailValidate = /\S+@\S+\.\S+/.test(mail);
    let telValidate = /0[1-9]\d{8}/.test(tel);
    let tgasValidate = tgas.length;



          
       //indicate the error to the user
      if (!nomValidate) {window.alert('vous avez un probleme au champ nom')};
      if (!prenomValidate) {window.alert('vous avez un probleme au champ Prenom')};
      if (!telValidate) {window.alert('vous avez un probleme au champ telephone')};
      if (!mailValidate) {window.alert('vous avez un probleme au champ mail')};
      if (!tgasValidate) {window.alert('vous avez un probleme au champ tags')};



    if (!!nomValidate && !!prenomValidate  && !!mailValidate && !!telValidate && !!tgasValidate ) {
          let tagsSplited = tgas.split(/[\s,;]+/);
    	 let obj = {
	          id:id,
	          nom:nom,
	          prenom:prenom,
	          tel:tel,
	          mail:mail,
	          tags:tagsSplited
	        }

        this.props.EditList(obj);
    }

}


renderContatcName(){
     return this.props.lists.map((item,i) => {
		  return  <tr key={i}>
				    <td>{this.props.contatcId !== item.id ? item.nom : <input type="text" defaultValue={item.nom} ref={(nom) => { this.nom = nom }} />}</td>
				    <td>{this.props.contatcId !== item.id ? item.prenom : <input type="text" defaultValue={item.prenom} ref={(prenom) => { this.prenom = prenom }} />}</td>
				    <td>{this.props.contatcId !== item.id ? item.mail : <input type="text" defaultValue={item.mail} ref={(mail) => { this.mail = mail }} />}</td>
				    <td>{this.props.contatcId !== item.id ? item.tel : <input type="text" defaultValue={item.tel} ref={(tel) => { this.tel = tel }} />}</td>
				    <td>{this.props.contatcId !== item.id ? item.tags.map(tag => tag + " "):<input type="text"  defaultValue={item.tags} ref={(tags) => { this.tgas = tags }} />}</td>
				    <td> { this.props.contatcId !== item.id ?
				       <button onClick={this.props.Edit.bind(this,item.id)}>Editer</button> :
				       <input type="submit" value="OK" onClick={this.handleSubmit(item.id)} />
				       } </td>
				    <td><button onClick={this.props.Remove.bind(this,item.id)}>Supprimer</button></td>
			  </tr>
	      })
   }









  render(){

  	return (
  		 <div>
           { !!this.props.lists.length ? 
            <table>
		        <thead>
				 <tr>
				    <th>Nom</th>
				    <th>Prenom</th>
				    <th>Mail</th>
				    <th>Telephone</th>
				    <th>Tags</th>
				    <th></th>
				    <th></th>
				  </tr>
				 </thead>
				 <tbody>
				  {this.renderContatcName()}
		         </tbody>
			</table> : <p className="App-intro">Pour afficher les contacts, veuillez les rajouter ci-dessus</p> }
         </div>

  		)
  }

}