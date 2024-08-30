import Swal from "sweetalert2"
import Input from "./Input"
import Select from "./Select"
import { useState } from "react"

const Formulario = ({addItem}) => {

    const [form, setForm] = useState({
        descripcion:'',
        precio:'',
        sitio:''
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {descripcion, precio, sitio} = form;
    const BACKEND = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)

        setLoading(true);
        setError(null);

        if (descripcion.trim(descripcion)==='' || precio.trim(precio)==='' || sitio.trim(sitio)==='') {
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Debe ingresar todos los campos!"
            });
            return false;
        }

        try {
            const res = await fetch(`${BACKEND}/Item/`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();            
            // setResponse(data);

            console.log(data);

            addItem({
                id: data.id,
                ...data
            })

            setForm({
                descripcion:'',
                precio:'',
                sitio:data.sitio,
            });


        } catch (error) {

            console.log('respuesta: ',error)
            
            setError(error.message);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Error al cargar la lista, favor intente nuevamente!"
            });
        } finally {
            setLoading(false);
        }

    }
    
    const handleChange = (e) => {
        // RECIBE LOS CAMPOS QUE CAMBIAN DEL FORMULARIO
        const {name, value} = e.target;

        setForm({
            ...form,
            [name] : value
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-center">
                <Input label={'Item'} type={'text'} name={'descripcion'} col={'4 col-12'} value={form.descripcion} onChange={handleChange}/>
                <Input label={'Precio'} type={'number'} name={'precio'}  col={'3 col-6'} value={form.precio} onChange={handleChange}/>
                <Select label={'Sitio'} name={'sitio'} col={'3 col-6'} value={form.sitio} onChange={handleChange}/>
                <div className="col-md-2 col-12 d-flex justify-content-center align-items-center">
                    <button className="btn btn-success w-100 h-100" type="submit">Agregar</button>
                </div>
            </div>
        </form>
    )
}

export default Formulario