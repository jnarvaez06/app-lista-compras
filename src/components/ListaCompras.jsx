import React, { useState, useEffect } from 'react';
import Item from "./Item"
import Input from './Input';

const ListaCompras = ({items, handleSaveChanges, showModal, handleOpenModal, handleCloseModal, deleteItem}) => {

  const [showModalWithAnimation, setShowModalWithAnimation] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [dataL, setDataL] = useState({
      descripcion:'',
      precio:'',
      sitio:''
  });

  const sumItems = (items) => {
    let sum = 0;
    items.map(item =>(
      sum += item.precio
    ))
    return sum;
  }

  const updateItem = (id) => {
    const item = items.find(item => item.id === id);
    setCurrentItem(item);

    setDataL({
        id:item.id,
        descripcion:item.descripcion,
        precio:item.precio,
        sitio:item.sitio
    });

    handleOpenModal();
    
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataL({
      ...dataL,
      [name] : value
    });
  };

  useEffect(() => {
    if (showModal) {
      // Activar la animación de fade in cuando el modal se abre
      setTimeout(() => {
        setShowModalWithAnimation(true);
      }, 10); // Un pequeño retardo para permitir que la clase 'fade' tome efecto
    } else {
      // Resetear la animación cuando el modal se cierra
      setShowModalWithAnimation(false);
    }
  }, [showModal]);

  return(
    <div className="my-5">
      <div className="d-flex justify-content-between">
        <h2>Items</h2>
        <h2>Total: $ {sumItems(items).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
      </div>
      <ul className="list-group">
      {
        items.map(item =>(
          <Item key={item.id} item={item} updateItem={updateItem} deleteItem={deleteItem}/>
        ))
      }
      </ul>
      {showModal && (
        <div className={`modal fade ${showModalWithAnimation ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Item</h5>
                <button type="button" className="btn btn-danger" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row g-3 align-items-center">
                  <Input label={'Item'} type={'text'} name={'descripcion'} col={'12 col-12'} value={dataL.descripcion} onChange={handleChange}/>
                  <Input label={'Precio'} type={'number'} name={'precio'} col={'12 col-12'} value={dataL.precio} onChange={handleChange}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={handleCloseModal}>
                  Cerrar
                </button>
                <button type="button" className="btn btn-success" onClick={() => handleSaveChanges(dataL)}>
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ListaCompras;
