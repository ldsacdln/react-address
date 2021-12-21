import React, { useState, useEffect }  from "react";
import './App.css';
import Cart from "./Cart";
import Modal from 'react-modal';
import { FaSearchengin } from 'react-icons/fa';
import { stringify } from "querystring";
import { IconBase } from "react-icons/lib";

<script src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js"
   integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ=="
   crossOrigin="anonymous"
   referrerPolicy="no-referrer">
</script>



function App() {
  const generateAvatar = (seed: number) => `https://avatars.dicebear.com/api/bottts/${seed}.svg`;
  interface IContact{
    firstName: string
    lastName: string
    photo: string
    address: string
    email: string
    phone: string
  }
  const createContactModalStyle = {
    content: {
        with: '80%',
        height: "fit-content",
        margin: 'auto',
        borderRadius:"30px",
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        border:"#3399FF solid"
    },
  };
  const [fullContacts, setFullContacts] = useState<IContact[]>([
    {
      firstName: 'Alice',
      lastName:'Aardvark',
      photo: generateAvatar(1),
      address: '1600 Pennsylvania Ave',
      email:"alice-aardvark@email.com",
      phone:"555-5555551"
    },
    {      
      firstName: 'Bob',
      lastName:'Bear',
      photo: generateAvatar(8),
      address: '725 5th Ave',
      email:"bob-bear@email.com",
      phone:"555-5555552"
    },
    {
      firstName: 'Carol',
      lastName:'Coyote',
      photo: generateAvatar(2),
      address: '4 Pennsylvania Plaza',
      email:"carol-coyote@email.com",
      phone:"555-5555553"
    },
  ]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [createContactModalIsOpen, createContactIsOpen] = useState(false);
  const [editContactModalIsOpen, editContactIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(fullContacts[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setContacts([...fullContacts]);
  },[fullContacts]);
  function openCreateContactModal(){
    createContactIsOpen(true)
  }
  function closeCreateContactModal() {
    createContactIsOpen(false);
  }
  function openEditContactModal(index: number, contact:IContact){
    setSelectedContact(contact);
    setSelectedIndex(index);
    editContactIsOpen(true)
    console.log(selectedIndex,selectedContact);
  }
  function closeEditContactModal() {
    editContactIsOpen(false);
    console.log(editContactModalIsOpen);
  }

  function searchContact(){
    return(event:any) => {
      const search = (event.target.value as string).toLowerCase();

      const filterContacts:any = [];
      fullContacts.forEach((contact) => {
        if(contact.firstName.toLowerCase().includes(search) || 
          contact.lastName.toLowerCase().includes(search) || 
          contact.address.toLowerCase().includes(search)|| 
          contact.email.toLowerCase().includes(search)|| 
          contact.phone.toLowerCase().includes(search))
        {
          filterContacts.push(contact);
        }
      });  
      setContacts([...filterContacts]);
    }
  }

  const EditContact = () => {
    const [showErrorMessage, setErrorMessageVisibility] = useState(false);
    const [firstName, setFirstNameState]= useState(selectedContact.firstName);
    const [lastName, setLastNameState] = useState(selectedContact.lastName);
    const [email, setEmailState] = useState(selectedContact.email);
    const [address, setAddressState] = useState(selectedContact.address);
    const [phone, setPhoneState] = useState(selectedContact.phone);
    const [photo, setPhotoState] = useState(selectedContact.photo);

    

    function setFirstName(){
      return (event: any) => {
        setFirstNameState(event.target.value);
      }
    }    
    function setLastName(){
      return (event: any) => {
        setLastNameState(event.target.value);
      }
    }

    function setAddress(){
      return(event: any) => {
        setAddressState(event.target.value);
      }
    }
    function setEmail(){
      return (event: any) => {
        setEmailState(event.target.value);
      }
    }    
    function setPhone(){
      return (event: any) => {
        setPhoneState(event.target.value);
      }
    }    

    function editContact(){
      if(firstName != "" && 
        lastName != "" && 
        address != "" &&
        email != ""  && 
        phone != "" ) 
      {
        let newContact: IContact ={
          firstName : firstName,
          lastName: lastName,
          address: address,
          email: email,
          phone: phone,
          photo: photo
        }
        fullContacts[selectedIndex]=newContact;
        setFullContacts([...fullContacts]);
        closeEditContactModal();
      }
      else{
        setErrorMessageVisibility(true);
      }
    }

    return(
      <div className="modal-container">
      <label className="modal-title"> EDIT CONTACT </label>
      <label className="modal-label"> First Name:</label>
      <input type="text" placeholder='First name'  value={firstName} className="modal-input" onChange={setFirstName()}></input>
        <label className="modal-label"> Last Name:</label>
        <input type="text" placeholder='Last name' value={lastName} className="modal-input" onChange={setLastName()}></input>

        <label  className="modal-label"> Address:</label>
        <input type="text" placeholder='Address' value={address} className="modal-input" onChange={setAddress()}></input>        

        <label  className="modal-label"> Email:</label>
        <input type="text" placeholder='Email' value={email} className="modal-input" onChange={setEmail()}></input>        

        <label  className="modal-label"> Phone:</label>
        <input type="tel" placeholder='Phone' value={phone} className="modal-input" onChange={setPhone()}></input>

        <p className={showErrorMessage? "modal-error-message display": "modal-error-message dont-display"} > *Some field is empty </p>   
        
        <div className="modal-button-container">
          <button className='create' onClick={(editContact)}>Save</button>      
          <button className='create' onClick={(closeEditContactModal)}> Cancel </button>
        </div>   
        
      </div>
    )
  }
  const CreateContact = () => {
    const [showErrorMessage, setErrorMessageVisibility] = useState(false);
    
    let newContact: IContact ={
      firstName: "",
      lastName:"",
      address:"",
      email:"",
      phone:"",
      photo: generateAvatar(Math.random()),
    }

    function setFirstName(){
      return (event: any) => {
        newContact.firstName = event.target.value;
      }
    }    
    function setLastName(){
      return (event: any) => {
        newContact.lastName = event.target.value;
      }
    }

    function setAddress(){
      return(event: any) => {
        newContact.address = event.target.value;
      }
    }
    function setEmail(){
      return (event: any) => {
        newContact.email = event.target.value;
      }
    }    
    function setPhone(){
      return (event: any) => {
        newContact.phone = event.target.value;
      }
    }    

    function createContact(){
      console.log(newContact);
      if(newContact.firstName != "" && 
        newContact.lastName != "" && 
        newContact.address != "" &&
        newContact.email != ""  && 
        newContact.phone != "" ) 
      {
        fullContacts.push(newContact);
        setFullContacts([...fullContacts]);
        closeCreateContactModal();
      }
      else{
        setErrorMessageVisibility(true);
      }
    }

    return(
      <div className="modal-container">
      <label className="modal-title"> CREATE CONTACT </label>
      <label className="modal-label"> First Name:</label>
      <input type="text" placeholder='First name' className="modal-input" onChange={setFirstName()}></input>
        <label className="modal-label"> Last Name:</label>
        <input type="text" placeholder='Last name' className="modal-input" onChange={setLastName()}></input>

        <label  className="modal-label"> Address:</label>
        <input type="text" placeholder='Address' className="modal-input" onChange={setAddress()}></input>        

        <label  className="modal-label"> Email:</label>
        <input type="text" placeholder='Email' className="modal-input" onChange={setEmail()}></input>        

        <label  className="modal-label"> Phone:</label>
        <input type="tel" placeholder='Phone' className="modal-input" onChange={setPhone()}></input>

        <p className={showErrorMessage? "modal-error-message display": "modal-error-message dont-display"} > *Some field is empty </p>   
        
        <div className="modal-button-container">
          <button className='create' onClick={(createContact)}>Add</button>      
          <button className='create' onClick={(closeCreateContactModal)}> Cancel </button>
        </div>   
        
      </div>
    )
  }
  return (
    
    <div className='container'>
      <div className="tool-bar">
        <div className="title"> Address Book </div>
        <div className="blank"></div>
        <div className= {searchInputVisible? "search-contact-container open" : "search-contact-container" }>
          <input type="text" placeholder="Search contact" className={ searchInputVisible? "search-contact-input display": "search-contact-input dont-display" } onChange={searchContact()}></input>
          <button className="search-contact-button" onClick={()=>{setSearchInputVisible(!searchInputVisible)}}>  <FaSearchengin/> </button>
        
        </div>
        <button className="create-contact-button" onClick={openCreateContactModal}>+</button>
      </div>
      <div className="contact-cards-container">
         {contacts.map((contact,index) => (
          <div className="contact-card" onClick={()=>{openEditContactModal(index,contact)}}>
            <div className="photo-container">
               <div className="contact-photo" style={{background: "center / contain no-repeat url("+contact.photo+")"}}></div>
            </div>
            <div className="contact-info">
                <div className="contact-name"> {contact.firstName + " " + contact.lastName} </div>
                <div className="contact-data"> {contact.address} </div>
                <div className="contact-data"> {contact.email} </div>
                <div className="contact-data"> {contact.phone} </div>
            </div>
          </div>
         ))}

      </div>
      <Modal
        isOpen={createContactModalIsOpen}
        onRequestClose={closeCreateContactModal}
        style= {createContactModalStyle}
      >   
        <CreateContact />
      </Modal>
      <Modal
        isOpen={editContactModalIsOpen}
        onRequestClose={closeEditContactModal}
        style= {createContactModalStyle}
      >   
        <EditContact />
      </Modal>
    </div>
  );
}

export default App;
