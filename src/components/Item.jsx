
const Item = ({item, updateItem, deleteItem}) => {

    const {id, descripcion, precio, sitio} = item;

    return(
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex flex-row">
                <div className="me-3"><span>Item: </span>{descripcion}</div>
                <div className="me-3"><span>Precio: </span>${precio.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                {/* <div className="me-3"><span>Tienda: </span>{sitio}</div> */}
            </div>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-sm" onClick={() => updateItem(id)}><i className="fa-regular fa-pen-to-square fa-2x text-warning"></i></button>
                <button type="button" className="btn btn-sm" onClick={() => deleteItem(id)}><i className="fa-regular fa-trash-can fa-2x text-danger"></i></button>
            </div>
        </li>
    )
}
export default Item